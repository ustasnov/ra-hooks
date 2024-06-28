import { useState, useEffect } from "react";
import Details from "../details/Details";

function List() {
  const [data, setState] = new useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_REACT_NOTES_URL}/users.json`);
          if (response.ok) {
            const users = await response.json();
            console.log(users);
            setState(users);
          } else {
            console.log(`Ошибка доступа к серверу: ${response.status}`);
            setState([]);
          }
        } catch (e) {
          console.log(`Ошибка доступа к серверу: ${e.message}`);
          setState([]);
        }
      };
      fetchData();
  }, []);

  return (
    <div className="list">
      <ul>
        {data.map((val) => <li id={val.id} className='list-item' key={val.id}>{val.name}</li>)}   
      </ul> 
    </div>
  )
}

export default List