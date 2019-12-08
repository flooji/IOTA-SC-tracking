<template>
    <div class="background">
        <ul class="nav nav-pills flex-column flex-sm-row">
            <li class="nav-item">
                <router-link class="nav-link" to="/producer">Producer</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/logistics">Logistics</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/authorities">Authorities</router-link>
            </li>
        </ul>
        <img alt="parcel" src="../assets/logo.png">
    </div>
</template>
<script>
export default {
  name: 'home'
}
</script>
<style scoped>
.background {
    background: rgb(81, 221, 165);
    text-align: center;
    margin: auto;
}
</style>
