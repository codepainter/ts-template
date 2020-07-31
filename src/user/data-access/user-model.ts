import { Document, Model, model, Types, Schema, Query } from 'mongoose'

import { makeUserParameters, Gender } from '../entity'

const schema: Schema = new Schema(
    {
        username: { type: String, default: '', index: true },
        email: { type: String, default: '', index: true },
        firstname: { type: String, required: true },
        lastname: { type: String, default: '' },
        password: { type: String, required: true },
        gender: { type: String, enum: Object.values(Gender), default: 'UNDISCLOSED', required: true }
    },
    {
        timestamps: true
    }
)

// DO NOT export this
interface IUserSchema extends Document {}

// DO NOT export
interface IUserBase extends IUserSchema {}

// Export this for strong typing
export interface IUser extends IUserBase {}

// For model
export interface IUserModel extends Model<IUser> {}

export interface EUser extends makeUserParameters {}

export default model<IUser, IUserModel>('User', schema)
