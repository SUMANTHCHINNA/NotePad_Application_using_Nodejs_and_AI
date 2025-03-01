// src/Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import "../index.css";

const Home = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get("https://notepad-application-using-nodejs-and-ai-4.onrender.com/note/all");
                if (Array.isArray(response.data.data)) {
                    setNotes(response.data.data);
                } else {
                    console.error("Unexpected response format:", response.data);
                    setNotes([]);
                }
            } catch (error) {
                console.error("Error fetching notes:", error);
                setNotes([]);
            }
        };

        fetchNotes();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://notepad-application-using-nodejs-and-ai-4.onrender.com/note/delete/${id}`);
            setNotes(notes.filter(note => note._id !== id));
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    return (
        <div className="NoteList">
            {notes.length === 0 ? (
                <p>No notes available</p>
            ) : (
                notes.map((note) => (
                    <div key={note._id} className="NoteItem">
                        <p>{note.note}</p>
                        <div className="NoteActions">
                            <button className="EditButton">
                                <FaEdit /> Edit
                            </button>
                            <button className="DeleteButton" onClick={() => handleDelete(note._id)}>
                                <FaTrash /> Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Home;