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
    };
</script>

<style>
    .bg-color {
        background-color: #f6f7f8;
    }

    .wrap {
        margin: auto;
        width: 90%;
        max-width: 1200px;
    }

    .arima {
        font-family: "Arima", cursive;
    }

    .edu {
        font-family: "Edu QLD Beginner", cursive;
    }
</style>
