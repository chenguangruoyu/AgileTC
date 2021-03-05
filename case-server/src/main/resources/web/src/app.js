import utils from './utils'
import getQueryString from '@/utils/getCookies'
import request from '@/utils/axios'
import { message } from 'antd'

const getCookies = getQueryString.getCookie

// 从Cookies中获取设置的用户名
// 若未获取到用户名，认为未登录跳转到奇虎登录页面。
if (getCookies('username') == null) {
  window.location =
    // 'https://login.ops.qihoo.net:4430/sec/login?ref=http://10.142.114.39:8094/case/caseList/1'
    'https://login.ops.qihoo.net:4430/sec/login?ref=http://localhost:8094/case/caseList/1'
}

// 从登录页面跳转回，读取URL参数sid的值。
let sidValue = window.location.search
let urlpara = sidValue.substring(1, sidValue.length)
let sid = urlpara.split('&')[0].split('=')[1]

// todo 无sid参数时会导致页面无法打开，此处逻辑待优化
if (sidValue.search('sid') == -1) {
  throw SyntaxError()
}

// let url = 'http://10.142.114.39:8094/api/case/getUserInfoBySid'
let url = 'http://localhost:8094/api/case/getUserInfoBySid'

function testGet() {
  return request(url, { method: 'GET', params: { sid: sid } })
}
testGet().then(res => {
  if (res.code === 200) {
    message.success('data: ' + res.data.display)
    utils.setcookie('username', encodeURI(res.data.display))
  }
})

utils.setcookie('username', 'user')
export const dva = {
  config: {
    onError(err) {
      err.preventDefault()
      // eslint-disable-next-line
      console.error(err.message);
    },
  },
}
