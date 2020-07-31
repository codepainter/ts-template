import debug from 'debug'
const log = debug('query:user')
import { Types, Query } from 'mongoose'

import User from './user-model'
import { IUser } from '../entity'

export default Object.freeze({
    create,
    findByUserId
})

interface IUserExt extends IUser {
    _id?: Types.ObjectId
    id?: string
}

function deconstruct (obj: IUserExt): IUserExt {
    const { _id, ...info } = obj
    log('deconstruct:', { _id, ...info })
    return { id: _id.toString(), ...info, _id }
}

async function create (userInfo: IUser): Promise<IUserExt> {
    log('create:', userInfo)
    const created = await User.create(userInfo)
    return deconstruct(created.toObject())
}

interface IFindOneQuery {
    _id?: string
    username?: string
}

function findOne (query: IFindOneQuery): Query<IUserExt> {
    log('findOne:', query)
    return User.findOne(query).lean<IUser>()
}

async function findByUserId ({ userId }: { userId: string }): Promise<IUserExt> {
    log('findByUserId:', userId)
    const found = await findOne({ _id: userId })
    return deconstruct(found)
}
