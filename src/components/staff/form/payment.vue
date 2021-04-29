<template>
  <div>
    <div style="text-align: left">
      <h4>Payment</h4>
      <div class="row p-3 border bg-white mx-3 mb-3 shadow-sm">
        <div class="col-2 align-self-center">
          <div class="form-check">
            <input
              class="form-check-input"
              name="setadept"
              for="setadept"
              type="radio"
              id="dept"
              v-on:click="deptSelect"
            />
            <label class="form-check-label" id="dept2" for="dept">
              Set Dept
            </label>
          </div>
        </div>
        <div class="col-1 align-self-center">
          <div class="form-check">
            <input
              class="form-check-input"
              name="setadept"
              for="setadept"
              type="radio"
              id="free"
              v-on:click="freeSelect"
            />
            <label class="form-check-label" id="free2" for="free"> Free </label>
          </div>
        </div>
        <div class="col-5 ms-5 align-self-center">
          <div class="input-group">
            <input
              type="number"
              min="0"
              id="amount"
              class="form-control"
              v-model="payment_amount"
            />
            <span class="input-group-text">BATH</span>
            <p id="text"></p>
          </div>
        </div>
        <div class="col-3 d-grid gap-2 align-self-center">
          <button
            class="btn btn-outline-success"
            type="button"
            id="submitFile"
            v-on:click="onSetDept"
          >
            Set a dubt
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formInfo: Object,
  },
  data() {
    return {
      payment_amount: "",
    };
  },
  methods: {
    onSetDept: function () {
      this.$emit("onSetDept", this.payment_amount);
    },
    deptSelect() {
      this.payment_amount = "";
    },
    freeSelect() {
      this.payment_amount = 0;
    },
  },
  mounted() {
    if (
      this.formInfo.payment_amount != null &&
      this.formInfo.progress_status == 5
    ) {
      this.payment_amount = this.formInfo.payment_amount;
      document.getElementById("text").innerHTML = "the process is success";
      document.getElementById("amount").disabled = true;
      document.getElementById("submitFile").remove();
      document.getElementById("dept").remove();
      document.getElementById("dept2").remove();
      document.getElementById("free2").remove();
      document.getElementById("free").remove();
    } else if (this.formInfo.payment_amount != null) {
      this.payment_amount = this.formInfo.payment_amount;
      document.getElementById("text").innerHTML = "the payment is on process";
      document.getElementById("amount").disabled = true;
      document.getElementById("submitFile").remove();
      document.getElementById("dept").remove();
      document.getElementById("dept2").remove();
      document.getElementById("free").remove();
      document.getElementById("free2").remove();
    }
  },
};
</script>

<style scoped>
</style>