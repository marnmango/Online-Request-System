<template>
  <div class="container">
    <div class="border">
      <div class="row p-3 align-items-center">
        <div class="col">
          <input
            type="date"
            v-model="startfirst"
            class="form-control form-control-edit"
          />
        </div>
        <div class="col">
          <input
            type="date"
            v-model="startsecond"
            class="form-control form-control-edit"
          />
        </div>
        <div class="col">
          <input
            type="date"
            v-model="endfirst"
            class="form-control form-control-edit"
          />
        </div>
        <div class="col">
          <input
            type="date"
            v-model="endsecond"
            class="form-control form-control-edit"
          />
        </div>
      </div>
      <div class="d-md-flex justify-content-md-end m-3 mt-0">
        <button type="button" class="btn btn-success" v-on:click="onSubmit">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import pathapi from "../pathapi.js";
export default {
  data(){
    return {
      startfirst:'',
      startsecond:'',
      endfirst:'',
      endsecond:''
    }
  },
  methods:{
    onSubmit(){
      const path = pathapi + "/setDate"
      const senddata = {startfirst:this.startfirst,startsecond:this.startsecond,endfirst:this.endfirst,endsecond:this.endsecond}
      axios
          .post(path, senddata)
          .then((res) => {
            console.log(res.data);
            this.$alert("the request had sent");
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }
};
</script>

<style>
</style>