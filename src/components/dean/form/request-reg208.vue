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
    <form>
      <div class="row mb-1 g-3">
        <div class="col-3">
          <label for="fromSemeter" class="form-label mb-0">From Semeter</label>
          <input
            type="number"
            id="fromSemeter"
            class="form-control"
            v-model="request_from_semeter"
            readonly
          />
        </div>
        <div class="col-3">
          <label for="fromAcademic" class="form-label mb-0"
            >Academic Year</label
          >
          <input
            type="number"
            class="form-control"
            id="fromAcademic"
            v-model="request_from_academicyear"
            readonly
          />
        </div>
        <div class="col-3">
          <label for="fromSemeter" class="form-label mb-0">To Semeter</label>
          <input
            type="number"
            class="form-control"
            id="fromSemeter"
            v-model="request_to_semeter"
            readonly
          />
        </div>
        <div class="col-3">
          <label for="toAcademic" class="form-label mb-0">Academic Year</label>
          <input
            type="number"
            class="form-control"
            id="toAcademic"
            v-model="request_to_academicyear"
            readonly
          />
        </div>
      </div>
      <!-- radio check -->
      <div>
        <label for="name" class="form-label mb-0 mt-3"
          >Reasons for on leave</label
        >
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="request_checkbox"
            id="request_checkbox_1"
            v-model="request_checkbox_1"
            v-on:click="disableIllnessRadio"
          />
          <label class="form-check-label" for="request_checkbox_1">
            Illness with a document and the name of a medical provider
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="request_checkbox"
            id="request_checkbox_2"
            v-model="request_checkbox_2"
            v-on:click="disableOtherRadio"
          />
          <label class="form-check-label" for="request_checkbox_2">
            Other reason ( indicate )
          </label>
        </div>
      </div>
      <div class="form-check">
        <div class="mb-3">
          <textarea
            class="form-control"
            id="Other"
            rows="3"
            v-model="reason_radio_2"
            readonly
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
      re_semester: "first",
      re_academic_year: 2021,
      re_text: "",
      request_from_semeter: null,
      request_to_semeter: "",
      request_from_academicyear: "",
      request_to_academicyear: "",
      request_checkbox_1: 1,
      request_checkbox_2: 0,
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
      // document.getElementById("Illness").innerHTML.replace(this.re_text);
    },
    disableIllnessRadio: function () {
      document.getElementById("Illness").disabled = false;
      document.getElementById("Other").disabled = true;
      // document.getElementById("Other").innerHTML.replace(this.re_text);
    },
    checkedRadio() {
      if (this.request_checkbox_1 == 1) {
        document.getElementById("request_checkbox_1").checked = true;
      } else if (this.request_checkbox_2 == 1) {
        document.getElementById("request_checkbox_2").checked = true;
      }
    },
  },
  mounted() {
    this.getRequesttext();
    this.checkedRadio();
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
