import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from "react";
import "./Details.css";

function Details(props) {
  const [data, setData] = new useState();
  const [loading, setLoading] = new useState(true);
  const [error, setError] = useState(null);
  const { url } = props;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${url}`);

        if (!response.ok) {
          throw new Error(`статус ответа сервера: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  if (loading) return <div className="user-details"><div>Loading...</div></div>;
  if (error) return <div className="user-details"><div>Error: {error}</div></div>;

  return (
    <>
      {data && <div className="user-details">
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

Details.propTypes = {
  url: PropTypes.string
}