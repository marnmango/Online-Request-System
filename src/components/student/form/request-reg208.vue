<template>
  <div style="text-align: left">
    <h4>Request</h4>
    <div class="row mb-1 g-3 w-75">
      <p class="mb-0">Semeter</p>
      <div class="row ms-2 mt-0">
        <div class="col-3 form-check">
          <input
            class="form-check-input"
            type="checkbox"
            name="request_checkbox"
            id="request_checkbox_1"
            v-model="reason_checkbox_1"
          />
          <label class="form-check-label" for="request_checkbox_1">
            Semeter 1
          </label>
        </div>
        <div class="col-3 form-check">
          <input
            class="form-check-input"
            type="checkbox"
            name="request_checkbox"
            id="request_checkbox_2"
            v-model="reason_checkbox_2"
          />
          <label class="form-check-label" for="request_checkbox_2">
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
            type="number"
            id="fromSemeter"
            class="form-control"
            placeholder="Semeter"
            v-model="request_from_semeter"
            required
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
            placeholder="Year"
            v-model="request_from_academicyear"
            required
          />
        </div>
        <div class="col-3">
          <label for="fromSemeter" class="form-label mb-0">To Semeter</label>
          <input
            type="number"
            class="form-control"
            id="fromSemeter"
            placeholder="Semeter"
            v-model="request_to_semeter"
            required
          />
        </div>
        <div class="col-3">
          <label for="toAcademic" class="form-label mb-0">Academic Year</label>
          <input
            type="number"
            class="form-control"
            id="toAcademic"
            placeholder="Year"
            v-model="request_to_academicyear"
            required
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
            id="request_readio_1"
            v-model="reason_radio_1"
            v-on:click="disableIllnessRadio"
          />
          <label class="form-check-label" for="request_readio_1">
            Illness with a document and the name of a medical provider
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="request_readio"
            id="request_readio_2"
            v-model="reason_radio_2"
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
            v-model="re_text"
            required
          ></textarea>
        </div>
        <!-- choose file -->
        <div class="row mt-3">
          <div class="col-6 input-group w-50">
            <input
              type="file"
              class="form-control"
              id="inputFile"
              aria-label="Upload"
              required
            />
            <div class="row-12">
              <p class="m-0 ms-1">Documents that need to be attached</p>
              <ol>
                <li class="w-100"><p class="m-0">Medical certificate</p></li>
                <li class="w-100">
                  <p class="m-0">Confirmation documents from parents</p>
                </li>
                <li class="w-100">
                  <p class="m-0">ID card copy (With parents’s signature)</p>
                </li>
              </ol>
            </div>
          </div>
          <div class="col-6" style="text-align: right">
            <button
              type="button"
              class="btn btn-danger mx-2"
              id="cancel"
              v-on:click="onCancel"
            >
              Cancel
            </button>
            <!-- ถ้าใส่ v-onclick มันเช็คให้ขึ้นเตือนไม่ได้ -->
            <button type="submit" class="btn btn-success" id="submit">
              Submit
            </button>
          </div>
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
