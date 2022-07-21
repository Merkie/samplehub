// Solid
import { createSignal, Show } from "solid-js";
import { Link } from "solid-app-router";

// Password strength checker
import { passwordStrength } from "check-password-strength";

// Styles
import "./styles/index.css";
import "./styles/signuplogin.css";

export default function Signup() {
	const [pwordStrength, setPwordStrength] = createSignal("");
    const [pwordMessageColor, setPwordMessageColor] = createSignal("#EC9A3C");

	function checkPasswordStrength(e: Event) {
		const userPassword: string = (e.target as HTMLInputElement).value;
        const strength: string = passwordStrength(userPassword).value;
        if(strength == "Strong") {
            setPwordMessageColor('#32A467');
        } else {
            setPwordMessageColor('#EC9A3C');
        }
		setPwordStrength(strength);
	}

	return (
		<main class="signup">
			<Link href="/">
				<b class="brand">
					S<span>H</span>
				</b>
			</Link>
			<p class="signin-message">Create a SampleHub account</p>
			<div class="signup-form surface">
				<p>Email address</p>
				<input type="text" />
				<p>Password</p>
				<Show when={pwordStrength().length > 1}>
					<small>Password strength: <span style={{color: pwordMessageColor()}}>{pwordStrength()}</span></small>
				</Show>
				<input value="" onInput={checkPasswordStrength} type="password" />
				<p>Repeat Password</p>
				<input type="password" />
				<button>Sign up</button>
			</div>
			<Link href="/login">
				<p class="link">Already have an account?</p>
			</Link>
		</main>
	);
}
