<template>
    <div class="note" ref="noteDiv" :style="{ backgroundColor: note.bg_color }">
        <v-menu v-model="menu" :close-on-content-click="false">
            <template v-slot:activator="{ props }">
                <p class="category arima" v-bind="props">{{ note.catagory }}<v-icon>mdi-menu-down</v-icon></p>
            </template>
            <v-card :max-width="cardMaxWidth">
                <v-card-content>
                    <v-select
                        :items="catagories"
                        variant="plain"
                        label="Category"
                        v-model="note.catagory"
                        hide-details
                    ></v-select>
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

        <v-textarea
            class="scrollbar edu"
            v-model="note.text"
            :style="{ color: note.color }"
            variant="plain"
            bg-color="inherit"
            hide-details
            readonly
            no-resize
            auto-grow
        ></v-textarea>

        <div class="btns">
            <div>
                <button class="button delBtn" @click="delNote">
                    <v-icon size="small">mdi-delete</v-icon>
                    <v-tooltip activator="parent" location="start">Delete</v-tooltip>
                </button>
                <button class="button undoBtn" @click="undoNote" v-show="edited">
                    <v-icon size="small">mdi-undo</v-icon>
                    <v-tooltip activator="parent">Undo</v-tooltip>
                </button>
                <button class="button saveBtn" @click="updateNote" v-show="edited">
                    <v-icon size="small">mdi-content-save</v-icon>
                    <v-tooltip activator="parent">Save</v-tooltip>
                </button>
            </div>
            <div>
                <v-dialog v-model="dialog">
                    <template v-slot:activator="{ props }">
                        <button class="button" v-bind="props"><v-icon size="small">mdi-arrow-expand</v-icon></button>
                    </template>
                    <v-card :width="dialogWidth" :height="dialogHeight" :style="{ backgroundColor: note.bg_color }">
                        <v-card-content>
                            <div class="colors">
                                <color-picker
                                    v-model="note.color"
                                    :colors="fontColors"
                                    label="Font Color"
                                ></color-picker>

                                <v-divider vertical></v-divider>

                                <color-picker
                                    v-model="note.bg_color"
                                    :colors="backgroundColors"
                                    label="Note Color"
                                ></color-picker>
                            </div>

                            <v-divider></v-divider>

                            <v-textarea
                                class="edu"
                                v-model="note.text"
                                auto-grow
                                variant="plain"
                                :style="{ color: note.color }"
                            >
                            </v-textarea>
                        </v-card-content>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                @click="
                                    undoNote();
                                    dialog = false;
                                "
                                >Cancel</v-btn
                            >

                            <v-btn
                                color="primary"
                                @click="
                                    updateNote();
                                    dialog = false;
                                "
                                >Save</v-btn
                            >
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </div>
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
                dialog: false,
                menu: false,
                initText: "",
                initCategory: "",
                initColor: "",
                initBackgroundColor: "",
                cardMaxWidth: 300,
                dialogWidth: 600,
                dialogHeight: 700,
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
            media() {
                if (window.matchMedia("(max-width: 480px)").matches) {
                    this.cardMaxWidth = 200;
                    this.dialogWidth = 300;
                    this.dialogHeight = 500;
                } else {
                    this.cardMaxWidth = 300;
                    this.dialogWidth = 600;
                    this.dialogHeight = 700;
                }
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
        created() {
            this.initText = this.note.text;
            this.initCategory = this.note.catagory;
            this.initColor = this.note.color;
            this.initBackgroundColor = this.note.bg_color;
            this.media();
        },
    };
</script>

<style scoped>
    .note {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        width: 300px;
        height: 250px;
        text-align: left;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
        padding: 20px;
        margin: 10px;
        transition: background-color 200ms ease;
    }

    .colors {
        display: flex;
    }

    .category {
        font-size: x-small;
        margin: 0px;
        text-align: right;
        cursor: pointer;
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
        color: grey;
    }

    .undoBtn {
        color: black;
    }

    .saveBtn {
        color: rgb(101, 101, 255);
    }

    .button:hover {
        background-color: rgba(0, 0, 0, 0.06);
    }

    @media screen and (max-width: 480px) {
        .note {
            width: 140px;
            padding: 10px;
        }

        .catagory {
            font-size: xx-small;
        }

        .btns {
            height: 25px;
        }
        .button {
            height: 20px;
            width: 20px;
            margin: 0 4px;
        }

        .button:hover {
            background-color: inherit;
        }
    }
</style>
