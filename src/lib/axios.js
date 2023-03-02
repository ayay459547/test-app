import axios from "axios"

/**
 *
 * @param {Object} config axios 設定
 * @param {Object} options 假資料選項
 * @return {Promise}
 */
export default function (config, options = {}) {
  const tempOptions = {
    fakeData: null,
    getFakeData: false,
    ...options,
  }
  const { fakeData, getFakeData } = tempOptions
  if (
    process.env.VUE_APP_CONNECT_API === 'false' &&
    getFakeData
  ) {
    return Promise.resolve(fakeData)
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
