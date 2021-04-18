export interface UserInfoData {
    id: number,
    firstName: string;
    lastName: string;
    age: string;
    gender: string;
    interests: string;
    city: string;
    email: string;
}

export interface RegisterUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    age: string;
    gender: string;
    interests: string;
    city: string;
    token: string;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface User {
    email: string;
    token: string;
    firstName: string;
    lastName: string;
    age: string;
    gender: string;
    interests: string;
    city: string;
}

