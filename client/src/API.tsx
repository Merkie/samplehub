import { client_id, client_secret } from './secret';

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
