import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { readDeck, updateDeck } from '../utils/api';
import DeckForm from './DeckForm';

function EditDeck() {
  const [ deck, setDeck ] = useState({ name: '', description: '' })
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
      readDeck(deckId)
      .then(data => setDeck(data))
  },[deckId]);

  function submitHandler(updatedDeck) {
      updateDeck(updatedDeck).then(() => {
          history.push(`/decks/${deckId}`)
      })
  }

  function cancel() {
      history.goBack();
  }

  const editForm = deck.id ? (
      <DeckForm onCancel={cancel} onSubmit={submitHandler} initialState={deck} />
  ) : (
      <h5>Loading...</h5>
  )

  return (
      <div>
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item'>
              <Link to='/'>
                <span className='oi oi-home' /> Home
              </Link>
            </li>
            <li className='breadcrumb-item active' aria-current='page'>
              Edit Deck
            </li>
          </ol>
        </nav>
        <h3>Edit Deck</h3>
        {editForm}
      </div>
  );
}
export default EditDeck;