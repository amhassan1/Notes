<template>
    <div class="notes">
        <transition-group name="slide">
            <Note v-for="note in notesToShow" :note="note" :key="note.id"></Note>
            <NewNote :key="-1"></NewNote>
        </transition-group>
    </div>
</template>

<script>
    import Note from "@/components/Note";
    import NewNote from "./NewNote.vue";
    export default {
        components: {
            Note,
            NewNote,
        },
        computed: {
            notes() {
                return this.$store.getters.getNotes;
            },
            showCatagories() {
                return this.$store.getters.getShow;
            },
            notesToShow() {
                let show = this.showCatagories;
                let notes = this.notes;
                if (show.length > 0) {
                    notes = notes.filter((note) => show.includes(note.catagory));
                }
                return notes;
            },
        },
    };
</script>

<style scoped>
    .notes {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        background-color: #fff;
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 3%);
        margin: 2em 0;
        padding: 1.4em;
        border-radius: 0.8em;
    }

    /* .slide-enter-from {
        transform: translateX(200px);
        opacity: 0;
    } */

    .slide-enter-active {
        animation: fadeInLeft;
        animation-duration: 500ms;
    }

    .slide-leave-to {
        opacity: 0;
        transform: translateY(500px);
    }

    .slide-leave-active,
    .slide-move {
        transition: all 500ms ease-out;
    }

    .slide-leave-active {
        position: absolute;
    }
</style>
