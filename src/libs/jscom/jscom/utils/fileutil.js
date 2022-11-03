import SparkMD5 from 'spark-md5'

class FileUtil {
  // Read in chunks of 2MB
  // 如果 pieceCallback 返回 true, 则外层接管 loadNext 调用权，适用于网络按顺序传输数据场景
  md5sumFile(file, resolve, reject, pieceCallback=null, chunkSize=2097152) {
    var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
      total = Math.ceil(file.size / chunkSize),
      index = 0,
      spark = new SparkMD5.ArrayBuffer(),
      fileReader = new FileReader();

    fileReader.onload = function (e) {
      // console.log('read chunk nr', index + 1, 'of', chunks);
      spark.append(e.target.result);                   // Append array buffer
      let ret = pieceCallback && pieceCallback(e.target.result, index, total, loadNext)
      index++;

      if (index < total) {
        if (!ret) {
          loadNext()
        }
      } else {
        let md5str = spark.end()
        resolve && resolve(md5str, file, index, total)
      }
    };

    fileReader.onerror = function () {
      // console.warn('oops, something went wrong.');
      reject && reject()
    };

    function loadNext() {
      if (index >= total) return
      var start = index * chunkSize,
        end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }

    loadNext();
  }
  humanSize(num, suffix='B') {
    if (!num) {
      return `0${suffix}`
    }
    num = parseFloat(num)
    for (let unit of ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z']) {
      if (Math.abs(num) < 1024.0) {
        return `${num.toFixed(1)}${unit}${suffix}`
      }
      num /= 1024.0
    }

    return `num.toFixed(1)Y${suffix}`
  }
  humanToBytes(humanstr) {
    humanstr = humanstr.toUpperCase()
    let factor = 1.0
    for (let units of [['', 'B', 'IB'], ['K', 'KB', 'KIB'], ['M', 'MB', 'MIB'],
      ['G', 'GB', 'GIB'], ['T', 'TB', 'TIB'], ['P', 'PB', 'PIB'],
      ['E', 'EB', 'EIB'], ['Z', 'ZB', 'ZIB'], ['Y', 'YB', 'YIB']]) {
      for (let unit of units) {
        let digitstr = ''
        if (unit) {
          digitstr = humanstr.slice(0, -1*unit.length)
        } else {
          digitstr = humanstr
        }
        if (humanstr.endsWith(unit) && !isNaN(digitstr.replace('.', ''))) {
          // match
          return parseInt(factor * parseFloat(digitstr))
        }
      }
      factor *= 1024.0
    }
  }
}

export var fileUtil = new FileUtil()
