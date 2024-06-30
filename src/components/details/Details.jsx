import { useState, useEffect, useRef } from "react";
import "./Details.css";

function Details(props) {
  const { info } = props;
  const [data, setData] = new useState();
  const [loading, setLoading] = new useState(true);

  const timestampRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const timestamp = Date.now();
      timestampRef.current = timestamp;
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_NOTES_URL}/${info.id}.json`);
        if (!response.ok) { throw new Error(response.statusText); }
        const details = await response.json();
        if (timestampRef.current === timestamp) { setData(details); }
      } catch (e) {
        console.erroe(`Ошибка доступа к серверу: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    const timerId = setTimeout(fetchData, 300);
    return () => clearTimeout(timerId);
  }, [info]);

  return (
    <>
      {loading && <div>Loading...</div>}
      {data && !loading && <div className="user-details">
        <img className="details details-avatar" src={data.avatar} alt="Avatar"></img>
        <div className="details details-name">{data.name}</div>
        <div className="details details-city">City: {data.details.city}</div>
        <div className="details details-company">Company: {data.details.company}</div>
        <div className="details details-position">Position: {data.details.position}</div>
      </div>}
    </>
  )
}

export default Details;