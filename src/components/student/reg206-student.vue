<template>
  <div>
    <NavStudent />
    <div>
      <div class="p-1 content" style="text-align: center">
        <div class="mx-4">
          <div class="my-4">
            <h4>REGISTRAR DIVISION, MAE FAH LUANG UNIVERSITY</h4>
            <h4>
              Request Form for Register More/Less Credits than those Stipulated
            </h4>
          </div>
          <div class="row gy-3 mb-3">
            <div class="col-xxl-5 col-md-12 col-sm-12 col-xl-12">
              <div class="p-3 border bg-light h-100" v-if="childonload">
                <InformationForm :info="studentInfo" @onChange="onChange"/>
              </div>
            </div>
            <div class="col-xxl-7 col-md-12 col-sm-12 col-xl-12">
                <div class="p-3 border bg-light h-100" v-if="childonload">
                <RequestForm :date="date" :grade="studentInfo.student_gpax"
                @onRequest="onRequest"/>
              </div>
            </div>
            <div class="col-xxl-12 col-md-12 col-sm-12 col-xl-12">
              <div class="p-3 border bg-light h-100">
                <TableCouse @onConfirm="onConfirm"/>
              </div>
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
import RequestForm from "./form/request-reg206.vue";
import TableCouse from "./form/tablecourse.vue";
import pathapi from "../../pathapi.js";
import axios from "axios";
export default {
  components: {
    NavStudent,
    InformationForm,
    RequestForm,
    TableCouse,
  },
  data(){
    return{
      studentid:"",
      studentInfo:{},
      childonload:false,
      stphone:"",
      date:{},
      stRequest:{}
    }
  },
  methods:{
    getstudentInfo() {
      const path1 = axios.get(pathapi + "/?id=" + this.studentid);
      const path2 = axios.get(pathapi + "/getDate");
      axios
        .all([path1, path2])
        .then(
          axios.spread((...res) => {
            console.log(res[0].data);
            console.log(res[1].data);
            this.date = res[1].data;
            this.studentInfo = res[0].data;
            this.childonload =true
          })
        )
        .catch((error) => {
          console.log(error);
        })
    },
    sendformInfo() {
      const path = pathapi + "/send206";
      const formid = { formId: Date.now() };
      const { student_id, student_advisor_id, student_school, student_name } =
        this.studentInfo;
      const phone = this.stphone;
      const senddata = Object.assign({}, this.stRequest, formid, {
        phone,
        student_id,
        student_advisor_id,
        student_school,
        student_name,
      },this.datatable);
      if (phone != "" && this.datatable.datatable.length && Object.keys(this.stRequest).length) {
        console.log(senddata)
        this.$confirm("Are you sure?").then(() => {
          axios
            .post(path, senddata)
            .then((res) => {
              console.log(res.data);
              this.$alert("The request had sent");
              this.$router.push({ name: "Liststudent" });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      } else {
        this.$alert("Form is not incorrect or some field empty");
      }
    },
    onChange(value) {
      this.stphone = value.phone;
    },onRequest(value) {
      this.stRequest = value;
      console.log(this.stRequest);
    },onConfirm(value){
      this.datatable=value
      console.log(this.datatable)
      this.sendformInfo()
    }
  },
  created() {
    this.studentid = JSON.parse(sessionStorage.getItem("user")).user_id;
    this.getstudentInfo();
  }
};
</script>

<style>
</style>