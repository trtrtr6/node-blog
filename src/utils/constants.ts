interface ResponseStatusInfo {
  readonly code: number
  msg: string
}

interface ResponseStatusMap {
  SUCCESS: ResponseStatusInfo
  ERROR: ResponseStatusInfo
  AUTH_ERROR: ResponseStatusInfo
}

export const RES_INFO: ResponseStatusMap = {
  SUCCESS: {
    code: 1,
    msg: '成功'
  },
  ERROR: {
    code: 0,
    msg: '请求异常'
  },
  AUTH_ERROR: {
    code: 401,
    msg: '请先登录'
  }
}
