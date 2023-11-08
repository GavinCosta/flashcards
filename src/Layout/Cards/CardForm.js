import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function CardForm({
  cancelButton,
  submitButton,
  onSubmit,
  initialUseState = {front: '', back: ''},
}) {
  const history = useHistory();
  //onCancel
  function onCancel() {
    history.goBack();
  }
  const [card, setCard] = useState(initialUseState);

  function handleFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    onSubmit(card);
  }

  function changeHandle(event) {
    const { name, value } = event.target;
    setCard({ ...card, [name]: value });
  }
  return (
    <div>
      <form className="deck-edit my-4" onSubmit={handleFormSubmit}>
        <fieldset>
          <div className="form-group">
            <label htmlFor="card-front">Front</label>
            <textarea
              className="form-control"
              required
              type="text"
              placeholder="Front side of card"
              value={card.front}
              onChange={changeHandle}
              name="front"
              id="card-front"
            />
          </div>
          <div className="form-group">
            <label htmlFor="card-back">Back</label>
            <textarea
              className="form-control"
              type="text"
              required
              placeholder="Back side of card"
              value={card.back}
              onChange={changeHandle}
              name="back"
              id="card-back"
            />
          </div>
          <button
            className="btn btn-secondary mr-2"
            onClick={onCancel}
            type="button"
          >
            {cancelButton}
          </button>
          <button className="btn btn-primary" type="submit">
            {submitButton}
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default CardForm;
