<template>
  <div style="text-align: left">
    <h4>Request</h4>
    <!-- select year -->
    <div>
      <p class="mb-1 mt-3">Request to Re-entering</p>
      <div class="row m-2 p-3 border pt-2">
        <div class="col-sm-12 col-md-6">
          <label for="semeterselect" class="form-label mb-0">Semeter</label>
          <select
            class="form-select"
            id="semeterselect"
            v-model="selectsemes"
            @change="onChange"
          >
            <option v-for="(text, index) in semeter" :key="index">
              {{ text }}
            </option>
          </select>
        </div>
        <div class="col-sm-12 col-md-6 mx-0">
          <label for="academicselect" class="form-label mb-0"
            >Academic year</label
          >
          <select
            class="form-select"
            id="academicselect"
            v-model="selectyear"
            @change="onChange"
          >
            <option v-for="(year, index) in yeargen" :key="index">
              {{ year }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- get data from 208 -->
    <div>
      <p class="mb-1 mt-3">Semeter to re-entering</p>
      <div class="row m-2 p-3 border">
        <div class="col-md-3">
          <label for="from" class="form-label mb-0">From Semeter</label>
          <input
            type="text"
            class="form-control"
            id="from"
            v-model="re_semester"
            disabled
          />
        </div>
        <div class="col-md-3 mx-0">
          <label for="fromaca" class="form-label mb-0">Academic year</label>
          <input
            type="number"
            min="2018"
            max="2100"
            maxlength="4"
            class="form-control"
            id="fromaca"
            v-model="re_academic_year"
            disabled
          />
        </div>
        <div class="col-md-3">
          <label for="to" class="form-label mb-0">To Semeter</label>
          <input
            type="text"
            class="form-control"
            id="to"
            v-model="to_semester"
            disabled
          />
        </div>
        <div class="col-md-3 mx-0">
          <label for="toaca" class="form-label mb-0">Academic year</label>
          <input
            type="number"
            min="2018"
            max="2100"
            maxlength="4"
            class="form-control"
            id="toaca"
            v-model="to_academicyear"
            disabled
          />
        </div>
      </div>
    </div>

    <!-- submit button -->
    <div class="mt-3" style="text-align: right">
      <button
        type="button"
        class="btn btn-danger mx-2"
        id="cancel"
        v-on:click="disableSubmit(0)"
        disabled
      >
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-success"
        id="submit"
        v-on:click="sendRequest"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formInfo: Object,
    requestsemes: String,
    requestadmy: Number,
    toadmy: Number,
    tosemes: String,
    date: Object,
  },
  data() {
    return {
      re_semester: "",
      re_academic_year: "",
      semeter: ["first", "second"],
      yeargen: [],
      selectsemes: "",
      selectyear: "",
      to_semester: "",
      to_academicyear: "",
      current_semester: "",
      current_academic: "",
    };
  },
  methods: {
    disableSubmit: function (x) {
      if (x == 1) {
        document.getElementById("submit").disabled = true;
        document.getElementById("cancel").disabled = false;
      } else {
        document.getElementById("submit").disabled = false;
        document.getElementById("cancel").disabled = true;
      }
    },
    sendRequest: function () {
      if (this.selectsemes == "" || isNaN(this.selectyear)) {
        this.$alert("Please enter the request");
      } else {
        this.disableSubmit(1);
        let re_semester = this.re_semester;
        let re_academic_year = this.re_academic_year;
        let selectsemes = this.selectsemes;
        let selectyear = this.selectyear;
        let to_semester = this.to_semester;
        let to_academicyear = this.to_academicyear;
        let strequest = {
          re_semester,
          re_academic_year,
          selectsemes,
          selectyear,
          to_semester,
          to_academicyear,
          current_semester: this.current_semester,
          current_academic: this.current_academic,
        };
        this.$emit("onRequest", strequest);
      }
    },
    getRequesttext() {
      console.log(this.formInfo);
      if (this.formInfo) {
        this.re_semester = this.formInfo.request_semester;
        this.re_academic_year = this.formInfo.request_academic_year;
        this.re_text = this.formInfo.request_text;
        document.getElementById("exampleFormControlTextarea1").disabled = true;
        // document.getElementById("cancel").remove()
        // document.getElementById("submit").remove()
      } else {
        this.re_semester = this.requestsemes;
        this.re_academic_year = this.requestadmy;
        this.to_semester = this.tosemes;
        this.to_academicyear = this.toadmy;
        let currentday = new Date();
        let firstsemester = new Date(this.date.startfirst);
        firstsemester.setHours(0, 0, 0, 0);
        let newYear = new Date(firstsemester.getFullYear() + 1, 0, 1);
        let secondsemester = new Date(this.date.startsecond);
        secondsemester.setHours(0, 0, 0, 0);
        let summersemester = new Date(this.date.startsummer);
        summersemester.setHours(0, 0, 0, 0);
        let endfirst = new Date(this.date.endfirst);
        endfirst.setHours(23, 59, 59, 59);
        let endsecond = new Date(this.date.endsecond);
        endsecond.setHours(23, 59, 59, 59);
        console.log(newYear);
        if (currentday < firstsemester || currentday > summersemester) {
          this.current_semester = "summer";
          this.current_academic = currentday.getFullYear() - 1;
        } else if (currentday > firstsemester && currentday < secondsemester) {
          this.current_semester = "first";
          if (currentday < newYear) {
            this.current_academic = currentday.getFullYear();
          } else {
            this.current_academic = currentday.getFullYear() - 1;
          }
        } else if (currentday > secondsemester && currentday < endsecond) {
          this.current_semester = "second";
          this.current_academic = currentday.getFullYear() - 1;
        }
        console.log(this.current_semester, this.current_academic);
      }
    },
    genYear() {
      var minyear = this.re_academic_year,
        maxyear = minyear + 1;
      for (var i = minyear; i <= maxyear; i++) {
        this.yeargen.push(i);
      }
    },
    onChange() {
      let endfirst = new Date(this.date.endfirst);
      endfirst.setHours(23, 59, 59, 59);
      let endsecond = new Date(this.date.endsecond);
      endsecond.setHours(23, 59, 59, 59);
      this.selectyear = parseInt(this.selectyear);
      console.log(this.selectsemes, this.selectyear);
      console.log(
        (this.current_semester == "second" ||
          this.current_semester == "summer") &&
          this.selectsemes == "first" &&
          this.selectyear == this.current_academic
      );
      if (
        (this.current_semester == "second" ||
          this.current_semester == "summer") &&
        this.selectsemes == "first" &&
        this.selectyear == this.current_academic
      ) {
        alert("the semester was passed");
        this.selectyear = null;
        this.selectsemes = null;
        return;
      } else if (
        this.current_semester == "first" &&
        new Date() > endfirst &&
        this.selectsemes == "first" &&
        this.selectyear == this.current_academic
      ) {
        alert("the semester was passed");
        this.selectyear = null;
        this.selectsemes = null;
        return;
      } else if (
        this.current_semester == "second" &&
        new Date() > endsecond &&
        this.selectsemes == "second" &&
        this.selectyear == this.current_academic
      ) {
        alert("the semester was passed");
        this.selectyear = null;
        this.selectsemes = null;
        return;
      } else if (
        this.current_semester == "summer" &&
        this.current_academic == this.selectyear
      ) {
        alert("the semester was passed");
        this.selectyear = null;
        this.selectsemes = null;
        return;
      }
    },
  },
  mounted() {
    this.getRequesttext();
    this.genYear();
  },
};
</script>

<style>
p,
label {
  font-size: 14px;
}
input {
  text-align: center;
}
</style>
