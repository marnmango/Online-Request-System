<template>
  <div style="text-align: left">
    <h4>Request</h4>
    <!-- select year -->
    <div>
      <p class="mb-1 mt-3">Request to Re-entering</p>
      <div class="row m-2 p-3 border pt-2">
        <div class="col-md-6 col-sm-12">
          <label for="semeterselect" class="form-label mb-0">Semeter</label>
          <input
            class="form-control"
            id="semeterselect"
            v-model="selectsemes"
            disabled
          />
        </div>
        <div class="col-md-6 col-sm-12">
          <label for="academicselect" class="form-label mb-0"
            >Academic year</label
          >
          <input
            class="form-control"
            id="academicselect"
            v-model="selectyear"
            disabled
          />
        </div>
      </div>
    </div>

    <!-- get data from 208 -->
    <div>
      <p class="mb-1 mt-3">Semeter to re-entering</p>
      <div class="row m-2 p-3 border">
        <div class="col-md-6 col-sm-12">
          <label for="from" class="form-label mb-0">From Semeter</label>
          <input
            type="text"
            class="form-control"
            id="from"
            v-model="re_semester"
            disabled
          />
        </div>
        <div class="col-md-6 col-sm-12">
          <label for="formaca" class="form-label mb-0">Academic year</label>
          <input
            type="number"
            min="2018"
            max="2100"
            maxlength="4"
            class="form-control"
            id="formaca"
            v-model="re_academic_year"
            disabled
          />
        </div>
        <div class="col-md-6 col-sm-12">
          <label for="to" class="form-label mb-0">To Semeter</label>
          <input
            type="text"
            class="form-control"
            id="to"
            v-model="formInfo.to_semester"
            disabled
          />
        </div>
        <div class="col-md-6 col-sm-12">
          <label for="toaca" class="form-label mb-0">Academic year</label>
          <input
            type="number"
            min="2018"
            max="2100"
            maxlength="4"
            class="form-control"
            id="toaca"
            v-model="formInfo.to_academicyear"
            disabled
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formInfo: Object,
  },
  data() {
    return {
      re_semester: "",
      re_academic_year: "",
      selectsemes: "",
      selectyear: "",
      semeter: ["first", "second"],
      yeargen: [],
    };
  },
  methods: {
    getRequesttext() {
      console.log(this.formInfo);
      if (this.formInfo) {
        this.re_semester = this.formInfo.request_semester;
        this.re_academic_year = this.formInfo.request_academic_year;
        this.selectsemes = this.formInfo.select_semester;
        this.selectyear = this.formInfo.select_academicyear;
      } else {
        this.re_semester = this.requestsemes;
        this.re_academic_year = this.requestadmy;
      }
    },
    genYear() {
      var minyear = this.re_academic_year,
        maxyear = minyear + 1;
      for (var i = minyear; i <= maxyear; i++) {
        this.yeargen.push(i);
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
