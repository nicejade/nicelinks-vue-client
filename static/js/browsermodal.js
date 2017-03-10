let tpl = '' +
'<style type="text/css" scoped>' +
'body{' +
'  margin: 0;' +
'  padding: 0;' +
'}' +
'' +
'.modal-browser {' +
'  position: fixed;' +
'  width: 100%;' +
'  height: 100%;' +
'  display: none;' +
'}' +
'' +
'.modal-browser #browser-modal-cover {' +
'  position: fixed;' +
'  left: 0;' +
'  top: 0;' +
'  height: 100%;' +
'  width: 100%;' +
'  background-color: #111;' +
'  opacity: .5;' +
'  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";' +
'  filter: alpha(opacity=50);' +
'  z-index: -1;' +
'}' +
'' +
'.modal-browser .modal-dialog {' +
'  width: 100%;' +
'  position: fixed;' +
'  top: 0;' +
'  margin-top: 30px;' +
'  padding-top: 20px;' +
'}' +
'' +
'.modal-browser .modal-content {' +
'  width: 50%;' +
'  min-width: 600px;' +
'  padding-top: 60px;' +
'  padding-bottom: 80px;' +
'  margin: auto;' +
'  background-color: #fafafa;' +
'}' +
'' +
'.modal-browser .modal-content .index-header {' +
'  text-align: center;' +
'}' +
'' +
'.modal-browser .modal-content .jade-logo .logo-img{' +
'  display: block;' +
'  margin: 10px auto;' +
'  background-repeat: no-repeat;' +
'}' +
'' +
'.modal-browser .modal-content .h2-grey {' +
'  text-transform: uppercase;' +
'  text-align: center;' +
'}' +
'' +
'.modal-browser .modal-content p {' +
'  display: block;' +
'  margin-top: 60px;' +
'  margin-bottom: 60px;' +
'  text-align: center;' +
'}' +
'' +
'.modal-browser .modal-content .item-container {' +
'  width: 600px;' +
'  background-color: #fafafa;' +
'  margin: 40px auto;' +
'  height: 160px;' +
'}' +
'' +
'.modal-browser .modal-content .item-container .item {' +
'  float: left;' +
'  width: 150px;' +
'  padding-top: 20px;' +
'  padding-bottom: 20px;' +
'  margin-left: auto;' +
'  margin-right: auto;' +
'}' +
'' +
'.modal-browser .modal-content .item-container .item .pic {' +
'  width: 100px;' +
'  height: 100px;' +
'  margin: 0 auto;' +
'  background-repeat: no-repeat;' +
'}' +
'' +
'.modal-browser .modal-content .item-container .item .browser-link-a {' +
'  color: #44a8f2;' +
'  cursor: pointer;' +
'  display: block;' +
'}' +
'' +
'.modal-browser .modal-content .item-container .item .browser-link-a .browser-icon-img {' +
'  display: block;' +
'  width: 256px;' +
'  margin: 0 auto;' +
'  max-width: 100px;' +
'  width: 100px;' +
'  height: 100px;' +
'}' +
'' +
'.modal-browser .modal-content .item-container .item .browser-link-a h4 {' +
'  text-align: center;' +
'  margin-top: 20px;' +
'  font-size: 18px;' +
'  font-weight: 700;' +
'}' +
'</style>' +
'' +
'<div id="browser-modal" tabindex="-1" class="modal modal-browser modal-account">' +
'  <div id="browser-modal-cover" onclick=""></div>' +
'  <div class="modal-dialog">' +
'    <div class="modal-content">' +
'      <header class="text-center index-header">' +
'        <div class="jade-logo"><div class="pic"><img class="logo-img" src="/static/modal/logo.png"></div></div>' +
'        <h3 class="h2-grey">Please upgrade browser version</h3>' +
'        <p>You are using an older version of the browser. Upgrade your browser to get a better experience.</p>' +
'      </header>' +
'      <div class="modal-body">' +
'        <div class="item-container">' +
'          <div class="item">' +
'            <a class="browser-link-a" href="http://www.google.com/chrome" target="_blank">' +
'              <div class="pic">' +
'                <img class="browser-icon-img" src="/static/modal/chrome-d23b7c037c9c8ac731117d93c1e90d6d.jpg">' +
'              </div>' +
'              <h4>Chrome</h4></a>' +
'          </div>' +
'          <div class="item">' +
'            <a class="browser-link-a" href="http://www.firefox.com/" target="_blank">' +
'              <div class="pic">' +
'                <img class="browser-icon-img" src="/static/modal/firefox-17e96a20da2c3e1370d3b52f2b24a3fd.jpg">' +
'              </div>' +
'              <h4>Firefox</h4></a>' +
'          </div>' +
'          <div class="item">' +
'            <a class="browser-link-a" href="http://www.apple.com/safari/" target="_blank">' +
'              <div class="pic">' +
'                <img class="browser-icon-img" src="/static/modal/safari-ae900d6c60a68cc580b6948bd4ce46e9.jpg">' +
'              </div>' +
'              <h4>Safari</h4></a>' +
'          </div>' +
'          <div class="item">' +
'            <a class="browser-link-a" href="https://www.microsoft.com/en-us/windows/microsoft-edge" target="_blank">' +
'              <div class="pic">' +
'                <img class="browser-icon-img" src="/static/modal/edge-64dd3b586d18984d250c93fd994c491b.jpg">' +
'              </div>' +
'              <h4>Edge</h4></a>' +
'          </div>' +
'        </div>' +
'      </div>' +
'    </div>' +
'  </div>' +
'</div>';

(function () {
  var isIE = navigator.userAgent.toLocaleLowerCase().indexOf('msie') !== -1
  var isIE10plus = isIE && (function () {
    'use strict'
    return !this
  }())

  if (isIE && !isIE10plus) {
    var browserModal = document.createElement('div')
    browserModal.innerHTML = tpl
    document.body.appendChild(browserModal)
    document.getElementById('browser-modal').style.display = 'block'

    document.getElementById('browser-modal-cover').onclick = function () {
      document.getElementById('browser-modal').style.display = 'none'
    }
  }
})()
