import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";

const Home = () => {
    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState("")



    const getNotes = async () => {
        try {
            const res = await api.get("notes/")
            setNotes(res.data)
        } catch (err) {
            console.log(err)
            alert(err)
        } 
    }

    useEffect(() => {
        getNotes()
    }, [])

    const deleteNote = (id) => {
        api.delete(`notes/${id}/`).then((res) => {
            if (res.status == 204) alert("Note Deleted")
            else alert("Failed to delete note.")
            getNotes()
        })
        console.log(id)
    }


  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <h2>Create a Note</h2>
      <form >
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="content">Content:</label>
        <br />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
};

export default Home;
