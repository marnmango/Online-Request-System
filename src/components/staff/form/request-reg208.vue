<template>
  <div style="text-align: left">
    <h4>Request</h4>
    <div class="row mb-1 g-3 w-75">
      <p class="mb-0">Semeter</p>
      <div class="row ms-2 mt-0">
        <div class="col-4 form-check">
          <input
            class="form-check-input"
            type="checkbox"
            name="request_checkbox"
            id="request_checkbox_1"
            v-model="reason_checkbox_1"
            disabled
          />
          <label  for="request_checkbox_1">
            Semeter 1
          </label>
        </div>
        <div class="col-4 form-check">
          <input
            class="form-check-input"
            type="checkbox"
            name="request_checkbox"
            id="request_checkbox_2"
            v-model="reason_checkbox_2"
            disabled
          />
          <label  for="request_checkbox_2">
            Semeter 2
          </label>
        </div>
      </div>
    </div>
    <!-- select semeter -->
    <form>
      <div class="row mb-1 g-3">
        <div class="col-3">
          <label for="fromSemeter" class="form-label mb-0">From Semeter</label>
          <input
            id="fromSemeter"
            class="form-control"
            v-model="request_from_semester"
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
            class="form-control"
            id="fromSemeter"
            v-model="request_to_semester"
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
            name="request_readio"
            id="request_radio_1"
            v-model="request_radio_1"
            disabled
          />
          <label  for="request_radio_1">
            Illness with a document and the name of a medical provider
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="request_radio"
            id="request_radio_2"
            v-model="request_radio_2"
            disabled
          />
          <label  for="request_radio_2">
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
            v-model="re_text"
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
      re_text: "",
      request_from_semester: "",
      request_to_semester: "",
      request_from_academicyear: "",
      request_to_academicyear: "",
      request_checkbox_1: false,
      request_checkbox_2: false,
      request_radio_1: false,
      request_radio_2: false,
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
        this.request_from_semester = this.formInfo.request_from_semester;
        this.request_to_semester = this.formInfo.request_to_semester;
        this.request_from_academicyear = this.formInfo.request_from_academicyear;
        this.request_to_academicyear = this.formInfo.request_to_academicyear;
        this.re_text = this.formInfo.request_text;
        this.request_checkbox_1 = this.formInfo.request_checkbox1;
        this.request_checkbox_2 = this.formInfo.request_checkbox2;
        this.request_radio_1 = this.formInfo.reason_radio1;
        this.request_radio_2 = this.formInfo.reason_radio2;
      }
      console.log(
        this.request_checkbox_1,
        this.request_checkbox_2,
        this.request_radio_1,
        this.request_radio_2
      );
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
      if (this.request_radio_1 == 1) {
        document.getElementById("request_radio_1").checked = true;
      } else if (this.request_radio_2 == 1) {
        document.getElementById("request_radio_2").checked = true;
      }
    },
    checkedCheckbox() {
      if (this.request_checkbox_1 == 1 && this.request_checkbox_2 == 1) {
        document.getElementById("request_checkbox_1").checked = true;
        document.getElementById("request_checkbox_2").checked = true;
      } else if (this.request_checkbox_2 == 1) {
        document.getElementById("request_checkbox_2").checked = true;
      } else if (this.request_checkbox_1 == 1) {
        document.getElementById("request_checkbox_1").checked = true;
      }
    },
  },
  mounted() {
    this.getRequesttext();
    this.checkedRadio();
    this.checkedCheckbox();
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
