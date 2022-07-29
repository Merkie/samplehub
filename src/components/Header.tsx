// Solid
import { Link } from "solid-app-router";
import { Component, Show } from "solid-js";

// Styles
import './styles/Header.css';

import { store, setStore } from "../root";
import { me } from "~/lib/api";

import { IUser } from "~/types/api";

import { isAuthorized, setAuthorized, setCurrentUser } from "~/routes/index";

/*
    Header is responsible for authenticating the user.
    Eg, all routes that use the <Header /> component
    will have automatic authentication.
*/
async function checkSession(callback) {
    if(store.session) {
        var user: IUser = await me(store.session);
        if(user.email) {
            callback(true, user);
        } else {
            callback(false, null);
            setStore('session', ''); // Clear session if access token is invalid
        }
    }
    return false;
}

const Header: Component = () => {

    checkSession((isAuthorized: boolean, user: IUser) => {
        setAuthorized(isAuthorized);
        setCurrentUser(user);
    });

    return (
        <header>
            <div class="header-inner">
                <Link class="brand" href="/">
                    <b>Sample<span>Hub</span></b>
                </Link>
                <div class="header-items">
                    <Show when={!isAuthorized()}>
                        <Link href="/login" class="login-btn">
                            <p>Login</p>
                        </Link>
                        <Link href="/signup">
                            <button class="signup-btn">Sign up</button>
                        </Link>
                    </Show>
                </div>
            </div>
        </header>
    );
}

export default Header;