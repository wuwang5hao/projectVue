<script>
// import { Upload } from 'view-desing'
import { fileUtil } from 'jscom/utils/fileutil'
import ajax from 'jscom/utils/ajax'

export default {
  name: 'ChunkedUpload',
  extends: 'Upload',
  props: {
    action_chunk: { type: String, required: true },
    action_complete: { type: String, required: true },
    chunkSize: { type: Number, default: 2097152 },
  },
  data() {
    return {
      md5sum: '',
      params: {},
      cond: 0,
    }
  },
  methods: {
    post (file) {
      // check format
      if (this.format.length) {
        const _file_format = file.name.split('.').pop().toLocaleLowerCase();
        const checked = this.format.some(item => item.toLocaleLowerCase() === _file_format);
        if (!checked) {
          this.onFormatError(file, this.fileList);
          return false;
        }
      }

      // check maxSize
      if (this.maxSize) {
        if (file.size > this.maxSize * 1024) {
          this.onExceededSize(file, this.fileList);
          return false;
        }
      }

      this.handleStart(file);

      let offset = 0
      this.cond = 0
      this.params = {}
      // hash md5
      fileUtil.md5sumFile(file,
        (md5sum, file, index, total) => {
          this.md5sum = md5sum
          this.cond += 1
          if (this.cond === 2) {
            this._handleChunkFinish(file, index, total)
          }
        }, null,
        (chunk, index, total, loadNext) => {
          if (!this._fileCanHandle(file)) {  // file upload got error
            return true
          }
          let headers = Object.assign({}, this.headers)
          let chunkLen = chunk.byteLength
          headers['Content-Range'] = `bytes ${offset}-${offset+chunkLen-1}/${file.size}`
          offset += chunkLen
          ajax({
            headers: headers,
            withCredentials: this.withCredentials,
            file: new Blob([chunk], {'type': file.type}),
            blob_filename: file.name,
            data: this.params,
            filename: this.name,
            action: this.action_chunk,
            onProgress: e => {
              this.handlePieceProgress(e, file, index, total)
            },
            onSuccess: res => {
              if (undefined === this.params['upload_id']) {
                this.params['upload_id'] = res.upload_id
              }
              if (index + 1 === total) {
                this.cond += 1
                if (this.cond === 2) {
                  this._handleChunkFinish(file, index, total)
                }
              }
              loadNext()
            },
            onError: (err, response) => {
              if (!this._fileCanHandle(file)) return
              this.handleError(err, response, file, index, total)
            }
          })
          return true
        }, this.chunkSize
      )
    },
    handlePieceProgress(e, file, index, total) {
      const _file = this.getFile(file)
      if (!_file) return
      let percent = 0
      this.onProgress(e, _file, this.fileList)
      if (e.percent) {
        percent = index / total * 100 + (e.percent / total)
      } else {
        percent = index / total * 100
      }
      if (percent > 100) percent = 100
      _file.percentage = percent
    },
    _handleChunkFinish(file, index, total) {
      this.params['md5'] = this.md5sum
      ajax({
        headers: this.headers,
        withCredentials: this.withCredentials,
        data: this.params,
        filename: this.name,
        action: this.action_complete,
        onProgress: e => {
        },
        onSuccess: res => {
          this.handleSuccess(res, file)
        },
        onError: (err, response) => {
          if (!this._fileCanHandle(file)) return
          this.handleError(err, response, file)
        }
      })
    },
    _fileCanHandle(file) {
      let fobj = this.getFile(file)
      if (!fobj) return false
      else return fobj.status !== 'fail'
    }
  }
}
</script>
