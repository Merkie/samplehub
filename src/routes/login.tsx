// Solid
import { Link } from "solid-app-router"; // Link between pages in app

// Styles
import "./styles/index.css"; // Common CSS
import "./styles/signup-login.css"; // Page CSS

import { createSession, login } from "~/lib/api";

import { setStore } from "~/root";

export default function Login() {

    let emailRef: HTMLInputElement;
    let passwordRef: HTMLInputElement;

    async function submitLogin() {
        const email = emailRef.value;
        const password = passwordRef.value;

        // API response
        const response = await login(email, password);

        // If login was successful, set session and redirect to home page
        if(!response.error) {
            setStore("session", response.session.access_token);
            window.location.assign('/');
        }
    }

	return (
		<main class="signup">
            <Link href="/"><b class="brand">S<span>H</span></b></Link>
            <p class="signin-message">Log in to your SampleHub account</p>
            <div class="signup-form surface">
                <p>Email address</p>
                <input ref={emailRef} type="text" />
                <p>Password</p>
                <input ref={passwordRef} type="password" />
                <button onClick={submitLogin} >Log in</button>
            </div>
            <Link href="/signup"><p class="link">Dont have an account?</p></Link>
        </main>
	);
}
