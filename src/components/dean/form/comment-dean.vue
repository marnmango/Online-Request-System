<template>
	<div style="text-align:left;">
		<h4>Dean's comment</h4>
		<div class="row mb-1 g-2">
			<div class=" col p-3 border bg-white mx-3 shadow-sm">
				<textarea
					class="form-control"
					v-model="deanComment"
					rows="3"
				>
				</textarea>
			</div>
			<div class="mt-3" style="text-align:right">
			<button
				type="button"
				class="btn btn-danger mx-2"
				id="cancel"
				v-on:click="onCancel"
			>
				Cancel
			</button>
			<button
				type="button"
				class="btn btn-success"
				id="submit"
				v-on:click="onSubmit"
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
			deanComment: "",
		};
	},
	methods: {
		onCancel:function(){
			if (this.deanComment.trim() == "") {
				this.$alert("please enter the comment")
			} else if (
				this.deanComment.trim() != ""
			) {
				document.getElementById("submit").disabled = true;
				document.getElementById("cancel").disabled = true;
				this.$emit("onCancel",this.deanComment)
			} else {
				alert("error");
			}
		},onSubmit:function(){
			if (this.deanComment.trim() == "") {
				this.$alert("please enter the comment")
			} else if (
				this.deanComment.trim() != ""
			) {
				document.getElementById("submit").disabled = true;
				document.getElementById("cancel").disabled = true;
				this.$emit("onSubmit",this.deanComment)
			} else {
				alert("error");
			}
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
