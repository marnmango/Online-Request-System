<template>
  <div class="mb-3">
    <NavStudent />
    <div class="p-1 content" style="text-align: center">
      <div class="mx-4">
        <div class="my-4">
          <h4>REGISTRAR DIVISION, MAE FAH LUANG UNIVERSITY</h4>
          <h4>Request Form for Re-entering Student</h4>
        </div>
        <!-- เดี๋ยวมาเพิ่ม -->
        <div>
          <ul class="progressbar px-0">
            <li id="1">Student</li>
            <li id="2">Advisor</li>
            <li id="3">Dean</li>
            <li id="4">Staff</li>
          </ul>
        </div>
        <!-- เดี๋ยวมาเพิ่ม -->
        <div class="row gy-3 mb-3">
          <div class="col-md-6 col-sm-12">
            <div class="p-3 border bg-light shadow-sm h-100">
              <template v-if="childDataLoaded">
                <InformationForm
                  :info="studentInfo"
                  :Alphone="formInfo.phone"
                />
              </template>
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
            <div class="p-3 border bg-light h-100 shadow-sm">
              <template v-if="childDataLoaded">
                <RequestForm :formInfo="formInfo" />
              </template>
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
            <div class="p-3 border bg-light shadow-sm h-100">
              <template v-if="childDataLoaded">
                <CommentAdvisor :advisorComments="formInfo.advisor_comment" />
              </template>
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
            <div class="p-3 border bg-light shadow-sm mb-3 h-100">
              <template v-if="childDataLoaded">
                <CommentDean :deanComments="formInfo.dean_comment" />
              </template>
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
            <div class="p-3 border bg-light shadow-sm mb-3 h-100">
              <template v-if="childDataLoaded">
                <CommentStaff :staffcomment="formInfo.staff_comment" />
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavStudent from "../navStudent.vue";
import InformationForm from "./form-view/information.vue";
import RequestForm from "./form-view/request-reg209.vue";
import CommentAdvisor from "./form-view/comment-advisor.vue";
import CommentDean from "./form-view/comment-dean.vue";
import CommentStaff from "./form-view/comment-staff.vue";
import axios from "axios";
import pathapi from "../../../pathapi.js";

export default {
  components: {
    NavStudent,
    InformationForm,
    RequestForm,
    CommentAdvisor,
    CommentDean,
    CommentStaff,
  },
  data() {
    return {
      id: "",
      formInfo: "",
      st_phone: "",
      studentInfo: "",
      childDataLoaded: false,
    };
  },
  methods: {
    getformInfo() {
      let path = pathapi + "/get209?id=" + this.id;
      axios
        .get(path)
        .then((res) => {
          console.log(res.data);
          this.formInfo = res.data;
          this.st_phone = this.formInfo.phone;
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

<style scoped>
.progressbar li {
  list-style: none;
  display: inline-block;
  width: 10%;
  position: relative;
  text-align: center;
  cursor: pointer;
  background-color: transparent;
  color: black;
}
.progressbar li:before {
  content: "";
  width: 30px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #eaecef;
  border-radius: 100%;
  display: block;
  text-align: center;
  margin: 0 auto 10px auto;
  background-color: #eaecef;
}
.progressbar li:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 3px;
  background-color: #eaecef;
  top: 15px;
  left: -50%;
  z-index: -1;
}
.progressbar li:first-child:after {
  content: none;
}

.progressbar li.active:before {
  border-color: #28a745;
  background-color: #28a745;
}
.progressbar li.active + li:after {
  background-color: #28a745;
}
li.wait:before {
  border-color: #ffc107;
  background-color: #ffc107;
}
@media screen and (max-width: 400px) {
  .progressbar li {
    width: 25%;
  }
}
</style>
