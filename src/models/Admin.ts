import { Document, Model, model } from 'mongoose'
import adminSchema from '../schemas/admin'
import IAdmin from '../interfaces/model/IAdmin'

const Admin: Model<IAdmin & Document> = model<IAdmin & Document>(
  'admin',
  adminSchema
)

class adminModel {
  public static count (option: IAdmin) {
    return Admin.count(option)
  }
  public static save (option: IAdmin) {
    const m = new Admin(option)
    return m.save()
  }
  public static delById (id: string) {
    return Admin.deleteOne({
      _id: id
    })
  }
  public static updateById (id: string, option: IAdmin) {
    return Admin.findByIdAndUpdate(
      {
        _id: id
      },
      option
    )
  }
  public static findById (id: string) {
    return Admin.findOne({
      _id: id
    })
  }
  public static findOne (option: IAdmin) {
    return Admin.findOne(option)
  }
  public static find (option: IAdmin, page: number, size: number, projection: string, ) {
    return Admin.find(option, projection)
      .sort({ updateTime: -1 })
      .skip(size * (page - 1))
      .limit(size)
  }
}

export default adminModel
