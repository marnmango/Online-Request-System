<template>
  <div style="text-align: left">
    <h4>Personal Information</h4>
    <div class="mb-1">
      <label for="deanof" class="form-label mb-0 mt-2"
        >To the dean of school of</label
      >
      <input
        type="text"
        class="form-control w-50"
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
      <div class="col-md-7">
        <label for="name" class="form-label m-0 mt-2">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="info.student_name"
          disabled
        />
      </div>
      <div class="col-md-3 col-sm-4">
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
    <div>
      <label for="gpax" class="form-label m-0 mt-2">Gpax</label>
      <input
        type="text"
        class="form-control w-25"
        id="gpax"
        v-model="info.student_gpax"
        disabled
      />
    </div>
    <div class="mb-1">
      <label for="phoneNumber" class="form-label mb-0 m-0 mt-2"
        >Phone number</label
      >
      <input
        type="tel"
        maxlength="10"
        min="0"
        pattern="[0]{1}[0-9]{9}"
        placeholder="0xxxxxxxxx"
        v-model="phone"
        class="form-control w-25"
        id="phoneNumber"
        @change="sendphone"
        required
      />
      <p class="text-muted" style="font-size: 14px">Format: 0912345678</p>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    phone() {
      this.phone = this.phone.replace(/[^0-9]/g, "");
    },
  },
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
      if (phone < 0) {
        this.$alert("please enter phone number in this format (0123456789)");
      } else {
        this.$emit("onChange", { phone });
      }
    },
  },
  mounted() {
    this.getPhone();
  },
};
</script>

<style></style>
