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
export interface DUser extends IUserBase {}

// For model
export interface DUserModel extends Model<DUser> {}

export interface EUser extends makeUserParameters {}

export default model<DUser, DUserModel>('User', schema)
