import { RuntimeError } from "jscom/core/exceptions"

export class BaseTask {
  static TYPE_PERIODIC = 'periodic'
  static TYPE_ONCE = 'once'
  static TYPE_LIMIT = 'limit'
  static TYPE_COUNT = 'count'
  static __TASKID = 0

  static RET_START = 'start'
  static RET_RUNNING = 'running'
  static RET_STOP = 'stop'
  static RET_IDLE = 'idle'
  static RET_UNDEFINED = undefined

  static GenTaskid() {
    return ++BaseTask.__TASKID
  }

  constructor() {
    this.taskid = BaseTask.GenTaskid()
    this.init()
  }

  init() {
    this.initOnce()
  }

  toString() {
    return `id: ${this.taskid}, type: ${this._type} count: ${this._count}, obj: ${super.toString()}`
  }

  _init() {
    this._verbose = true
    this._tmstart = 0
    this._tmlast = 0
    this._limitMs = 0
    this._periodMs = 0
    this._type = ''
    this._count = 0
    this._doCount = 0
    this._initialized = true
    this._started = false
    this._running = false
  }

  initPerodic(ms) {
    this._init()
    this._type = BaseTask.TYPE_PERIODIC
    this._periodMs = ms
  }

  initOnce() {
    this._init()
    this._type = BaseTask.TYPE_ONCE
    this._count = 0
  }

  initCount(count) {
    this._init()
    this._type = BaseTask.TYPE_COUNT
    this._count = count
  }

  initLimit(limitMs) {
    this._init()
    this._type = BaseTask.TYPE_LIMIT
    this._limitMs = limitMs
  }

  _isValidRet(ret) {
    if (ret !== BaseTask.RET_RUNNING && ret !== BaseTask.RET_START && ret !== BaseTask.RET_STOP &&
      ret !== BaseTask.RET_IDLE && ret !== BaseTask.RET_UNDEFINED) {
      throw new RuntimeError(`check result invalid: ${ret}`)
    }
  }

  _run() {
    if (!this._initialized) {
      throw new RuntimeError('Can not run uninitialized task')
    }
    if (this._started && !this._running) {
      return BaseTask.RET_STOP
    }

    let ret = this._check()
    this._isValidRet(ret)
    if (ret !== BaseTask.RET_START) {
      if (this._verbose && BaseTask.RET_STOP === ret) {
        console.log(`task ${this} _check stop`)
      }
      return ret
    }
    try {
      ret = this.check()
    } catch (e) {
      console.error(e.stack)
      ret = BaseTask.RET_STOP
    }
    this._isValidRet(ret)
    if (ret !== BaseTask.RET_START) {
      if (this._verbose && BaseTask.RET_STOP === ret) {
        console.log(`task ${this} check stop`)
      }
      return ret
    }

    if (!this._tmstart) {
      this._tmstart = new Date().getTime()
    }

    try {
      this._started = true
      this._running = true
      ret = this.run()
      if (ret === undefined && this._running === true) {
        ret = BaseTask.RET_RUNNING
      }
    } catch (e) {
      console.error(e.stack)
      ret = BaseTask.RET_UNDEFINED
    }

    this._tmlast = new Date().getTime()
    return ret
  }

  _check() {
    if (this._type === BaseTask.TYPE_PERIODIC) {
      if (!this._tmlast) {
        return BaseTask.RET_START
      }
      if (this._tmlast + this._periodMs >= new Date().getTime()) {
        return BaseTask.RET_IDLE
      } else {
        return BaseTask.RET_START
      }
    } else if (this._type === BaseTask.TYPE_ONCE) {
      if (this._tmstart) {
        if (this._running) {
          return BaseTask.RET_IDLE
        } else {
          return BaseTask.RET_STOP
        }
      } else {
        return BaseTask.RET_START
      }
    } else if (this._type === BaseTask.TYPE_COUNT) {
      if (this._doCount >= this._count) {
        return BaseTask.RET_STOP
      } else {
        return BaseTask.RET_START
      }
    } else if (this._type === BaseTask.TYPE_LIMIT) {
      if (!this._tmstart) {
        return BaseTask.RET_START
      }
      if (this._tmstart + this._limitMs >= new Date().getTime()) {
        return BaseTask.RET_IDLE
      } else {
        return BaseTask.RET_STOP
      }
    } else {
      console.error(`Error unknown type ${this._type}`)
      return BaseTask.RET_STOP
    }
  }

  check() {
    if (!this._started) {
      return BaseTask.RET_START
    } else if (this._running) {
      return BaseTask.RET_RUNNING
    } else {
      return BaseTask.RET_STOP
    }
  }

  run() {}

  onStart() {}

  onStop() {

  }
}

export class SimpleTask extends BaseTask {
  constructor(run, check, init, onStart, onStop) {
    super()
    this.func_run = run
    this.func_check = check
    this.func_init = init
    this.func_onStart = onStart
    this.func_onStop = onStop
  }
  init() {
    if (this.func_init) return this.func_init()
    else return super.init()
  }
  run() {
    if (this.func_run) return this.func_run()
    else return super.run()
  }
  check() {
    if (this.func_check) return this.func_check()
    else return super.check()
  }
  onStart() {
    if (this.func_onStart) return this.func_onStart()
    else return super.onStart()
  }
  onStop() {
    if (this.func_onStop) return this.func_onStop()
    else return super.onStop()
  }
}

export class BaseLooper {
  constructor(name, limitRunningTaskCount=1, verbose=true) {
    this.__intervalId = 0
    this._name = name
    this._tasks = []
    this._tick = 0
    this._verbose = verbose
    this._lastDumpTime = 0
    // 同一时间只调度一个运行任务
    this._limitRunningTaskCount = limitRunningTaskCount
  }

  genTaskid() {
    return BaseTask.GenTaskid()
  }

  addTask(task) {
    if (!(task instanceof BaseTask)) {
      throw new RuntimeError('Should add a task extends BaseTask')
    }
    this._tasks.push(task)
  }

  dispatch() {
    this._tick++

    let runningTaskCount = 0

    for (let task of this._tasks) {
      if (task._running) {
        runningTaskCount++
        break
      }
    }

    if (this._limitRunningTaskCount > 0 && runningTaskCount >= this._limitRunningTaskCount) {
      // do not dispatch other task run
    } else {
      let tasks = []
      let runCount = 0
      for (let task of this._tasks) {
        if (this._limitRunningTaskCount > 0 && runCount >= this._limitRunningTaskCount) {
          tasks.push(task)
        } else {
          runCount++
          task.onStart()
          let ret = task._run()
          if (ret === BaseTask.RET_UNDEFINED || ret === BaseTask.RET_STOP) {
            task.onStop()
            console.log(`remove task ${task.constructor.name} ret ${ret}`)
          } else {
            // start, running, idle
            tasks.push(task)
          }
        }
      }
      this._tasks = tasks
    }

    if (this._verbose && this._tasks.length > 0) {
      if (new Date().getTime() - this._lastDumpTime > 3000) {
        this._lastDumpTime = new Date().getTime()
        let tasks = this._tasks.slice(0, 3)
        let tasksnames = tasks.map((task) => { return task.constructor.name }).join(', ')
        console.log(`== dump == name ${this._name} running count ${this._tasks.length}: ${tasksnames}: ${this._tasks.slice(0, 3)}`)
      }
    }
    this.idle(runningTaskCount)
  }

  idle(runningTaskCount) {}

  start() {
    this.__intervalId = setInterval(() => {
      this.dispatch()
    }, 700)
  }

  stop() {
    if (this.__intervalId) {
      clearInterval(this.__intervalId)
      this.__intervalId = 0
    }
  }
}
