import React, { useState, useEffect } from "react";
import {
  Link,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { createCard, readDeck } from "../../utils/api";
import CardForm from "./CardForm";

function AddCard() {
  //useParams to get deckId
  const { deckId } = useParams();

  //useState to hold deck info?
  const [deck, setDeck] = useState({ name: "" });
  //read deck, requires useEffect
  useEffect(loadDeck, [deckId]);

  function loadDeck() {
    readDeck(deckId).then(setDeck);
  }

  //create buttons
  const cancelButton = "Done";
  const submitButton = "Save";
  //submit handle to createCard
  function createCardHandle(card) {
    console.log('deckId', deckId)
    console.log('card', card)
    createCard(deckId, card)
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
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h1>{deck.name}: Add Card</h1>
      <CardForm
        cancelButton={cancelButton}
        submitButton={submitButton}
        onSubmit={createCardHandle}
      />
    </>
  );
}

export default AddCard;
