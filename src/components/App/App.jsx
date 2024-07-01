import { useState } from "react";
import List from "../list/List"
import Details from "../details/Details";
import "./App.css";

function App() {
  const [info, setInfo] = new useState();

  const onClickHandler = (ev) => {
    const listEl = ev.currentTarget.closest(".list");
    const listItem = listEl.querySelector(".active");
    if (listItem && listItem !== ev.currentTarget) {
      listItem.classList.remove("active");
    }
    ev.currentTarget.classList.add("active");
    const userInfo = { id: ev.currentTarget.id, name: ev.currentTarget.textContent }
    setInfo(userInfo);
  }

  return (
    <div className="container">
      <List onClickHandler={onClickHandler}></List>
      <div className="details-container">
        {info && <Details info={info}></Details>}
      </div>
    </div>
  )
}

export default App