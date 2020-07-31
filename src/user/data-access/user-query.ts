import debug from 'debug'
const log = debug('query:user')

import { Types, Query, Model } from 'mongoose'
import { DUser, DUserModel as _DUserModel, EUser } from './user-model'

interface QueryDependencies {
    User: Model<DUser>
}

export default function makeUserQuery ({ User }: QueryDependencies) {
    log('User:', User)
    return {
        create,
        findByUserId,
        findByUsername
    }

    interface QUserResult extends EUser {
        _id: Types.ObjectId
        id: string
        createdAt: string
        updatedAt: string
    }

    function deconstruct (obj: QUserResult): QUserResult {
        const { _id, ...info } = obj
        log('deconstruct:', { _id, ...info })
        return { id: _id.toString(), ...info, _id }
    }

    async function create (userInfo: DUser): Promise<QUserResult> {
        log('create:', userInfo)
        const created = await User.create(userInfo)
        return deconstruct(created.toObject())
    }

    interface IFindOneQuery {
        _id?: string
        username?: string
    }

    function findOne (query: IFindOneQuery): Query<QUserResult> {
        log('findOne:', query)
        return User.findOne(query).lean()
    }

    async function findByUserId ({ userId }: { userId: string }): Promise<QUserResult> {
        log('findByUserId:', userId)
        const found = await findOne({ _id: userId })
        return deconstruct(found)
    }

    async function findByUsername ({ username }: { username: string }): Promise<QUserResult> {
        log('findByUsername:', username)
        const found = await findOne({ username })
        return deconstruct(found)
    }
}
