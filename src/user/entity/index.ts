import validator from 'validator'

import buildMakeUser, { makeUserParameters, Gender, MakeUserObject } from './user'

const validate = Object.freeze({
    isEmail
})

const makeUser = buildMakeUser({ validate })

export default makeUser
export { makeUserParameters, Gender, MakeUserObject }

// FUNCTIONS
function isEmail (email: string): boolean {
    return validator.isEmail(email)
}
