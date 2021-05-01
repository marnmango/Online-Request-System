<template>
  <div class="container">
    <div class="border">
      <div class="row p-3 align-items-center">
        <div class="col">
          <input
            type="date"
            v-model="a"
            class="form-control form-control-edit"
          />
        </div>
        <div class="col">
          <input
            type="date"
            v-model="b"
            class="form-control form-control-edit"
          />
        </div>
        <div class="col">
          <input
            type="date"
            v-model="c"
            class="form-control form-control-edit"
          />
        </div>
        <div class="col">
          <input
            type="date"
            v-model="d"
            class="form-control form-control-edit"
          />
        </div>
      </div>
      <div class="d-md-flex justify-content-md-end m-3 mt-0">
        <button type="button" class="btn btn-success">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>