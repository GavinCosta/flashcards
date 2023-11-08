import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function DeckForm({
  onSubmit,
  initialUseState = { name: "", description: "" },
}) {
  const history = useHistory()
  //onCancel
  function onCancel() {
    history.goBack();
  }
  const [deck, setDeck] = useState(initialUseState);

  function handleFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    onSubmit(deck);
  }

  function changeHandle(event) {
    const { name, value } = event.target;
    setDeck({ ...deck, [name]: value });
  }
  return (
    <div>
      <form className='deck-edit my-4' onSubmit={handleFormSubmit}>
        <fieldset>
          <div className="form-group">
            <label htmlFor="deck-name">Name</label>
            <input
              className="form-control"
              required
              type="text"
              placeholder="Deck Name"
              value={deck.name}
              onChange={changeHandle}
              name="name"
              id="deck-name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              row="4"
              type="text"
              required
              placeholder="Deck Description"
              value={deck.description}
              onChange={changeHandle}
              name="description"
              id="deck-description"
            />
          </div>
          <button
            className="btn btn-secondary mr-2"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default DeckForm;
