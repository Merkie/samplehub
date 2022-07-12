// Prisma
import { Prisma, PrismaClient } from '@prisma/client';
const prisma: PrismaClient = new PrismaClient();

// Resource type
export interface Resource {
	src: string;
	name: string;
	filename: string;
	content_type: string;
	thumbnail: string;
}

export interface User {
	name: string;
	discord_id: string;
}

export const createResource = async (sample: Resource) => {
	const newSample = await prisma.resource.create({
		data: sample,
	});
	return newSample;
};

export const queryResources = async (query: string) => {
	const result = await prisma.resource.findMany({
		where: {
			name: {
				search: query,
			},
		},
	});
    
    return result;
};

export const fetch_user_from_discord = async(discord_id: string) => {
	const result = await prisma.user.findFirst({
		where: {
			discord_id: discord_id,
		}
	});
	return result;
}

export const create_user_from_discord = async(userObj: User) => {
	const result = await prisma.user.create({
		data: userObj
	});
	return result;
}