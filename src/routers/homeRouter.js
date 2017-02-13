// import Frame from './../views/Frame'
// export default {
//   path: '/',
//   component: Frame,
//   children: [{
//     path: 'leave',
//     meta: {
//       title: $util.titleLang('请假申请单', 'Leave Attendance'),
//       flow: 'hr/leave'
//     },
//     component: resolve => require(['./../views/hr/leave/LeaveCreate'], resolve)
//   }]
// }
function setTitleLang (zhStr, enStr) {
  return {
    zh: zhStr,
    en: enStr
  }
}

export default {
  path: '',
  meta: {
    title: setTitleLang('晚晴幽草轩', 'Nice Home Blog')
  },
  component: resolve => require(['./../views/Homepage'], resolve)
}
