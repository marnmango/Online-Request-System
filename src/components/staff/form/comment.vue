<template>
	<div style="text-align:left;">
		<h4>Comment</h4>
		<div class="row mb-1 g-2">
			<div class=" col p-3 border bg-white mx-3 shadow-sm">
				<label for="exampleFormControlTextarea1" class="form-label"
					>Advisor's comment</label
				>
				<textarea
					class="form-control"
					v-model="advisorcomment"
					rows="3"
					readonly
				>
				</textarea>
			</div>
			<div class=" col p-3 border bg-white mx-3 shadow-sm">
				<label for="exampleFormControlTextarea1" class="form-label"
					>Dean's comment</label
				>
				<textarea class="form-control" v-model="deancomment" rows="3" readonly>
				</textarea>
			</div><div class=" col p-3 border bg-white mx-3 shadow-sm">
				<label for="exampleFormControlTextarea1" class="form-label"
					>For staff Confirm the form</label
				>
				<button class="btn btn-success" id="submit" v-on:click="onSubmit">Submit</button>
			</div>
			<div class="text-end ">
			</div>
		</div>
	</div>
</template>

<script>
export default {
props:{
    formInfo:Object
  },
data() {
    return {
      advisorcomment: "",
      deancomment:""    };
  },
  methods:{
      onSubmit(){
        this.$emit("onSubmit")
      }
  },mounted(){
    if(this.formInfo.dean_comment!=null||this.formInfo.advisor_comment!=null){
      this.deancomment=this.formInfo.dean_comment
      this.advisorcomment=this.formInfo.advisor_comment
    }
  }
	}
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
