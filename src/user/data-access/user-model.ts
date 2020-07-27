import { Document, Model, model, Types, Schema, Query } from 'mongoose'

enum Gender {
    Male = 'MALE',
    Female = 'FEMALE',
    Undisclosed = 'UNDISCLOSED'
}

export interface IUser {
    username: string
    email: string
    firstName: string
    lastName: string
    gender?: Gender
}

export interface IUserDoc extends Document, IUser {}

const schema: Schema = new Schema(
    {
        username: { type: String, default: '', index: true },
        email: { type: String, default: '', index: true },
        firstName: { type: String, required: true },
        lastName: { type: String, default: '' },
        password: { type: String, required: true },
        gender: { type: String, enum: Object.values(Gender), default: 'UNDISCLOSED', required: true }
    },
    {
        timestamps: true
    }
)

export default model<IUserDoc>('User', schema)
