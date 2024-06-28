import { Component } from "react";
import Note from "../note/Note";
import './Notes.css'

export default class Notes extends Component {

  componentDidMount() {
    this.loadNotes();
    const inputEl = document.querySelector(".note-text");
    inputEl.focus();
  }

  componentDidUpdate() {
    const nodeListEl = document.querySelector(".notes-list");
    nodeListEl.scrollTo(0, nodeListEl.scrollHeight);
  }

  componentWillUnmount() {
    const formEl = document.querySelector(".new-note-form");
    formEl.removeEventListener("onsubmit", this.onSubmitHandler);
    const updBtnEl = document.querySelector(".new-note-form");
    updBtnEl.removeEventListener("onclick", this.onRefresh);
  }

  onSubmitHandler = (ev) => {
    const inputEl = ev.target.querySelector(".note-text");
    this.saveNote({ id: 0, text: inputEl.value });
    inputEl.value = "";
    inputEl.focus();
    ev.preventDefault();
  }

  async saveNote(note) {
    const data = JSON.stringify(note);
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_NOTES_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: data
      });
      if (!response.ok) {
        alert(`Ошибка доступа к серверу: ${response.status}`);
        this.setState({ notes: [] });
        return;
      }
      this.loadNotes();
    } catch (e) {
      alert(`Ошибка доступа к серверу: ${e.message}`);
      this.setState({ notes: [] });
    }
  }

  async loadNotes() {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_NOTES_URL}`);
      if (response.ok) {
        const notes = await response.json();
        this.setState({ notes: notes });
      } else {
        alert(`Ошибка доступа к серверу: ${response.status}`);
        this.setState({ notes: [] });
      }
    } catch (e) {
      alert(`Ошибка доступа к серверу: ${e.message}`);
      this.setState({ notes: [] });
    }
  }

  async onDeleteNote(id) {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_NOTES_URL}/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        alert(`Ошибка доступа к серверу: ${response.status}`);
        this.setState({ notes: [] });
        return;
      }

      this.loadNotes();
    } catch (e) {
      alert(`Ошибка доступа к серверу: ${e.message}`);
      this.setState({ notes: [] });
    }
  }

  onRefresh = () => {
    this.loadNotes();
  }

  render() {
    const addSimbol = "\u25ba";

    let notes = [];
    if (this.state) {
      notes = this.state.notes;
    }

    return (
      <div className="notes-container">
        <div className="notes-header">
          <div className="notes-header-label">Notes</div>
          <button className="btn update-btn" onClick={this.onRefresh}>🔄</button>
        </div>
        <div className="notes-list">
          {notes.map((el) => <Note key={el.id} id={el.id} text={el.text} callback={this.onDeleteNote.bind(this)}></Note>)}
        </div>
        <form className="new-note-form" onSubmit={this.onSubmitHandler}>
          <label htmlFor="notetext" className="note-label">New Note</label>
          <div className="note-input">
            <textarea required id="notetext" className="note-text" name="text" />
            <button className="btn add-btn" type="submit">{addSimbol}</button>
          </div>
        </form>
      </div>
    );
  }
}
