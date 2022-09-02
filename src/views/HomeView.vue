<template>
    <div class="home arima">
        <h2 class="text-align">Create Notes Quickly and Easily</h2>
        <h3 class="text-align">Go to <router-link to="/notes" class="link">My Notes</router-link></h3>
    </div>

    <div class="about arima">
        <h3>By Abdulaziz Hassan</h3>
        <span>Version 0.3.2</span>
        <br />
        <v-btn
            icon="mdi-github"
            size="x-large"
            variant="plain"
            href="https://github.com/amhassan1/Notes"
            target="_blank"
            :ripple="false"
        ></v-btn>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    export default {
        name: "HomeView",
        computed: {
            ...mapGetters({ user: "getUser" }),
        },
    };
</script>

<style scoped>
    h1,
    h2,
    h3,
    h4,
    h5 {
        color: #333533;
        /* text-shadow: 2px 1px black; */
    }

    .home {
        margin: 20px 0;
        display: flex;
        flex-direction: column;
    }

    .about {
        position: absolute;
        bottom: 0px;
    }

    .home * {
        padding: 10px 0;
        font-weight: normal;
    }

    .text-align {
        text-align: left;
    }

    @media screen and (max-width: 480px) {
        .text-align {
            text-align: center;
        }
    }

    .link {
        text-decoration: none;
        color: black;
        font-weight: bold;
    }

    .link:hover {
        text-decoration: underline;
    }
</style>
