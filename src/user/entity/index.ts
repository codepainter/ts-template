import validator from 'validator'

import buildMakeUser, { IUser, Gender } from './user'

const validate = Object.freeze({
    isEmail
})

const makeUser = buildMakeUser({ validate })

export default makeUser
export { IUser, Gender }

// FUNCTIONS
function isEmail (email: string): boolean {
    return validator.isEmail(email)
}
