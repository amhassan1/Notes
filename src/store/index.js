import { createStore } from "vuex";
import { API } from "@/uri";

export default createStore({
    state: {
        id: 0,
        notes: [],
        catagories: ["Important", "Urgent", "School", "Family", "Friends", "House"],
        showCatagories: [],
        user: {
            id: 0,
            username: "guest",
            firstName: "",
            lastName: "",
        },
        noteFontColors: ["#000000", "#FF0000", "#00FF00", "#0000FF", "#663611", "#140585"],
        noteBackgroundColors: ["#EEEEEE", "#E9FF70", "#FFD670", "#FF9770", "#FF70A6", "#70D6FF"],
    },
    getters: {
        getId(state) {
            return state.id;
        },
        getNotes(state) {
            return state.notes;
        },
        getCatagories(state) {
            return state.catagories;
        },
        getShow(state) {
            return state.showCatagories;
        },
        getUser(state) {
            return state.user;
        },
        getNoteFontColors(state) {
            return state.noteFontColors;
        },
        getNoteBackgroundColors(state) {
            return state.noteBackgroundColors;
        },
    },
    mutations: {
        setId(state, id) {
            state.id = id;
        },
        setNotes(state, notes) {
            state.notes = notes;
        },
        addNote(state, note) {
            state.notes.push(note);
        },
        deleteNote(state, id) {
            state.notes = state.notes.filter((note) => id !== note.id);
        },
        updateNote(state, note) {
            state.notes = state.notes.map((n) => (n.id === note.id ? note : n));
        },
        setShowCatagories(state, catagories) {
            state.showCatagories = catagories;
        },
        setUser(state, user) {
            state.user = user;
            state.loggedIn = state.user.id > 0 ? true : false;
        },
        clearNotes(state) {
            state.notes = [];
        },
    },
    actions: {
        initNotes({ commit }, notes) {
            commit("setNotes", notes);
        },
        async addNote({ commit }, note) {
            let notesJson = localStorage.getItem("notes");
            let notes = notesJson ? JSON.parse(notesJson) : [];

            notes.push(note);

            localStorage.setItem("notes", JSON.stringify(notes));

            commit("addNote", note);
        },
        async deleteNote({ commit }, id) {
            let notesJson = localStorage.getItem("notes");
            let notes = JSON.parse(notesJson);

            notes = notes.filter((note) => id !== note.id);

            localStorage.setItem("notes", JSON.stringify(notes));

            commit("deleteNote", id);
            commit("setId", notes.length > 0 ? notes[notes.length - 1].id + 1 : 0);
        },
        async updateNote({ commit }, note) {
            let notesJson = localStorage.getItem("notes");
            let notes = JSON.parse(notesJson);

            notes = notes.map((n) => (n.id === note.id ? note : n));

            localStorage.setItem("notes", JSON.stringify(notes));

            commit("updateNote", note);
        },
        addUser({ commit }, user) {
            commit("setUser", user);
        },
    },
    modules: {},
});
