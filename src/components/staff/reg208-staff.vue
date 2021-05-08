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
          <div class="container">
            <ul class="progressbar">
              <li id="1">Student</li>
              <li id="2">Staff</li>
              <li id="3">Advisor</li>
              <li id="4">Dean</li>
              <li id="5">Payment</li>
              <li id="6">Finish</li>
            </ul>
          </div>
          <div class="row gy-3 mx-5">
            <div class="col-6">
              <div class="p-3 border bg-light h-100">
                <template v-if="childDataLoaded">
                  <InformationForm
                    :info="studentInfo"
                    :Alphone="formInfo.phone"
                  />
                </template>
              </div>
            </div>
            <div class="col-6">
              <div class="p-3 border bg-light h-100">
                <template v-if="childDataLoaded">
                  <RequestForm208 :formInfo="formInfo" />
                </template>
              </div>
            </div>
            <template v-if="childDataLoaded">
              <div class="col-6" v-for="(pic, index) in picture" :key="index">
                <div class="p-3 border bg-light">
                  <RequestImg208 :picture="pic" />
                </div>
              </div>
            </template>
            <div class="col-6 h-100">
              <template v-if="childDataLoaded && formInfo.progress_status == 1">
                <div class="p-3 border bg-light h-100">
                  <Comment208 @onCancel="onCancel" @onSubmit="onSubmit" />
                </div>
              </template>
              <template v-if="childDataLoaded && formInfo.progress_status != 1">
                <div class="p-3 border bg-light h-100">
                  <Comment208
                    :staff_comment="formInfo.staff_comment"
                    :advisor_comment="formInfo.advisor_comment"
                    :dean_comment="formInfo.dean_comment"
                  />
                </div>
              </template>
              <div class="row-6 p-3 border bg-light mt-3 mb-3">
                <template
                  v-if="
                    childDataLoaded &&
                    (formInfo.progress_status == 4 ||
                      formInfo.progress_status == 5) &&
                    !formInfo.payment_status
                  "
                >
                  <Payment :formInfo="formInfo" @onSetDept="onSetDept" />
                </template>
                <template
                  v-if="
                    childDataLoaded &&
                    formInfo.payment_status &&
                    formInfo.progress_status != 5
                  "
                >
                  <PaymentView
                    :picture="formInfo.payment_doc"
                    :amount="formInfo.payment_amount"
                    @onApprove="onApprove"
                    @onDisapprove="onDisapprove"
                  />
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
import Navbar from "../navbar.vue";
import InformationForm from "./form/information.vue";
import RequestForm208 from "./form/request-reg208.vue";
import Comment208 from "./form/comment-reg208.vue";
import RequestImg208 from "./form/requestimg-reg208.vue";
import Payment from "./form/payment.vue";
import PaymentView from "./form/payment-view.vue";
import axios from "axios";
import pathapi from "../../pathapi.js";
export default {
  components: {
    Navbar,
    InformationForm,
    RequestForm208,
    Comment208,
    RequestImg208,
    Payment,
    PaymentView,
  },

  data() {
    return {
      // staff_id is prop when log in
      staff_id: "",
      id: "",
      formInfo: "",
      st_phone: "",
      studentInfo: "",
      childDataLoaded: false,
      picture: [],
    };
  },
  methods: {
    getformInfo() {
      let path = pathapi + "/get208?id=" + this.id;
      axios
        .get(path)
        .then((res) => {
          console.log(res.data);
          this.formInfo = res.data;
          this.st_phone = this.formInfo.phone;
          let picturename = JSON.parse(this.formInfo.reason_doc);
          for (let indexs in picturename) {
            this.picture.push(
              "http://selab.mfu.ac.th:9001/download?bucket=sp61&filename=/sp_ors/" +
                picturename[indexs]
            );
          }
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
      if (this.formInfo.progress_status == 5) {
        document.getElementById("1").classList.add("active");
        document.getElementById("2").classList.add("active");
        document.getElementById("3").classList.add("active");
        document.getElementById("4").classList.add("active");
        document.getElementById("5").classList.add("active");
        document.getElementById("6").classList.add("active"); //5
      } else if (this.formInfo.progress_status == 4) {
        document.getElementById("1").classList.add("active");
        document.getElementById("2").classList.add("active");
        document.getElementById("3").classList.add("active");
        document.getElementById("4").classList.add("active");
        document.getElementById("5").classList.add("wait"); //4
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
      } else if (this.formInfo.progress_status == 0) {
        document.getElementById("1").classList.add("wait"); //0
      } else {
        return "error";
      }
    },
    onSubmit(value) {
      this.$confirm("Are you sure?").then(() => {
        const formid = this.formInfo.form_id;
        const staffid = this.staff_id;
        const formcat = this.formInfo.form_cat;
        const advisorid = this.formInfo.advisor_id;
        const staffcomment = value;
        const studentid = this.formInfo.student_id;
        const senddata = Object.assign(
          {},
          { formid, staffid, formcat, advisorid, staffcomment, studentid }
        );
        const path = pathapi + "/staffsubmit";
        axios
          .post(path, senddata)
          .then((res) => {
            console.log(res.data);
            this.$alert("The request had confirm");
            this.$router.push({ name: "List" });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    onCancel(value) {
      this.$confirm("Are you sure?").then(() => {
        const formid = this.formInfo.form_id;
        const staffid = this.staff_id;
        const studentid = this.formInfo.student_id;
        const formcat = this.formInfo.form_cat;
        const staffcomment = value;
        const senddata = Object.assign(
          {},
          { formid, staffid, studentid, staffcomment, formcat }
        );
        console.log(senddata);
        const path = "http://127.0.0.1:5000/cancel";
        axios
          .post(path, senddata)
          .then((res) => {
            console.log(res.data);
            this.$alert("The request had cancel");
            this.$router.push({ name: "List" });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    onSetDept(value) {
      this.$confirm("Are you sure?").then(() => {
        const formid = this.formInfo.form_id;
        const studentid = this.formInfo.student_id;
        const amount = value;
        const senddata = Object.assign({}, { formid, studentid, amount });
        const path = pathapi + "/setdept";
        axios
          .post(path, senddata)
          .then((res) => {
            console.log(res.data);
            this.$alert("The Dept has set");
            this.$router.push({ name: "List" });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    onApprove() {
      this.$confirm("Are you sure?").then(() => {
        const formid = this.formInfo.form_id;
        const studentid = this.formInfo.student_id;
        const senddata = Object.assign({}, { formid, studentid });
        const path = pathapi + "/approvepayment";
        axios
          .post(path, senddata)
          .then((res) => {
            console.log(res.data);
            this.$alert("Form has approve");
            this.$router.push({ name: "List" });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    onDisapprove() {
      this.$confirm("Are you sure?").then(() => {
        const formid = this.formInfo.form_id;
        const studentid = this.formInfo.student_id;
        const senddata = Object.assign({}, { formid, studentid });
        const path = pathapi + "/disapprovepayment";
        axios
          .post(path, senddata)
          .then((res) => {
            console.log(res.data);
            this.$alert("Form has disapprove");
            this.$router.push({ name: "List" });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.staff_id = this.$route.params.staff_id;
    if (this.$route.query.debug) {
      this.debug = this.$route.query.debug;
    }
    console.log(this.staff_id);
    this.getformInfo();
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
</style>
