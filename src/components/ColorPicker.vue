<template>
    <v-radio-group v-model="colorValue" inline hide-details :label="label" class="colorPicker">
        <v-radio v-for="color in colors" :value="color"
            ><template v-slot:label>
                <div class="color" :style="{ backgroundColor: color }"></div>
            </template>
        </v-radio>
    </v-radio-group>
</template>

<script>
    export default {
        props: { colorValue: String, colors: Array, label: String },
    };
</script>

<style scoped>
    .colorPicker {
        padding-left: 5px;
    }
    .color {
        width: 25px;
        height: 18px;
        border-radius: 3px;
        border: 1px solid black;
    }

    @media screen and (max-width: 480px) {
        .color {
            width: 16px;
            height: 16px;
            border-radius: 3px;
        }
    }
</style>
