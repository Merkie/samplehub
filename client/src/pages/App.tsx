import type { Component } from 'solid-js';
import { onMount, createSignal } from 'solid-js';

import styles from '../styles/App.module.css';
import createLocalStore from '@solid-primitives/local-store';

// Components
import Header from '../components/Header';

import { fetch_discord_token, refresh_token } from '../API';

const App: Component = () => {
	// Local store
  const [localStore, setLocalStore]: any = createLocalStore('samplehub');
  
  // If user is signed in
	const [authorized, setAuthorized] = createSignal(false);

  // Deauthenticate user and remove their token from local storage
  const deauth_user = () => {
    setAuthorized(false);
    setLocalStore('access_token', '');
		setLocalStore('refresh_token', '');
  }

	onMount(() => {
		// If user just got redirected from discord login
		if (window.location.toString().includes('?code=')) {
      console.log('logging')
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
				refresh_token(localStore.refresh_token).then((response) => {
          console.log(`token refreshed! ${response.access_token.substring(0,7)}...`)
					if (response.access_token) {
            setLocalStore('access_token', response.access_token); // save access token to local storage
            setLocalStore('refresh_token', response.refresh_token); // save refresh token to local storage
          } else {
            // If refresh didnt work
            setAuthorized(false);
          }
				});
			}
		}
	});

	return (
		<div class={styles.App}>
			<Header deauth_user={deauth_user} authorized={authorized} />
		</div>
	);
};

export default App;
