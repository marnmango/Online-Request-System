<template>
	<div style="text-align:left;">
		<h4>Request</h4>
		<div class="row mb-1 g-3 w-75">
			<div class="col ">
				<label for="name" class="form-label mb-0 ">Semeter</label>
				<input type="text" class="form-control" id="name" v-model=re_semester disabled />
			</div>
			<div class="col mx-0">
				<label for="studentID" class="form-label mb-0">Academic year</label>
				<input type="text" class="form-control" id="studentID" v-model=re_academic_year disabled />
			</div>
		</div>
		<div>
			<p class="mb-1 mt-3">Reason for re-entering</p>
			<p class="mb-0" style="text-indent: 5%; ">To take a leave</p>
			<textarea
				class="form-control"
				id="exampleFormControlTextarea1"
				rows="6"
				v-model=re_text
			></textarea>
		</div>
		<div class="mt-3" style="text-align:right">
			<button
				type="button"
				class="btn btn-danger mx-2"
				id="cancel"
				v-on:click="disableSubmit(0)"
				disabled
			>
				Cancel
			</button>
			<button
				type="button"
				class="btn btn-success"
				id="submit"
				v-on:click="sendRequest"
			>
				Submit
			</button>
		</div>
	</div>
</template>

<script>
export default {
	props:{
		formInfo:Object,
	},
	data(){
		return{
			re_semester:'first',
			re_academic_year:2021,
			re_text:''
		}
	},
	methods: {
		disableSubmit: function(x) {
			if (x == 1) {
				document.getElementById("submit").disabled = true;
				document.getElementById("cancel").disabled = false;
			} else {
				document.getElementById("submit").disabled = false;
				document.getElementById("cancel").disabled = true;
			}
		},sendRequest:function(){
			if(this.re_text.trim()==""){
				this.$alert("please enter the request")
			}else{
				this.disableSubmit(1)
		let re_semester =this.re_semester
		let re_academic_year = this.re_academic_year 
		let re_text = this.re_text
		let strequest = {
			re_semester,re_academic_year,re_text
		}
		this.$emit("onRequest",strequest)
			}
	},getRequesttext(){
		console.log(this.formInfo)
		if(this.formInfo){
		this.re_semester=this.formInfo.request_semester
		this.re_academic_year=this.formInfo.request_academic_year
        this.re_text=this.formInfo.request_text
        document.getElementById("exampleFormControlTextarea1").disabled = true;
		// document.getElementById("cancel").remove()
		// document.getElementById("submit").remove()
      }
	}
	},mounted(){
		this.getRequesttext();
	}
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
