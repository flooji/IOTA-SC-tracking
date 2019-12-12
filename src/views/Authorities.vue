<template>
    <div class="container">
        <div class="row">
                <div class="panel">
                        <h1>Welcome!</h1>
                        <h2>Track devices with DLT-secured GNSS-data in real-time</h2>
                </div>
                <tom-tom></tom-tom>
        </div>
    </div>
</template>
<script>
import TomTom from '../components/TomTom.vue'
export default {
    name: 'authorities',
    components: {
        'tom-tom': TomTom
    },
    data() {
        return {
        }
    }
}
</script>
<style scoped>
.background {
    text-align: center;
    margin: auto;
}
</style>