<template>
  <div style="text-align: left">
    <h4>Request</h4>

    <!-- select semeter -->
    <form>
      <div>
        <p class="mb-4">Request to leave</p>
        <div class="row mb-1 g-3 border p-3 mx-3">
          <div class="col-md-3 col-sm-12 mt-0">
            <label for="fromSemeter" class="form-label mb-0"
              >From Semeter</label
            >
            <select
              class="form-select"
              id="semeterRe"
              v-model="selectsemes_from"
              @change="onChange"
            >
              <option
                v-for="(text, index) in request_from_semeter"
                :key="index"
              >
                {{ text }}
              </option>
            </select>
          </div>
          <div class="col-md-3 col-sm-12 mt-0">
            <label for="fromAcademic" class="form-label mb-0"
              >Academic Year</label
            >
            <select
              class="form-select"
              id="academicYear"
              v-model="selectyear_from"
              @change="onYear"
            >
              <option
                v-for="(year, index) in request_from_academicyear"
                :key="index"
              >
                {{ year }}
              </option>
            </select>
          </div>
          <div class="col-md-3 col-sm-12 mt-0">
            <label for="fromSemeter" class="form-label mb-0">To Semeter</label>
            <select
              class="form-select"
              id="semeterRe"
              v-model="selectsemes_to"
              @change="onChange"
            >
              <option v-for="(text, index) in request_to_semeter" :key="index">
                {{ text }}
              </option>
            </select>
          </div>
          <div class="col-md-3 col-sm-12 mt-0">
            <label for="toAcademic" class="form-label mb-0"
              >Academic Year</label
            >
            <select
              class="form-select"
              id="academicYear"
              v-model="selectyear_to"
              @change="onChange"
            >
              <option
                v-for="(year, index) in request_to_academicyear"
                :key="index"
              >
                {{ year }}
              </option>
            </select>
          </div>

          <div class="text-center mb-0">
            <p class="" style="font-size: 15px; font-weight: bold" id="p1"></p>
          </div>
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
              v-bind:checked="request_radio_1"
              v-on:click="disableIllnessRadio"
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
              id="request_radio_2"
              v-bind:checked="request_radio_2"
              v-on:click="disableOtherRadio"
            />
            <label class="form-check-label" for="request_checkbox_2">
              Other reason ( indicate )
            </label>
          </div>
        </div>
      </div>
      <div class="form-check">
        <div class="mb-3 me-3">
          <textarea
            class="form-control"
            id="Other"
            rows="5"
            v-model="re_text"
            required
          ></textarea>
        </div>
      </div>
    </form>
    <!-- choose file -->
    <div class="row mt-3">
      <div class="col-md-6 col-sm-12 input-group h-100 choosefile">
        <input
          type="file"
          class="form-control"
          id="files"
          aria-label="Upload"
          ref="files"
          multiple
          v-on:change="handleFilesUpload"
          required
        />
      </div>
      <div class="col-md-6 col-sm-12 text-end">
        <button
          type="button"
          class="btn btn-danger mx-2"
          id="cancel"
          v-on:click="onCancel"
        >
          Cancel
        </button>

        <button
          type="submit"
          class="btn btn-success"
          id="submit"
          @click="onSubmit"
        >
          Submit
        </button>
      </div>
      <div
        class="row text-start border bg-white mt-2 ms-1 pb-3 remove"
        style="text-align: right"
        v-for="(file, key) in files"
        v-bind:key="key"
      >
        <p class="mt-2 mb-1 fw-bold">Your file selected</p>
        <p class="m-0">
          {{ file.name
          }}<span class="fw-bold ms-2 mt-0" v-on:click="removeFile(key)"
            >Remove</span
          >
        </p>
      </div>
    </div>
    <div class="row mt-1 g-3">
      <div class="col-md-6 col-sm-12 text-start bg-white pt-3 border">
        <p class="m-0 fw-bold fs-6">Documents that need to be attached</p>
        <ol>
          <li class="w-100 ms-3">
            <p class="m-0 fs-7">Medical certificate</p>
          </li>
          <li class="w-100 ms-3">
            <p class="m-0 fs-7">Confirmation documents from parents</p>
          </li>
          <li class="w-100 ms-3">
            <p class="m-0 fs-7">ID card copy (With parents’s signature)</p>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    formInfo: Object,
    date: Object,
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
      files: [],
      re_doc: [],
      selectsemes_from: "",
      selectsemes_to: "",
      selectyear_from: "",
      selectyear_to: "",
      restict: true,
      current_semester: "",
      current_academic: "",
    };
  },
  methods: {
    disableSubmit: function () {
      document.getElementById("submit").disabled = true;
      document.getElementById("cancel").disabled = true;
    },
    onCancel: function () {
      this.disableSubmit();
    },
    onSubmit: async function () {
      //  this.submitFiles()
      if (
        this.selectsemes_from == "" ||
        isNaN(this.selectyear_from) ||
        this.selectsemes_to == "" ||
        isNaN(this.selectyear_to)
      ) {
        this.$alert("please enter the request");
      } else {
        let from_semester = this.selectsemes_from;
        let from_academic = this.selectyear_from;
        let to_semester = this.selectsemes_to;
        let to_academic = this.selectyear_to;
        let radio_1 = this.request_radio_1;
        let radio_2 = this.request_radio_2;
        let re_doc = [];
        for (let x in this.files) {
          // this.getBase64(this.files[x]);
          re_doc.push(this.files[x].name);
        }
        console.log(re_doc);
        let re_text = this.re_text;
        this.$emit("onSubmit", {
          from_semester,
          from_academic,
          to_semester,
          to_academic,
          radio_1,
          radio_2,
          re_doc,
          re_text,
          restict: this.restict,
          current_semester: this.current_semester,
          current_academic: this.current_academic,
        });
        // this.disableSubmit();
        for (let fileindex in this.files) {
          console.log(this.files[fileindex]);
          let data = new FormData();
          data.append("uploadfile", this.files[fileindex]);
          data.append("bucket", "sp61");
          data.append("prjid", "sp_ors");
          //build payload packet
          axios
            .post("http://selab.mfu.ac.th:9001/upload", data, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              console.log(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
    disableOtherRadio: function () {
      (this.request_radio_1 = false), (this.request_radio_2 = true);
    },
    disableIllnessRadio: function () {
      (this.request_radio_1 = true), (this.request_radio_2 = false);
    },
    handleFilesUpload() {
      let uploadedFiles = this.$refs.files.files;
      let match = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
      console.log(uploadedFiles);
      for (var i = 0; i < uploadedFiles.length; i++) {
        var ecuploadedFile = uploadedFiles[i];
        var imagefile = ecuploadedFile.type;
        const myNewFile = new File(
          [ecuploadedFile],
          "pic" + Date.now() + ".jpg",
          { type: ecuploadedFile.type }
        );
        if (
          !(
            imagefile == match[0] ||
            imagefile == match[1] ||
            imagefile == match[2] ||
            imagefile == match[3]
          )
        ) {
          alert("Please select a valid image file (JPEG/JPG/PNG/GIF).");
        } else {
          this.files.push(myNewFile);
        }
      }
      console.log(this.files);
    },
    // submitFiles() {
    //   let formData = new FormData();
    //   for (var i = 0; i < this.files.length; i++) {
    //     let file = this.files[i];
    //     formData.append("files[" + i + "]", file);
    //   }
    //   this.re_doc = formData
    //    console.log(this.re_doc)
    // },
    removeFile(key) {
      this.files.splice(key, 1);
    },
    // getBase64(file) {
    //   var reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = () => {
    //     this.re_doc.push(reader.result);
    //   };
    //   console.log(this.re_doc);
    //   reader.onerror = function (error) {
    //     console.log("Error: ", error);
    //   };
    // },
    genYear() {
      var minyear = this.current_academic;
      var maxyear = minyear + 4;
      for (var i = minyear; i <= maxyear; i++) {
        this.request_from_academicyear.push(i);
      }
    },
    onYear() {
      this.selectyear_from = parseInt(this.selectyear_from);
      let minyear = this.selectyear_from;
      let maxyear = minyear + 1;
      let arrayYear = [];
      for (var i = minyear; i <= maxyear; i++) {
        arrayYear.push(i);
      }
      this.request_to_academicyear = arrayYear;
      this.selectyear_to = NaN;
    },
    onChange() {
      let endfirst = new Date(this.date.endfirst);
      endfirst.setHours(23, 59, 59, 59);
      let endsecond = new Date(this.date.endsecond);
      endsecond.setHours(23, 59, 59, 59);
      this.selectyear_from = parseInt(this.selectyear_from);
      this.selectyear_to = parseInt(this.selectyear_to);
      if (
        (this.current_semester == "second" ||
          this.current_semester == "summer") &&
        this.selectsemes_from == "first" &&
        this.selectyear_from == this.current_academic
      ) {
        alert("The semester was passed");
        this.selectsemes_from = null;
        return;
      } else if (
        this.current_semester == "first" &&
        new Date() > endfirst &&
        this.selectsemes_from == "first" &&
        this.selectyear_from == this.current_academic
      ) {
        alert("The semester was passed");
        this.selectsemes_from = null;
        return;
      } else if (
        this.current_semester == "second" &&
        new Date() > endsecond &&
        this.selectsemes_from == "second" &&
        this.selectyear_from == this.current_academic
      ) {
        alert("The semester was passed");
        this.selectsemes_from = null;
        return;
      } else if (
        this.current_semester == "summer" &&
        this.current_academic == this.selectyear_from
      ) {
        alert("The semester was passed");
        this.selectsemes_from = null;
        return;
      }
      if (
        this.selectsemes_from != "" &&
        !isNaN(this.selectyear_from) &&
        this.selectsemes_to != "" &&
        !isNaN(this.selectyear_to)
      ) {
        if (this.selectyear_from == this.selectyear_to) {
          if (
            this.selectsemes_from == "first" &&
            this.selectsemes_to == "second"
          ) {
            document.getElementById("p1").classList.remove("leavenot");
            document.getElementById("p1").innerHTML =
              "You request to leave: 2 Semeters";
            document.getElementById("p1").classList.add("leaveok");
            this.restict = true;
          } else if (
            this.selectsemes_from == "second" &&
            this.selectsemes_to == "first"
          ) {
            document.getElementById("p1").classList.remove("leaveok");
            document.getElementById("p1").innerHTML =
              "You request to leave: Can not leave from future to past";
            document.getElementById("p1").classList.add("leavenot");
            this.restict = false;
          } else {
            document.getElementById("p1").classList.remove("leavenot");
            document.getElementById("p1").innerHTML =
              "You request to leave: 1 Semeter";
            document.getElementById("p1").classList.add("leaveok");
            this.restict = true;
          }
        } else {
          if (
            this.selectsemes_from == "first" &&
            this.selectsemes_to == "first"
          ) {
            document.getElementById("p1").classList.remove("leaveok");
            document.getElementById("p1").innerHTML =
              "You request to leave: Exceed to undergraduate";
            document.getElementById("p1").classList.add("leavenot");
            this.restict = false;
          } else if (
            this.selectsemes_from == "first" &&
            this.selectsemes_to == "second"
          ) {
            document.getElementById("p1").classList.remove("leaveok");
            document.getElementById("p1").innerHTML =
              "You request to leave: Exceed to undergraduate";
            document.getElementById("p1").classList.add("leavenot");
            this.restict = false;
          } else if (
            this.selectsemes_from == "second" &&
            this.selectsemes_to == "first"
          ) {
            document.getElementById("p1").classList.remove("leavenot");
            document.getElementById("p1").innerHTML =
              "You request to leave: 2 Semeters";
            document.getElementById("p1").classList.add("leaveok");
            this.restict = true;
          } else if (
            this.selectsemes_from == "second" &&
            this.selectsemes_to == "second"
          ) {
            document.getElementById("p1").classList.remove("leaveok");
            document.getElementById("p1").innerHTML =
              "You request to leave: Exceed to undergraduate";
            document.getElementById("p1").classList.add("leavenot");
            this.restict = false;
          }
        }
      }
    },
    getDate() {
      let currentday = new Date();
      let firstsemester = new Date(this.date.startfirst);
      firstsemester.setHours(0, 0, 0, 0);
      let newYear = new Date(firstsemester.getFullYear() + 1, 0, 1);
      let secondsemester = new Date(this.date.startsecond);
      secondsemester.setHours(0, 0, 0, 0);
      let summersemester = new Date(this.date.startsummer);
      summersemester.setHours(0, 0, 0, 0);
      let endfirst = new Date(this.date.endfirst);
      endfirst.setHours(23, 59, 59, 59);
      let endsecond = new Date(this.date.endsecond);
      endsecond.setHours(23, 59, 59, 59);
      console.log(newYear);
      if (currentday < firstsemester || currentday > summersemester) {
        this.current_semester = "summer";
        this.current_academic = currentday.getFullYear() - 1;
      } else if (currentday > firstsemester && currentday < secondsemester) {
        this.current_semester = "first";
        if (currentday < newYear) {
          this.current_academic = currentday.getFullYear();
        } else {
          this.current_academic = currentday.getFullYear() - 1;
        }
      } else if (currentday > secondsemester && currentday < endsecond) {
        this.current_semester = "second";
        this.current_academic = currentday.getFullYear() - 1;
      }
      console.log(this.current_semester, this.current_academic);
    },
  },
  mounted() {
    this.getDate();
    this.genYear();
  },
};
</script>

<style scoped>
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
span {
  text-decoration: underline;
  font-size: 14px;
}
span:hover {
  opacity: 0.5;
  transition: 0.2s;
  cursor: pointer;
}
.fixlength {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.leaveok {
  background-color: #52be80;
  border: white 0.25px solid;
  color: white;
  padding: 10px;
  margin-left: 100px;
  margin-right: 100px;
}
.leavenot {
  background-color: #cd6155;
  border: white 0.25px solid;
  color: white;
  padding: 10px;
  margin-left: 100px;
  margin-right: 100px;
}
.choosefile {
  width: 400px;
}
.remove {
  width: 800px;
}
@media screen and (max-width: 1366px) {
  .choosefile {
    width: 550px;
  }
}
@media screen and (max-width: 1024px) {
  .choosefile {
    width: 375px;
  }
  .remove {
    width: 750px;
  }
}
@media screen and (max-width: 768px) {
  .choosefile {
    width: 350px;
  }
  .remove {
    width: 690px;
  }
}
@media screen and (max-width: 400px) {
  .choosefile {
    width: 300px;
    margin-bottom: 20px;
  }
  .remove {
    width: 300px;
  }
}
@media screen and (max-width: 320px) {
  .remove {
    width: 250px;
  }
}
</style>
