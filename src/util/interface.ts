
export interface IUser {
    _id: string | undefined,
    profile?: Iimg,
    username:string,
    firstName: string,
    middleName?: string,
    lastName: string,
    email: string,
    role: RoleType ,
    password: string,
    status: StatusType
}

export enum RoleType {
    ADMIN = 'ADMIN',
    CONTRIBUTOR = 'CONTRIBUTOR',
}

export enum StatusType {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    DECLINED = 'DECLINED'
}

export interface Iimg {
    _id: string | undefined,
    user: IUser,
    path: string,
    name: string,
    imageType: string
    fullPath: string,
}
