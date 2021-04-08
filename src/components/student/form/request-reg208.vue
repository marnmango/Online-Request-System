<template>
  <div style="text-align: left">
    <h4>Request</h4>
    <div class="row mb-1 g-3 w-75">
      <p class="mb-0">Semeter</p>
      <div class="row ms-2 mt-0">
        <div class="col-3 form-check">
          <input
            v-bind:checked="request_checkbox_1"
            class="form-check-input"
            type="checkbox"
            name="request_checkbox"
            id="request_checkbox_1"
            v-on:click="oncheckbox1"
          />
          <label class="form-check-label" for="request_checkbox_1">
            Semeter 1
          </label>
        </div>
        <div class="col-3 form-check">
          <input
            v-bind:checked="request_checkbox_2"
            class="form-check-input"
            type="checkbox"
            name="request_checkbox"
            id="request_checkbox_2"
            v-on:click="oncheckbox2"
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
            name="request_radio"
            id="request_radio_1"
            v-bind:checked="request_radio_1"
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
          <div class="col-6 input-group w-50 h-100">
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
          <div
            class="col-2"
            style="text-align: right"
            v-for="(file, key) in files"
            v-bind:key="key"
          >
            <p class="m-0 fixlength">{{ file.name }}</p>
            <span class="m-0" v-on:click="removeFile(key)"> Remove </span>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col">
            <p class="m-0">Documents that need to be attached</p>
            <ol>
              <li class="w-100 ms-3">
                <p class="m-0">Medical certificate</p>
              </li>
              <li class="w-100 ms-3">
                <p class="m-0">Confirmation documents from parents</p>
              </li>
              <li class="w-100 ms-3">
                <p class="m-0">ID card copy (With parents’s signature)</p>
              </li>
            </ol>
          </div>
          <div class="col mt-5 text-end">
            <button
              type="button"
              class="btn btn-danger mx-2"
              id="cancel"
              v-on:click="onCancel"
            >
              Cancel
            </button>
            <button type="submit" class="btn btn-success" id="submit" @click="onSubmit">
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
      re_text: "",
      request_from_semeter: "",
      request_to_semeter: "",
      request_from_academicyear: "",
      request_to_academicyear: "",
      request_checkbox_1: false,
      request_checkbox_2: false,
      request_radio_1: false,
      request_radio_2: false,
      files: [],
      re_doc:[],
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
     let checkbox_1=this.request_checkbox_1
     let checkbox_2=this.request_checkbox_2
     let from_semester=this.request_from_semeter
     let from_academic=this.request_from_academicyear
     let to_semester=this.request_to_semeter
     let to_academic=this.request_to_academicyear
     let radio_1=this.request_radio_1
     let radio_2=this.request_radio_2
     let re_doc= this.re_doc
     for(let x in this.files){
       this.getBase64(this.files[x])
     }
     console.log(re_doc)
     let re_text= this.re_text
      this.$emit("onSubmit",{checkbox_1,checkbox_2,from_semester,from_academic,to_semester,to_academic,radio_1,radio_2,re_doc,re_text});
      this.disableSubmit();
    },
    disableOtherRadio: function () {
      (this.request_radio_1 = false), (this.request_radio_2 = true);
    },
    disableIllnessRadio: function () {
      (this.request_radio_1 = true), (this.request_radio_2 = false);
    },
    oncheckbox1() {
      if (this.request_checkbox_1) {
        this.request_checkbox_1 = false;
      } else {
        this.request_checkbox_1 = true;
      }
    },
    oncheckbox2() {
      if (this.request_checkbox_2) {
        this.request_checkbox_2 = false;
      } else {
        this.request_checkbox_2 = true;
      }
    },
    handleFilesUpload() {
      let uploadedFiles = this.$refs.files.files;
      let match = ["image/jpeg","image/png","image/jpg","image/gif"]
      console.log(uploadedFiles)
      for (var i = 0; i < uploadedFiles.length; i++) {
        var ecuploadedFile = uploadedFiles[i]
        var imagefile = ecuploadedFile.type
        if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2]) || (imagefile==match[3]))){
          alert('Please select a valid image file (JPEG/JPG/PNG/GIF).');
        }else{
            this.files.push(ecuploadedFile);
        }
      }
      console.log(this.files)
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
    }, getBase64(file) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = () => { 
      this.re_doc.push(reader.result)
   };
   console.log(this.re_doc)
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}
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
</style>
