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
              <template v-if="childDataLoaded">
              <RequestForm @onRequest="onRequest" :requestsemes="requestsemes" :requestadmy="requestadmy" :tosemes="tosemes" :toadmy="toadmy"/>
               </template>
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
      requestsemes:'',
      requestadmy:'',
      childDataLoaded: false,
      studentid:'',
      tosemes:'',
      toadmy:''
    };
  },
  methods: {
    getstudentInfo() {
      const path1 = axios.get(pathapi+"/?id="+this.studentid);
      const path2 = axios.get(pathapi+"/getDate");
      const path3 = axios.get(pathapi+"/get208time?id="+this.studentid)
      axios
        .all([path1,path2,path3])
        .then(axios.spread((...res) => {
          console.log(res[0].data);
          console.log(res[1].data);
          console.log(res[2].data);
          this.studentInfo = res[0].data;
          this.requestsemes = res[2].data["request_from_semester"];
          this.requestadmy = res[2].data["request_from_academicyear"]
          this.tosemes = res[2].data["request_to_semester"];
          this.toadmy = res[2].data["request_to_academicyear"]
          this.childDataLoaded=true
        }))
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
      const senddata = Object.assign({}, this.stRequest, formid, {
        phone,
        student_id,
        student_advisor_id,
        student_school,
        student_name,
      });
       if(phone!=""){
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
       }else{
         this.$alert("form is not incorrect");
       }
      
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
    this.studentid=JSON.parse(sessionStorage.getItem('user')).user_id
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
