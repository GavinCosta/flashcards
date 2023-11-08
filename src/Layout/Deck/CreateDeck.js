import React from "react";
import { Link } from "react-router-dom";
import { createDeck } from "../../utils/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DeckForm from "./DeckForm";

function CreateDeck() {

  //use useState to keep track of what is being typed

  const history = useHistory();
  //onSubmit should perform a post request then history.push('deckView')
  function handleDeckCreate(deck) {
    createDeck(deck).then((deck) => history.push(`/decks/${deck.id}`));
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home"></span> Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      {/**Form goes here pass in as a component with valid props */}
      {/**Get props for the following:
       * onSubmit
       * deckName (useState)
       * handleInputChange
       * deckDescription (useState)
       * onCancel
       */}
      <DeckForm
        onSubmit={handleDeckCreate}
      />
    </>
  );
}

export default CreateDeck;
