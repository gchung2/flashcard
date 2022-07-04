import React from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from "../Home/Home";
import Study from "../Study/StudyIndex";
import NotFound from "./NotFound";
import Header from "./Header";
import EditDeck from "../Deck/EditDeck";
import DeckView from "../Deck/DeckView";
import EditCard from "../Card/EditCard";
import CreateCard from "../Card/CreateCard";
import CreateDeck from "../Deck/CreateDeck";

function Layout() {
	return (
	  <>
		<Header />
		<div className="container">
		  <Switch>
			<Route path="/decks/new">
			  <CreateDeck />
			</Route>
			<Route path="/decks/:deckId/study">
			  <Study />
			</Route>
			<Route path="/decks/:deckId/edit">
			  <EditDeck />
			</Route>
			<Route path="/decks/:deckId/cards/new">
			  <CreateCard />
			</Route>
			<Route path="/decks/:deckId/cards/:cardId/edit">
			  <EditCard />
			</Route>
			<Route exact={true} path="/decks/:deckId">
			  <DeckView />
			</Route>
			<Route exact={true} path="/decks">
			  <Redirect to="/" />
			</Route>
			<Route exact={true} path="/">
			  <Home />
			</Route>
			<Route>
			  <NotFound />
			</Route>
		  </Switch>
		</div>
	  </>
	);
  }
  
  export default Layout;