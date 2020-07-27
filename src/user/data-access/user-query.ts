// import { CreateQuery } from 'mongoose'
import debug from 'debug'
const log = debug('query:user')

import { DocumentQuery, Types } from 'mongoose'
import User, { IUser, IUserDoc } from './user-model'

export default Object.freeze({
    create,
    findByUserId
})

interface IUserDeconstructed extends IUser {
    id: string
    _id: Types.ObjectId
}

function deconstruct (obj: IUserDoc): IUserDeconstructed {
    const { _id, ...info } = obj
    log('deconstruct:', { _id, ...info })
    return { id: _id.toString(), ...info, _id }
}

async function create (userInfo: IUser): Promise<IUserDeconstructed> {
    log('create:', userInfo)
    const created = await User.create(userInfo)
    return deconstruct(created.toObject())
}

interface IFindOne {
    _id?: string
    username?: string
}

function findOne (query: IFindOne): DocumentQuery<IUserDoc, IUserDoc, {}> {
    log('findOne:', query)
    return User.findOne(query)
}

interface IFindByUserId {
    userId: string
}

async function findByUserId ({ userId }: IFindByUserId): Promise<IUserDeconstructed> {
    log('findByUserId:', userId)
    const found = await findOne({ _id: userId })
    return deconstruct(found)
}
