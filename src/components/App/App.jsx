import { useState } from "react";
import List from "../list/List"
import Details from "../details/Details";
import "./App.css";

function App() {
  const [detailsUrl, setDetailsUrl] = new useState();
  const listUrl = `${import.meta.env.VITE_REACT_NOTES_URL}/users.json`;

  const onClickHandler = (ev) => {
    ev.preventDefault();
    const listEl = ev.currentTarget.closest(".list");
    const listItem = listEl.querySelector(".active");
    if (listItem && listItem !== ev.currentTarget) {
      listItem.classList.remove("active");
    }
    ev.currentTarget.classList.add("active");
    const detUrl = `${import.meta.env.VITE_REACT_NOTES_URL}/${ev.currentTarget.id}.json`;
    setDetailsUrl(detUrl);
  }

  return (
    <div className="container">
      <List url={listUrl} onClickHandler={onClickHandler}></List>
      <div className="details-container">
        {detailsUrl && <Details url={detailsUrl}></Details>}
      </div>
    </div>
  )
}

export default App