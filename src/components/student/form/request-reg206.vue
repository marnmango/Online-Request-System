<template>
  <div class="text-start">
    <h4>Request</h4>
    <div>
      <p>Request to Register More/Less Credits</p>
      <div class="row">
        <div class="col-md-4">
          <label for="semeterselect" class="form-label mb-0">Semeter</label>
          <select
            class="form-select"
            id="semeterselect"
            v-model="selectsemes"
            @change="onChange"
          >
            <option v-for="(text, index) in semeter" :key="index">
              {{ text }}
            </option>
          </select>
        </div>
        <div class="col-md-4">
          <label for="academicselect" class="form-label mb-0"
            >Academic year</label
          >
          <select
            class="form-select"
            id="academicselect"
            v-model="selectyear"
            @change="onChange"
          >
            <option v-for="(year, index) in yeargen" :key="index">
              {{ year }}
            </option>
          </select>
        </div>
      </div>
      <div class="border mt-3 bg-white">
        <div class="p-3">
          <p class="mb-2">Reason of request</p>
          <div class="ms-3">
            <div class="row ms-4 my-2">
          <div class="form-check col-md-6 col-sm-12">
            <input
              class="form-check-input"
              type="radio"
              name="request_radio"
              id="request_radio_1"
              v-bind:checked="reason_list[0]"
              v-on:click="disableMilliRadio"
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
              v-bind:checked="reason_list[1]"
              v-on:click="disableExRadio"
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
              v-bind:checked="reason_list[2]"
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
              id="request_radio_4"
              v-bind:checked="reason_list[3]"
              v-on:click="disableOtherRadio"
            />
            <label class="form-check-label" for="request_checkbox_2">
              Other reason ( please provide the information )
            </label>
          </div>
        </div>
          </div>
          <p class="mt-3 mb-2">The total credits register</p>
          <div class="ms-3 row">
            <div class="form-check col-md-4">
              <input
              class="form-check-input"
              type="radio"
              name="wanted_radio"
              id="wanted_radio1"
              v-bind:checked="recredit_list[0]"
              v-on:click="checking1"
            />
              <label class="form-check-label" for="flexRadioDefault1">
                Less than 9 credits
              </label>
            </div>
            <div class="form-check col-md-4">
              <input
              class="form-check-input"
              type="radio"
              name="wanted_radio"
              id="wanted_radio2"
              v-bind:checked="recredit_list[1]"
              v-on:click="checking2"
            />
              <label class="form-check-label" for="flexRadioDefault2">
                More than 21 credits
              </label>
            </div>
          </div>
          <p class="ms-3" style="color: red">
            *** The student have GPAX less than 2.00. You can not select more
            than 21 credits.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      current_academic:null,
      current_semester:null,
      yeargen:[],
      semeter:['first','second'],
      selectsemes: "",
      selectyear: null,
      reason_list:[false,false,false,false],
      recredit_list:[false,false]
    }
  },
   props: {
    date: Object,
    grade: Number
  },
  methods:{
    checking1:function(){
      (this.recredit_list[0] = true), (this.recredit_list[1] = false)
      console.log(this.recredit_list);
      this.sendRequest();
    },
    checking2:function(){
      if(this.grade<2.00){
        document.getElementById("wanted_radio2").checked = false;
        alert("You cant select this choice");
          (this.recredit_list[0] = false), (this.recredit_list[1] = false)
          console.log(this.recredit_list);
        return ;
      }
      (this.recredit_list[0] = false), (this.recredit_list[1] = true)
      console.log(this.recredit_list);
      this.sendRequest();
    },
    genYear() {
      var minyear = this.current_academic,
        maxyear = minyear + 1;
      for (var i = minyear; i <= maxyear; i++) {
        this.yeargen.push(i);
      }
    },sendRequest: function () {
      if (this.selectsemes == null || this.selectyear==null) {
        this.$alert("Please enter the request");
      } else if(!(this.reason_list.includes(true))){
        this.$alert("Please select the reason");
      }else {
        let reason_list = this.reason_list;
        let recredit_list = this.recredit_list;
        let selectsemes = this.selectsemes;
        let selectyear = this.selectyear;
        let strequest = {
          reason_list,
          selectsemes,
          selectyear,
          recredit_list
        };
        this.$emit("onRequest", strequest);
      }
    }
    ,onChange(){
      if(this.selectyear==this.current_academic){
         switch(this.current_semester){
           case "summer":{
             alert("the semester was passed");
              this.selectyear = null;
              this.selectsemes = null;
           }
           break;
           case "second":{
             if(this.selectsemes=="first"){
               alert("the semester was passed");
              this.selectyear = null;
              this.selectsemes = null;
             }
           }
         }
      }
    },
    disableOtherRadio: function () {
      (this.reason_list[0] = false), (this.reason_list[1] = false), (this.reason_list[2] = false), (this.reason_list[3] = true);
      this.sendRequest()
    },
    disableIllnessRadio: function () {
      (this.reason_list[0] = false), (this.reason_list[1] = false), (this.reason_list[2] = true), (this.reason_list[3]= false);
      this.sendRequest()
    },
    disableExRadio: function () {
      (this.reason_list[0] = false), (this.reason_list[1] = true), (this.reason_list[2]= false), (this.reason_list[3] = false);
      this.sendRequest()
      
    },
    disableMilliRadio: function () {
      (this.reason_list[0] = true), (this.reason_list[1] = false), (this.reason_list[2] = false), (this.reason_list[3] = false);
      this.sendRequest()
    },getRequesttext() {
      // console.log(this.formInfo);
      // if (this.formInfo) {
      //   this.re_semester = this.formInfo.request_semester;
      //   this.re_academic_year = this.formInfo.request_academic_year;
      //   this.re_text = this.formInfo.request_text;
      //   document.getElementById("exampleFormControlTextarea1").disabled = true;
      //   // document.getElementById("cancel").remove()
      //   // document.getElementById("submit").remove()
      // } else {
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
      }
    // }
  },
  mounted() {
    console.log(this.grade)
    this.getRequesttext();
    this.genYear();
  }
};
</script>

<style>
</style>