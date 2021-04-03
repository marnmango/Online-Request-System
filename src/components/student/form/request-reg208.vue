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
    </div>
    <!-- select semeter -->
    <div class="row mb-1 g-3 w-75">
      <div class="col-4">
        <label for="name" class="form-label mb-0">From Semeter</label>
        <select class="form-select text-center form-control" id="fromSemeter">
          <option selected>Semeter</option>
          <option v-for="fromsemeter in select_semeter" :key="fromsemeter">
            {{ fromsemeter.semeter }}
          </option>
        </select>
      </div>
      <div class="col-4">
        <label for="name" class="form-label mb-0">Academic Year</label>
        <select class="form-select text-center form-control" id="fromSemeter">
          <option selected></option>
          <option v-for="year in select_year" :key="year">
            {{ year.year }}
          </option>
        </select>
      </div>
    </div>
    <div class="row mb-1 g-3 w-75">
      <div class="col-4">
        <label for="name" class="form-label mb-0">To Semeter</label>
        <select class="form-select text-center form-control" id="fromSemeter">
          <option selected></option>
          <option v-for="fromsemeter in select_semeter" :key="fromsemeter">
            {{ fromsemeter.semeter }}
          </option>
        </select>
      </div>
      <div class="col-4">
        <label for="name" class="form-label mb-0">Academic Year</label>
        <select class="form-select text-center form-control" id="fromSemeter">
          <option selected></option>
          <option v-for="year in select_year" :key="year">
            {{ year.year }}
          </option>
        </select>
      </div>
    </div>
    <div>
      <!-- radio check -->
      <label for="name" class="form-label mb-0">Reasons for on leave</label>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="illnessselect"
          v-on:click="disableIllnessRadio"
        />
        <label class="form-check-label" for="illnessselect">
          Illness with a document and the name of a medical provider
        </label>
        <div class="mb-3">
          <textarea class="form-control" id="Illness" rows="3"></textarea>
        </div>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="otherreason"
          v-on:click="disableOtherRadio"
        />
        <label class="form-check-label" for="otherreason">
          Other reason ( indicate )
        </label>
        <div class="mb-3">
          <textarea class="form-control" id="Other" rows="3"></textarea>
        </div>
      </div>
    </div>
    <div class="mt-3" style="text-align: right">
      <button
        type="button"
        class="btn btn-danger mx-2"
        id="cancel"
        v-on:click="onCancel"
      >
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-success"
        id="submit"
        v-on:click="onSubmit"
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
  },
  data() {
    return {
      re_semester: "first",
      re_academic_year: 2021,
      re_text: "",
      select_semeter: [{ semeter: "1" }, { semeter: "2" }, { semeter: "3" }],
      select_year: [
        { year: "2018" },
        { year: "2019" },
        { year: "2020" },
        { year: "2021" },
        { year: "2022" },
        { year: "2023" },
        { year: "2024" },
        { year: "2025" },
        { year: "2026" },
        { year: "2027" },
        { year: "2028" },
      ],
    };
  },
  methods: {
    disableSubmit: function () {
      document.getElementById("submit").disabled = true;
      document.getElementById("cancel").disabled = true;
    },
    onCancel: function () {
      this.$emit("onCancel");
      this.disableSubmit();
    },
    onSubmit: function () {
      this.$emit("onSubmit");
      this.disableSubmit();
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
      }
    },
    disableOtherRadio: function () {
      document.getElementById("Illness").disabled = true;
      document.getElementById("Other").disabled = false;
    },
    disableIllnessRadio: function () {
      document.getElementById("Other").disabled = true;
      document.getElementById("Illness").disabled = false;
    },
  },
  mounted() {
    this.getRequesttext();
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
