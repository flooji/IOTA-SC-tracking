<template>
    <div class="container">
        <h3 class="mx-sm-3 mt-4">{{msg}}</h3>
        <div class="wrapper">
            <form-packaging-unit></form-packaging-unit>
        </div>
    </div>
</template>
<script>
import UnitForm from '../components/UnitForm.vue'

export default {
  name: 'producer',
  components: {
      'form-packaging-unit': UnitForm
  },
  data() {
      return {
        msg: 'Hi, register a packaging unit.'
      }
  }
}
</script>
<style scoped>
.wrapper {
    width: 300px;
    padding-left: 20px;
    padding-top: 10px;
    display: block;
}
</style>