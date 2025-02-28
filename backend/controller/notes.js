const { addNote, getAllData, getSolo, updateNote, DeleteSoloNote } = require("../model/index");

const createNotes = async (req, res) => {
    try {
        const { data } = req.body;
        if (!data) {
            return res.status(400).json({ status: false, message: "Note content is required" });
        }

        const add = await addNote(data);
        res.status(201).json({ status: true, message: "Note added successfully", data: add });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

const getAllNotes = async (req, res) => {
    try {
        const data = await getAllData();

        if (!Array.isArray(data)) {
            return res.status(500).json({ status: false, message: "Invalid data format from database" });
        }

        res.status(200).json({ status: true, data }); // Ensuring data is always an array
    } catch (error) {
        res.status(500).json({ status: false, message: error.message, data: [] });
    }
};

const getOneNote = async (req, res) => {
    try {
        const id = req.params.id;
        const solo = await getSolo(id);

        if (!solo) {
            return res.status(404).json({ status: false, message: "Note not found" });
        }

        res.status(200).json({ status: true, data: solo });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

const updateNotes = async (req, res) => {
    try {
        const id = req.params.id;
        const { data } = req.body;

        if (!data) {
            return res.status(400).json({ status: false, message: "Updated content is required" });
        }

        const update = await updateNote(id, data);
        res.status(200).json({ status: true, message: "Note updated successfully", data: update });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

const deleteNote = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteOneNote = await DeleteSoloNote(id);

        if (!deleteOneNote) {
            return res.status(404).json({ status: false, message: "Note not found" });
        }

        res.status(200).json({ status: true, message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

module.exports = {
    createNotes,
    getAllNotes,
    getOneNote,
    updateNotes,
    deleteNote
};
