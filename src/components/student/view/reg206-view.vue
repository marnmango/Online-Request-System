<template>
  <div>
    <Navbar />
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
              <div class="p-3 border bg-light">
                <template v-if="childDataLoaded">
                <InformationForm
                  :info="studentInfo"
                  :Alphone="formInfo.phone"
                />
                </template>
              </div>
            </div>
            <div class="col-xxl-7 col-md-12 col-sm-12 col-xl-12">
              <div class="p-3 border bg-light h-100">
                <template v-if="childDataLoaded">
                <RequestForm 
                :selectsemes="formInfo.select_semester"
                :selectyear="formInfo.select_academicyear"
                :reason_list="reason_list"
                :recredit_list="recredit_list"
                />
                </template>
              </div>
            </div>
            <div class="col-xxl-12 col-md-12 col-sm-12 col-xl-12">
              <div class="p-3 border bg-light h-100">
                <template v-if="childDataLoaded">
                <TableCourse :datatable="datatable"/>
                </template>
              </div>
            </div>
            <div class="col-xxl-12 col-md-12 col-sm-12 col-xl-12">
              <div class="p-3 border bg-light h-100">
                <template v-if="childDataLoaded">
                <Comment206 :advisor_comment="formInfo.advisor_comment" :dean_comment="formInfo.dean_comment"/>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../navStudent.vue";
import InformationForm from "./form-view/information.vue";
import RequestForm from "./form-view/request-reg206.vue";
import TableCourse from "./form-view/tablecourse.vue";
import Comment206 from "./form-view/comment-reg206.vue";
import axios from "axios";
import pathapi from "../../../pathapi.js";
export default {
  components: {
    Navbar,
    InformationForm,
    RequestForm,
    TableCourse,
    Comment206,
  },data() {
    return {
      id: "",
      formInfo: "",
      st_phone: "",
      studentInfo: "",
      childDataLoaded: false,
      recredit_list:[],
      reason_list:[],
      datatable:[]
    };
  },
  methods: {
    getformInfo() {
      let path = pathapi + "/get206?id=" + this.id;
      axios
        .get(path)
        .then((res) => {
          console.log(res.data);
          this.formInfo = res.data;
          this.st_phone = this.formInfo.phone;
          this.recredit_list = JSON.parse(this.formInfo.recredit_list)
          this.reason_list = JSON.parse(this.formInfo.reason_list)
          this.datatable = JSON.parse(this.formInfo.datatable)
          return this.formInfo.student_id;
        })
        .catch((error) => {
          console.log(error);
        })
        .then((id) => {
          let path = pathapi + "/?id=" + id;
          axios
            .get(path)
            .then((res) => {
              console.log(res.data);
              this.studentInfo = res.data;
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .then(() => {
          this.childDataLoaded = true;
        })
        .then(() => {
          this.checkRole();
        });
    },
    checkRole: function () {
      if (this.formInfo.progress_status == 4) {
        document.getElementById("1").classList.add("active");
        document.getElementById("2").classList.add("active");
        document.getElementById("3").classList.add("active");
        document.getElementById("4").classList.add("active"); //4
      } else if (this.formInfo.progress_status == 3) {
        document.getElementById("1").classList.add("active");
        document.getElementById("2").classList.add("active");
        document.getElementById("3").classList.add("active");
        document.getElementById("4").classList.add("wait"); //3
      } else if (this.formInfo.progress_status == 2) {
        document.getElementById("1").classList.add("active");
        document.getElementById("2").classList.add("active");
        document.getElementById("3").classList.add("wait"); //2
      } else if (this.formInfo.progress_status == 1) {
        document.getElementById("1").classList.add("active");
        document.getElementById("2").classList.add("wait"); //1
      } else {
        return "error";
      }
    },
  },
  created() {
    this.id = this.$route.params.id;
    if (this.$route.query.debug) {
      this.debug = this.$route.query.debug;
    }
    this.getformInfo();
  },
};
</script>

<style>
</style>