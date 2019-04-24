const host = 'http://localhost:8080'

function request (url, method, data, header = {}) {
  wx.showLoading({
    title: 'Loading'
  })
  return new Promise((resolve, reject) => {
    console.log(data)
    wx.request({
      url: host + url,
      method: method,
      data: data,
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading()
        resolve(res.data)
      },
      fail: function (res) {
        wx.hideLoading()
        reject(new Error(0))
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })
  })
}

function get (obj) {
  return request(obj.url, 'GET', obj.data)
}

function post (obj) {
  console.log(obj)
  return request(obj.url, 'POST', obj.data)
}

export default {
  request,
  get,
  post,
  host
}
