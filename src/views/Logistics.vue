<template>
    <div class="container">
        <h3 class="mx-sm-3 mt-4">Welcome, register a freight:</h3>
        <div class="wrapper">
            <form-freight></form-freight>
        </div>
    </div>
</template>
<script>
import FreightForm from '../components/FreightForm.vue'

export default {
    name: 'producer',
        components: {
            'form-freight': FreightForm
        }
    }
</script>
<style scoped>
.wrapper {
    width: 300px;
    padding-left: 20px;
    padding-top: 5px;
}
</style>