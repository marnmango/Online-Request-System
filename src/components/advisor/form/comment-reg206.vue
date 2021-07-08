<template>
  <div class="text-start">
    <h4>Comment</h4>
    <div class="row g-5 px-5">
      <div class="col border bg-white shadow-sm p-3 me-2">
        <p>Advisor's comment</p>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          v-model="advisorComment"
          rows="5"
        ></textarea>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
          <button class="btn btn-outline-danger me-md-2" type="button" v-on:click="onCancel()">
            Disapprove
          </button>
          <button class="btn btn-success" v-on:click="disableSubmit()" type="button">Approve</button>
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
export default {
  data() {
		return {
			advisorComment: "",
      deancomment:""
		};
	},
	methods: {
		disableSubmit: function() {
			if (this.advisorComment.trim() == "") {
				this.$alert("please enter the comment")
			} else if (
				this.advisorComment.trim() != ""
			) {
				this.$emit("onSubmit",this.advisorComment)
			} else {
				alert("error");
			}
		},
    onCancel(){
      this.$emit("onCancel",this.advisorComment)
    }
	},
};
</script>

<style>
</style>