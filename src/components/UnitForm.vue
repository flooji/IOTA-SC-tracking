<template>
    <form @submit.prevent="$emit('create-order',packagingUnit)">
        <div class="form-group row mx-sm-3 mb-2">
            <label for="commodityGroup">Commodity group e.g. cameras, laptops</label>
            <input type="text" class="form-control" placeholder="Cameras" v-model="packagingUnit.commodityGroup">
        </div>
        <div class="form-group row mx-sm-3 mb-2">
            <label for="seriesNumber">Series number</label>
            <input type="text" class="form-control" placeholder="1510791" v-model="packagingUnit.seriesNumber">
        </div>
        <div class="form-group row mx-sm-3 mb-2">
            <label for="valueOfItem">Value of item</label>
            <input type="text" class="form-control" placeholder="399.95" v-model="packagingUnit.valueOfItem">
            <label for="currencyOfPrice">in</label>
            <select class="form-control" v-model="packagingUnit.currencyOfPrice">
                <option v-for="currency in ['CHF','USD','EUR','MIOTA','BTC in SAT','ETH']" :key="currency.id">{{ currency }}</option>
            </select>
        </div>
        <div class="form-group row mx-sm-3 mb-2">
            <label for="numberOfItems">Number of items</label>
            <select class="form-control" v-model="packagingUnit.numberOfItems">
                <option v-for="n in 500" :key="n.id">{{ n }}</option>
            </select>
        </div>
        <div class="form-group row mx-sm-3 mb-2">
            <label for="owner">Owner</label>
            <input type="text" class="form-control" placeholder="Sony Corporation" v-model="packagingUnit.owner">
        </div>
        <div class="form-group row mx-sm-3 mb-3">
            <label for="deliveryDate">Delivery date</label>
            <input type="date" class="form-control" placeholder="22.03.2020" v-model="packagingUnit.deliveryDate">
        </div>
        <button type="submit" class="btn btn-secondary mx-sm-3 mb-2">Submit</button>
    </form>
</template>
<script>
export default {
    name: 'UnitForm',
    data() {
        return {
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