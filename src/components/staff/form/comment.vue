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
					v-model="advisorComment"
					rows="3"
					readonly
				>
				</textarea>
			</div>
			<div class=" col p-3 border bg-white mx-3 shadow-sm">
				<label for="exampleFormControlTextarea1" class="form-label"
					>Dean's comment</label
				>
				<textarea class="form-control" v-model="deanComment" rows="3" readonly>
				</textarea>
			</div>
			<div class="text-end ">
				<button
					id="export"
					type="button"
					class="btn btn-primary m-2"
					style="width: 100px"
					v-on:click="disableSubmit()"
					disabled
				>
					Export
				</button>
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
			advisorComment: "123123",
			deanComment: "123123",
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
