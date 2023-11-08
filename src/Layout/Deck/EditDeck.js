import React from "react";
import { Link } from "react-router-dom";
import DeckForm from "./DeckForm";
import { useEffect } from "react";
import { useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { readDeck, updateDeck } from "../../utils/api";

function EditDeck() {
  //useParams to get current deck id
  const { deckId } = useParams();
  //set useState to have current name and description
  const [formData, setFormData] = useState({ name: "", description: "" });
  //get history to push
  const history = useHistory();

  //useEffect(get current deck, setFormData(current deck))
  useEffect(loadDeck, [deckId]);

  //function that reads deck then sets useState
  function loadDeck() {
    readDeck(deckId).then((deck) => setFormData(deck));
  }
  //create unique submit handle
  function handleEditDeck(updatedDeck) {
    updateDeck(updatedDeck).then((deck) => history.push(`/decks/${deck.id}`));
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
            <Link to={`/decks/${deckId}`}>{formData.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      {formData.id ? (
        <DeckForm initialUseState={formData} onSubmit={handleEditDeck} />
      ) : (
        <p>...loading</p>
      )}
    </>
  );
}

export default EditDeck;
