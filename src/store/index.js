import { createStore } from "vuex";

export default createStore({
    state: {
        id: 0,
        notes: [],
        categories: ["Important", "Urgent", "School", "Family", "Friends", "House"],
        showCategories: [],
        user: {
            id: 0,
            username: "guest",
            firstName: "",
            lastName: "",
        },
        noteFontColors: ["#000000", "#FF0000", "#00FF00", "#0000FF", "#663611", "#140585", "#FFFFFF", "#00FFFF"],
        noteBackgroundColors: [
            "#EEEEEE",
            "#CDC392",
            "#E9FF70",
            "#FFD670",
            "#FF9770",
            "#FC5130",
            "#FF70A6",
            "#FAA6FF",
            "#70D6FF",
            "#642CA9",
            "#454E9E",
            "#21A179",
            "#5CFF92",
        ],
    },
    getters: {
        getId(state) {
            return state.id;
        },
        getNotes(state) {
            return state.notes;
        },
        getCategories(state) {
            return state.categories;
        },
        getShow(state) {
            return state.showCategories;
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
        initCategories(state, categories) {
            state.categories.push(...categories);
        },
        addCategory(state, category) {
            state.categories.push(category);
        },
        setShowCategories(state, categories) {
            state.showCategories = categories;
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
        addNote({ commit }, note) {
            let notesJson = localStorage.getItem("notes");
            let notes = notesJson ? JSON.parse(notesJson) : [];

            notes.push(note);

            localStorage.setItem("notes", JSON.stringify(notes));

            commit("addNote", note);
        },
        deleteNote({ commit }, id) {
            let notesJson = localStorage.getItem("notes");
            let notes = JSON.parse(notesJson);

            notes = notes.filter((note) => id !== note.id);

            localStorage.setItem("notes", JSON.stringify(notes));

            commit("deleteNote", id);
            commit("setId", notes.length > 0 ? notes[notes.length - 1].id + 1 : 0);
        },
        updateNote({ commit }, note) {
            let notesJson = localStorage.getItem("notes");
            let notes = JSON.parse(notesJson);

            notes = notes.map((n) => (n.id === note.id ? note : n));

            localStorage.setItem("notes", JSON.stringify(notes));

            commit("updateNote", note);
        },
        addUser({ commit }, user) {
            commit("setUser", user);
        },
        addCategory({ commit }, category) {
            let categoriesJson = localStorage.getItem("categories");
            let categories = categoriesJson ? JSON.parse(categoriesJson) : [];

            categories.push(category);

            localStorage.setItem("categories", JSON.stringify(categories));

            commit("addCategory", category);
        },
    },
    modules: {},
});
