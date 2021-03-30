<template>
	<div style="text-align:left">
		<h4>Personal Information</h4>
		<div class="mb-1 ">
			<label for="semeter" class="form-label mb-0">Semeter</label>
			<input type="text" class="form-control w-25" id="semeter" v-model=currentsemester disabled />
		</div>
		<div class="mb-1 ">
			<label for="semeter" class="form-label mb-0">Academic Year</label>
			<input type="text" class="form-control w-25" id="semeter" v-model=currentacademicyear disabled />
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
			<input type="text" v-model=phone class="form-control w-25" id="phoneNumber" @change="sendphone" >
		</div>
	</div>
</template>

<script>
export default {
	props:{
	info : Object,
    Alphone: Number,
	create_sem: String,
	create_aca:String
	},
	data(){
		return {
			studentInfo:'',
			currentsemester:'',
			currentacademicyear:'',
			phone:''
		}
	},
	methods:{
    getPhone(){
      console.log(this.Alphone)
      if(this.Alphone){
        this.phone=this.Alphone
		this.currentsemester=this.create_sem
		this.currentacademicyear=this.create_aca
        document.getElementById("phoneNumber").disabled = true;
      }
    }
		,getSemester(){
			let currentday = new Date()
			let	firstsemester = new Date('24 Aug 2020')
			let secondsemester = new Date('25 Jan 2021')
			let summersemester = new Date('21 Jun 2021')
			
			if(currentday>=firstsemester&&currentday<secondsemester){
				this.currentsemester = "First"
			}else if(currentday>=secondsemester&&currentday<summersemester){
				this.currentsemester = "Second"
			}else{
				this.currentsemester = "Summer"
			}
		},
		getAcademicyear(){
			let currentday = new Date()
			let	firstsemester = new Date('24 Aug 2020')
			let endsemester = new Date('22 Aug 2021')
			if(currentday>=firstsemester&&currentday<endsemester){
				this.currentacademicyear = firstsemester.getFullYear()
			}
		},sendphone(){
			const phone = this.phone
			const create_sem = this.currentsemester
			const create_academic_year = this.currentacademicyear
			this.$emit("onChange",{phone,create_sem,create_academic_year})
		}
	},
	mounted(){
		this.getSemester();
		this.getAcademicyear();
		this.getPhone()
	}
}
</script>

<style></style>
