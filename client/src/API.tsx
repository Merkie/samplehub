import crypto from 'crypto-js';
import axios from 'axios';
import { client_id, client_secret, site_secret, redirect_uri, api_uri } from './secret';

const discord_uri = 'https://discord.com/api/oauth2';

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
};

export const fetch_discord_token = async (code: string) => {
	return await _post(`${discord_uri}/token`, {
		client_id: client_id,
		client_secret: client_secret,
		grant_type: 'authorization_code',
		redirect_uri: redirect_uri,
		code: code,
	});
};

export const refresh_token = async (old_token: string) => {
	return await _post(`${discord_uri}/token`, {
		client_id: client_id,
		client_secret: client_secret,
		grant_type: 'refresh_token',
		// 'redirect_uri': redirect_uri,
		refresh_token: old_token,
	});
};

export const fetch_user_info = async (access_token: string) => {
	let response = await fetch(`${discord_uri}/@me`, {
		headers: { Authorization: `Bearer ${access_token}` },
	});

	return response.json();
};

const new_session = async () => {
	let result = crypto.AES.encrypt(Date.now().toString(), site_secret).toString();
	return result;
};

export const login_user = async (user: any) => {
	new_session().then(async (session) => {
		let response = await fetch(api_uri+'/login', {
			method: 'POST',
			body: JSON.stringify({ token: session, user: user }),
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});
		return response.json();
	});
};

export const uploadFile = async (files: any[]) => {
	files.forEach((file) => {
		let formData = new FormData();
		formData.append('fileupload', file);
		axios
			.post(api_uri + '/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((response) => {
				console.log('File upload successful!');
			})
			.catch((error) => {
				console.log('Error with file upload.');
				console.log(error);
			});
	});
};

export const queryApi = async (query: string) => {
	const response = await axios.get(`${api_uri}/search/${query}`);
	return response.data.splice(0,25);
};
