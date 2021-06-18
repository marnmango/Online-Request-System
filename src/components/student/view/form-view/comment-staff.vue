<template>
  <div style="text-align: left">
    <h4>Staff's comment</h4>
    <div class="mb-1">
      <div class="p-3 border bg-white shadow-sm">
        <textarea class="form-control" v-model="staffComment" rows="3" disabled>
        </textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    staffcomment: String,
  },
  data() {
    return {
      staffComment: "",
    };
  },
  mounted() {
    this.staffComment = this.staffcomment;
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
