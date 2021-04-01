import utils from './utils'
import getQueryString from '@/utils/getCookies'
import request from '@/utils/axios'
import { message } from 'antd'

const getCookies = getQueryString.getCookie

let targetURL = window.location.href

if (localStorage.getItem('username') != null) {
  utils.setcookie('username', localStorage.getItem('username'))
}

if (getCookies('username') == null) {
  let sid = getParamValue('sid')
  let uri = '/case/getUserInfoBySid'

  function testGet() {
    return request(uri, { method: 'GET', params: { sid: sid } })
  }
  testGet().then(res => {
    if (res.code === 200) {
      message.success('登录成功: ' + res.data.display)
      utils.setcookie('username', encodeURI(res.data.display))
      localStorage.setItem('username', encodeURI(res.data.display))
    } else {
      window.location = 'https://login.ops.qihoo.net:4430/sec/login?ref=' + targetURL
    }
  })
}



if (localStorage.getItem('username') != null) {
  utils.setcookie('username', localStorage.getItem('username'))
}

// 获取参数值
function getParamValue(queryName) {
  let query = decodeURI(window.location.search.substring(1))
  let vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=')
    if (pair[0] == queryName) {
      return pair[1]
    }
  }
  return null
}

export const dva = {
  config: {
    onError(err) {
      err.preventDefault()
      // eslint-disable-next-line
      console.error(err.message);
    },
  },
}
