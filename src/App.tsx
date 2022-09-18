import './styles/main.css';
import { useEffect, useState } from 'react';
import { GameBanner } from './components/GameBanner';
import * as Dialog from '@radix-ui/react-dialog';

import { CreateAddBanner } from './components/CreateAddBanner';
import { CreateAmModal } from './components/CreateAdModal';

import logoImg from './assets/logo-nlw-esports.svg';
import axios from 'axios';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    Ad: number
  }
}

export function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(response => { setGames(response.data)})
  }, []);

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="" />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className="text-transparent bg-clip-text bg-nlw-gradient">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => (
          <GameBanner
            key={game.id}
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsCount={game._count.Ad}
          />
        ))}

      </div>
      <Dialog.Root>
        <CreateAddBanner />
        <CreateAmModal />
      </Dialog.Root>

    </div>
  )
}
