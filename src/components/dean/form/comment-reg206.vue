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
          readonly
        ></textarea>
      </div>
      <div class="col border bg-white shadow-sm p-3">
        <p>Dean's comment</p>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          v-model="deancomment"
          rows="5"
        ></textarea>
        <div class="modal-footer">
          <div class="form-check mx-1">
            <input
              class="form-check-input"
              type="radio"
              name="radioAprrove"
              id="approve"
              v-bind:checked="approve"
              v-on:click="checkapprove"
            />
            <label class="form-check-label" for="approve"> Approve </label>
          </div>
          <div class="form-check mx-4">
            <input
              class="form-check-input"
              type="radio"
              name="radioAprrove"
              id="disapprove"
              v-bind:checked="disapprove"
              v-on:click="checkdisapprove"
            />
            <label class="form-check-label" for="disapprove">
              Disapprove
            </label>
          </div>
          <button
            type="button"
            id="submit"
            class="btn btn-outline-success"
            v-on:click="deanchoice"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>