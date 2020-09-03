import { Document, Model, model } from 'mongoose'
import eventsSchema from '../schemas/events'
import IEvents from '../interfaces/model/IEvents'

const Events: Model<IEvents & Document> = model<IEvents & Document>(
  'Events',
  eventsSchema
)

class eventsModel {
  public static count (option: IEvents) {
    return Events.count(option)
  }
  public static save (option: IEvents) {
    const m = new Events(option)
    return m.save()
  }
  public static delById (id: string) {
    return Events.deleteOne({
      _id: id
    })
  }
  public static updateById (id: string, option: IEvents) {
    return Events.updateOne(
      {
        _id: id
      },
      option
    )
  }
  public static findById (id: string) {
    return Events.findOne({
      _id: id
    })
  }
  public static findOne (option: IEvents) {
    return Events.findOne(option)
  }
  public static find (option: IEvents, page: number, size: number, projection: string,) {
    return Events.find(option, projection)
      .sort({ updateTime: -1 })
      .skip(size * (page - 1))
      .limit(size)
  }
}

export default eventsModel
