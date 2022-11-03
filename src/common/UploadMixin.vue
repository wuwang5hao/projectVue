<script>
import ajax from '@/common/ajax'

export default {
  name: 'UploadMixin',

  data () {
    return {
      uploadAction: '',
      selFile: null,
      // isDirectUpload: true,
      filename: '',
      fileSize: '',
    }
  },

  methods: {
    selectFile (event) {
      let { files } = event.target
      if (!files.length) {
        return
      }
      this.filename = files[0].name
      if (this.isDirectUpload) {
        this.post(files[0])
      } else {
        this.selFile = files[0]
      }
      event.target.value = ''
    },
    post (selFile, data={}, fun) {
      this.fileSize = selFile.size / 1024
      if(this.fileSize > 10000) {
        this.$message.error('导入的文件不能大于10M！')
        return
      }
      ajax({
        headers: this.$apiUtil.getHeaders(),
        withCredentials: false,
        file: selFile,
        data: data,
        filename: 'excelFile',
        action: `${this.$apiUtil.baseUrl()}${this.uploadAction}`,
        onProgress: (e) => {
          this.handleProgress(e, selFile)
        },
        onSuccess: (res) => {
          if (res.resultCode === 0 || res.resultCode === 200) {
            fun&&fun()
            this.handleSuccess(res, selFile, fun)
          } else {
            this.handleError(null, res, selFile)
          }
        },
        onError: (err, response) => {
          this.handleError(err, response, selFile)
        }
      })
    },
    handleProgress (e, file) {
      //  post (selFile, data={}) {
      //       if (!this.selFile) {
      //           this.$message.error('请选择需要导入的文件')
      //           return
      //       }
      //       this.isLoading = true
      //       console.log(this.$apiUtil.getHeaders())
      //       console.log("selFile", selFile)
      //       console.log("data1", data)
      //       ajax({
      //           headers: this.$apiUtil.getHeaders(),
      //           withCredentials: false,
      //           file: selFile,
      //           data: data,
      //           filename: 'excelFile',
      //           action: `${this.$apiUtil.baseUrl()}${this.uploadAction}`,
      //           onProgress: (e) => {
      //               this.handleProgress(e, selFile)
      //           },
      //           onSuccess: (res) => {
      //               if (res.resultCode === 0
      //                   || res.resultCode === 200
      //                   || res.code === 0
      //                   || res.code === 200) {
      //                   this.handleSuccess(res, selFile)
      //               } else {
      //                   this.handleError(null, res, selFile)
      //               }
      //               // this.filename = ''
      //               this.isLoading = false
      //           },
      //           onError: (err, response) => {
      //               this.handleError(err, response, selFile)
      //               this.isLoading = false
      //           }
      //       })
      //   },
      //  handleProgress (e, file) {
    },
    handleSuccess (res, file, fun) {
      this.$message.success('导入成功')
      this.$emit('upload-success')

      if (this.$refs.table&&!fun) {
        this.$refs.table.reload()
      }
    },
    handleError (err, response, file) {
      if (response.message) {
        if(err && err.status === 401) { // 判断是否是超时或者账号别处登录
          this.$router.push("/login")
        }
        this.$message.error(response.message)
      } else {
        this.$message.error('导入失败')
      }
    },
  }
}
</script>
