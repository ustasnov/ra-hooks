import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import "./List.css";

function List(props) {
  const [data, setData] = new useState(null);
  const [loading, setLoading] = new useState(true);
  const [error, setError] = useState(null);
  const { url, onClickHandler } = props;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url);

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
  }, []);

  if (loading) return (
    <div className="list-container">
      <div>Loading...</div>
    </div>);
  if (error) return (
    <div className="list-container">
      <div>Error: {error}</div>
    </div>);

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

List.propTypes = {
  url: PropTypes.string,
  onClickHandler: PropTypes.func
}