<template>
  <div>
    <div style="text-align: left">
      <h4>Payment</h4>
      <div class="row p-3 border bg-white mx-3 mb-3 shadow-sm">
        <label>Total</label>
        <div class="input-group">
          <input type="number" min="0" class="form-control" v-model="payment_amount" readonly />
          <span class="input-group-text">BATH</span>
        </div>
      <div v-if="formInfo.payment_doc==null && formInfo.progress_status==4">
        <div class="input-group mt-3">
          <input
          type="file"
          class="form-control"
          id="files"
          aria-label="Upload"
          ref="files"
          v-on:change="handleFilesUpload"
          required
        />
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
          <button
            class="btn btn-outline-success w-25"
            type="button"
            id="submitFile"
            v-on:click="onSubmit"
          >
            Submit
          </button>
        </div>
      </div>
      <p id="text"></p>
    </div>
      <div class="row p-3 border bg-white mx-3 mb-3 shadow-sm">
        <label style="font-size: 18px">Example</label>
        <img
          src="@/assets/ex-receipt.jpeg"
          class="rounded mx-auto d-block"
          style="width: auto; height: 350px"
          alt="examplereceipt"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    formInfo:Object
  },
  data(){
    return{
      payment_amount:'',
      files:''
    }
  },
  methods:{
    handleFilesUpload() {
      let uploadedFiles = this.$refs.files.files;
      let match = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
        var imagefile = uploadedFiles[0].type;
        console.log(imagefile)
        if (!(imagefile == match[0] ||imagefile == match[1] ||imagefile == match[2] ||imagefile == match[3])){
          alert("Please select a valid image file (JPEG/JPG/PNG/GIF).");
        } else {
          this.files=uploadedFiles[0];
        }
      console.log(this.files);
    },onSubmit(){
      var reader = new FileReader();
      reader.readAsDataURL(this.files);
      reader.onload = () => {
        this.$emit("onSubmit",reader.result)
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }
  },
  mounted(){
    if(this.formInfo.payment_amount!=undefined){
      this.payment_amount=this.formInfo.payment_amount
    }
    if(this.formInfo.progress_status==4 && this.formInfo.payment_doc!=null){
      document.getElementById("text").innerHTML = "the payment is on process"
    }else if(this.formInfo.progress_status==5){
      document.getElementById("text").innerHTML = "the payment is completed"
    }
  }
};
</script>

<style scoped>
</style>