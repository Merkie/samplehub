// Solid
import { createSignal } from "solid-js";
import { Link } from "solid-app-router";

// Styles
import "./styles/index.css";
import "./styles/signuplogin.css";

export default function Login() {
	return (
		<main class="signup">
            <Link href="/"><b class="brand">S<span>H</span></b></Link>
            <p class="signin-message">Log in to your SampleHub account</p>
            <div class="signup-form surface">
                <p>Email address</p>
                <input type="text" />
                <p>Password</p>
                <input type="password" />
                <button>Log in</button>
            </div>
            <Link href="/signup"><p class="link">Dont have an account?</p></Link>
        </main>
	);
}
