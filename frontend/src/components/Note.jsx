import PropsTypes from "prop-types";
import "../styles/Note.css";
import { useState } from "react";

const Note = ({ note, onDelete, onUpdate }) => {
  const formattedDate = new Date(note.created).toLocaleDateString();
  const [newTitle, setNewTitle] = useState("")

  return (
    <div className="note-container">
      <p className="note-title">{note.title}</p>
      <p className="note-content">{note.content}</p>
      <p className="note-date">{formattedDate}</p>
      <button className="delete-button" onClick={() => onDelete(note.id)}>
        Delete
      </button>
      <br />
      <br />
      <input onChange={(e) => setNewTitle(e.target.value)} value={newTitle} type="text" />
      <button onClick={() => onUpdate(note.id, newTitle, setNewTitle)} className="update-button">
        Update Note
      </button>
    </div>
  );
};

Note.propTypes = {
  note: PropsTypes.object,
  onDelete: PropsTypes.func,
  onUpdate: PropsTypes.func,
};

export default Note;
