<template>
  <div>
    <Navbar />
    <div class="p-1 content" style="text-align: center">
      <div class="mx-4">
        <div class="my-4">
          <h4>REGISTRAR DIVISION, MAE FAH LUANG UNIVERSITY</h4>
          <h4>Request Form for Re-entering Student</h4>
        </div>
        <!-- เดี๋ยวมาเพิ่ม -->
        <div>
          <ul class="progressbar">
            <li id="1">Student</li>
            <li id="2">Advisor</li>
            <li id="3">Dean</li>
            <li id="4">Staff</li>
          </ul>
        </div>
        <!-- เดี๋ยวมาเพิ่ม -->
        <div class="row gy-3 mb-3">
          <div class="col-md-6 col-sm-12">
            <div class="p-3 border bg-light shadow-sm">
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
            <div class="p-3 border bg-light shadow-sm">
              <template v-if="childDataLoaded">
                <CommentAdvisor @onSubmit="onSubmit" />
              </template>
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
            <div class="p-3 border bg-light shadow-sm mb-3 h-100">
              <template v-if="childDataLoaded">
                <CommentDean />
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../navbar.vue";
import InformationForm from "../advisor/form/information.vue";
import RequestForm from "../advisor/form/request.vue";
import CommentAdvisor from "../advisor/form/comment-advisor.vue";
import CommentDean from "../advisor/form/comment-dean.vue";
import pathapi from "../../pathapi.js";
import axios from "axios";

export default {
  components: {
    Navbar,
    InformationForm,
    RequestForm,
    CommentAdvisor,
    CommentDean,
  },
  data() {
    return {
      id: "",
      formInfo: "",
      st_phone: "",
      studentInfo: "",
      childDataLoaded: false,
      // create_semester:'',
      // create_academic_year:''
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
          // this.create_semester=this.formInfo.create_semester
          // this.create_academic_year=this.formInfo.create_academic_year
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
    onSubmit(value) {
      this.$confirm("Are you sure?").then(() => {
        const formid = this.formInfo.form_id;
        const formcat = this.formInfo.form_cat;
        const advisorComment = value;
        const deanid = this.formInfo.dean_id;
        const senddata = Object.assign(
          {},
          { formid, advisorComment, formcat, deanid }
        );
        const path = pathapi + "/advisorsubmit";
        axios
          .post(path, senddata)
          .then((res) => {
            console.log(res.data);
            this.$alert("The comment had added");
            this.$router.push({ name: "Listadvisor" });
          })
          .catch((error) => {
            console.log(error);
          });
      });
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