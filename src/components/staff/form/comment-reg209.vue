<template>
  <div style="text-align: left">
    <div class="row mb-1 g-2">
      <div class="col p-3 border bg-white mx-3 shadow-sm">
        <label for="exampleFormControlTextarea1" class="form-label"
          >Staff's comment</label
        >
        <textarea class="form-control" v-model="staffcomment" rows="3">
        </textarea>
        <div class="d-md-flex justify-content-md-end mt-3">
          <button class="btn btn-success">Submit</button>
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
      staffcomment: "",
    };
  },
  mounted() {
    if (
      this.formInfo.dean_comment != null ||
      this.formInfo.advisor_comment != null
    ) {
      this.deancomment = this.formInfo.dean_comment;
      this.advisorcomment = this.formInfo.advisor_comment;
    }
  },
};
</script>

<style>
p,
label {
  font-size: 14px;
}
input {
  text-align: center;
}
</style>
