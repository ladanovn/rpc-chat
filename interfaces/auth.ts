interface IAuthParams {
    login: string,
    passwort: string,
}

interface IAuthResult {
    id: number,
}

export {
    IAuthResult,
    IAuthParams
}