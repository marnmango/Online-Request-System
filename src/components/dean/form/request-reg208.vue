<template>
  <div style="text-align: left">
    <h4>Request</h4>

    <!-- select semeter -->
    <form>
      <div class="row mb-1 g-3">
        <div class="col-md-3 col-sm-12 col-lg-6">
          <label for="fromSemeter" class="form-label mb-0">From Semeter</label>
          <input
            id="fromSemeter"
            class="form-control"
            v-model="request_from_semester"
            readonly
          />
        </div>
        <div class="col-md-3 col-sm-12 col-lg-6">
          <label for="fromAcademic" class="form-label mb-0"
            >Academic Year</label
          >
          <input
            type="number"
            min="2018"
            max="2100"
            maxlength="4"
            class="form-control"
            id="fromAcademic"
            v-model="request_from_academicyear"
            readonly
          />
        </div>
        <div class="col-md-3 col-sm-12 col-lg-6">
          <label for="fromSemeter" class="form-label mb-0">To Semeter</label>
          <input
            class="form-control"
            id="fromSemeter"
            v-model="request_to_semester"
            readonly
          />
        </div>
        <div class="col-md-3 col-sm-12 col-lg-6">
          <label for="toAcademic" class="form-label mb-0">Academic Year</label>
          <input
            type="number"
            min="2018"
            max="2100"
            maxlength="4"
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
      <div class="row ms-4 my-2">
          <div class="form-check col-md-6 col-sm-12">
            <input
              class="form-check-input"
              type="radio"
              name="request_radio"
              id="request_radio_1"
              v-bind:checked="radio_list[0]"
              disabled
            />
            <label class="form-check-label" for="request_readio_1">
              Military Service
            </label>
          </div>
          <div class="form-check col-md-6 col-sm-12">
            <input
              class="form-check-input"
              type="radio"
              name="request_radio"
              id="request_radio_2"
              v-bind:checked="radio_list[1]"
              disabled
            />
            <label class="form-check-label" for="request_readio_1">
              Exchange Program
            </label>
          </div>
          <div class="form-check col-md-6 col-sm-12">
            <input
              class="form-check-input"
              type="radio"
              name="request_radio"
              id="request_radio_3"
              v-bind:checked="radio_list[2]"
              disabled
            />
            <label class="form-check-label" for="request_readio_1">
              Illness with a document and the name of a medical provider
            </label>
          </div>
          <div class="form-check col-md-6 col-sm-12">
            <input
              class="form-check-input"
              type="radio"
              name="request_radio"
              id="request_radio_4"
              v-bind:checked="radio_list[3]"
              disabled
            />
            <label class="form-check-label" for="request_checkbox_2">
              Other reason ( please provide the information )
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
     radio_list:[false,false,false,false],
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
        this.request_from_academicyear =
          this.formInfo.request_from_academicyear;
        this.request_to_academicyear = this.formInfo.request_to_academicyear;
        this.re_text = this.formInfo.request_text;
        this.request_checkbox_1 = this.formInfo.request_checkbox1;
        this.request_checkbox_2 = this.formInfo.request_checkbox2;
         this.radio_list = JSON.parse(this.formInfo.reason_list)
      }
      console.log(
        this.request_checkbox_1,
        this.request_checkbox_2,
      );
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
