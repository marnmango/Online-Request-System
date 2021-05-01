<template>
  <div style="text-align: left">
    <h4>Comment</h4>
    <div class="row p-3 border bg-white mx-3 mb-3 shadow-sm">
      <label for="exampleFormControlTextarea1" class="form-label m-0 text-start"
        >Staff's comment</label
      >
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        v-model="staffcomment"
        rows="5"
      ></textarea>
      <div class="text-center mt-3">
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button
            type="button"
            id="can"
            class="btn btn-outline-secondary"
            style="width: 250px; width: 300px"
            v-on:click="onCancel"
          >
            Request more new documents
          </button>
          <button
            type="button"
            class="btn btn-success"
            id="sub"
            v-on:click="onSubmit"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
    <div class="row p-3 border bg-white mx-3 mb-3 shadow-sm">
      <label for="exampleFormControlTextarea1" class="form-label m-0 text-start"
        >Advisor's comment</label
      >
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        style="font-size: 14px"
        rows="5"
        v-model="advisorcomment"
        readonly
      ></textarea>
    </div>
    <div class="row p-3 border bg-white mx-3 mb-3 shadow-sm">
      <label for="exampleFormControlTextarea1" class="form-label m-0 text-start"
        >Dean's comment</label
      >
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        v-model="deancomment"
        rows="5"
        readonly
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    staff_comment: String,
    dean_comment: String,
    advisor_comment: String,
  },
  data() {
    return {
      staffcomment: "",
      advisorcomment: "",
      deancomment: "",
    };
  },
  methods: {
    onSubmit: function () {
      this.$emit("onSubmit", this.staffcomment);
    },
    onCancel: function () {
      this.$emit("onCancel", this.staffcomment);
    },
  },
  mounted() {
    if (this.staff_comment != undefined) {
      this.staffcomment = this.staff_comment;
      this.deancomment = this.dean_comment;
      this.advisorcomment = this.advisor_comment;
      console.log(this.staff_comment, this.dean_comment, this.advisor_comment);
      document.getElementById("sub").remove();
      document.getElementById("can").remove();
      document.getElementById("exampleFormControlTextarea1").disabled = true;
    }
  },
};
</script>

<style scoped>
p,
label {
  font-size: 14px;
}
input {
  text-align: center;
}
textarea {
  font-size: 14px;
}
</style>
