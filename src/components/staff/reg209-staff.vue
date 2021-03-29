<template>
  <div>
    <NavStudent />
    <div class="p-1 active-cont" style="text-align: center">
      <div class="mx-4">
        <div class="my-4">
          {{ id }}
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
              <InformationForm :id="studentInfo" />
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
  data() {
    return {
      id: "",
      studentInfo: [
        {
          admission_academic_year: 2017,
          admission_semester: 1,
          student_advisor_id: 6132,
          student_email: "6131305010@lamduan.mfu.ac.th",
          student_gpax: 3.82,
          student_id: 6131305010,
          student_name: "thirat jira",
          student_program: "SE",
          student_school: "IT",
        },
      ],
    };
  },
  created() {
    this.id = this.$route.params.id;
    if (this.$route.query.debug) {
      this.debug = this.$route.query.debug;
    }
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
