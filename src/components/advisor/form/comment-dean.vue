<template>
	<div style="text-align:left;">
		<h4>Dean's comment</h4>
		<div class="row mb-1 g-2">
			<div class=" col p-3 border bg-white mx-3 shadow-sm">
				<textarea
					class="form-control"
					v-model="deanComment"
					rows="3"
					readonly
				>
				</textarea>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			advisorComment: "",
			deanComment: "",
		};
	},
	methods: {
		disableSubmit: function() {
			if (
				document.getElementById("deanComment") == "" &&
				document.getElementById("advisorComment") == ""
			) {
				alert("Waitting comment from Advisor and Dean");
			} else if (document.getElementById("deanComment") == "") {
				alert("Waitting comment from Advisor");
			} else if (document.getElementById("advisorComment") == "") {
				alert("Waitting comment from Dean");
			} else if (
				document.getElementById("deanComment") != " " &&
				document.getElementById("advisorComment") != " "
			) {
				document.getElementById("submit").disabled = true;
				document.getElementById("export").disabled = false;
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
