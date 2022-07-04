import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { readCard, readDeck, updateCard } from '../utils/api';
import CardForm from './CardForm';

function EditCard() {
    const history = useHistory();
    const { deckId, cardId } = useParams();
  
    const cardReset = {
        id: cardId,
        front: "",
        back: "",
        deckId: deckId,
      };
    
      const deckReset = {
        id: deckId,
        name: "",
        description: "",
      };
    
      const [flashDeck, setFlashDeck] = useState(deckReset);
      const [flashCard, setFlashCard] = useState(cardReset);
    
      useEffect(() => {
        async function getFlashDeck() {
          try {
            const deckFromApi = await readDeck(deckId);
            setFlashDeck(deckFromApi);
    

            const cardFromApi = await readCard(cardId);
            setFlashCard(cardFromApi);
          } catch (error) {
            throw new Error(`API readDeck(${deckId}) had an error: ${error}`);
          }
        }
        getFlashDeck();
      }, [deckId, cardId]);
    
      const handleFormChange = ({ target }) => {
        setFlashCard({
          ...flashCard,
          [target.id]: target.value,
        });
      };
    
      async function handleSubmit(event) {
        event.preventDefault();
        await updateCard({
          ...flashCard,
          front: flashCard.front,
          back: flashCard.back,
        });
        history.goBack();
      }
    
      let deckName = flashDeck?.name ? flashDeck?.name : "loading...";
    
      const breadcrumb = (
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deckName}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Card {cardId}
            </li>
          </ol>
        </nav>
      );
    
      return (
        <div>
          {breadcrumb}
          <CardForm
            handleSubmit={handleSubmit}
            handleFormChange={handleFormChange}
            flashCard={flashCard}
          />
        </div>
      );
    }
    
export default EditCard;