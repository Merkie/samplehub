// Solid
import { createSignal, Show } from "solid-js";
import { Link } from "solid-app-router";

// Password strength checker
import { passwordStrength } from "check-password-strength";

// API
import { createUser, checkUserExistence, createSession } from '~/lib/api';

// Styles
import "./styles/index.css";
import "./styles/signuplogin.css";

export default function Signup() {
	// For the password strength detector
	const [pwordStrength, setPwordStrength] = createSignal("");
    const [pwordMessageColor, setPwordMessageColor] = createSignal("#EC9A3C");

	// For the error message if something goes wrong
	const [errorMessage, setErrorMessage] = createSignal("");

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

	async function submitUserCreation() {
		// setErrorMessage("Passwords don't match.")

		const userEmail: string = (document.getElementById("email") as HTMLInputElement).value;
		const userPassword: string = (document.getElementById("password") as HTMLInputElement).value;
		const userPasswordConfirm: string = (document.getElementById("password_confirm") as HTMLInputElement).value;

		// Error handling, if password and confirm password dont match
		if(userPassword != userPasswordConfirm) {
			setErrorMessage("Error: Passwords don't match.");
			return;
		}

		// Error handling, if email exists in database
		if(await checkUserExistence(userEmail)) {
			setErrorMessage("Error: User already exists with that email.");
			return;
		}

		// Create user
		
		var user = await createUser(userEmail, userPassword);

		console.log(user);

		var session = await createSession(user.id);

		console.log(session);

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
				<input id="email" type="text" />
				<p>Password</p>
				<Show when={pwordStrength().length > 1}>
					<small>Password strength: <span style={{color: pwordMessageColor()}}>{pwordStrength()}</span></small>
				</Show>
				<input id="password" onInput={checkPasswordStrength} type="password" />
				<p>Repeat Password</p>
				<input id="password_confirm" type="password" />
				<Show when={errorMessage().length > 1}>
					<small class="errorMessage">{errorMessage()}</small>
				</Show>
				<button onClick={submitUserCreation}>Sign up</button>
			</div>
			<Link href="/login">
				<p class="link">Already have an account?</p>
			</Link>
		</main>
	);
}
