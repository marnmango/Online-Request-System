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
        readonly
      ></textarea>
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
  </div>
</template>

<script>
export default {
  props: {
    staffcomment: String,
    advisorcomment: String,
  },
  data() {
    return {
      dean_comment: "",
    };
  },
  methods: {
    onSubmit: function () {
      this.$emit("onSubmit", this.dean_comment);
    },
    onCancel: function () {
      this.$emit("onCancel", this.dean_comment);
    },
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
