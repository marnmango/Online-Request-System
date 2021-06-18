<template>
  <div>
    <div style="text-align: left" class="mx-1">
      <h4>Payment</h4>
      <div class="row px-2 py-3 border bg-white mb-3 shadow-sm">
        <label>Total</label>
        <div class="input-group">
          <input
            type="number"
            min="0"
            class="form-control"
            v-model="payment_amount"
            id="amount"
            readonly
          />
          <span class="input-group-text">BAHT</span>
        </div>
        <div
          v-if="formInfo.payment_doc == null && formInfo.progress_status == 4"
        >
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
        <div class="row align-self-center m-0">
          <p class="mt-0 mb-0 fontpayment p-2 text-center" id="text"></p>
        </div>
      </div>
      <div id="example" class="row p-3 border bg-white mx-3 mb-3 shadow-sm">
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
import axios from "axios";
export default {
  props: {
    formInfo: Object,
  },
  data() {
    return {
      payment_amount: "",
      files: "",
    };
  },
  methods: {
    handleFilesUpload() {
      let uploadedFiles = this.$refs.files.files;
      let match = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
      var imagefile = uploadedFiles[0].type;
      console.log(imagefile);
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
        const myNewFile = new File(
          [uploadedFiles[0]],
          "pic" + Date.now() + ".jpg",
          { type: uploadedFiles[0].type }
        );
        this.files = myNewFile;
      }
      console.log(this.files);
    },
    onSubmit() {
      let data = new FormData();
      data.append("uploadfile", this.files);
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
      this.$emit("onSubmit", this.files.name);
    },
  },
  mounted() {
    if (this.formInfo.payment_amount != undefined) {
      this.payment_amount = this.formInfo.payment_amount;
    }
    if (
      this.formInfo.progress_status == 4 &&
      this.formInfo.payment_doc != null
    ) {
      document.getElementById("text").innerHTML = "The payment is on process";
      document.getElementById("text").style.backgroundColor = "#ffc107";
      document.getElementById("example").remove();
    } else if (this.formInfo.progress_status == 5) {
      document.getElementById("text").innerHTML = "The payment is completed";
      document.getElementById("text").style.backgroundColor = "#28a745";
      document.getElementById("example").remove();
      if (this.formInfo.payment_amount == 0) {
        document.getElementById("text").innerHTML =
          "No Fee. The payment is completed";
      }
    }
  },
};
</script>

<style scoped>
/* badge */
.fontpayment {
  font-size: 15px;
  font-weight: bold;
  color: white;
}
@media screen and (max-width: 400px) {
  .fontpayment {
    font-size: 15px;
    font-weight: bold;
    color: white;
  }
}
</style>