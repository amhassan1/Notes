<template>
    <div class="home arima">
        <h3 class="text-align">Create Notes Quickly and Easily</h3>
        <h4 class="text-align">Go to <router-link to="/notes" class="link">My Notes</router-link></h4>
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
        padding: 0 20px;
        display: flex;
        flex-direction: column;
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
