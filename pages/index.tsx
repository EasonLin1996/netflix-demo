import { NextPage,  } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/api/auth/[...nextauth]';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorite from '@/hooks/useFavorite';
import useInfoModal from '@/hooks/useInfoModal';
import InfoModal from '@/components/InfoModal';

export async function getServerSideProps(ctx: any) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Home: NextPage = () => {
  const { data: movies = [] } = useMovieList();
  const { data: myMovieList = [] } = useFavorite();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MovieList
          title='Trending Now'
          movies={movies}
        />
        <MovieList
          title='My list'
          movies={myMovieList}
        />
      </div>
    </>
  )
}

export default Home
