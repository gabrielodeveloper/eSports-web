import './styles/main.css';
import { useEffect, useState } from 'react';
import { GameBanner } from './components/GameBanner';
import * as Dialog from '@radix-ui/react-dialog';

import logoImg from './assets/logo-nlw-esports.svg';
import { CreateAddBanner } from './components/CreateAddBanner';
import { GameController } from 'phosphor-react';
import { Input } from './components/Form/Input';

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
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, [])

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

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
            <form className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">Qual é o game</label>
                <Input
                  id="game"
                  placeholder="Selecione o game que você deseja jogar"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Seu Nome (ou nickname)</label>
                <Input id="name" placeholder="Como te chamar dentro do game?" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga hà quando anos?</label>
                  <Input id="discord" type="number" placeholder="Tudo bem se ZERO" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Qual seu discord?</label>
                  <Input id="discord" type="number" placeholder="Usúario#0000" />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays">Quando custuma jogar?</label>

                  <div className="grid grid-cols-4 gap-1">
                    <button 
                    title="Domingo"
                    className="w-8 h-8 rounded bg-zinc-900"
                    >
                      D
                    </button>
                    <button 
                    title="Segunda"
                    className="w-8 h-8 rounded bg-zinc-900"
                    >
                      S
                    </button>
                    <button 
                    title="Terça"
                    className="w-8 h-8 rounded bg-zinc-900"
                    >
                      T
                    </button>
                    <button 
                    title="Quarta"
                    className="w-8 h-8 rounded bg-zinc-900"
                    >
                      Q
                    </button>
                    <button 
                    title="Quinta"
                    className="w-8 h-8 rounded bg-zinc-900"
                    >
                      Q
                    </button>
                    <button 
                    title="Sexta"
                    className="w-8 h-8 rounded bg-zinc-900"
                    >
                      S
                    </button>
                    <button 
                    title="Sabado"
                    className="w-8 h-8 rounded bg-zinc-900"
                    >
                      S
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart">Qual horário do dia ?</label>
                  <div className="grid grid-cols-2 gap-1">
                    <Input id="hourStart" type="time" placeholder="De" />
                    <Input id="hourEnd" type="time" placeholder="Até" />
                  </div>
                </div>
              </div>

              <div className="mt-2 flex gap-2 text-sm">
                <input type="checkbox" />
                Costumo me conectar ao chat de voz
              </div>

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
                  Cancelar
                </Dialog.Close>
                <button type="submit" className=" flex gap-3 bg-violet-500 rounded-md px-5 font-semibold items-center hover:bg-violet-700">
                  <GameController size={24} />
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </div>
  )
}
