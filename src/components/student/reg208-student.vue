<template>
  <div>
    <Navbar />
    <div>
      <div class="p-1 active-cont" style="text-align: center">
        <div class="mx-4">
          <div class="my-4">
            <h4>REGISTRAR DIVISION, MAE FAH LUANG UNIVERSITY</h4>
            <h4>Request Form for Leave of Absence : Undergraduate Student</h4>
          </div>
          <div class="row gy-3 mx-5">
            <div class="col-6">
              <div class="p-3 border bg-light">
                <InformationForm :info="studentInfo" @onChange="onChange" />
              </div>
            </div>
            <div class="col-6">
              <div class="p-3 border bg-light h-100">
                <RequestForm208 @onSubmit="onSubmit" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../student/navStudent.vue";
import InformationForm from "./form/information.vue";
import RequestForm208 from "./form/request-reg208.vue";
import pathapi from "../../pathapi.js";
import axios from "axios";
export default {
  components: {
    Navbar,
    InformationForm,
    RequestForm208,
  },

  data() {
    return {
      studentInfo: "",
      stphone: "",
      from_semester: "",
      from_academic: "",
      to_semester: "",
      to_academic: "",
      radio_1: "",
      radio_2: "",
      re_text: "",
      re_doc: "",
      restict:true
    };
  },
  methods: {
    getstudentInfo() {
      const path = pathapi + "/?id=6131305010";
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
      // run function check เงื่อนไข gpax กับ radio2==true
      const path = pathapi + "/send208";
      const formid = { formId: Date.now() };
      const from_semester = this.from_semester;
      const from_academic = this.from_academic;
      const to_semester = this.to_semester;
      const to_academic = this.to_academic;
      const radio_1 = this.radio_1;
      const radio_2 = this.radio_2;
      const re_text = this.re_text;
      const re_doc = this.re_doc;
      const {
        student_id,
        student_advisor_id,
        student_school,
        student_name,
      } = this.studentInfo;
      const phone = this.stphone;
      const senddata = Object.assign({}, formid, {
        phone,
        student_id,
        student_advisor_id,
        student_school,
        student_name,
        from_semester,
        from_academic,
        to_semester,
        to_academic,
        radio_1,
        radio_2,
        re_text,
        re_doc,
      });
      console.log(senddata);
      if(this.restict && phone!=""){
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
        this.$alert("Undergraduate condition is fail");
      }
    },
    onChange(value) {
      this.stphone = value.phone;
    },
    onSubmit(value) {
      this.from_semester = value.from_semester;
      this.from_academic = value.from_academic;
      this.to_semester = value.to_semester;
      this.to_academic = value.to_academic;
      this.radio_1 = value.radio_1;
      this.radio_2 = value.radio_2;
      this.re_text = value.re_text;
      this.re_doc = value.re_doc;
      this.restict = value.restict
      this.sendformInfo();
    },
  },
  created() {
    this.getstudentInfo();
  },
};
</script>

<style scoped>
.active-cont {
  margin-left: 180px;
}
</style>
