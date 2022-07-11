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
