import { useState, useEffect } from "react";
import "./List.css";

function List(props) {
  const [data, setState] = new useState([]);
  const [loading, setLoading] = new useState(true);
  const { onClickHandler } = props;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_NOTES_URL}/users.json`);
        if (!response.ok) { throw new Error(response.statusText); }
        const users = await response.json();
        setState(users);
      } catch (e) {
        console.error(`Ошибка доступа к серверу: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    const timerId = setTimeout(fetchData, 300);
    return () => clearTimeout(timerId);
  }, []);

  return (
    <div className="list-container">
      {loading && <div>Loading...</div>}
      {!loading &&
        <ul className="list">
          {data.map((val) => <li id={val.id} className='list-item' key={val.id} onClick={onClickHandler}>{val.name}</li>)}
        </ul>
      }
    </div>
  )
}

export default List