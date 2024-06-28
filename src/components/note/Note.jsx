import { Component } from "react";
import PropTypes from "prop-types";
import "./Note.css"

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentWillUnmount() {
    const delBtnEl = document.querySelector(`.delete-btn-${this.props.id}`);
    delBtnEl.removeEventListener("onclick", this.onDelete);
  }

  onDelete = (ev) => {
    if (confirm("Удалить заметку?")) {
      this.props.callback(this.props.id);
    }
    ev.preventDefault();
  }

  render() {
    const deleteSimbol = "\u2715";

    return (
      <div className={"note-container"}>
        <div className="note-body">{this.props.text}</div>
        <button className={`btn delete-btn-${this.props.id}`} onClick={this.onDelete}>{deleteSimbol}</button>
      </div>
    );
  }
}

Note.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  callback: PropTypes.func
}

