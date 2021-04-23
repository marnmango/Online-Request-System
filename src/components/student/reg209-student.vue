<template>
  <div>
    <NavStudent />
    <div class="p-1 active-cont" style="text-align: center">
      <div class="mx-4">
        <div class="my-4">
          <h4>REGISTRAR DIVISION, MAE FAH LUANG UNIVERSITY</h4>
          <h4>Request Form for Re-entering Student</h4>
        </div>
        <div class="row gy-3 mx-5">
          <div class="col-6">
            <div class="p-3 border bg-light">
              <InformationForm :info="studentInfo" @onChange="onChange" />
            </div>
          </div>
          <div class="col-6">
            <div class="p-3 border bg-light h-100">
              <RequestForm @onRequest="onRequest" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavStudent from "./navStudent.vue";
import InformationForm from "./form/information.vue";
import RequestForm from "./form/request.vue";
import pathapi from "../../pathapi.js"
import axios from "axios";
export default {
  data() {
    return {
      studentInfo: "",
      stphone: "",
      stRequest: "",
      // create_semester: "",
      // create_academic_year: "",
    };
  },
  methods: {
    getstudentInfo() {
      const path = pathapi+"/?id=6131305010";
      axios
        .get(path)
        .then((res) => {
          console.log(res.data);
          this.studentInfo = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sendformInfo() {
      const path = pathapi+"/send209";
      const formid = { formId: Date.now() };
      const {
        student_id,
        student_advisor_id,
        student_school,
        student_name,
      } = this.studentInfo;
      const phone = this.stphone;
      // const create_semester = this.create_semester;
      // const create_academic_year = this.create_academic_year;
      const senddata = Object.assign({}, this.stRequest, formid, {
        phone,
        student_id,
        student_advisor_id,
        student_school,
        student_name,
        // create_semester,
        // create_academic_year,
      });
      this.$confirm("Are you sure?").then(() => {
        axios
          .post(path, senddata)
          .then((res) => {
            console.log(res.data);
            this.$alert("the request had sent");
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    onChange(value) {
      this.stphone = value.phone;
    },
    onRequest(value) {
      this.stRequest = value;
      console.log(this.stRequest);
      this.sendformInfo();
    },
  },
  created() {
    this.getstudentInfo();
  },
  components: {
    NavStudent,
    InformationForm,
    RequestForm,
  },
};
</script>

<style scoped>
.active-cont {
  margin-left: 180px;
}
</style>
