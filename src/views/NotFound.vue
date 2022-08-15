<template>
    <div class="flex">
        <div class="note edu" id="first">
            <p id="text">
                <span class="not_found">404: Page Not Found</span>Go Back to
                <router-link to="/notes" class="link">Notes</router-link>
            </p>
        </div>
        <div class="note edu" id="second">
            <p id="text">{{ note }}</p>
        </div>
    </div>
</template>

<script>
    import { quotes } from "@/quotes";
    export default {
        data() {
            return {
                notes: quotes,
                note: "",
            };
        },
        created() {
            let i = Math.floor(Math.random() * this.notes.length);
            this.note = this.notes[i];
        },
        beforeRouteLeave() {
            this.note = "";
        },
    };
</script>

<style scoped>
    .flex {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .not_found {
        display: block;
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .link {
        text-decoration: none;
        color: black;
        font-weight: bold;
    }

    .link:hover {
        text-decoration: underline;
    }

    .note {
        display: inline-block;
        width: 300px;
        height: 250px;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
        background-color: #e9ff70;
        text-align: center;
        margin-top: 60px;
        overflow: hidden;
    }

    .note:first-child {
        margin-top: 0px;
    }

    #text {
        margin-top: 20px;
        font-size: 18px;
        padding: 0 15px;
        word-wrap: break-word;
    }

    .note:nth-child(odd) {
        background-color: #e9ff70;
        transform: translateX(50px) rotate(10deg);
    }
    .note:nth-child(even) {
        background-color: #ffd670;
        transform: translateX(-20px) rotate(-8deg);
    }
</style>
