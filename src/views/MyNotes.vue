<template>
    <div class="myNotes">
        <div class="forms">
            <div class="sticky">
                <note-sort></note-sort>
                <notes-header class="add-form"></notes-header>
            </div>
        </div>
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
            NotesHeader,
        },
        computed: {
            ...mapGetters({ getUser: "getUser" }),
        },
    };
</script>

<style scoped>
    .myNotes {
        display: grid;
        grid-template-columns: 250px 1fr;
        column-gap: 20px;
    }

    .sticky {
        position: sticky;
        top: 30px;
    }

    @media screen and (max-width: 480px) {
        .myNotes {
            grid-template-columns: 95vw;
            justify-content: center;
        }

        .sticky {
            position: relative;
        }

        .add-form {
            display: none;
        }
    }
</style>
