<template>
  <div class="text-start p-3">
    <div class="row mb-3">
      <div class="col-md-6"><h4>List of course to register</h4></div>
      <div class="col-md-6 text-end">
        <button
          type="button"
          class="btn btn-outline-success"
          data-bs-toggle="modal"
          data-bs-target="#addcourse"
        >
          <i class="fas fa-plus-circle me-2"></i>Add course
        </button>
      </div>
      <!-- Modal -->
      <div
        class="modal fade"
        id="addcourse"
        tabindex="-1"
        aria-labelledby="addcourseLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addcourseLabel">Course</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div>
                <p class="mb-0">Search course code</p>
                <input
                  class="form-control"
                  type="text"
                  name=""
                  id=""
                  @change="getCourse"
                  v-model="searchbox"
                  placeholder="Search"
                />
              </div>
              <!-- show course -->
              <div class="table-responsive">
                <table
                  class="
                    table table-bordered
                    border-secondary
                    bg-white
                    text-center
                    mt-3
                  "
                >
                  <thead class="theadcolor">
                    <tr class="align-middle">
                      <th>Course code</th>
                      <th>Course title</th>
                      <th>Credits</th>
                      <th>Add</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="align-middle"
                      v-for="item in subject"
                      :key="item"
                    >
                      <td>{{ item.courseCode }}</td>
                      <td>{{ item.title }}</td>
                      <td>{{ item.credits }}</td>
                      <td
                        class="align-items-center justify-content-center"
                        v-on:click="
                          addCourse(item.courseCode, item.title, item.credits)
                        "
                      >
                        <i class="fas fa-plus-circle fa-2x iconadd"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- table -->
    <div class="table-responsive">
      <table class="table table-bordered border-secondary bg-white text-center">
        <thead class="theadcolor">
          <tr class="align-middle">
            <th class="tablecol1">Course code</th>
            <th>Course title</th>
            <th>Credits</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in datatable" :key="item">
          <tr class="align-middle">
            <td>{{ item.courseCode }}</td>
            <td>{{ item.titles }}</td>
            <td>{{ item.credit }}</td>
            <td>
              <button
                type="button"
                class="btn btn-danger"
                v-on:click="deleteCourse(index)"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
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
    <button
        type="button"
        class="btn btn-success"
        id="submit"
        v-on:click="onConfirm"
      >
        Submit
      </button>
  </div>
</template>

<script>
import pathapi from "../../../pathapi.js";
import axios from "axios";
export default {
  data() {
    return {
      subject: [],
      // subject: [
      //   { courseCode: "1305393", title: "a", credits: 3 },
      //   { courseCode: "1305123", title: "b", credits: 3 },
      // ],
      datatable: [],
      totalCredits: 0,
      searchbox:""
    };
  },
  methods: {
    addCourse(code, title, credits) {
      let courseCode = code;
      let titles = title;
      let credit = credits;
      for(let i in this.datatable){
        if(courseCode==this.datatable[i].courseCode){
          alert("You already selected this subject")
          return ;
        }
      }
      this.datatable.push({ courseCode, titles, credit });
      this.totalCredits = this.totalCredits + credits;

      console.log(this.totalCredits);

      // document.getElementById("addcourse").className = "modal";

      console.log(code);
      console.log(title);
      console.log(credits);
      console.log(this.datatable);
    },
    deleteCourse(index) {
      this.totalCredits = this.totalCredits - this.datatable[index].credit;
      this.datatable.splice(index, 1);
    },
    getCourse(){
      const path = pathapi + "/getsubject?code="+this.searchbox ;
      console.log(path)
       axios.get(path).then(
          (res)=>{
            this.subject = res.data
          }
        )
        .catch(() => {
          this.subject = []
        })
    },onConfirm(){
      this.$emit("onConfirm", { datatable:this.datatable })
    }
  },
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
@media screen and (max-width: 768px) {
  .choosefile {
    width: 550px;
  }
}
</style>