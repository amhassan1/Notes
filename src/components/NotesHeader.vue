<template>
    <div id="noteHeader">
        <ul>
            <li class="noteText form-list-item">
                <v-textarea
                    v-model="note.text"
                    label="Text"
                    id="noteTextInput"
                    rows="1"
                    auto-grow
                    bg-color="inherit"
                    hide-details
                    variant="underlined"
                ></v-textarea>
            </li>
            <li class="form-list-item">
                <v-select
                    v-model="note.category"
                    variant="underlined"
                    :items="categories"
                    :style="{ width: '100%' }"
                    label="Tag"
                    hide-details
                >
                </v-select>
            </li>
            <li class="form-list-item">
                <v-select
                    v-model="note.size"
                    variant="underlined"
                    :items="Object.keys(sizes)"
                    :style="{ width: '100%' }"
                    label="Size"
                    hide-details
                >
                </v-select>
            </li>
            <li class="form-list-item">
                <color-picker v-model="note.color" :colors="fontColors" label="Font Color"></color-picker>
            </li>
            <li class="form-list-item">
                <color-picker v-model="note.bg_color" :colors="backgroundColors" label="Note Color"></color-picker>
            </li>
            <li class="form-list-item">
                <button @click="addNote" id="add"><v-icon>mdi-plus</v-icon>Add Note</button>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import ColorPicker from "./ColorPicker.vue";
    export default {
        components: {
            ColorPicker,
        },
        data() {
            return {
                note: {
                    title: "",
                    text: "",
                    category: "",
                    color: "#000000",
                    bg_color: "#EEEEEE",
                    size: "",
                },
            };
        },
        methods: {
            addNote() {
                if (this.note.text === "") {
                    alert("Add Text");
                    return;
                }

                const newNote = { id: this.id, ...this.note };
                this.$store.dispatch("addNote", newNote);
                this.$store.commit("setId", this.id + 1);

                this.note.text = "";
                this.note.category = "";
                this.note.color = this.fontColors[0];
                this.note.bg_color = this.backgroundColors[0];
            },
        },
        computed: {
            ...mapGetters({
                categories: "getCategories",
                sizes: "getNoteSizes",
                fontColors: "getNoteFontColors",
                backgroundColors: "getNoteBackgroundColors",
                id: "getId",
            }),
        },
    };
</script>

<style scoped>
    #noteHeader {
        background-color: #fff;
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 3%);
        min-width: fit-content;
        border-radius: 0.8em;
        margin: 2em 0;
    }

    #noteHeader ul {
        display: flex;
        flex-direction: column;
        list-style: none;
        margin: 0px;
        padding: 5px 10px;
        align-items: center;
    }

    #noteHeader li {
        display: inline-block;
        margin: 5px;
        margin-bottom: 15px;
        min-height: 40px;
    }

    #noteTextInput {
        width: 100%;
    }

    .form-list-item {
        width: 50%;
        min-width: 200px;
    }

    @media screen and (max-width: 480px) {
        .form-list-item {
            min-width: 80%;
        }
    }

    #add {
        display: block;
        width: 100%;
        height: 40px;
        cursor: pointer;
        border-radius: 5px;
    }

    #add:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
</style>
