<template>
	<div>
		<NavStudent />
		<div class="p-1 active-cont" style="text-align:center">
			<div class="mx-4">
				<div class="my-4">
					<h4>REGISTRAR DIVISION, MAE FAH LUANG UNIVERSITY</h4>
					<h4>Request Form for Re-entering Student</h4>
				</div>
				<!-- เดี๋ยวมาเพิ่ม -->
				<div>
					<p>Progress flow</p>
				</div>
				<!-- เดี๋ยวมาเพิ่ม -->
				<div class="row gy-3 mx-5">
					<div class="col-6">
						<div class="p-3 border bg-light shadow-sm">
							<InformationForm />
						</div>
					</div>
					<div class="col-6">
						<div class="p-3 border bg-light h-100 shadow-sm">
							<RequestForm />
						</div>
					</div>
					<div class="col">
						<div class="p-3 border bg-light shadow-sm mb-3">
							<CommentForm />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import NavStudent from "../student/navStudent.vue";
import InformationForm from "../student/form/information.vue";
import RequestForm from "../staff/form/request.vue";
import CommentForm from "../staff/form/comment.vue";
export default {
	components: {
		NavStudent,
		InformationForm,
		RequestForm,
		CommentForm,
	},
};
</script>

<style scoped>
.active-cont {
	margin-left: 180px;
}
</style>
