import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/api/auth/[...nextauth]";

import prismadb from '@/lib/prismadb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  console.log('serverAuth', session);

  if (!session?.user?.email) {
    throw new Error('Not signed in');
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    }
  })
  if (!currentUser) {
    throw new Error('Not signed in');
  }
  
  return { currentUser };
};

export default handler;