
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { deleteDeck, readDeck } from '../utils/api';
import CardList from '../Card/CardList';

function DeckView() {
  const [ deck, setDeck] = useState([]);
    const { deckId } = useParams();

    useEffect(() => {
        readDeck(deckId)
        .then(data => setDeck(data))
        .catch(err => console.log(err))
    },[deckId]);

    function deleteHandler(deckId) {
        const confirmed = window.confirm('Do you really want to delete this?');
        if (confirmed) {
            deleteDeck(deckId)
        }
      }

    return (
        <main className='container deck-view'>
            <nav aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                        <Link to='/'>
                        <span className='oi oi-home' /> Home
                        </Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                        {deck.name}
                    </li>
                </ol>
            </nav>
            <div className='media mb-2'>
                <div className='media-body'>
                    <h5 className='mt-0'>{deck.name}</h5>
                    {deck.description}
                </div>
            </div>
            <div className='btn-group'>
            <Link to={`${deck.id}/edit`} className='btn btn-secondary'><span className='oi oi-pencil'/> Edit</Link>
            <Link to={`${deck.id}/study`} className='btn btn-primary'><span className='oi oi-book'/> Study</Link>
            <Link to={`${deck.id}/cards/new`} className='btn btn-primary'><span className='oi oi-plus'/> Add Cards</Link>
            <Link to='' className='btn btn-danger float-right' id={deck.id} onClick={() => deleteHandler(deck.id)}>
              <span className='oi oi-trash'/>
            </Link>
          </div>
          <CardList deck={deck} />
        </main>
    )
}

export default DeckView;