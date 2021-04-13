<template>
  <div>
    <div style="text-align: left">
      <h4>Payment</h4>
      <div class="row p-3 border bg-white mx-3 mb-3 shadow-sm">
        <label>Total</label>
        <div class="input-group">
          <input type="number" min="0" class="form-control" v-model="payment_amount"/>
          <span class="input-group-text">BATH</span>
        </div>
        <div class="mt-3 d-grid gap-2">
          <button class="btn btn-outline-success" type="button" id="submitFile" v-on:click="onSetDept">
            Set a dubt
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      payment_amount: "",
    };
  },
  methods:{
   onSetDept:function(){
			this.$emit("onSetDept",this.payment_amount)
		}
  }
};
</script>

<style scoped>
</style>