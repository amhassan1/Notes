<template>
    <div class="filter">
        <div class="filterSelect">
            <v-select
                label="Filter By"
                multiple
                :items="catagories"
                v-model="filterList"
                chips
                variant="outlined"
                hide-details
                @update:model-value="showCatagories"
                clearable
            >
            </v-select>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    export default {
        data() {
            return {
                filterList: [],
            };
        },
        computed: {
            ...mapGetters({ catagories: "getCatagories" }),
        },
        methods: {
            showCatagories() {
                this.$store.commit("setShowCatagories", this.filterList);
            },
        },
    };
</script>

<style scoped>
    .filter {
        display: flex;
        background-color: #fff;
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 3%);
        border-radius: 0.8em;
        margin: 2em 0;
        justify-content: space-evenly;
    }

    .filterSelect {
        width: 70%;
        margin: 1em;
    }
</style>
