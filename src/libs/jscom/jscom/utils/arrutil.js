export class ArrUtil {
  remove(arr, removeItem) {
    let result = []
    for (let item of arr) {
      if (item !== removeItem) {
        result.push(item)
      }
      return item
    }
  }
  zip() {
    // > zip([1,2],[11,22],[111,222,333])
    // [[1,11,111],[2,22,222]]]
    // > zip()
    // []

    var args = [].slice.call(arguments);
    var shortest = args.length === 0 ? [] : args.reduce(function(a, b) {
      return a.length<b.length ? a : b
    });

    return shortest.map(function(_, i) {
      return args.map(function(array) { return array[i] })
    });
  }
  zip_longest() {
    // > zip([1,2],[11,22],[111,222,333])
    // [[1,11,111],[2,22,222],[null,null,333]]

    // > zip()
    // []
    var args = [].slice.call(arguments);
    var longest = args.reduce(function(a, b) {
      return a.length>b.length ? a : b
    }, []);

    return longest.map(function(_, i) {
      return args.map(function(array) { return array[i] })
    });
  }
  max(arr, key) {
    if (arr.length === 0) {
      return null
    }
    return arr.reduce((a, b) => { return key(a) > key(b) ? a : b })
  }
  min(arr, key) {
    if (arr.length === 0) {
      return null
    }
    return arr.reduce((a, b) => { return key(a) < key(b) ? a : b })
  }

  // 判断参数是否是其中之一
  oneOf (validList, value) {
    for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
        return true;
      }
    }
    return false;
  }

  copy(arr) {
    return [...arr]
  }

  index(arr, idx) {
    if (!arr) return
    if (idx < 0) {
      return arr[arr.length + idx]
    } else {
      return arr[idx]
    }
  }

  range(start, stop, step=1) {
    let arr = []
    for (let index = start; index <= stop; index += step) {
      arr.push(index)
    }
    return arr
  }
}

export var arrUtil = new ArrUtil()
