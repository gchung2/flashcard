import React, { useState, useEffect } from "react";
import { Route, Switch, Link, useHistory, useParams } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";
import DeckView from "./DeckView";
import Study from "../Study/StudyIndex";
import EditDeck from "./EditDeck";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";
import EditCard from "../Card/EditCard";
import CardCreate from "../Card/CreateCard";
import NotFound from "../Layout/NotFound";
import CreateCard from "../Card/CreateCard";

function Decks() {
  const { deckId } = useParams();
  const history = useHistory();
  const [flashDecks, setFlashDecks] = useState([]);

  useEffect(() => {
    async function getFlashDecks() {
      const flashDecksFromApi = await listDecks();
      setFlashDecks(flashDecksFromApi);
    }
    getFlashDecks();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete this deck?")) {
      deleteDeck(id);

      setFlashDecks((currentDecks) =>
        currentDecks.filter((deck) => deck.id !== id)
      );

      history.push("/");
    }
  };

  const deckList = flashDecks.map((deck) => {
    return (
      <Deck
        key={deck?.id}
        id={deck?.id}
        name={deck?.name}
        description={deck?.description}
        totalCards={deck?.cards?.length}
        handleDelete={handleDelete}
      />
    );
  });

  function DisplayDecks({ flashDecks }) {
    return (
      <div>
        <Link to="/decks/new">
          <button type="button" className="btn btn-secondary mb-4">
            + Create Deck
          </button>
        </Link>
        {flashDecks}
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: "800px", paddingBottom: "20px" }}>
      <Switch>
        <Route exact={true} path="/">
          <DisplayDecks flashDecks={deckList} deckId={deckId} />
        </Route>

        <Route path="/decks/:deckId/cards/:cardId/edit">
          <EditCard />
        </Route>

        <Route path="/decks/:deckId/cards/new">
          <CardCreate />
        </Route>

        <Route path="/decks/:deckId/study">
          <Study />
        </Route>

        <Route path="/decks/:deckId/edit">
          <EditDeck />
        </Route>

        <Route path="/decks/new">
          <CreateDeck />
        </Route>

        <Route path="/decks/:deckId">
          <DeckView handleDelete={handleDelete} />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default Decks;