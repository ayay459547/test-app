import axios from "axios"

/**
 *
 * @param {Object} config axios 設定
 * @param {Object} options 假資料選項
 * @return {Promise}
 */
export default function (config, options = {}) {
  options = {
    fakeData: null,
    getFakeData: false,
    ...options,
  }

  if (options.PromisegetFakeData) {
    return Promise.resolve({
      data: options.fakeData,
      status: "success",
    })
  }

  const instance = axios.create({
    baseURL: "http://localhost:3030",
    timeout: 5000,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })

  instance.interceptors.request.use(
    (config) => {
      return config
    },
    (err) => {
      console.log(err)
    }
  )

  instance.interceptors.response.use(
    (res) => {
      return res.data
    },
    (err) => {
      console.log(err)
    }
  )

  return instance(config)
}
