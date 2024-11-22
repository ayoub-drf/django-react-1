import PropsTypes from "prop-types"

const Note = ({ note, onDelete }) => {
const formattedDate = new Date(note.created).toLocaleDateString()

  return (
    <div className="note-container">
            <p className="note-title">{note.title}</p>
            <p className="note-content">{note.content}</p>
            <p className="note-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(note.id)}>
                Delete
            </button>
        </div>
  )
}

Note.propTypes = {
    note: PropsTypes.object,
    onDelete: PropsTypes.func,
}

export default Note;