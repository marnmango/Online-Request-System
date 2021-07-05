<template>
  <div class="text-start">
    <h4>Comment</h4>
    <div class="row g-5 px-5">
      <div class="col border bg-white shadow-sm p-3 me-2">
        <p>Advisor's comment</p>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          v-model="advisorcomment"
          rows="5"
        ></textarea>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
          <button class="btn btn-outline-danger me-md-2" type="button">
            Disapprove
          </button>
          <button class="btn btn-success" type="button">Approve</button>
        </div>
      </div>
      <div class="col border bg-white shadow-sm p-3">
        <p>Dean's comment</p>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          v-model="deancomment"
          rows="5"
          readonly
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>