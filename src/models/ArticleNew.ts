import { Document, Model, model } from 'mongoose'
import articleSchema from '../schemas/article'
import IArticle from '../interfaces/model/IArticle'

const Article: Model<IArticle & Document> = model<IArticle & Document>(
  'Article',
  articleSchema
)

export default class articleModel {
  public static count (option: any) {
    return Article.count(option)
  }
  public static save (option: IArticle) {
    const a = new Article(option)
    return a.save()
  }
  public static delById (id: string) {
    return Article.deleteOne({ _id: id })
  }
  public static updateById (id: string, option: IArticle) {
    return Article.findByIdAndUpdate(
      {
        _id: id
      },
      option
    )
  }
  public static findById (id: string) {
    return Article.findOne({ _id: id }, { del: 0 })
      .populate('_user', 'username _id')
      .populate({
        path: '_comments',
        options: { sort: { _id: -1 } },
        populate: [
          {
            path: '_user',
            select: 'username _id'
          },
          {
            path: '_responses',
            populate: {
              path: '_user',
              select: 'username _id'
            }
          }
        ]
      })
  }
  public static findOne (option: IArticle) {
    return Article.findOne(option, { del: 0 })
      .populate('_user', 'username _id')
      .populate({
        path: '_comments',
        options: { sort: { _id: -1 } },
        populate: [
          {
            path: '_user',
            select: 'username _id'
          },
          {
            path: '_responses',
            populate: {
              path: '_user',
              select: 'username _id'
            }
          }
        ]
      })
  }
  public static find (option: any, page: number, size: number) {
    return Article.find(option, { del: 0, _comments: 0 })
      .populate('_user', 'username _id')
      .sort({ _id: -1 })
      .skip(size * (page - 1))
      .limit(size)
  }
}
