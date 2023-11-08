import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readCard, readDeck, updateCard } from "../../utils/api";
import { useState } from "react";
import CardForm from "./CardForm";

function EditCard() {
  //useState to hold current card value
  const [deck, setDeck] = useState({ name: "", id: "" });
  const [card, setCard] = useState({ front: "", back: "" });
  //useParams to get current deckId
  const { deckId, cardId } = useParams();
  //useHistory to go back
  const history = useHistory()
  //read deck then read cards
  useEffect(loadCard, [deckId]);

  function loadCard() {
    readDeck(deckId)
      .then(setDeck)
      .then(() => readCard(cardId))
      .then(setCard);
  }
  //unique submit handle, performs put request then history.goBack()
  function editCardHandle(updatedCard) {
    updateCard(updatedCard).then(() => history.goBack())
  }

  const submitButton = "Submit";
  const cancelButton = "Cancel";

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
            Edit Card {card.id}
          </li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      {/**Insert form with props */}
      {card.id ? (
        <CardForm
          submitButton={submitButton}
          cancelButton={cancelButton}
          initialUseState={card}
          onSubmit={editCardHandle}
        />
      ) : (
        <p>...Loading</p>
      )}
    </>
  );
}

export default EditCard;
