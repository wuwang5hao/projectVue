export class PrinterApi {
  constructor(onErrorMessage, onPrintSuccess) {
    this.onErrorMessage = onErrorMessage
    this.onPrintSuccess = onPrintSuccess
    this.socket = null
    this.UUID = []
    this.printer = {
      version: '1.0', // 协议版本
      errMsg: '等待初始化',
      printerList: [], // 打印机列表
      printerDate: [], // 需要打印的数据
    }
    this.resolveList = {} // 回调函数
    this.printerConfig = {
      name: '', // 默认打印机
      needTopLogo: !1,
      needBottomLogo: !1,
      horizontalOffset: 0,
      verticalOffset: 0,
      forceNoPageMargins: !1, // v0.2.8.3 新增字段
      paperSize: {
        width: 1,
        height: 1
      }
    }
  }
  OnErrorMessage(title, message) {
    console.log(title)
    console.log(message)
    if (this.onErrorMessage) {
      this.onErrorMessage(title, message)
    }
  }
  init() {
    this.socket = new WebSocket('ws://localhost:13528');
    this.socket.onopen = () => {
      this.socket.onmessage = (event) => {
        console.log('监听到一条消息, data:', event.data);
        let response = JSON.parse(event.data);
        if (response.status === 'success' || response.taskStatus === "printed") {
          switch (response.cmd) {
            case 'getAgentInfo':
              // 获取打印机列表
              return this.socket.send(JSON.stringify(this.getDefaultRequest('getPrinters', response.requestID)));
            // 获取打印机版本
            case 'getPrinters':
              // 获取打印机列表 并解析打印机列表数据
              if (response.printers.length) {
                // 获取默认打印机的配置
                let p = this.printer.printerList;
                response.printers.forEach(pt => {
                  pt.status === "enable" && p.push(pt.name);
                });
                if (response.defaultPrinter) {
                  this.printerConfig.name = response.defaultPrinter;
                }
              } else {
                this.printer.errMsg = '无可用的打印机!';
              }
              break;
            case 'getPrinterConfig':
              // 获取某个打印机的设置参数
              break;
            case 'setPrinterConfig':
              this.resolve_setPrinterConfig && this.resolve_setPrinterConfig('setPrinterConfig');
              break;
            case 'notifyPrintResult':
              // 打印结果通知协议
              if (response.taskStatus === "printed") {
                // 已经打印完成
              } else if (response.taskStatus === "rendered") {
                // 已经渲染完成
              }
              break;
            case 'print':
              // 打印
              if (response.previewURL||response.previewImage) {
                let f = this.resolveList.print;
                f && f(response.previewURL?response.previewURL:response.previewImage[0])
              } else {
                console.log("打印成功:", response);
              }
              if (this.onPrintSuccess) {
                this.onPrintSuccess()
              }
              break;
            default:
          }
        } else {
          if (response.cmd === "notifyPrintResult") {
          } else {
            this.printer.errMsg = response.msg;
            console.error(response);
          }
          this.OnErrorMessage(
            '打印错误信息'+response.msg,
            JSON.stringify(response)
          )
        }
      };
      this.socket.onclose = () => {
        this.printer.errMsg = '菜鸟打印组件连接断开！';
      };
      // 先获取版本
      this.socket.send(JSON.stringify(this.getDefaultRequest('getAgentInfo')));
      this.printer.errMsg = '';
    };
    this.socket.onerror = () => {
      this.OnErrorMessage(
        '系统错误',
        `<div class="print_info">亲，系统检测到菜鸟打印组件启动失败，解决办法：
          <h3>1、未安装控件</h3>
          <p>请先安装控件，<a href="http://cloudprint.cainiao.com/cloudprint/client/CNPrintSetup.exe" target="_blank">请点击此处下载</a>。安装好后重启浏览器即可。</p>
          <h3>2、已安装控件</h3>
          <p>请在电脑的开始菜单-->“所有程序”里找到“CAINIAO打印组件”进行启动。</p></div>`
      )
      this.printer.errMsg = '连接打印组件失败！';
    };
  }
  // 获取通用请求参数
  getDefaultRequest(cmd, id) {
    return {
      version: this.printer.version,
      cmd,
      requestID: id || this.getUUID()
    };
  }
  // 获取通用唯一标识符
  getUUID(len = 8) {
    let id;
    do {
      id = Math.random().toString(16).slice(len * -1).toUpperCase();
    } while (this.UUID.includes(id));
    this.UUID.push(id);
    return id;
  }
  // 获取打印机配置
  getPrinterConfig(name) {
    let request = this.getDefaultRequest('getPrinterConfig');
    request.printer = (this.printerConfig.name = name); // 设置默认打印机
    this.socket.send(JSON.stringify(request));
  }
  // 设置打印机配置(每次打印前设置)
  setPrinterConfig(resolve, obj) {
    if (resolve) {
      this.resolve_setPrinterConfig = resolve;
    }
    const request = this.getDefaultRequest('setPrinterConfig', this.getUUID());
    request.printer = Object.assign(this.printerConfig, obj);
    request.printer.paperSize.width >>= 0;
    request.printer.paperSize.height >>= 0;
    this.socket.send(JSON.stringify(request));
  }
  // 请求打印
  sendPrint(resolve, orderId, contents, preview = true, type = 'pdf') {
    if (resolve) {
      this.resolveList.print = resolve;
    }
    let request = this.getDefaultRequest('print', this.getUUID());
    request.task = {
      previewType: type,
      preview: preview,
      taskID: orderId +'_'+ this.getUUID(),
      printer: this.printerConfig.name,
      notifyType: ['print'], // 仅出纸响应
      notifyMode: 'allInOne',
      documents: [{
        documentID: orderId +'_'+ this.getUUID(),
        contents: contents
      }]
    };
    this.socket.send(JSON.stringify(request));
  }
  doCheckBrowser() {
    var support = false;
    if (window.WebSocket !== undefined) {
      support = true;
    }
    return support;
  }
}
