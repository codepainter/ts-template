import { Types } from 'mongoose'

export enum Gender {
    Male = 'MALE',
    Female = 'FEMALE',
    Undisclosed = 'UNDISCLOSED'
}

export interface makeUserParameters {
    username: string
    email: string
    firstname: string
    lastname: string
    gender?: Gender
}

interface IBuildDependencies {
    validate: {
        isEmail(email: string): Boolean
    }
}

export default function buildMakeUser ({ validate }: IBuildDependencies): CallableFunction {
    return function makeUser ({ username, email, firstname, lastname, gender }: makeUserParameters): Object {
        if (!username) {
            throw new Error('Username needed')
        }
        if (!validate.isEmail(email)) {
            throw new Error('Email not valid')
        }
        if (!firstname) {
            throw new Error('Firstname not valid')
        }
        if (!lastname) {
            throw new Error('Lastname not valid')
        }
        if (!gender) {
            gender = Gender.Undisclosed
        }
        if (!Object.values(Gender).includes(gender)) {
            throw new Error('Gender is not valid')
        }
        return Object.freeze({
            payload: () => ({ username, email, firstname, lastname, gender }),
            username: () => username,
            email: () => email,
            firstname: () => firstname,
            lastname: () => lastname,
            gender: () => gender,
            fullname: () => `${firstname} ${lastname}`
        })
    }
}
