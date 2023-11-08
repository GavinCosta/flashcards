import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useHistory,
  useParams,

} from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../../../utils/api";

function Study() {
  //use Params to get current deckId
  const { deckId } = useParams();
  //useState to hold deck content
  const [deck, setDeck] = useState({ cards: [] });
  const [showFront, setShowFront] = useState(true);
  const [index, setIndex] = useState(0);
  const history = useHistory();
  //useEffect to load current deck
  useEffect(loadDeck, [deckId]);
  //function to set current deck content
  function loadDeck() {
    readDeck(deckId).then(setDeck);
  }

  function nextHandle() {
    setIndex(index + 1);
    setShowFront(true);
    if (index === cards.length - 1) {
      window.confirm("Restart cards?") ? setIndex(0) : history.push("/");
    }
  }

  function flipHandle() {
    setShowFront(!showFront);
  }

  // look at cards.front/ card.back of cards
  const cards = deck.cards;
  const currentCardFront = cards[index]?.front;
  const currentCardBack = cards[index]?.back;

  //return a container with Card 'current id' of 'cards.length'
  //return cards.front of current card (with flip)
  //flip button onClick switch from front to back
  //back of card has next button
  //next button increases cardId
  //if last card (index = length-1) restart prompt or history push /

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
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      
    
        {/**if cardslength !== 0 then display nothing or loading and wait to populate page*/}
        {cards?.length < 3 ? (
          <>
            <h2>Not enough cards.</h2>
            <p>
              You need at least 3 cards to study. There are {cards.length} cards
              in this deck.
            </p>
            <Link
          to={`/decks/${deck.id}/cards/new`}
          className="btn btn-primary mx-2"
          title="Add Cards"
        >
          <span className="oi oi-plus" /> Add Cards
        </Link>
          </>
        ) : (
          <>
           
            {showFront ? (
              <div>
                <h1>Study: {deck.name}</h1>
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                <h3>
              Card {index + 1} of {cards.length}
            </h3>
                <p>{currentCardFront}</p>
                <button  className="btn btn-secondary mx-2" onClick={flipHandle}>Flip</button>
                </div>
              </div>
                
            ) : (
              <div>
                <h1>{deck.name}: Study </h1>  
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                <h3>
              Card {index + 1} of {cards.length}
            </h3>
                <p>{currentCardBack}</p>
                  <button  className="btn btn-secondary mx-2" onClick={flipHandle}>Flip</button>
                  <button  className="btn btn-primary mx-2" onClick={nextHandle}>Next</button>
                  </div>
                
              </div>
            )}
          </>
        )}
      
    </>
  );
}

export default Study;
