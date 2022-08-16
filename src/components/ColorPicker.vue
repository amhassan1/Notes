<template>
    <v-radio-group v-model="colorValue" inline hide-details>
        <v-radio v-for="color in colors" :value="color" :color="color"
            ><template v-slot:label>
                <div class="colorPicker" :style="{ backgroundColor: color }"></div>
            </template>
        </v-radio>
    </v-radio-group>
</template>

<script>
    export default {
        props: { colorValue: String, colors: Array },
    };
</script>

<style scoped>
    .colorPicker {
        min-width: 45px;
        min-height: 18px;
        border-radius: 3px;
        border: 1px solid black;
    }

    @media screen and (max-width: 480px) {
        .colorPicker {
            min-width: 16px;
            min-height: 16px;
            border-radius: 3px;
        }
    }
</style>
