export default {
  getPageInfo: (count: number, page = 1, size = 10) => {
    return {
      pageCount: Math.floor((count + size - 1) / size),
      total: count,
      page,
      size
    }
  },
  getPage: (page: number) => {
    return page || 1
  },
  getSize: (size: number) => {
    return size || 10
  }
}
