<template>
  <div style="text-align: left">
    <div class="row mb-1 g-2">
      <div class="col p-3 border bg-white mx-3 shadow-sm">
        <label for="exampleFormControlTextarea1" class="form-label"
          >Staff's comment</label
        >
        <textarea class="form-control" v-model="staffComment" rows="3">
        </textarea>
        <div class="d-md-flex justify-content-md-end mt-3">
          <button class="btn btn-success" id="submit" v-on:click="onSubmit">Submit</button>
        </div>
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
  methods:{
      onSubmit(){
        this.$emit("onSubmit",this.staffComment)
      }
  },
  mounted() {
    if (
      this.staffcomment!=null
    ) {
      this.staffComment=this.staffcomment
      document.getElementById("submit").remove()
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
