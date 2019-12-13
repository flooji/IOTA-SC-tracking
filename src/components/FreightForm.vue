<template>
    <form @submit.prevent="checkForm">
        <div class="form-group row mx-sm-3 mb-2">
            <label for="sender">Sender</label>
            <input type="text" class="form-control" placeholder="Company A" v-model="freight.sender">
        </div>
        <div class="form-group row mx-sm-3 mb-2">
            <label for="receiver">Receiver</label>
            <input type="text" class="form-control" placeholder="Company B" v-model="freight.receiver">
        </div>
        <div class="form-group row mx-sm-3 mb-2">
            <label for="shipper">Shipper</label>
            <input type="text" class="form-control" placeholder="Max Muster" v-model="freight.shipper">
        </div>       
        <div class="form-group row mx-sm-3 mb-2">
            <label for="deliveryPlace">Place of delivery</label>
            <input type="text" class="form-control" placeholder="Zurich" v-model="freight.deliveryPlace">
        </div>  
        <div class="form-group row mx-sm-3 mb-2">
            <label for="takeoverDay">Day of takeover</label>
            <input type="date" class="form-control" placeholder="22.03.2020" v-model="freight.takeoverDay">
        </div>
        <div class="form-group row mx-sm-3 mb-2">
            <label for="licensePlate">License plate</label>
            <input type="text" class="form-control" placeholder="ZH9001" v-model="freight.licensePlate">
        </div>
        <div class="form-group row mx-sm-3 mb-2">
            <label for="grossWeight">Gross weight in kg</label>
            <input type="text" class="form-control" placeholder="1500" v-model="freight.grossWeight">
        </div>
        <button type="submit" class="btn btn-secondary mx-sm-3 mb-2">Submit</button>
    </form>
</template>
<script>
export default {
    data() {
        return {
            freight: {
                sender: null,
                receiver: null,
                shipper: null,
                deliveryPlace: null,
                takeoverDay: null,
                licensePlate: null,
                grossWeight: null
            }
        }
    },
    methods: {
      checkForm() {
            //socket.emit('packagingUnit', this.packagingUnit)
        }
    }
}
</script>