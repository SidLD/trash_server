
export interface IUser {
    _id: string | undefined,
    profile?: Iimg,
    username:string,
    firstName: string,
    middleName?: string,
    lastName: string,
    email: string,
    role: 'ADMIN' | 'CONTRIBUTOR',
    password: string,
    status: 'PENDING' | 'APPROVED' | 'DECLINED'
}

export interface Iimg {
    _id: string | undefined,
    user: IUser,
    path: string,
    name: string,
    imageType: string
    fullPath: string,
}
