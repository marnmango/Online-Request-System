<template>
  <div>
    <Navbar />
    <div>
      <div class="p-1 content" style="text-align: center">
        <div class="mx-4">
          <div class="my-4">
            <h4>REGISTRAR DIVISION, MAE FAH LUANG UNIVERSITY</h4>
            <h4>Request Form for Leave of Absence : Undergraduate Student</h4>
          </div>
          <div class="row gy-3 mb-3">
            <div class="col-xxl-5 col-md-12 col-sm-12 col-xl-12">
              <div class="p-3 border bg-light">
                <InformationForm :info="studentInfo" @onChange="onChange" />
              </div>
            </div>
            <div class="col-xxl-7 col-md-12 col-sm-12 col-xl-12">
              <div class="p-3 border bg-light h-100" v-if="childonload">
                <RequestForm208 @onSubmit="onSubmit" :date="date" />
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
      radio_list:[],
      re_text: "",
      re_doc: "",
      studentid: "",
      restict: true,
      date: "",
      childonload: false,
      current_semester: "",
      current_academic: "",
    };
  },
  methods: {
    getstudentInfo() {
      const path = axios.get(pathapi + "/?id=" + this.studentid);
      const path2 = axios.get(pathapi + "/getDate");
      axios
        .all([path, path2])
        .then(
          axios.spread((...res) => {
            this.studentInfo = res[0].data;
            this.date = res[1].data;
          })
        )
        .catch((error) => {
          console.log(error);
        })
        .then(() => (this.childonload = true));
    },
    sendformInfo() {
      // run function check เงื่อนไข gpax กับ radio2==true
      const path = pathapi + "/send208";
      const formid = { formId: Date.now() };
      const from_semester = this.from_semester;
      const from_academic = this.from_academic;
      const to_semester = this.to_semester;
      const to_academic = this.to_academic;
      const radio_list = this.radio_list;
      const re_text = this.re_text;
      const re_doc = this.re_doc;
      const { student_id, student_advisor_id, student_school, student_name } =
        this.studentInfo;
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
        radio_list,
        re_text,
        re_doc,
        current_semester: this.current_semester,
        current_academic: this.current_academic,
      });
      console.log(senddata);
      if (this.restict && phone != "") {
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
        this.$alert("Undergraduate condition is fail");
      }
    },
    onChange(value) {
      this.stphone = value.phone;
    },
    onSubmit(value) {
      if (this.stphone == "") {
        alert("Enter your phone number");
      } else {
        this.from_semester = value.from_semester;
        this.from_academic = value.from_academic;
        this.to_semester = value.to_semester;
        this.to_academic = value.to_academic;
        this.radio_list = value.radio_list;
        this.re_text = value.re_text;
        this.re_doc = value.re_doc;
        this.restict = value.restict;
        this.current_semester = value.current_semester;
        this.current_academic = value.current_academic;
        this.sendformInfo();
      }
    },
  },
  created() {
    this.studentid = JSON.parse(sessionStorage.getItem("user")).user_id;
    this.getstudentInfo();
  },
};
</script>

<style scoped>
</style>
