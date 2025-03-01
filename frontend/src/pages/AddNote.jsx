import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineCheckCircle } from "react-icons/ai"; // Importing icon
import "react-toastify/dist/ReactToastify.css";

const AddNote = () => {
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);

    const checkGrammar = async () => {
        if (!note.trim()) {
            toast.error("Enter some text to check grammar!");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("https://notepad-application-using-nodejs-and-ai-4.onrender.com/note/grammar-check", { text: note });
            let correctedText = response.data.corrected || "No corrections needed.";

            correctedText = correctedText.replace(/^"|"$/g, "").trim();

            setNote(correctedText);
            toast.success("Grammar check completed!");
        } catch (error) {
            console.error("Error checking grammar:", error);
            toast.error("Failed to check grammar");
        } finally {
            setLoading(false);
        }
    };


    const handleAddNote = async (e) => {
        e.preventDefault();
        try {
            if (!note.trim()) {
                toast.error("Note cannot be empty!");
                return;
            }

            const response = await axios.post(
                "https://notepad-application-using-nodejs-and-ai-4.onrender.com/note/add",
                { data: note },
                { headers: { "Content-Type": "application/json" } }
            );

            console.log(response);
            toast.success(`Success: ${response.data.message}`);
            setNote("");

        } catch (error) {
            toast.error(`Error in Adding Notes: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="AddNote">
            <ToastContainer position="top-right" autoClose={3000} />
            <form onSubmit={handleAddNote}>
                <textarea
                    className="note-area"
                    placeholder="Enter note here..."
                    rows="4"
                    cols="50"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                ></textarea><br />

                <button type="button" onClick={checkGrammar} disabled={loading} className="check-grammar">
                    {loading ? "Checking..." : <><AiOutlineCheckCircle /> Check Grammar</>}
                </button><br />

                <button className="Add-Button" type="submit">Add Note</button>
            </form>
        </div>
    );
};

export default AddNote;
