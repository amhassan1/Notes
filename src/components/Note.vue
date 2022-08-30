<template>
    <div class="note" ref="noteDiv" :style="{ backgroundColor: note.bg_color }">
        <v-menu v-model="menu" :close-on-content-click="false">
            <template v-slot:activator="{ props }">
                <p class="category arima" v-bind="props">
                    {{ note.category }} <span v-show="note.category === ''" class="font-weight-bold">Category</span
                    ><v-icon>mdi-menu-down</v-icon>
                </p>
            </template>
            <v-card :max-width="cardMaxWidth">
                <v-list>
                    <v-list-item v-for="category in categories" :value="category" @click="select(category)">{{
                        category
                    }}</v-list-item>
                    <v-list-item-action>
                        <v-spacer v-if="!showField"></v-spacer>
                        <v-btn v-if="!showField" icon="mdi-plus" variant="plain" @click="showField = true"></v-btn>
                        <v-text-field
                            v-else
                            autofocus
                            density="compact"
                            placeholder="Add Category"
                            hide-details
                            variant="outlined"
                            @keyup.enter="addCategory"
                            @blur="showField = false"
                        ></v-text-field>
                        <v-spacer v-if="!showField"></v-spacer>
                    </v-list-item-action>
                </v-list>
            </v-card>
        </v-menu>

        <h3 class="edu" :style="{ color: note.color }" v-show="note.title !== ''">{{ note.title }}</h3>

        <v-textarea
            class="edu"
            v-model="note.text"
            :style="{ color: note.color }"
            variant="plain"
            bg-color="inherit"
            hide-details
            readonly
            no-resize
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
                                <v-menu v-model="fontColorMenu" :close-on-content-click="false">
                                    <template v-slot:activator="{ props }">
                                        <v-btn class="colorBtns" icon v-bind="props" :color="note.color" elevation="0">
                                            <v-icon :color="note.color === '#000000' ? '#FFFFFF' : '#000000'"
                                                >mdi-format-color-text</v-icon
                                            >
                                        </v-btn>
                                    </template>
                                    <v-card max-width="400">
                                        <color-picker
                                            v-model="note.color"
                                            :colors="fontColors"
                                            label="Font Color"
                                        ></color-picker
                                    ></v-card>
                                </v-menu>

                                <v-menu v-model="noteColorMenu" :close-on-content-click="false">
                                    <template v-slot:activator="{ props }">
                                        <v-btn
                                            class="colorBtns"
                                            icon
                                            v-bind="props"
                                            :color="note.bg_color"
                                            elevation="0"
                                        >
                                            <v-icon>mdi-format-color-fill</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-card max-width="400">
                                        <color-picker
                                            v-model="note.bg_color"
                                            :colors="backgroundColors"
                                            label="Note Color"
                                        ></color-picker></v-card
                                ></v-menu>
                            </div>

                            <v-text-field
                                class="font-weight-bold"
                                variant="plain"
                                v-model="note.title"
                                hide-details
                                placeholder="Title"
                                :style="{ color: note.color }"
                            ></v-text-field>

                            <v-textarea
                                class="edu"
                                v-model="note.text"
                                auto-grow
                                hide-details
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
                fontColorMenu: false,
                noteColorMenu: false,
                showField: false,
                initTitle: "",
                initText: "",
                initCategory: "",
                initColor: "",
                initBackgroundColor: "",
                cardMaxWidth: 200,
                dialogWidth: 600,
                dialogHeight: 700,
            };
        },
        methods: {
            addCategory(e) {
                e.preventDefault();
                this.showField = false;
                if (e.target.value !== "") {
                    this.$store.dispatch("addCategory", e.target.value);
                }
            },
            select(category) {
                this.note.category = category;
            },
            delNote() {
                if (confirm("Are you sure you want to delete note?")) {
                    this.$store.dispatch("deleteNote", this.note.id);
                }
            },
            updateNote() {
                if (confirm("Are you sure you want to update note?")) {
                    const updtNote = {
                        id: this.note.id,
                        title: this.note.title,
                        text: this.note.text,
                        category: this.note.category,
                        color: this.note.color,
                        bg_color: this.note.bg_color,
                    };
                    this.initTitle = this.note.title;
                    this.initText = this.note.text;
                    this.initCategory = this.note.category;
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
                this.note.title = this.initTitle;
                this.note.text = this.initText;
                this.note.category = this.initCategory;
                this.note.color = this.initColor;
                this.note.bg_color = this.initBackgroundColor;
            },
            media() {
                if (window.matchMedia("(max-width: 480px)").matches) {
                    this.dialogWidth = 300;
                    this.dialogHeight = 600;
                } else {
                    this.dialogWidth = 600;
                    this.dialogHeight = 700;
                }
            },
        },
        computed: {
            ...mapGetters({
                user: "getUser",
                categories: "getCategories",
                fontColors: "getNoteFontColors",
                backgroundColors: "getNoteBackgroundColors",
            }),
            edited() {
                return (
                    this.note.text !== this.initText ||
                    this.note.title !== this.initTitle ||
                    this.note.category !== this.initCategory
                );
            },
        },
        created() {
            this.initTitle = this.note.title;
            this.initText = this.note.text;
            this.initCategory = this.note.category;
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
        height: 300px;
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

    .colorBtns {
        margin: 0 5px;
        border: 1px black solid;
    }

    @media screen and (max-width: 480px) {
        .note {
            width: 140px;
            padding: 10px;
        }

        .category {
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
