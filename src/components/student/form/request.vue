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
      <div class="col-4 mx-0">
        <label for="studentID" class="form-label mb-0">Academic year</label>
        <input
          type="number"
          min="2018"
          max="2100"
          maxlength="4"
          class="form-control"
          id="studentID"
          v-model="re_academic_year"
          disabled
        />
      </div>
    </div>
    <div>
      <p class="mb-1 mt-3">Reason for re-entering</p>
      <div class="row m-2 p-3 border">
        <div class="col-3 align-self-center align-items-center">
          <p class="mb-0" style="text-indent: 5%; font-size: 16px">
            To take a leave
          </p>
        </div>
        <div class="col">
          <p class="mb-0">Semeter</p>
          <select class="form-select" id="semeterRe" v-model="selectsemes" @change="onChange">
            <option v-for="(text,index) in semeter" :key="index">
              {{ text }}
            </option>
          </select>
        </div>
        <div class="col">
          <p class="mb-0">Academic Year</p>
          <select class="form-select" id="academicYear" v-model="selectyear" @change="onChange" >
            <option v-for="(year,index) in yeargen" :key="index">
              {{ year }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="mt-3" style="text-align: right">
      <button
        type="button"
        class="btn btn-danger mx-2"
        id="cancel"
        v-on:click="disableSubmit(0)"
        disabled
      >
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-success"
        id="submit"
        v-on:click="sendRequest"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formInfo: Object,
    requestsemes: String,
    requestadmy: Number,
    toadmy:Number,
    tosemes: String
  },
  data() {
    return {
      re_semester: "",
      re_academic_year: "",
      semeter: ["first" ,"second"],
      yeargen:[],
      selectsemes: "",
      selectyear: "",
    };
  },
  methods: {
    disableSubmit: function (x) {
      if (x == 1) {
        document.getElementById("submit").disabled = true;
        document.getElementById("cancel").disabled = false;
      } else {
        document.getElementById("submit").disabled = false;
        document.getElementById("cancel").disabled = true;
      }
    },
    sendRequest: function () {
      if (this.selectsemes == "" || isNaN(this.selectyear)) {
        this.$alert("please enter the request");
      } else {
        this.disableSubmit(1);
        let re_semester = this.re_semester;
        let re_academic_year = this.re_academic_year;
        let selectsemes = this.selectsemes;
        let selectyear= this.selectyear;
        let strequest = {
          re_semester,
          re_academic_year,
          selectsemes,
          selectyear,
          to_semester:this.tosemes,
          to_academicyear:this.toadmy
        };
        this.$emit("onRequest", strequest);
      }
    },
    getRequesttext() {
      console.log(this.formInfo);
      if (this.formInfo) {
        this.re_semester = this.formInfo.request_semester;
        this.re_academic_year = this.formInfo.request_academic_year;
        this.re_text = this.formInfo.request_text;
        document.getElementById("exampleFormControlTextarea1").disabled = true;
        // document.getElementById("cancel").remove()
        // document.getElementById("submit").remove()
      } else {
        this.re_semester = this.requestsemes;
        this.re_academic_year = this.requestadmy;
      }
    },
    genYear() {
      var minyear = this.re_academic_year,
        maxyear = minyear + 1
      for(var i = minyear; i <= maxyear; i++) {
        this.yeargen.push(i)
      }
    },onChange(){
      this.selectyear=parseInt(this.selectyear)
      console.log(this.selectsemes,this.selectyear)
      if(this.selectyear==this.toadmy){
          if(this.tosemes=="first"){
            if(this.selectsemes=="first"){
               console.log("good")
            }else if(this.selectsemes=="second"){
              alert("exceed to time")
              this.selectsemes=""
            }
          }else{
               console.log("good")
            }
      }else{
        console.log("good")
      }
    }
  },
  mounted() {
    this.getRequesttext();
    this.genYear();
  }
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
