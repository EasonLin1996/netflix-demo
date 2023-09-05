import { NextApiRequest, NextApiResponse } from 'next';
import { without } from 'lodash';

import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const { currentUser } = await serverAuth(req, res);

      const favoriteMovies = await prismadb.movie.findMany({
        where: {
          id: {
            in: currentUser.favoriteIds,
          },
        },
      });

      return res.status(200).json(favoriteMovies);
    }

    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      
      const { movieId } = req.body;

      const targetMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!targetMovie) {
        throw new Error('Invalid movieId');
      }

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        }
      });

      return res.status(200).json(updatedUser);
    }

    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req, res);
      
      const { movieId } = req.body;

      const targetMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!targetMovie) {
        throw new Error('Invalid movieId');
      }

      const updateFavoriteIds = without(currentUser.favoriteIds, movieId);
      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          favoriteIds: {
            set: updateFavoriteIds,
          }
        }
      });

      return res.status(200).json(updatedUser);
    };
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
};