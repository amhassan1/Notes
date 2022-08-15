<template>
    <div class="nav">
        <div class="nav-left">
            <ul class="arima">
                <li>
                    <router-link to="/"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-pen"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
                            />
                        </svg>
                        Notes</router-link
                    >
                </li>

                <li><router-link :to="'/notes'">My Notes</router-link></li>

                <li><router-link to="/about">About</router-link></li>
            </ul>
        </div>
        <div class="nav-right">
            <ul></ul>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    export default {
        computed: {
            ...mapGetters({ user: "getUser" }),
        },
    };
</script>

<style scoped>
    a {
        text-decoration: none;
        color: black;
        font-size: 1.6rem;
    }

    .nav {
        display: flex;
        background-color: #fff;
        padding: 1rem;
        justify-content: center;
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 3%);
    }

    .nav ul {
        display: flex;
        align-items: center;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .nav li {
        display: inline-block;
        padding: 0.4em;
        margin: 0 1em;
    }

    .nav-right,
    .nav-left {
        width: 50%;
        display: flex;
    }

    .nav-left {
        justify-content: flex-start;
    }

    .nav-right {
        justify-content: flex-end;
    }
</style>
