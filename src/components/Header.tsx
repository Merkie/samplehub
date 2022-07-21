// Solid
import { Link } from "solid-app-router";
import { Component } from "solid-js";

// Styles
import './styles/Header.css';

const Header: Component = () => {
    return (
        <header>
            <div class="header-inner">
                <Link class="brand" href="/">
                    <b>Sample<span>Hub</span></b>
                </Link>
                <div class="header-items">
                    <Link href="/login" class="login-btn">
                        <p>Login</p>
                    </Link>
                    <Link href="/signup">
                        <button class="signup-btn">Sign up</button>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;