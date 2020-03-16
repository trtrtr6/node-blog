module.exports = {
    getPageInfo: (count, page = 1, size = 10) => {
        return {
            pageCount: Number((count + size - 1) / size),
            total: count,
            page,
            size
        };
    },
    getPage: page => {
        return parseInt(page) || 1;
    },
    getSize: size => {
        return parseInt(size) || 10;
    }
};
