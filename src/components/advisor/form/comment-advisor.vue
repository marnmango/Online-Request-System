<template>
	<div style="text-align:left;">
		<h4>Advisor's comment</h4>
		<div class="row mb-1 g-2">
			<div class=" col p-3 border bg-white mx-3 shadow-sm">
				<textarea
					class="form-control"
					v-model="advisorComment"
					rows="3"
				>
				</textarea>
			</div>
			<div class="text-end ">
				<button
					type="button"
					id="submit"
					class="btn btn-success my-2 mx-2"
					style="width: 100px"
					v-on:click="disableSubmit()"
				>
					Submit
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			advisorComment: ""
		};
	},
	methods: {
		disableSubmit: function() {
			if (this.advisorComment.trim() == "") {
				this.$alert("please enter the comment")
			} else if (
				this.advisorComment.trim() != ""
			) {
				document.getElementById("submit").disabled = true;
				this.$emit("onSubmit",this.advisorComment)
			} else {
				alert("error");
			}
		},
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
