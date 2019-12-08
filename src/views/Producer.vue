<template>
    <div class="container">
        <form-packaging-unit></form-packaging-unit>
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
        
      }
  }
}
</script>