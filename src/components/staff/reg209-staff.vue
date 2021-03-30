<template>
  <div>
    <NavStudent />
    <div class="p-1 active-cont" style="text-align: center">
      <div class="mx-4">
        <div class="my-4">
          <h4>REGISTRAR DIVISION, MAE FAH LUANG UNIVERSITY</h4>
          <h4>Request Form for Re-entering Student</h4>
        </div>
        <!-- เดี๋ยวมาเพิ่ม -->
        <div class="container">
          <ul class="progressbar">
            <li class="active" value="1">Student</li>
            <li value="2">Staff</li>
            <li value="3">Advisor</li>
            <li value="4">Dean</li>
          </ul>
        </div>
        <!-- เดี๋ยวมาเพิ่ม -->
        <div class="row gy-3 mx-5">
          <div class="col-6">
            <div class="p-3 border bg-light shadow-sm">
              <template v-if="childDataLoaded">
              <InformationForm :info="studentInfo" :Alphone="formInfo.phone" :create_sem="create_semester" :create_aca="create_academic_year"/>
              </template>
            </div>
          </div>
          <div class="col-6">
            <div class="p-3 border bg-light h-100 shadow-sm">
              <template v-if="childDataLoaded">
              <RequestForm :formInfo="formInfo"/>
              </template>
            </div>
          </div>
          <div class="col">
            <div class="p-3 border bg-light shadow-sm mb-3">
              <template v-if="childDataLoaded">
              <CommentForm />
              </template>
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
import axios from 'axios';

export default {
  components: {
    NavStudent,
    InformationForm,
    RequestForm,
    CommentForm,
  },
  data() {
    return {
      id: '',
      formInfo: '',
      st_phone:'',
      studentInfo:'',
      childDataLoaded:false,
      create_semester:'',
      create_academic_year:''
    };
  },
  methods:{
  getformInfo(){
	let path = 'http://127.0.0.1:5000/get209?id='+this.id ;
			axios.get(path)
				.then((res)=>{
					console.log(res.data)
					this.formInfo = res.data;
          this.st_phone = this.formInfo.phone
          this.create_semester=this.formInfo.create_semester
          this.create_academic_year=this.formInfo.create_academic_year
          return this.formInfo.student_id
				})
				.catch((error)=>{
					console.log(error)
				}).then((id)=>{
          let path = 'http://127.0.0.1:5000/?id='+id ;
         axios.get(path)
				.then((res)=>{
					console.log(res.data)
					this.studentInfo = res.data;
				})
				.catch((error)=>{
					console.log(error)
				})
        }).then(()=>{
            this.childDataLoaded=true
        })
		}
  },
  created() {
    this.id = this.$route.params.id;
    if (this.$route.query.debug) {
      this.debug = this.$route.query.debug;
    }
    this.getformInfo()
  },
};
</script>

<style scoped>
.active-cont {
  margin-left: 180px;
}
.container {
  width: 100%;
}

.progressbar li {
  list-style: none;
  display: inline-block;
  width: 10%;
  position: relative;
  text-align: center;
  cursor: pointer;
}
.progressbar li:before {
  content: "";
  width: 30px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ddd;
  border-radius: 100%;
  display: block;
  text-align: center;
  margin: 0 auto 10px auto;
  background-color: gray;
}
.progressbar li:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: #ddd;
  top: 15px;
  left: -50%;
  z-index: -1;
}
.progressbar li:first-child:after {
  content: none;
}
.progressbar li.active {
  color: green;
}
.progressbar li.active:before {
  border-color: green;
  background-color: green;
}
.progressbar li.active + li:after {
  background-color: green;
}
</style>
