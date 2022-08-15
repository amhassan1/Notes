<template>
    <div class="note" ref="noteDiv" :style="{ backgroundColor: note.bg_color }">
        <div class="btns">
            <div>
                <button class="button delBtn" @click="delNote">
                    <v-icon size="small">mdi-close</v-icon>
                    <v-tooltip activator="parent" location="start">Delete</v-tooltip>
                </button>
                <button class="button undoBtn" @click="undoNote">
                    <v-icon size="small">mdi-undo</v-icon>
                    <v-tooltip activator="parent">Undo</v-tooltip>
                </button>
                <button class="button saveBtn" @click="updateNote" v-show="edited">
                    <v-icon size="small">mdi-content-save</v-icon>
                    <v-tooltip activator="parent">Save</v-tooltip>
                </button>
            </div>

            <v-menu v-model="menu" :close-on-content-click="false">
                <template v-slot:activator="{ props }">
                    <button class="button" v-bind="props"><v-icon size="x-small">mdi-dots-vertical</v-icon></button>
                </template>
                <v-card max-width="300">
                    <v-card-title><v-icon size="small">mdi-pencil</v-icon>&nbsp;Edit</v-card-title>
                    <v-card-content>
                        <v-select
                            :items="catagories"
                            variant="plain"
                            label="Category"
                            v-model="note.catagory"
                            hide-details
                        ></v-select>

                        <v-divider></v-divider>

                        <color-picker v-model="note.color" :colors="fontColors"></color-picker>

                        <v-divider></v-divider>

                        <color-picker v-model="note.bg_color" :colors="backgroundColors"></color-picker>
                    </v-card-content>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            @click="
                                undoNote();
                                menu = false;
                            "
                            >Cancel</v-btn
                        >

                        <v-btn
                            color="primary"
                            @click="
                                updateNote();
                                menu = false;
                            "
                            >Save</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-menu>
        </div>
        <v-textarea
            class="edu"
            v-model="note.text"
            :style="{ color: note.color }"
            auto-grow
            variant="plain"
            bg-color="inherit"
            hide-details
        ></v-textarea>
        <p class="catagory arima">{{ note.catagory }}</p>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import ColorPicker from "./ColorPicker.vue";
    export default {
        components: {
            ColorPicker,
        },
        props: {
            note: Object,
        },
        data() {
            return {
                menu: false,
                initText: "",
                initCategory: "",
                initColor: "",
                initBackgroundColor: "",
            };
        },
        methods: {
            delNote() {
                if (confirm("Are you sure you want to delete note?")) {
                    this.$store.dispatch("deleteNote", this.note.id);
                }
            },
            updateNote() {
                if (confirm("Are you sure you want to update note?")) {
                    const updtNote = {
                        id: this.note.id,
                        text: this.note.text,
                        catagory: this.note.catagory,
                        color: this.note.color,
                        bg_color: this.note.bg_color,
                    };

                    this.initText = this.note.text;
                    this.initCategory = this.note.catagory;
                    this.initColor = this.note.color;
                    this.initBackgroundColor = this.note.bg_color;

                    if (updtNote.text === "") {
                        this.$store.dispatch("deleteNote", this.note.id);
                    } else {
                        this.$store.dispatch("updateNote", updtNote);
                        this.adjustWidth();
                    }
                } else {
                    this.note.text = this.initText;
                }
            },
            undoNote() {
                this.note.text = this.initText;
                this.note.catagory = this.initCategory;
                this.note.color = this.initColor;
                this.note.bg_color = this.initBackgroundColor;
            },
            adjustWidth() {
                const noteDiv = this.$refs.noteDiv;
                let longestLineLength = this.lengthOfLongestLine(this.note.text);
                let wantedWidth = longestLineLength > 60 ? 60 : longestLineLength;
                noteDiv.style.width = longestLineLength > 35 ? wantedWidth + "ch" : "35ch";
            },
            lengthOfLongestLine(paragraph) {
                let longestLineLength = 0;
                let currentLineLength = 0;
                for (let i = 0; i < paragraph.length; i++) {
                    if (paragraph[i] !== "\n") {
                        currentLineLength++;
                    } else {
                        currentLineLength = 0;
                    }

                    if (currentLineLength > longestLineLength) {
                        longestLineLength = currentLineLength;
                    }
                }
                return longestLineLength;
            },
        },
        computed: {
            ...mapGetters({
                user: "getUser",
                catagories: "getCatagories",
                fontColors: "getNoteFontColors",
                backgroundColors: "getNoteBackgroundColors",
            }),
            edited() {
                return this.note.text !== this.initText;
            },
        },
        mounted() {
            this.adjustWidth();
        },
        created() {
            this.initText = this.note.text;
            this.initCategory = this.note.catagory;
            this.initColor = this.note.color;
            this.initBackgroundColor = this.note.bg_color;
        },
    };
</script>

<style scoped>
    .note {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        min-width: 35ch;
        min-height: 250px;
        text-align: left;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
        padding: 20px;
        margin: 10px;
        transition: background-color 200ms ease;
    }
    .catagory {
        font-size: x-small;
        margin: 0px;
        text-align: right;
    }

    .btns {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 35px;
    }

    .button {
        height: 30px;
        width: 30px;
        border-radius: 5px;
        text-align: center;
        display: inline-block;
        margin: 0 2px;
    }

    .delBtn {
        color: red;
    }

    .undoBtn {
        color: black;
    }

    .saveBtn {
        color: rgb(101, 101, 255);
    }

    button:hover {
        background-color: rgba(0, 0, 0, 0.06);
    }
</style>
