export type TSignup = {
    id: number
    firstName: string
    lastName: string
    password: string
    email: string
    avatarUrl?: string
}

export type TSignin = {
    email: string
    password: string
}

export type TUser = {
    id: number
    firstName: string
    lastName: string
    email: string
    avatarUrl: string
}