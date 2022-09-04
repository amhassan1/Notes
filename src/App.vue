<template>
    <v-app class="bg-color">
        <div>
            <Header></Header>
            <div class="wrap">
                <router-view />
            </div>
        </div>
    </v-app>
</template>

<script>
    import Header from "@/components/Header.vue";
    export default {
        name: "App",
        components: {
            Header,
        },
        methods: {
            setNotes() {
                const res = localStorage.getItem("notes");
                let data = res ? JSON.parse(res) : [];
                let id = data.length > 0 ? data[data.length - 1].id + 1 : 0;

                this.$store.commit("setId", id);
                this.$store.dispatch("initNotes", data);
            },
            setCategories() {
                const res = localStorage.getItem("categories");
                let data = res ? JSON.parse(res) : [];

                this.$store.commit("initCategories", data);
            },
        },
        created() {
            this.setNotes();
            this.setCategories();
        },
    };
</script>

<style>
    .bg-color {
        background-color: #f6f7f8;
    }

    .wrap {
        margin: auto;
        width: 90%;
    }

    .arima {
        font-family: "Arima", cursive;
    }

    .edu {
        font-family: "Edu QLD Beginner", cursive;
    }

    .arial {
        font-family: Arial, Helvetica, sans-serif;
    }

    .shrikhand {
        font-family: "Shrikhand", cursive;
    }

    /* width */
    ::-webkit-scrollbar {
        width: 2px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: inherit;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #000;
    }
</style>
