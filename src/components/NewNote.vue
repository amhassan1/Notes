<template>
    <div class="note">
        <button class="btn" @click="addNote">
            <v-icon size="large">mdi-plus</v-icon><v-tooltip activator="parent">New Note</v-tooltip>
        </button>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    export default {
        methods: {
            addNote() {
                const newNote = {
                    id: this.id,
                    text: "¯\\_(ツ)_/¯",
                    catagory: this.catagory.length > 0 ? this.catagory[0] : "",
                    color: "#000000",
                    bg_color: "#EEEEEE",
                };
                this.$store.dispatch("addNote", newNote);
                this.$store.commit("setId", this.id + 1);
            },
        },
        computed: {
            ...mapGetters({ user: "getUser", catagory: "getShow", id: "getId" }),
        },
    };
</script>

<style scoped>
    .note {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        min-width: 35ch;
        min-height: 250px;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
        padding: 20px;
        margin: 10px;
        background-color: #eeeeee;
    }

    .btn {
        width: 60px;
        height: 60px;
        display: inline-block;
        border-radius: 50%;
        border: none;
    }

    .btn:hover {
        background-color: rgba(0, 0, 0, 0.06);
    }
</style>
