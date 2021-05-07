<template>
  <div>
    <div style="text-align: left">
      <h4>Payment</h4>
      <div class="p-3 border bg-white mx-3 mb-3 shadow-sm">
        <p class="m-0 mb-1" style="font-size: 16px" id="titlepayment">
          Select to set the payment
        </p>
        <div class="row mx-1">
          <div class="col-md-5 ms-0 align-self-center">
            <div class="form-check">
              <input
                class="form-check-input"
                name="setadept"
                for="setadept"
                type="radio"
                id="free"
                v-on:click="freeSelect"
              />
              <label class="form-check-label" id="free2" for="free">
                No Fee in this semeter
              </label>
            </div>
          </div>
          <div class="col-md-3 me-0 align-self-center">
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
        </div>

        <div class="row">
          <div class="col mb-3 mt-2 align-self-center">
            <div class="input-group">
              <input
                type="number"
                min="0"
                id="amount"
                class="form-control"
                v-model="payment_amount"
                disabled
              />
              <span class="input-group-text">BAHT</span>
            </div>
            <div
              class="row align-self-center justify-content-center"
              style="padding-left: 12px; padding-right: 12px"
            >
              <p class="mt-0 mb-0 badge fs-5" id="text"></p>
            </div>
          </div>
        </div>

        <div
          class="mt-0 d-md-flex d-grid justify-content-md-end align-self-end"
        >
          <button
            class="btn btn-success"
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
      document.getElementById("amount").disabled = false;
    },
    freeSelect() {
      this.payment_amount = 0;
      document.getElementById("amount").disabled = true;
    },
  },
  mounted() {
    if (
      this.formInfo.payment_amount != null &&
      this.formInfo.progress_status == 5
    ) {
      this.payment_amount = this.formInfo.payment_amount;
      document.getElementById("text").innerHTML = "The process is completed";
      document.getElementById("text").style.backgroundColor = "#28a745";
      document.getElementById("amount").disabled = true;
      document.getElementById("submitFile").remove();
      document.getElementById("dept").remove();
      document.getElementById("dept2").remove();
      document.getElementById("free2").remove();
      document.getElementById("free").remove();
      document.getElementById("titlepayment").remove();
    } else if (this.formInfo.payment_amount != null) {
      this.payment_amount = this.formInfo.payment_amount;
      document.getElementById("text").innerHTML = "The payment is on process";
      document.getElementById("text").style.backgroundColor = "#ffc107";
      document.getElementById("amount").disabled = true;
      document.getElementById("submitFile").remove();
      document.getElementById("dept").remove();
      document.getElementById("dept2").remove();
      document.getElementById("free").remove();
      document.getElementById("free2").remove();
      document.getElementById("titlepayment").remove();
    }
  },
};
</script>

<style scoped>
</style>