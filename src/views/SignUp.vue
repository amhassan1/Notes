<template>
    <div class="signup-wrap">
        <div class="signup-form">
            <v-form ref="form" v-model="valid">
                <v-text-field
                    label="First Name"
                    variant="outlined"
                    v-model="firstName"
                    required
                    :rules="[(v) => !!v || 'required']"
                ></v-text-field>

                <v-text-field
                    label="Last Name"
                    variant="outlined"
                    v-model="lastName"
                    required
                    :rules="[(v) => !!v || 'required']"
                ></v-text-field>

                <v-text-field
                    label="Username"
                    variant="outlined"
                    v-model="username"
                    required
                    :rules="[(v) => !!v || 'required']"
                ></v-text-field>

                <v-text-field
                    variant="outlined"
                    label="Password"
                    v-model="password"
                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append-inner="showPassword = !showPassword"
                    required
                    :rules="[
                        (v) => !!v || 'required',
                        (v) => (v && v.length >= 4) || 'Name must be at least 4 characters',
                    ]"
                ></v-text-field>
                <v-btn color="primary" rounded="0" @click="signup" :disabled="!valid">Sign Up</v-btn>
            </v-form>
            <small class="small-text">Already a User? <router-link to="/login">Log In</router-link></small>
        </div>
    </div>
</template>

<script>
    import { API } from "@/uri.js";
    export default {
        data() {
            return {
                valid: false,
                showPassword: false,
                firstName: "",
                lastName: "",
                username: "",
                password: "",
            };
        },
        methods: {
            async signup() {
                const newUser = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    username: this.username,
                    password: this.password,
                };

                const res = await fetch(`${API}/users`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newUser),
                });

                const data = await res.json();

                if (res.status === 201) {
                    this.$store.dispatch("addUser", data);
                    localStorage.setItem("user", JSON.stringify(data));
                    this.$router.push("/");
                }
                this.$refs.form.reset();
                this.$refs.form.resetValidation();
            },
        },
    };
</script>

<style scoped>
    .signup-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 30px;
    }

    .signup-form {
        max-width: 500px;
        width: 50%;
        display: grid;
        padding: 20px;
    }

    .small-text {
        padding: 20px 0;
    }
</style>
