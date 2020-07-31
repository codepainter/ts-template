import { Document, Model, model, Types, Schema, Query } from 'mongoose'

import { IUser, Gender } from '../entity'

export interface IUserDoc extends Document, IUser {}

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

export default model<IUserDoc>('User', schema)
