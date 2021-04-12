<template>
  <div>
    <div style="text-align: left">
      <h4>Payment</h4>
      <div class="row p-3 border bg-white mx-3 mb-3 shadow-sm">
        <label>Total</label>
        <div class="input-group">
          <input type="number" min="0" class="form-control" readonly />
          <span class="input-group-text">BATH</span>
        </div>
        <div class="input-group mt-3">
          <input
            type="file"
            class="form-control"
            id="inputFile"
            aria-label="Upload"
          />
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
          <button
            class="btn btn-outline-success w-25"
            type="button"
            id="submitFile"
          >
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