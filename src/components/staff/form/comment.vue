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
			</div>
		</div>
	</div>
</template>

<script>
export default {
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
