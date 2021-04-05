<template>
  <div>
    <div style="text-align: left">
      <h4>Payment</h4>
      <div class="row p-3 border bg-white mx-3 mb-3 shadow-sm">
        <label>Total</label>
        <div class="input-group">
          <input type="text" class="form-control" readonly />
          <span class="input-group-text">BATH</span>
        </div>
        <div class="input-group mt-3">
          <input
            type="file"
            class="form-control"
            id="inputFile"
            aria-label="Upload"
          />
          <button class="btn btn-outline-success" type="button" id="submitFile">
            Submit
          </button>
        </div>
      </div>
      <div class="row p-3 border bg-white mx-3 mb-3 shadow-sm">
        <label style="font-size: 18px">Example</label>
        <img
          src="@/assets/ex-receipt.jpeg"
          class="rounded mx-auto d-block"
          style="width: auto; height: 350px"
          alt="examplereceipt"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>