<template>
    <div class="myNotes">
        <div class="controls">
            <div class="sticky">
                <note-sort></note-sort>
                <notes-header></notes-header>
            </div>
        </div>
        <notes-page></notes-page>
    </div>
</template>

<script>
    import NotesHeader from "@/components/NotesHeader";
    import NotesPage from "@/components/NotesPage";
    import NoteSort from "@/components/NoteSort";
    import { API } from "@/uri";
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
        async created() {
            const res = localStorage.getItem("notes");
            let data = res ? JSON.parse(res) : [];
            let id = data.length > 0 ? data[data.length - 1].id + 1 : 0;

            this.$store.commit("setId", id);
            this.$store.dispatch("initNotes", data);
        },
    };
</script>

<style scoped>
    .myNotes {
        display: grid;
        grid-template-columns: 250px 1fr;
        column-gap: 40px;
    }

    .sticky {
        position: sticky;
        top: 30px;
    }
</style>
