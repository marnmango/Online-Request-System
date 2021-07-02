<template>
  <!-- <img class="preview" :src="picture" @click="newTab()" /> -->
  <div id="over">
    <h4 class="text-start">Payment</h4>
    <div class="row p-3 border bg-white mx-3 mb-3 shadow-sm">
      <label class="text-start">Total</label>
      <div class="input-group">
        <input
          type="number"
          min="0"
          class="form-control"
          v-model="payment_amount"
          readonly
        />
        <span class="input-group-text">BAHT</span>
      </div>
      <div class="row mx-0">
        <img
          class="myImages img-fluid pic rounded mx-auto d-block my-3 border p-0"
          id="myImg"
          :src="
            'http://selab.mfu.ac.th:9001/download?bucket=sp61&filename=/sp_ors/' +
            picture
          "
        />

        <div id="myModal" class="modal">
          <span class="close">&times;</span>
          <img class="modal-content" id="imgInModal" />
          <div id="caption"></div>
        </div>
      </div>
      <div class="d-grid gap-2 d-md-block">
        <button
          type="button"
          class="btn btn-outline-secondary mx-1"
          v-on:click="onDisapprove"
        >
          Request new payment image
        </button>
        <button
          type="button"
          class="btn btn-success mx-1 w-25"
          v-on:click="onApprove"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    picture: String,
    amount: Number,
  },
  data() {
    return {
      payment_amount: "",
    };
  },
  // methods:{
  //   dataURLtoFile(dataurl, filename) {
  //       var arr = dataurl.split(','),
  //           mime = arr[0].match(/:(.*?);/)[1],
  //           bstr = atob(arr[1]),
  //           n = bstr.length,
  //           u8arr = new Uint8Array(n);
  //       while(n--){
  //           u8arr[n] = bstr.charCodeAt(n);
  //       }
  //       return new File([u8arr], filename, {type:mime});
  //   }
  // },
  methods: {
    newTab() {
      var modal = document.getElementById("myModal");
      var images = document.getElementsByClassName("myImages");
      var modalImg = document.getElementById("imgInModal");
      var div = document.getElementById("over");
      for (var i = 0; i < images.length; i++) {
        var img = images[i];
        img.onclick = function () {
          modal.style.display = "block";
          div.style.overflow = "hidden";
          modalImg.src = this.src;
        };
      }
      var span = document.getElementsByClassName("close")[0];
      span.onclick = function () {
        modal.style.display = "none";
      };
    },
    onApprove() {
      this.$emit("onApprove");
    },
    onDisapprove() {
      this.$emit("onDisapprove");
    },
  },
  mounted() {
    this.payment_amount = this.amount;
    this.newTab();
  },
};
</script>

<style scoped>
.pic {
  width: 100%;
  max-width: 400px;
  height: auto;
  text-align: center;
  display: flex;
}

#myImg {
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

#myImg:hover {
  opacity: 0.85;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.9);
}

.modal-content {
  margin: auto;
  margin-bottom: 100px;
  display: block;
  width: 80%;
  max-width: 700px;
}

.modal-content {
  animation-name: zoom;
  animation-duration: 0.6s;
}

@keyframes zoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

@media only screen and (max-width: 700px) {
  .modal-content {
    width: 100%;
  }
}
</style>
