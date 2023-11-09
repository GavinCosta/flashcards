import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeck from "./Deck/CreateDeck";
import { Route, Switch } from "react-router-dom";
import DeckView from "./Deck/DeckView";
import Study from "./Deck/Study/Study";
import EditDeck from "./Deck/EditDeck";
import EditCard from "./Cards/EditCard";
import AddCard from "./Cards/AddCard";
import Home from "./Home";

function Layout() {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>

          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route path="/decks/:deckId/study">
            <Study />
          </Route>

          <Route path="/decks/new">
            <CreateDeck />
          </Route>

          <Route exact path="/decks/:deckId">
            <DeckView />
          </Route>

          <Route exact path="/">
            <Home />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default Layout;
