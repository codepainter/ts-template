import validator from 'validator'

import buildMakeUser, { makeUserParameters, Gender } from './user'

const validate = Object.freeze({
    isEmail
})

const makeUser = buildMakeUser({ validate })

export default makeUser
export { makeUserParameters, Gender }

// FUNCTIONS
function isEmail (email: string): boolean {
    return validator.isEmail(email)
}
