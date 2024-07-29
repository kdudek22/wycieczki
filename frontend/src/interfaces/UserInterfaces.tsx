export enum UserGroup{
    user,
    admin
}

export interface User{
    email: string
    group: UserGroup
}