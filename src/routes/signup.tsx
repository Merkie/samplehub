// Solid
import { createSignal, Show } from "solid-js";
import { Link } from "solid-app-router"; // Link between pages in app

// Password strength checker
import { passwordStrength } from "check-password-strength";

// API
import { createUser, // Create a new user object
		checkUserExistence, // Check if a user exists based off of email
		createSession // Create a new session
	} from '~/lib/api';

import { setStore } from "~/root"; // Local storage setter, used for session.

// Styles
import "./styles/index.css"; // Common CSS
import "./styles/signup-login.css"; // Page CSS

export default function Signup() {
	// State
	const [pwordStrength, setPwordStrength] = createSignal(""); // Password srength, "weak", "strong", etc..
	// TODO: Make an enum for the colors vvv
    const [pwordMessageColor, setPwordMessageColor] = createSignal("#EC9A3C"); // Color that password strength message is displayed in
	const [errorMessage, setErrorMessage] = createSignal(""); // For the error message if something goes wrong

	// Refs
	let emailRef: HTMLInputElement;
	let passwordRef: HTMLInputElement;
	let passwordConfirmRef: HTMLInputElement;

	// Function for checking and setting password strength information
	function checkPasswordStrength(e: Event) {
		const userPassword: string = (e.target as HTMLInputElement).value; // Value of <input />
        const strength: string = passwordStrength(userPassword).value; // Strength of password
        
		// Set password strength message and color
		if(strength == "Strong") {
            setPwordMessageColor('#32A467');
        } else {
            setPwordMessageColor('#EC9A3C');
        }
		setPwordStrength(strength);
	}

	async function submitUserCreation() {
		const userEmail: string = emailRef.value;
		const userPassword: string = passwordRef.value;
		const userPasswordConfirm: string = passwordConfirmRef.value;

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

		// Response from signiup
		var response = await createUser(userEmail, userPassword); // Create user

		// If signup was successful, set session and redirect to home page
		if(!response.error) {
			setStore('session', response.session.access_token); // Set the local storage session
			window.location.assign("/"); // Redirect to home page
		}
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
				<input ref={emailRef} type="text" />
				<p>Password</p>
				<Show when={pwordStrength().length > 1}>
					<small>Password strength: <span style={{color: pwordMessageColor()}}>{pwordStrength()}</span></small>
				</Show>
				<input ref={passwordRef} onInput={checkPasswordStrength} type="password" />
				<p>Repeat Password</p>
				<input ref={passwordConfirmRef} type="password" />
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
