/**
 * system, username, events, sign
 * @typedef ResCommon
 * @property {number} code - 状态码
 * @property {object} data - 数据
 * @property {string} msg - 响应信息
 */

/**
 * system, username, events, sign
 * @typedef ResErrorCommon
 * @property {number} code - 状态码
 * @property {object} data - 数据
 * @property {string} msg - 响应信息
 */

/**
 * @typedef VoLoginUser
 * @property {string} username.required - 用户名 - eg: trtrtr6
 * @property {string} password.required - 密码 - eg: 123456
 */

/**
 * system, username, events, sign
 * @typedef VoEvent
 * @property {string} system.required - 系统信息 - eg: Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1
 * @property {string} username.required - 用户名 - eg: trtrtr6
 * @property {string[]} events.required - 事件列表
 * @property {string} sign.required - 签名（唯一标识）
 */

/**
 * system, username, events, sign
 * @typedef ResVoEvent
 * @property {number} code - 状态码
 * @property {VoEvent.model} data - 数据
 * @property {string} msg - 响应信息
 */

/**
 * @typedef Article
 * @property {string} _id - 文章ID
 * @property {string} title - 文章标题
 * @property {string} summary - 文章摘要
 * @property {string} author - 作者
 * @property {string} createTime - 创建时间
 * @property {string} updateTime - 更新时间
 */

/**
 * @typedef ArticleDetail
 * @property {string} _id - 文章ID
 * @property {string} title - 文章标题
 * @property {string} content - 文章内容
 * @property {string} author - 作者
 * @property {string} createTime - 创建时间
 * @property {string} updateTime - 更新时间
 */

/**
 * @typedef Pagination
 * @property {number} page - 当前页码
 * @property {number} size - 每页数量
 * @property {number} total - 总数量
 * @property {number} totalPages - 总页数
 */

/**
 * @typedef ArticleListData
 * @property {Article[]} article_list - 文章列表
 * @property {Pagination.model} pagination - 分页信息
 */

/**
 * @typedef ArticleDetailData
 * @property {ArticleDetail.model} article - 文章详情
 */

/**
 * @typedef ResArticleList
 * @property {number} code - 状态码
 * @property {ArticleListData.model} data - 文章列表数据
 * @property {string} msg - 响应信息
 */

/**
 * @typedef ResArticleDetail
 * @property {number} code - 状态码
 * @property {ArticleDetailData.model} data - 文章详情数据
 * @property {string} msg - 响应信息
 */
