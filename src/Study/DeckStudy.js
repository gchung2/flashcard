import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import CardStudy from "./CardStudy";
import CardNotEnough from "./CardNotEnough";

function DeckStudy() {
  const history = useHistory();
  const { deckId } = useParams();
  const [flashDeck, setFlashDeck] = useState();

  useEffect(() => {
    async function getCardsAndDeck() {
      const deckFromApi = await readDeck(deckId);
      setFlashDeck(deckFromApi);
    }
    getCardsAndDeck();
  }, [deckId]);

  const initialFlashCardState = {
    cardNumber: 1,
    cardFlipped: false,
    nextButton: false,
  };

  const [flashCard, setFlashCard] = useState(initialFlashCardState);
  const { cardNumber, cardFlipped, nextButton } = flashCard;

  const handleFlip = () => {
    setFlashCard({ ...flashCard, cardFlipped: !cardFlipped, nextButton: true });
  };

  const handleNext = () => {
    if (cardNumber >= totalCards && totalCards >= 3) {
      if (
        window.confirm(`Restart cards? Click 'cancel' to return to homepage.`)
      ) {
        setFlashCard(initialFlashCardState);
      } else {
        history.push("/");
      }
    } else {
      setFlashCard({
        ...flashCard,
        cardNumber: cardNumber + 1,
        cardFlipped: false,
        nextButton: false,
      });
    }
  };

  const totalCards = flashDeck?.cards?.length;

  const flashCards = flashDeck?.cards?.map((card) => {
    return (
      <CardStudy
        cardNumber={cardNumber}
        cardFlipped={cardFlipped}
        card={card}
        key={card.id}
        total={totalCards}
        handleNext={handleNext}
        handleFlip={handleFlip}
        nextButton={nextButton}
      />
    );
  });

  if (!flashDeck) {
    return <p>Loading...</p>;
  }

  let displayResult = null;
  const notEnoughCards = (
    <CardNotEnough total={totalCards} deckId={flashDeck.id} />
  );
  const enoughCards = flashCards[cardNumber - 1];
  displayResult = totalCards <= 2 ? notEnoughCards : enoughCards;

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${flashDeck.id}`}>{flashDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h1>{flashDeck.name}: Study</h1>
      <div style={{ marginTop: "30px" }}>{displayResult}</div>
    </div>
  );
}

export default DeckStudy;