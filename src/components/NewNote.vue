<template>
    <div class="note">
        <button class="btn" @click="addNote">
            <v-icon size="large">mdi-plus</v-icon><v-tooltip activator="parent">New Note</v-tooltip>
        </button>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import { emojis } from "@/emojis";
    export default {
        data() {
            return {
                list: emojis,
            };
        },
        methods: {
            addNote() {
                const newNote = {
                    id: this.id,
                    title: "",
                    text: this.list[Math.floor(Math.random() * this.list.length)],
                    category: this.category.length > 0 ? this.category[0] : "",
                    color: "#000000",
                    bg_color: "#EEEEEE",
                    size: "Small",
                };
                this.$store.dispatch("addNote", newNote);
                this.$store.commit("setId", this.id + 1);
            },
        },
        computed: {
            ...mapGetters({ user: "getUser", category: "getShow", id: "getId" }),
        },
    };
</script>

<style scoped>
    .note {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        width: 100%;
        height: 250px;
        border-radius: 10px;
        padding: 20px;
        margin: 10px;
    }

    @media screen and (max-width: 480px) {
        .note {
            height: 100px;
        }

        .btn {
            background-color: rgba(0, 0, 0, 0.06);
        }
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
