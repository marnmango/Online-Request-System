<template>
  <div style="text-align: left">
    <h4>Request</h4>
    <div class="row mb-1 g-3 w-75">
      <div class="col-4">
        <label for="name" class="form-label mb-0">Semeter</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="re_semester"
          disabled
        />
      </div>
      <div class="col-4 mx-0">
        <label for="studentID" class="form-label mb-0">Academic year</label>
        <input
          type="number"
          min="2018"
          max="2100"
          maxlength="4"
          class="form-control"
          id="studentID"
          v-model="re_academic_year"
          disabled
        />
      </div>
    </div>
    <div>
      <p class="mb-1 mt-3">Reason for re-entering</p>
      <div class="row m-2 p-3 border">
        <div class="col-3 align-self-center align-items-center">
          <p class="mb-0" style="text-indent: 5%; font-size: 16px">
            To take a leave
          </p>
        </div>
        <div class="col">
          <p class="mb-0">Semeter</p>
          <select class="form-select" id="semeterRe" v-model="selectsemes" disabled>
            <option v-for="(text,index) in semeter" :key="index">
              {{ text }}
            </option>
          </select>
        </div>
        <div class="col">
          <p class="mb-0">Academic Year</p>
          <select class="form-select" id="academicYear" v-model="selectyear" disabled>
             <option v-for="(year,index) in yeargen" :key="index">
              {{ year }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formInfo: Object
  },
  data() {
    return {
      re_semester: "",
      re_academic_year: "",
      selectsemes: "",
      selectyear: "",
      semeter: ["first" ,"second"],
      yeargen:[],
    };
  },
  methods: {
    getRequesttext() {
      console.log(this.formInfo);
      if (this.formInfo) {
        this.re_semester = this.formInfo.request_semester;
        this.re_academic_year = this.formInfo.request_academic_year;
        this.selectsemes=this.formInfo.select_semester
        this.selectyear=this.formInfo.select_academicyear
      } else {
        this.re_semester = this.requestsemes;
        this.re_academic_year = this.requestadmy;
      }
    },
    genYear() {
      var minyear = this.re_academic_year,
        maxyear = minyear + 1
      for(var i = minyear; i <= maxyear; i++) {
        this.yeargen.push(i)
      }
    }
  },
  mounted() {
    this.getRequesttext();
    this.genYear()
  }
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
