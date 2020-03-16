export default {
  getPageInfo: (count: number, page = 1, size = 10) => {
    return {
      pageCount: Number((count + size - 1) / size),
      total: count,
      page,
      size
    }
  },
  getPage: (page: number) => {
    return Number(page) || 1
  },
  getSize: (size: number) => {
    return Number(size) || 10
  }
}
