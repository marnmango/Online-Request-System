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
        <div class="row ms-4 my-2">
          <div class="form-check col-md-6 col-sm-12">
            <input
              class="form-check-input"
              type="radio"
              name="request_radio"
              id="request_radio_1"
              v-bind:checked="radio_list[0]"
              v-on:click="disableMilliRadio"
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
              v-on:click="disableExRadio"
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
              v-on:click="disableIllnessRadio"
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
              v-on:click="disableOtherRadio"
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
            required
            disabled
          ></textarea>
        </div>
      </div>
    </form>
    <!-- choose file -->
    <div v-if="formInfo.alterform">
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
            type="submit"
            class="btn btn-success"
            id="submit"
            @click="onFix"
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
            }}<span class="fw-bold mx-2 mt-0" v-on:click="removeFile(key)"
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
  </div>
</template>

<script>
import axios from "axios";
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
      radio_list:[false,false,false,false],
      files: [],
      re_doc: [],
      selectsemes_from: "",
      selectsemes_to: "",
      selectyear_from: "",
      selectyear_to: "",
      restict: true,
    };
  },
  methods: {
    disableSubmit: function () {
      document.getElementById("submit").disabled = true;
    },
    getRequesttext() {
      console.log(this.formInfo);
      if (this.formInfo) {
        this.selectsemes_from = this.formInfo.request_from_semester;
        this.selectsemes_to = this.formInfo.request_to_semester;
        this.selectyear_from = this.formInfo.request_from_academicyear;
        this.selectyear_to = this.formInfo.request_to_academicyear;
        this.re_text = this.formInfo.request_text;
        this.radio_list= JSON.parse(this.formInfo.reason_list);
        this.selectyear_from = parseInt(this.selectyear_from);
        let minyear = this.selectyear_from;
        let maxyear = minyear + 1;
        let arrayYear = [];
        for (var i = minyear; i <= maxyear; i++) {
          arrayYear.push(i);
        }
        this.request_to_academicyear = arrayYear;
        if (this.formInfo.alterform) {
          document.getElementById("request_radio_1").disabled = false;
          document.getElementById("request_radio_2").disabled = false;
          document.getElementById("request_radio_3").disabled = false;
          document.getElementById("request_radio_4").disabled = false;
          document.getElementById("Other").disabled = false;
        }
      }
    },
    checkedRadio() {
      if (this.radio_list[0] == 1) {
        document.getElementById("request_radio_1").checked = true;
      } else if (this.radio_list[1] == 1) {
        document.getElementById("request_radio_2").checked = true;
      } else if (this.radio_list[2] == 1) {
        document.getElementById("request_radio_3").checked = true;
      } else if (this.radio_list[3] == 1) {
        document.getElementById("request_radio_4").checked = true;
      } 
    },
    onFix: async function () {
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
        let radio_list = this.radio_list
        let re_doc = this.re_doc;
        for (let x in this.files) {
          // this.getBase64(this.files[x]);
          re_doc.push(this.files[x].name);
        }
        console.log(re_doc);
        let re_text = this.re_text;
        this.$emit("onFix", {
          from_semester,
          from_academic,
          to_semester,
          to_academic,
          radio_list,
          re_doc,
          re_text,
          restict: this.restict,
        });
        this.disableSubmit();
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
      (this.radio_list[0] = false), (this.radio_list[1] = false), (this.radio_list[2] = false), (this.radio_list[3] = true);
    },
    disableIllnessRadio: function () {
      (this.radio_list[0] = false), (this.radio_list[1] = false), (this.radio_list[2] = true), (this.radio_list[3]= false);
    },
    disableExRadio: function () {
      (this.radio_list[0] = false), (this.radio_list[1] = true), (this.radio_list[2]= false), (this.radio_list[3] = false);
    },
    disableMilliRadio: function () {
      (this.radio_list[0] = true), (this.radio_list[1] = false), (this.radio_list[2] = false), (this.radio_list[3] = false);
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
      var minyear = this.selectyear_from;
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
      this.selectyear_from = parseInt(this.selectyear_from);
      this.selectyear_to = parseInt(this.selectyear_to);
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
            document.getElementById("p1").innerHTML = "1 Term";
            this.restict = true;
          } else {
            document.getElementById("p1").innerHTML = "Lower to undergraduate";
            this.restict = false;
          }
        } else {
          if (
            this.selectsemes_from == "first" &&
            this.selectsemes_to == "first"
          ) {
            document.getElementById("p1").innerHTML = "2 Term";
            this.restict = true;
          } else if (
            this.selectsemes_from == "first" &&
            this.selectsemes_to == "second"
          ) {
            document.getElementById("p1").innerHTML = "Exceed to undergraduate";
            this.restict = false;
          } else if (
            this.selectsemes_from == "second" &&
            this.selectsemes_to == "first"
          ) {
            document.getElementById("p1").innerHTML = "1 Term";
            this.restict = true;
          } else if (
            this.selectsemes_from == "second" &&
            this.selectsemes_to == "second"
          ) {
            document.getElementById("p1").innerHTML = "2 Term";
            this.restict = true;
          }
        }
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
