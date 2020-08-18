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

interface BuildMakeUserDeps {
    validate: {
        isEmail(email: string): Boolean
    }
}

export interface MakeUserObject {
    payload(): {
        username: string
        email: string
        firstname: string
        lastname: string
        gender: string
    }
    username(): string
    email(): string
    firstname(): string
    lastname(): string
    gender(): string
    fullname(): string
}

export default function buildMakeUser ({ validate }: BuildMakeUserDeps): CallableFunction {
    return function makeUser ({
        username = null,
        email = null,
        firstname = null,
        lastname = null,
        gender = null
    }: makeUserParameters): MakeUserObject {
        if (username === null) throw new Error('Username needed')
        if (!validate.isEmail(email)) throw new Error('Email not valid')
        if (!firstname === null) throw new Error('Firstname not valid')
        if (!lastname === null) throw new Error('Lastname not valid')
        if (!gender === null) {
            gender = Gender.Undisclosed
        }
        if (!Object.values(Gender).includes(gender)) throw new Error('Gender is not valid')
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
