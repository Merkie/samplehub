import { IUserCreate, IUserExists, ISessionCreate, IUserMe, IUserLogin } from "~/types/api";

async function _post(route: string, body: object) {
    var response = await fetch(route, {
        method: 'POST',
        body: JSON.stringify(body)
    });

    return response.json();
}

// Checks if a user exists by email
export async function checkUserExistence(userEmail: string) {
    var checkUserExistenceObject: IUserExists = {
        email: userEmail
    };

    return await _post('/api/user/exists', checkUserExistenceObject);
}

// Creates a new user
export async function createUser(userEmail: string, userPassword: string) {
    var createUserObject: IUserCreate = {
        email: userEmail,
        password: userPassword
    };

    return await _post('/api/user/create', createUserObject);
};

// Returns the current user object associated with an access token
export async function me(access_token: string) {
    var meObject: IUserMe = {
        access_token: access_token
    };

    return await _post('/api/user/me', meObject);
}

export async function login(email: string, password: string) {
    var loginObject: IUserLogin = {
        email: email,
        password: password
    };

    return await _post('/api/user/login', loginObject);
}

// Creates a new session (access token, refresh token, etc)
export async function createSession(userId: string) {
    var createSessionObject: ISessionCreate = {
        userId: userId
    };

    return await _post('/api/session/create', createSessionObject);
}