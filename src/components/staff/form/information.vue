<template>
  <div class="text-start">
    <h4>Personal Information</h4>
    <div class="mb-1">
      <label for="deanof" class="form-label m-0 mt-2"
        >To the dean of school of</label
      >
      <input
        type="text"
        class="form-control"
        id="deanof"
        v-model="info.student_school"
        disabled
      />
    </div>
    <div class="row g-2 mb-1">
      <div class="col-md-2">
        <label for="name" class="form-label m-0 mt-2">Prefix</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="info.prefix"
          disabled
        />
      </div>
      <div class="col-md-6">
        <label for="name" class="form-label m-0 mt-2">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="info.student_name"
          disabled
        />
      </div>
      <div class="col-md-4 col-sm-4">
        <label for="studentID" class="form-label m-0 mt-2">Student ID</label>
        <input
          type="number"
          class="form-control"
          id="studentID"
          v-model="info.student_id"
          disabled
        />
      </div>
    </div>
    <div class="row g-2 mb-1">
      <div class="col-md">
        <label for="schoolOf" class="form-label m-0 mt-2">School of</label>
        <input
          type="text"
          class="form-control"
          id="schoolOf"
          v-model="info.student_school"
          disabled
        />
      </div>
      <div class="col-md">
        <label for="programOf" class="form-label m-0 mt-2">Program of</label>
        <input
          type="text"
          class="form-control"
          id="programOf"
          v-model="info.student_program"
          disabled
        />
      </div>
    </div>
    <div class="row g-2">
      <div class="col">
        <label for="gpax" class="form-label m-0 mt-2">Gpax</label>
        <input
          type="text"
          class="form-control"
          id="gpax"
          v-model="info.student_gpax"
          disabled
        />
      </div>
      <div class="mb-1 col-md-6 col-sm-12">
        <label for="phoneNumber" class="form-label m-0 mt-2"
          >Phone number</label
        >
        <input
          type="tel"
          maxlength="10"
          min="0"
          pattern="[0]{1}[0-9]{9}"
          v-model="phone"
          class="form-control"
          id="phoneNumber"
          @change="sendphone"
          disabled
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: Object,
    Alphone: Number,
  },
  data() {
    return {
      studentInfo: "",
      phone: "",
    };
  },
  methods: {
    getPhone() {
      console.log(this.Alphone);
      if (this.Alphone) {
        this.phone = this.Alphone;
        document.getElementById("phoneNumber").disabled = true;
      }
    },
    // getSemester() {
    //   let currentday = new Date();
    //   let firstsemester = new Date("24 Aug 2020");
    //   let secondsemester = new Date("25 Jan 2021");
    //   let summersemester = new Date("21 Jun 2021");

    //   if (currentday >= firstsemester && currentday < secondsemester) {
    //     this.currentsemester = "First";
    //   } else if (currentday >= secondsemester && currentday < summersemester) {
    //     this.currentsemester = "Second";
    //   } else {
    //     this.currentsemester = "Summer";
    //   }
    // },
    // getAcademicyear() {
    //   let currentday = new Date();
    //   let firstsemester = new Date("24 Aug 2020");
    //   let endsemester = new Date("22 Aug 2021");
    //   if (currentday >= firstsemester && currentday < endsemester) {
    //     this.currentacademicyear = firstsemester.getFullYear();
    //   }
    // },
    sendphone() {
      const phone = this.phone;
      this.$emit("onChange", { phone });
    },
  },
  mounted() {
    this.getPhone();
  },
};
</script>

<style></style>
