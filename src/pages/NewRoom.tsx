import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import illustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { database } from '../services/firebase';

import '../styles/auth.scss';
import { useHistory } from 'react-router';

export function NewRoom() {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const history = useHistory();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id='page-auth'>
      <aside>
        <img
          src={illustration}
          alt='ilustração simbolizando perguntas e respostas'
        />
        <strong>Crie salas Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiencia em tempo-real</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt='Letmeask' />

          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type='text'
              placeholder='Nome da sala'
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type='submit'>Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to='/'>clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
