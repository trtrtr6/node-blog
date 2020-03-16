import { Document, model } from 'mongoose'
import userSchema from '../schemas/user'
import IUser from '../interfaces/model/IUser'
interface IUserModel extends IUser, Document {}

export default model<IUserModel>('User', userSchema)
