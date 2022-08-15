<template>
    <div class="login-wrap">
        <div class="login-form">
            <v-text-field label="Username" variant="outlined" v-model="username" :error-messages="error"></v-text-field>
            <v-text-field
                label="Password"
                variant="outlined"
                v-model="password"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append-inner="showPassword = !showPassword"
                :error-messages="error"
            ></v-text-field>
            <v-btn variant="flat" color="primary" @click="login">Log In</v-btn>
            <small>Not a user? <router-link to="/signup">Sign Up</router-link></small>
        </div>
    </div>
</template>

<script>
    import { API } from "@/uri";
    export default {
        data() {
            return {
                username: "",
                password: "",
                error: "",
                showPassword: false,
            };
        },
        methods: {
            async login() {
                const res = await fetch(`${API}/users?username=${this.username}&password=${this.password}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await res.json();

                if ((res.status === 200) & (data.length > 0)) {
                    this.$store.commit("setUser", data[0]);
                    localStorage.setItem("user", JSON.stringify(data[0]));
                    this.$router.push("/");
                } else {
                    this.username = "";
                    this.password = "";
                    this.error = "Invalid Credentials";
                }
            },
        },
    };
</script>

<style scoped>
    .login-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 30px;
        height: 50vh;
    }
    .login-form {
        max-width: 450px;
        min-width: 200px;
        width: 50%;
        display: grid;
        grid-template-rows: 1fr 1fr 1fr;
    }
</style>
