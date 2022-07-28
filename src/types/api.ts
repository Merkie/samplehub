/*
    --- API Types ---
    This file contains types needed to interface with the API portion of the app.    
*/

export interface IUserCreate {
    email: string;
    password: string;
}

export interface IUserExists {
    email: string;
}

export interface IUserMe {
    access_token: string;
}

export interface ISessionCreate {
    userId: string;
}