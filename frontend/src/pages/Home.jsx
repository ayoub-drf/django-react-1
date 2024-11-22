import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css"

const Home = () => {
    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState("")



    const getNotes = async () => {
        try {
            const res = await api.get("notes/")
            setNotes(res.data)
        } catch (err) {
            console.log(err)
        } 
    }

    useEffect(() => {
        getNotes()

    }, [])

    const updateNote = async (id, newTitle, setNewTitle) => {
      const noteID = String(id);

      try {
        const res = await api.put(`notes/update/${noteID}/`, {title: newTitle})
        if (res.status == 200) {
          getNotes()
          setNewTitle("")
        }

      } catch (err) {
        console.log(err)
      }

    }
    const deleteNote = async (id) => {
      const noteID = String(id);
      // console.log(noteID)
      try {
        const res = await api.delete(`notes/${noteID}/`)
        if (res.status == 204) {
          getNotes()
        }
      } catch (err) {
        console.log(err)
      }
    };

    const createNote = async (e) => {
      e.preventDefault();

      try {
        const res = await api.post("notes/", { title });
        if(res.status == 201) {
          getNotes()
        }
      } catch (err) {
        console.log(err)
      }

    }


  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onUpdate={updateNote} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
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
