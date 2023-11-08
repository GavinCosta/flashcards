//singular deck
import React, { useState, useEffect } from "react";
import { useParams, Link, useRouteMatch } from "react-router-dom";
import { readDeck } from "../../utils/api";
import { deleteDeck } from "../../utils/api";

function DeckView() {
  const { deckId } = useParams();
  const { url } = useRouteMatch();
  const [deck, setDeck] = useState({ cards: [] });
  useEffect(loadDeckView, [deckId]);

  function deleteHandler(deckId) {
    const confirmed = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
    );
    if (confirmed) {
      deleteDeck(deckId).then(loadDeckView);
    }
  }

  function loadDeckView() {
    readDeck(deckId).then(setDeck);
  }
  const cards = deck.cards;
  const cardList = cards.map((card) => (
    <li
      key={card.id}
      className="list-group-item list-group-item-action flex-column align-items-start"
    >
      <div className="d-flex w-100 justify-content-between m-2">
        <span>{card.front}</span>
        <span>{card.back}</span>
      </div>
      <div className="d-flex flex-row-reverse">
        <button className="btn btn-danger mx-2" title="Delete deck" onClick={() => deleteHandler(deck.id)}>
          <span className="oi oi-trash" />
        </button>
        <Link
          to={`${url}/cards/${card.id}/edit`}
          className="btn btn-secondary"
          title="Edit card"
        >
          <span className="oi oi-pencil" /> Edit
        </Link>
      </div>
    </li>
  ));

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" >
             <span className="oi oi-home"></span> Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>

      <div>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <Link
          to={`${url}/edit`}
          className="btn btn-secondary mx-2"
          title="Edit Deck"
        >
          <span className="oi oi-pencil"/> Edit
        </Link>
        <Link
          to={`${url}/study`}
          className="btn btn-primary"
          title="Study deck"
        >
          <span className="oi oi-book" /> Study
        </Link>
        <Link
          to={`${url}/cards/new`}
          className="btn btn-primary mx-2"
          title="Add Cards"
        >
          <span className="oi oi-plus" /> Add Cards
        </Link>
        <button
          className="btn btn-danger float-right"
          title="Delete deck"
          onClick={() => deleteHandler(deck.id)}
        >
          <span className="oi oi-trash" />
        </button>
      </div>
      <h2>Cards</h2>
      <div>{cardList}</div>
    </>
  );
}

export default DeckView;
