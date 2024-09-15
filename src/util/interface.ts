
export interface IUser {
    _id: string | undefined,
    profile: Iimg,
    username:{
        firstName: string,
        middleName?: string,
        lastName: string,
    },
    contact: string,
    course: string,
    role: string ,
    password: string | undefined,
    status: StatusType
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
    base64: string
}

export interface UserAttendance {
    loginType: string
    _id: string | undefined,
    user: IUser,
    timeInImg: Iimg,
    timeOutImg: Iimg,
    date: Date
    timeIn: Date,
    timeOut: Date,
}