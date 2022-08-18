<template>
    <div class="myNotes">
        <note-sort></note-sort>
        <notes-page></notes-page>
    </div>
</template>

<script>
    import NotesHeader from "@/components/NotesHeader";
    import NotesPage from "@/components/NotesPage";
    import NoteSort from "@/components/NoteSort";
    import { mapGetters } from "vuex";

    export default {
        components: {
            NotesHeader,
            NotesPage,
            NoteSort,
        },
        computed: {
            ...mapGetters({ getUser: "getUser" }),
        },
        created() {
            const res = localStorage.getItem("notes");
            let data = res ? JSON.parse(res) : [];
            let id = data.length > 0 ? data[data.length - 1].id + 1 : 0;

            this.$store.commit("setId", id);
            this.$store.dispatch("initNotes", data);
        },
    };
</script>
