<template>
    <div class="container">
        <div class="wrapper">
            <h3>Welcome, register a freight:</h3>
        <form @submit.prevent="checkForm">
        <div class="form-group row mx-sm-3 mb-2">
            <label for="commodityGroup">Commodity group e.g. cameras, laptops</label>
            <input type="text" class="form-control" placeholder="Cameras" v-model="packagingUnit.commodityGroup">
        </div>
        <div class="form-group row mx-sm-3 mb-2">
            <label for="seriesNumber">Series Number</label>
            <input type="text" class="form-control" placeholder="1510791" v-model="packagingUnit.seriesNumber">
        </div>
        <!-- <div class="form-group row mx-sm-3 mb-2">
            <label for="valueOfItem">Value of Item</label>
            <input type="text" class="form-control" placeholder="399.95" v-model="packagingUnit.valueOfItem">
            <label for="currencyOfPrice">in</label>
            <select class="form-control" v-model="packagingUnit.currencyOfPrice">
                <option v-bind:for="currency in currencies">{{ currency }}</option>
            </select>
        </div> 
        <div class="form-group row mx-sm-3 mb-2">
            <label for="numberOfItems">Number of Items</label>
            <select class="form-control" id="numberOfItems">
                <option v-bind:for="n in 500">{{ n }}</option>
            </select>
        </div> -->
        <div class="form-group row mx-sm-3 mb-2">
            <label for="owner">Owner</label>
            <input type="text" class="form-control" placeholder="Sony Corporation" v-model="packagingUnit.owner">
        </div>
        <div class="form-group row mx-sm-3 mb-2">
            <label for="deliveryDate">Delivery date</label>
            <input type="date" class="form-control" placeholder="22.03.2020" v-model="packagingUnit.deliveryDate">
        </div>
        <button type="submit" class="btn btn-secondary sm-3 mb-2">Submit</button>
    </form>
        </div>
    </div>
</template>
<script>
export default {
  name: 'producer',
  data() {
      return {
          currencies: ['CHF','USD','EUR','MIOTA','BTC in SAT','ETH'],
          packagingUnit: {
            commodityGroup: null,
            seriesNumber: null,
            numberOfItems: null,
            valueOfItem: null,
            currencyOfPrice: null,
            owner: null,
            deliveryDate: null
          }
      }
  }
}
</script>
<style scoped>
    .wrapper {
    width: 300px;
    padding-left: 20px;
    padding-top: 40px;
}
</style>