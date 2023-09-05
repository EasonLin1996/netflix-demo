import { NextApiRequest, NextApiResponse } from 'next/types';

import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    await serverAuth(req, res);

    const { movieId } = req.query;

    if (typeof movieId !== "string") {
      throw new Error("Invalid movieId");
    }

    if (!movieId) {
      throw new Error("movieId is required");
    }

    const targetMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      }
    });

    if (!targetMovie) {
      throw new Error("Invalid movieId");
    }

    return res.status(200).json(targetMovie);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};