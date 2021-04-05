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
          <div class="col-6 input-group w-50">
            <input
              type="file"
              class="form-control"
              id="files"
              aria-label="Upload"
              ref="files"
              multiple v-on:change="handleFileUploads()"
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
          <!-- <div class="large-12 medium-12 small-12 cell">
      <div v-for="(file, key) in files" class="file-listing"  v-bind:key="file">{{ file.name }} <span class="remove-file" v-on:click="removeFile( key )">Remove</span></div>
    </div> -->
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
      re_text: "",
      request_from_semeter: "",
      request_to_semeter: "",
      request_from_academicyear: "",
      request_to_academicyear: "",
      request_checkbox_1:false,
      request_checkbox_2:false,
      request_radio_1:false,
      request_radio_2:false,
      files:''
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
    disableOtherRadio: function () {
      this.request_radio_1=false,
      this.request_radio_2=true
    },
    disableIllnessRadio: function () {
      this.request_radio_1=true,
      this.request_radio_2=false
    },
    oncheckbox1(){
      if(this.request_checkbox_1){
        this.request_checkbox_1=false
      }else{
        this.request_checkbox_1=true
      } 
    },oncheckbox2(){
      if(this.request_checkbox_2){
        this.request_checkbox_2=false
      }else{
        this.request_checkbox_2=true
      } 
    },handleFilesUpload(){
  let uploadedFiles = this.$refs.files.files;
        for( var i = 0; i < uploadedFiles.length; i++ ){
          this.files.push( uploadedFiles[i] );
        }
  },submitFiles(){
         let formData = new FormData();
        for( var i = 0; i < this.files.length; i++ ){
          let file = this.files[i];

          formData.append('files[' + i + ']', file);
        }
        return formData ;
  }, removeFile( key ){
        this.files.splice( key, 1 );
      }
}};
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
/* input[type="file"]{
    position: absolute;
    top: -500px;
  }

  div.file-listing{
    width: 200px;
  }

  span.remove-file{
    color: red;
    cursor: pointer;
    float: right;
  } */
</style>
