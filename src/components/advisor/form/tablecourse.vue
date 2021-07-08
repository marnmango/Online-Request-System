<template>
  <div class="text-start p-3">
    <div class="row mb-3">
      <div class="col-md-6"><h4>List of course to register</h4></div>
    </div>
    <!-- table -->
    <div class="table-responsive">
      <table class="table table-bordered border-secondary bg-white text-center">
        <thead class="theadcolor">
          <tr class="align-middle">
            <th class="tablecol1">Course code</th>
            <th>Course title</th>
            <th>Credits</th>
          </tr>
        </thead>
        <tbody v-for="item in datatable" :key="item">
          <tr class="align-middle">
            <td>{{ item.courseCode }}</td>
            <td>{{ item.titles }}</td>
            <td>{{ item.credit }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row float-end mb-4 g-2 text-center align-items-end">
      <div class="col-md-6 text-end">
        <h5 class="">Total credits:</h5>
      </div>
      <div class="col-md-6">
        <input
          class="form-control"
          type="text"
          v-model="totalCredits"
          disabled
          readonly
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    datatable:Array
  },
  data() {
    return {
      totalCredits: 0,
    };
  },
  mounted(){
    console.log(this.datatable)
    for(let i in this.datatable){
      this.totalCredits+=this.datatable[i].credit
    }
  }
};
</script>

<style>
.tablecol1 {
  table-layout: fixed;
  width: 20%;
}
.theadcolor {
  background-color: #d8d8d8;
}
.iconadd:hover {
  cursor: pointer;
}
</style>