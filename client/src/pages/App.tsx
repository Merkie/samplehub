import type { Component } from 'solid-js';
import { onMount, createSignal, Show } from 'solid-js';

import styles from '../styles/App.module.css';
import createLocalStore from '@solid-primitives/local-store';

// Components
import Header from '../components/Header';

import { fetch_discord_token, refresh_token, fetch_user_info, login_user } from '../API';

const App: Component = () => {
	// Local store
	const [localStore, setLocalStore]: any = createLocalStore('samplehub');

	// If user is signed in
	const [authorized, setAuthorized] = createSignal(false);
	const [userData, setUserData]: any = createSignal({});

	// Deauthenticate user and remove their token from local storage
	const deauth_user = () => {
		setAuthorized(false);
		setLocalStore('access_token', '');
		setLocalStore('refresh_token', '');
	};
	
	// Global authentication logic
	// Its a doosey
	onMount(() => {
		// If user just got redirected from discord login
		if (window.location.toString().includes('?code=')) {
			const code = window.location.toString().split('?code=')[1];
			fetch_discord_token(code).then((response) => {
				if (response.access_token) {
					setLocalStore('access_token', response.access_token); // save access token to local storage
					setLocalStore('refresh_token', response.refresh_token); // save refresh token to local storage
				}
				window.location.assign('/');
			});
		} else {
			// If the token is already in local storage
			if (localStore.access_token) {
				setAuthorized(true);
				// Refresh token on refresh
				// TODO: refresh token only when its about to expire
				refresh_token(localStore.refresh_token).then((response) => {
					if (response.access_token) {
						// console.log(`token refreshed! ${response.access_token.substring(0, 7)}...`);
						setLocalStore('access_token', response.access_token); // save access token to local storage
						setLocalStore('refresh_token', response.refresh_token); // save refresh token to local storage
						fetch_user_info(response.access_token).then((response) => {
							setUserData(response.user);
							login_user(userData());
						});
					} else {
						// If refresh didnt work, deauth user
						deauth_user();
					}
				});
			}
		}
	});

	return (
		<div class={styles.App}>
			<Header deauth_user={deauth_user} authorized={authorized} />
			<Show when={userData().hasOwnProperty('id')}>
				<p>{userData().username + '#' + userData().discriminator}</p>
			</Show>
		</div>
	);
};

export default App;
