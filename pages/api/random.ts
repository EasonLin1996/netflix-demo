import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }
    // await serverAuth(req, res);
    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);
    const randomMovie = await prismadb.movie.findFirst({
      skip: randomIndex,
    });
    return res.status(200).json(randomMovie);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};

export default handler