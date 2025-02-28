const notes = require('./notes');

const addNote = async (data) => {
    try {
        const newNote = await notes.create({ note: data });
        return newNote;
    } catch (error) {
        throw new Error(`Error in addNote: ${error.message}`);
    }
};

const getAllData = async () => {
    try {
        const result = await notes.find();
        return Array.isArray(result) ? result : []; // Ensuring it always returns an array
    } catch (error) {
        throw new Error(`Error in getAllData: ${error.message}`);
    }
};

const getSolo = async (id) => {
    try {
        return await notes.findById(id);
    } catch (error) {
        throw new Error(`Error in getSolo: ${error.message}`);
    }
};

const updateNote = async (id, data) => {
    try {
        return await notes.findByIdAndUpdate(id, { $set: { note: data } }, { new: true });
    } catch (error) {
        throw new Error(`Error in updateNote: ${error.message}`);
    }
};

const DeleteSoloNote = async (id) => {
    try {
        return await notes.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Error in DeleteSoloNote: ${error.message}`);
    }
};

module.exports = {
    addNote,
    getAllData,
    getSolo,
    updateNote,
    DeleteSoloNote
};
