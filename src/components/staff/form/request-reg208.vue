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
          type="text"
          class="form-control"
          id="studentID"
          v-model="re_academic_year"
          disabled
        />
      </div>
    </div>

    <div class="row mb-1 g-3 w-75">
      <div class="col-4">
        <label for="name" class="form-label mb-0">To Semeter</label>
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
          type="text"
          class="form-control"
          id="studentID"
          v-model="re_academic_year"
          disabled
        />
      </div>
    </div>
    <div>
      <!-- reason -->
      <label for="name" class="form-label mb-0">Reasons for on leave</label>
      <div class="form-check">
        <!-- value check==0 -->
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="select1"
          v-on:click="disableIllnessRadio"
        />
        <label class="form-check-label" for="select1">
          Illness with a document and the name of a medical provider
        </label>
        <div class="mb-3">
          <textarea
            class="form-control"
            id="Illness"
            rows="3"
            v-model="re_text"
            readonly
          ></textarea>
        </div>
      </div>
      <div class="form-check">
        <!-- value check==1 -->
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="select2"
          v-on:click="disableOtherRadio"
        />
        <label class="form-check-label" for="select2">
          Other reason ( indicate )
        </label>
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
      re_reasonCheck: 1,
    };
  },
  methods: {
    getRequesttext() {
      console.log(this.formInfo);
      if (this.formInfo) {
        this.re_semester = this.formInfo.request_semester;
        this.re_academic_year = this.formInfo.request_academic_year;
        this.re_text = this.formInfo.request_text;
        // this.re_check = 1;
        // document.getElementById("cancel").remove()
        // document.getElementById("submit").remove()
      }
    },
    reason() {
      if (this.formInfo.re_reasonCheck == 0) {
        document.getElementById("select1").checked = true;
        document.getElementById("Other").innerHTML = "";
      } else if (this.formInfo.re_reasonCheck == 1) {
        document.getElementById("select2").checked = true;
        document.getElementById("Illness").innerHTML = "";
      }
    },
  },
  mounted() {
    this.getRequesttext();
    this.reason();
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
