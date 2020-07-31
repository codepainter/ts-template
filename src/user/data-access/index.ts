import User from './user-model'
import makeUserQuery from './user-query'

const UserQuery = makeUserQuery({ User })

export default UserQuery
