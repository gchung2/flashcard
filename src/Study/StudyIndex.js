import { readDeck } from '../utils/api';
import React, {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';

function Study() {
const [ deck, setDeck] = useState({cards: []});
const [currentCard, setCurrentCard] = useState({index: 0, flipped: false})
const { deckId } = useParams();

useEffect(() => {
    readDeck(deckId)
    .then(data => setDeck(data))
    .catch(err => console.log(err))
},[deckId]);

function flipCard() {
    setCurrentCard({ ...currentCard, flipped: !currentCard.flipped });
}

function nextCard() {
    if (currentCard.index === deck.cards.length - 1) {
        const performReset = window.confirm('Restart the cards?')
        if (performReset) {
            setCurrentCard({index: 0, flipped: false})
        }
    } else{
    setCurrentCard({ ...currentCard, index: currentCard.index + 1, flipped: false});
    }
}

const card = deck.cards[currentCard.index];

    return (
        <div>
            <header>
                <nav aria-label='breadcrumb'>
                    <ol className='breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/'>Home</Link>
                        </li>
                        <li className='breadcrumb-item'>
                            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                        </li>
                        <li className='breadcrumb-item active' aria-current='page'>
                            Study
                        </li>
                    </ol>
                </nav>

                <h3>{deck.name}: Study</h3>
                {deck.cards.length < 3 ? 
                <div>
                <h4>Not enough cards.</h4>
                <p>You need at least 3 cards to study. There area {deck.cards.length} cards in this deck.</p>
                <Link to={`/decks/${deckId}/cards/new`} className='btn btn-primary'><span className='oi oi-plus'/> Add Cards</Link>
                </div>
                : 
                <div className='card'>
                    <div className='card-body'>
                        <h5 className='card-title'>Card {currentCard.index + 1} of {deck.cards.length}</h5>
                        <p className='card-text'>{currentCard.flipped? card.back: card.front}</p>
                        <button onClick={flipCard} className='btn btn-secondary'>Flip</button>
                        {   currentCard.flipped && 
                            <button onClick={nextCard} className='btn btn-primary'>Next</button>
                        }
                    </div>
                </div>
                }
            </header>
        </div>
    );
};

export default Study;