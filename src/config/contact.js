import { REDIRECT_PATH } from './constant'

export default [
  {
    path: `${REDIRECT_PATH}https://weibo.com/`,
    name: 'jeffjade',
    class: 'weibo',
    title: '微博',
  },
  {
    path: `${REDIRECT_PATH}https://github.com/`,
    name: 'nicejade',
    class: 'github',
    title: 'Github',
  },
  {
    path: `${REDIRECT_PATH}https://www.jeffjade.com/`,
    name: 'about-me',
    class: 'blog',
    title: '晚晴幽草轩',
  },
  {
    path: `${REDIRECT_PATH}https://www.jianshu.com/u/`,
    name: '9aae3d8f4c3d',
    class: 'jianshu',
    title: '简书',
  },
  {
    path: `${REDIRECT_PATH}https://twitter.com/`,
    name: 'nicejadeyang',
    class: 'twitter',
    title: 'Twitter',
    notInMobile: true,
  },
  {
    path: `${REDIRECT_PATH}https://www.facebook.com/`,
    name: 'nice.jade.yang',
    class: 'facebook',
    title: 'Facebook',
    notInMobile: true,
  },
  {
    path: 'mailto:',
    name: 'yunjeff#163.com',
    class: 'email',
    title: '邮件',
    notInMobile: true,
  },
]
