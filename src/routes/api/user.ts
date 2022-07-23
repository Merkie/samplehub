import { json } from 'solid-start/server';
import { PrismaClient } from '@prisma/client'

// Types
import { IUserPost } from '../../types/api';

const prisma = new PrismaClient()

export const post = async ({ request }: { request: Request }) => {
    const body: IUserPost = await request.json();
};