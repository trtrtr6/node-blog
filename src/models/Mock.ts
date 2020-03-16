import { Document, Model, model } from 'mongoose'
import mockSchema from '../schemas/mock'
import IMock from '../interfaces/model/IMock'

const Mock: Model<IMock & Document> = model<IMock & Document>(
  'Mock',
  mockSchema
)

class mockModel {
  public static count(option: IMock) {
    return Mock.count(option)
  }
  public static save(option: IMock) {
    const m = new Mock(option)
    return m.save()
  }
  public static delById(id: string) {
    return Mock.deleteOne({
      _id: id
    })
  }
  public static updateById(id: string, option: IMock) {
    return Mock.findByIdAndUpdate(
      {
        _id: id
      },
      option
    )
  }
  public static findById(id: string) {
    return Mock.findOne({
      _id: id
    })
  }
  public static findOne(option: IMock) {
    return Mock.findOne(option)
  }
  public static find(option: IMock, page: number, size: number) {
    return Mock.find(option)
      .sort({ updateTime: -1 })
      .skip(size * (page - 1))
      .limit(size)
  }
}

export default mockModel
