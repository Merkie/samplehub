import crypto from 'crypto-js';

import { client_id, client_secret, site_secret } from './secret';

const api_uri = 'https://discord.com/api/oauth2';
const redirect_uri = 'http://localhost:3000';

const _post = async (url: string, data: any) => {
	const params = new URLSearchParams();
	for (const key in data) {
		params.append(key, data[key]);
	}

	let response = await fetch(url, {
		method: 'POST',
		body: params,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Accept: 'application/json',
		},
	});

    return response.json();
}

export const fetch_discord_token = async (code: string) => {
	return await _post(`${api_uri}/token`, {
		'client_id': client_id,
		'client_secret': client_secret,
		'grant_type': 'authorization_code',
		'redirect_uri': redirect_uri,
		'code': code,
	});
};

export const refresh_token = async (old_token: string) => {
	return await _post(`${api_uri}/token`, {
		'client_id': client_id,
		'client_secret': client_secret,
		'grant_type': 'refresh_token',
		// 'redirect_uri': redirect_uri,
		'refresh_token': old_token,
	});
}

export const fetch_user_info = async (access_token: string) => {
	let response = await fetch(`${api_uri}/@me`, {
		headers: {'Authorization': `Bearer ${access_token}`}
	});

	return response.json();
}

const new_session = async () => {
	let result = crypto.AES.encrypt(Date.now().toString(), site_secret).toString();
	return result;
}

export const login_user = async (user: any) => {
	new_session().then(async (session) => {
		let response = await fetch('http://localhost:1337/login', {
			method: 'POST',
			body: JSON.stringify({ token : session, user: user }),
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});
		return response.json();
	});
}
