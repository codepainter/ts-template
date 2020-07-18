export default function buildMakeUser ({}) {
  return function makeUser ({ username, firstname, lastname }) {
    return Object.freeze({
      payload: () => ({ username, firstname, lastname }),
      username: () => username,
      firstname: () => firstname,
      lastname: () => lastname,
      fullname: () => `${firstname} ${lastname}`
    })
  }
}
