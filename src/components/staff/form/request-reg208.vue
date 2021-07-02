<template>
  <div style="text-align: left">
    <h4>Request</h4>

    <!-- select semeter -->
    <form>
      <div class="row mb-1 g-3">
        <div class="col-md-3 col-sm-12 col-lg-6">
          <label for="fromSemeter" class="form-label mb-0">From Semeter</label>
          <select
            class="form-select"
            id="semeterRe1"
            v-model="selectsemes_from"
            @change="onChange"
            disabled
          >
            <option v-for="(text, index) in request_from_semeter" :key="index">
              {{ text }}
            </option>
          </select>
        </div>
        <div class="col-md-3 col-sm-12 col-lg-6">
          <label for="fromAcademic" class="form-label mb-0"
            >Academic Year</label
          >
          <select
            class="form-select"
            id="academicYear1"
            v-model="selectyear_from"
            @change="onYear"
            disabled
          >
            <option
              v-for="(year, index) in request_from_academicyear"
              :key="index"
            >
              {{ year }}
            </option>
          </select>
        </div>
        <div class="col-md-3 col-sm-12 col-lg-6">
          <label for="fromSemeter" class="form-label mb-0">To Semeter</label>
          <select
            class="form-select"
            id="semeterRe2"
            v-model="selectsemes_to"
            @change="onChange"
            disabled
          >
            <option v-for="(text, index) in request_to_semeter" :key="index">
              {{ text }}
            </option>
          </select>
        </div>
        <div class="col-md-3 col-sm-12 col-lg-6">
          <label for="toAcademic" class="form-label mb-0">Academic Year</label>
          <select
            class="form-select"
            id="academicYear2"
            v-model="selectyear_to"
            @change="onChange"
            disabled
          >
            <option
              v-for="(year, index) in request_to_academicyear"
              :key="index"
            >
              {{ year }}
            </option>
          </select>
        </div>
      </div>
      <p id="p1"></p>
      <!-- radio check -->
      <div>
        <label for="name" class="form-label mb-0 mt-3"
          >Reasons for on leave</label
        >
        <div class="row mx-4 my-2">
          <div class="form-check col col-lg-6 col-md-6">
            <input
              class="form-check-input"
              type="radio"
              name="request_radio"
              id="request_radio_1"
              v-bind:checked="request_radio_1"
              disabled
            />
            <label class="form-check-label" for="request_readio_1">
              Illness with a document and the name of a medical provider
            </label>
          </div>
          <div class="form-check col col-lg-6 col-md-6">
            <input
              class="form-check-input"
              type="radio"
              name="request_radio"
              id="request_radio_2"
              v-bind:checked="request_radio_2"
              disabled
            />
            <label class="form-check-label" for="request_checkbox_2">
              Other reason ( indicate )
            </label>
          </div>
        </div>
      </div>
      <div class="form-check">
        <div class="mb-3">
          <textarea
            class="form-control"
            id="Other"
            rows="5"
            v-model="re_text"
            required
            disabled
          ></textarea>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    formInfo: Object,
  },
  data() {
    return {
      re_text: "",
      request_from_semeter: ["first", "second"],
      request_to_semeter: ["first", "second"],
      request_from_academicyear: [],
      request_to_academicyear: [],
      request_radio_1: false,
      request_radio_2: false,
      selectsemes_from: "",
      selectsemes_to: "",
      selectyear_from: "",
      selectyear_to: "",
    };
  },
  methods: {
    getRequesttext() {
      console.log(this.formInfo);
      if (this.formInfo) {
        this.selectsemes_from = this.formInfo.request_from_semester;
        this.selectsemes_to = this.formInfo.request_to_semester;
        this.selectyear_from = this.formInfo.request_from_academicyear;
        this.selectyear_to = this.formInfo.request_to_academicyear;
        this.re_text = this.formInfo.request_text;
        this.request_radio_1 = this.formInfo.reason_radio1;
        this.request_radio_2 = this.formInfo.reason_radio2;
        this.selectyear_from = parseInt(this.selectyear_from);
        let minyear = this.selectyear_from;
        let maxyear = minyear + 1;
        let arrayYear = [];
        for (var i = minyear; i <= maxyear; i++) {
          arrayYear.push(i);
        }
        this.request_to_academicyear = arrayYear;
      }
    },
    checkedRadio() {
      if (this.request_radio_1 == 1) {
        document.getElementById("request_radio_1").checked = true;
      } else if (this.request_radio_2 == 1) {
        document.getElementById("request_radio_2").checked = true;
      }
    },
    genYear() {
      var minyear = this.selectyear_from;
      var maxyear = minyear + 3;
      for (var i = minyear; i <= maxyear; i++) {
        this.request_from_academicyear.push(i);
      }
    },
  },
  mounted() {
    this.getRequesttext();
    this.checkedRadio();
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
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
