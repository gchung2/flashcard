import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createDeck } from '../utils/api';
import DeckForm from './DeckForm';

function CreateDeck() {
  const history = useHistory();

  const formReset = {
    name: "",
    description: "",
  };

  const [newDeck, setNewDeck] = useState(formReset);

  const handleFormChange = ({ target }) => {
    setNewDeck({
      ...newDeck,
      [target.id]: target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await createDeck({
      name: newDeck.name,
      description: newDeck.description,
    });
    const newFlashDeck = await response;
    history.push(`/decks/${newFlashDeck.id}`);
  }

  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Create Deck
        </li>
      </ol>
    </nav>
  );

  return (
    <div>
      {breadcrumb}
      <DeckForm
        handleSubmit={handleSubmit}
        handleFormChange={handleFormChange}
        existingDeck={newDeck}
      />
    </div>
  );
}

export default CreateDeck;