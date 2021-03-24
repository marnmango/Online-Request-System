<template>
	<div style="text-align:left">
		<h4>Personal Information</h4>
		<div class="mb-1 ">
			<label for="semeter" class="form-label mb-0">Semeter</label>
			<input type="text" class="form-control w-25" id="semeter" disabled />
		</div>
		<div class="mb-1">
			<label for="deanof" class="form-label mb-0"
				>To the dean of school of</label
			>
			<input type="text" class="form-control w-50" id="deanof" v-model=info.student_school disabled />
		</div>
		<div class="row g-2 mb-1">
			<div class="col-md ">
				<label for="name" class="form-label ">Name</label>
				<input type="text" class="form-control" id="name" v-model=info.student_name disabled />
			</div>
			<div class="col-md ">
				<label for="studentID" class="form-label ">Student ID</label>
				<input
					type="number"
					class="form-control w-50"
					id="studentID"
					v-model=info.student_id
					disabled
				/>
			</div>
		</div>
		<div class="row g-2 mb-1">
			<div class="col-md ">
				<label for="schoolOf" class="form-label ">School of</label>
				<input type="text" class="form-control" id="schoolOf" v-model=info.student_school disabled />
			</div>
			<div class="col-md ">
				<label for="programOf" class="form-label ">Program of</label>
				<input type="text" class="form-control " id="programOf" v-model=info.student_program disabled />
			</div>
		</div>
		<div class="mb-1 ">
			<label for="phoneNumber" class="form-label mb-0">Phone number</label>
			<input type="text" class="form-control w-25" id="phoneNumber" >
		</div>
	</div>
</template>

<script>
export default {
	props:{
		info : Object
	}
};
</script>

<style></style>
