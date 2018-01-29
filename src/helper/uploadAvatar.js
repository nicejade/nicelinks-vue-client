export default {
  /**
   * database64文件格式转换为2进制
   *
   * @param  {[String]} data dataURL 的格式为 “data:image/png;base64,****”,逗号之前都是一些说明性的文字，我们只需要逗号之后的就行了
   * @param  {[String]} mime [description]
   * @return {[blob]}      [description]
   */
  /**
 * dataURL to blob, ref to https://gist.github.com/fupslot/5015897
 * @param dataURI
 * @returns {Blob}
 */
  dataURItoBlob (dataURI) {
    var byteString = atob(dataURI.split(',')[1])
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length)
    var ia = new Uint8Array(ab)
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    console.log(mimeString)
    return new Blob([ab], {type: mimeString})
  },

  getLangConf () {
    return {
      zh: {
        hint: '点击，或拖动图片至此处',
        loading: '正在上传……',
        noSupported: '浏览器不支持该功能，请使用IE10以上或其他现在浏览器！',
        success: '上传成功',
        fail: '图片上传失败',
        preview: '头像预览',
        btn: {
          off: '取消',
          close: '关闭',
          back: '上一步',
          save: '保存'
        },
        error: {
          onlyImg: '仅限图片格式',
          outOfSize: '单文件大小不能超过 ',
          lowestPx: '图片最低像素为（宽*高）：'
        }
      },
      en: {
        hint: 'Click or drag the file here to upload',
        loading: 'Uploading…',
        noSupported: 'Browser is not supported, please use IE10+ or other browsers',
        success: 'Upload success',
        fail: 'Upload failed',
        preview: 'Preview',
        btn: {
          off: 'Cancel',
          close: 'Close',
          back: 'Back',
          save: 'Save'
        },
        error: {
          onlyImg: 'Image only',
          outOfSize: 'Image exceeds size limit: ',
          lowestPx: `Image's size is too low. Expected at least: `
        }
      }
    }
  },

  /**
   * 点击波纹效果
   *
   * @param  {[event]} e        [description]
   * @param  {[Object]} argOpts [description]
   * @return {[bollean]}          [description]
   */
  effectRipple (e, argOpts) {
    var opts = Object.assign({
      ele: e.target, // 波纹作用元素
      type: 'hit', // hit点击位置扩散,center中心点扩展
      bgc: 'rgba(0, 0, 0, 0.15)' // 波纹颜色
    }, argOpts)
    var target = opts.ele
    if (target) {
      let rect = target.getBoundingClientRect()
      let ripple = target.querySelector('.e-ripple')
      if (!ripple) {
        ripple = document.createElement('span')
        ripple.className = 'e-ripple'
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'
        target.appendChild(ripple)
      } else {
        ripple.className = 'e-ripple'
      }
      switch (opts.type) {
        case 'center':
          ripple.style.top = (rect.height / 2 - ripple.offsetHeight / 2) + 'px'
          ripple.style.left = (rect.width / 2 - ripple.offsetWidth / 2) + 'px'
          break
        default:
          ripple.style.top = (e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop) + 'px'
          ripple.style.left = (e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft) + 'px'
      }
      ripple.style.backgroundColor = opts.bgc
      ripple.className = 'e-ripple z-active'
      return false
    }
  }
}
