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