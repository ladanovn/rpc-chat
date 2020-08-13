interface IAuthParams {
    login: string,
    passport: string,
}

interface IAuthResult {
    id: number,
}

export {
    IAuthResult,
    IAuthParams
}