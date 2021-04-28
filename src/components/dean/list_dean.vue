<template>
  <div>
    <Navbar />
    <div class="active-cont">
      <div class="row g-0">
        <div class="col-10">
          <nav
            class="navbar navbar-expand-lg navbar-light bg-light align-self-center justify-content-center"
          >
            <div class="row g-2">
              <div class="col">
                <input
                  v-model="search"
                  type="text"
                  class="form-control"
                  style="width: 500px; text-align: left"
                  placeholder="Search"
                />
              </div>
            </div>
          </nav>

          <!-- เปลี่ยนหน้า array -->
          <nav
            class="navbar fixed-bottom navbar-light bg-light active-cont align-self-center justify-content-center"
          >
            <div style="margin-right: 180px">
              <ul class="pagination pagination-sm">
                <li
                  class="page-item"
                  v-for="(item, index) in numChangeTable"
                  :key="index"
                >
                  <a
                    class="page-link"
                    v-on:click="() => onclickpage(item.start, item.stop)"
                    >{{ item.i }}</a
                  >
                </li>
              </ul>
            </div>
          </nav>

          <table class="table table-hover">
            <thead class="text-center">
              <tr>
                <th scope="col">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                    scope="row"
                    v-model="selectAll"
                    @click="allselect"
                  />
                </th>
                <th scope="col" class="w-25">Date</th>
                <th scope="col">Request Form</th>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>

            <tbody class="text-center w-0">
              <tr v-for="form in formInfoFilter" :key="form.form_id">
                <td class="text-center">
                  <input
                    v-bind:checked="
                      selectedformid.includes(form.form_id) ? true : false
                    "
                    class="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                    scope="row"
                    v-on:click="
                      () =>
                        addSelected(
                          form.form_id,
                          form.form_aka,
                          form.student_id
                        )
                    "
                  />
                </td>
                <td v-on:click="() => getFormData(form.form_id, form.form_cat)">
                  {{ form.create_date }}
                </td>
                <td v-on:click="() => getFormData(form.form_id, form.form_cat)">
                  {{ form.form_aka }}
                </td>
                <td v-on:click="() => getFormData(form.form_id, form.form_cat)">
                  {{ form.student_id }}
                </td>
                <td v-on:click="() => getFormData(form.form_id, form.form_cat)">
                  {{ form.student_name }}
                </td>
                <td
                  v-on:click="() => getFormData(form.form_id, form.form_cat)"
                  v-bind:style="{
                    'background-color': colorStatus[form.status],
                  }"
                >
                  <li id="stat" class="w-100 h-25">
                    {{ form.status }}
                  </li>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- fillter -->
        <div class="col-2 filter">
          <div class="container side-right-navbar active-nav bg-light p-3 w-25">
            <div class="w-50">
              <h4 class="mb-2">Comfirm Request</h4>

              <div class="m-2 justify-content-md-center">
                <button
                  type="button"
                  class="btn btn-success w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#Modal"
                >
                  Comfirm
                </button>
                <!-- Modal -->
                <div
                  class="modal fade"
                  id="Modal"
                  tabindex="-1"
                  aria-labelledby="popup"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="popup">Comment</h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body"><CommentDean @onCancel="onCancel" @onSubmit="confirmRequest"/></div>
                      <!-- radio approve -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="m-2 justify-content-md-center">
                <button
                  type="button"
                  id="submit"
                  class="btn btn-outline-success w-100"
                  v-on:click="confirmAllRequest"
                >
                  Confirm all request
                </button>
              </div>
              <h4 class="mt-3">Filter</h4>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="filter"
                  id="formName"
                  v-on:click="onChangeName"
                />
                <label class="form-check-label" for="formName">
                  Form Name
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="filter"
                  id="ID"
                  v-on:click="onChangeId"
                />
                <label class="form-check-label" for="ID"> ID </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="filter"
                  id="status"
                  v-on:click="sortStatus"
                />
                <label class="form-check-label" for="status"> Status </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="filter"
                  id="descending_date"
                  v-on:click="sortDateDescend"
                />
                <label class="form-check-label" for="descending_date">
                  Descending created date
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="filter"
                  id="ascending_date"
                  v-on:click="sortDateAscend"
                />
                <label class="form-check-label" for="ascending_date">
                  Ascending created date
                </label>
              </div>
            </div>

            <!-- ที่ใส่วันที่filter -->
            <div class="w-50">
              <div class="form-check mt-4 mb-2">
                <p class="m-0">Start Date</p>
                <input
                  type="date"
                  v-model="startDate"
                  class="form-control form-control-edit"
                />
              </div>
              <div class="form-check mb-2">
                <p class="m-0">End Date</p>
                <input
                  type="date"
                  v-model="endDate"
                  class="form-control form-control-edit"
                />
                <!-- ปุ่มรีเฟรชหน้า -->
                <div class="d-grid gap-2 mt-3">
                  <button
                    type="button"
                    class="btn btn-outline-success smallfil"
                    id="refresh"
                    v-on:click="onRefresh"
                  >
                    Refresh Date
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- fillter -->
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../student/navStudent";
import pathapi from "../../pathapi.js";
import CommentDean from "./form/comment-dean.vue";
import axios from "axios";
export default {
  props: {
    info: Object,
  },
  components: {
    Navbar,
    CommentDean,
  },
  data() {
    return {
      userid: "",
      formInfo: [],
      search: "",
      checked: "",
      startDate: "",
      endDate: "",
      colorStatus: {
        staff: "#b0b6ba",
        advisor: "#ffc107",
        dean: "#28a745",
        Disapproved: "red",
      },
      head: 0,
      last: "",
      numChangeTable: [],
      selectedformid: [],
      selectrdformcat: [],
      selectrdformstuid: [],
      selectAll: false,
    };
  },
  methods: {
    // selectall
    allselect() {
      this.selectedformid = [];
      if (!this.selectAll) {
        for (let i in this.formInfo) {
          this.selectedformid.push(this.formInfo[i].form_id);
        }
      }
    },
    getallform() {
      const path = pathapi + "/getformdean?id=" + this.userid;
      axios
        .get(path)
        .then((res) => {
          console.log(res.data);
          this.formInfo = res.data;
          return this.formInfo;
        })
        .catch((error) => {
          console.log(error);
        })
        .then((form) => {
          this.allPage(form);
          if (form.length < 13) {
            this.last = form.length;
          } else {
            this.last = 13;
          }
        });
    },
    getFormData(id, form_cat) {
      let address = "";
      if (form_cat == 209) {
        address = "Reg209Dean";
      } else if (form_cat == 208) {
        address = "Reg208Dean";
      }
      this.$router.push({ name: address, params: { id: id } });
    },
    sortDateAscend() {
      // this.formInfo.sort(function (first,last) {
      //   let firstdate = first.create_date
      //   let seconddate = last.create_date
      //   if(firstdate<seconddate){
      //     return -1
      //   }else if(firstdate>seconddate){
      //     return 1
      //   }else{
      //     return 0
      //   }
      // })
      this.formInfo.sort(function (a, b) {
        return new Date(a.create_date) - new Date(b.create_date);
      });
    },
    sortDateDescend() {
      // this.formInfo.sort(function (first,last) {
      //   let firstdate = first.create_date
      //   let seconddate = last.create_date
      //   if(firstdate<seconddate){
      //     return 1
      //   }else if(firstdate>seconddate){
      //     return -1
      //   }else{
      //     return 0
      //   }
      // })
      this.formInfo.sort(function (a, b) {
        return new Date(b.create_date) - new Date(a.create_date);
      });
    },
    sortStatus() {
      this.onChangeStatus();
      this.formInfo.sort(function (first, last) {
        let firstdate = first.status.toLowerCase();
        let seconddate = last.status.toLowerCase();
        if (firstdate < seconddate) {
          return -1;
        } else if (firstdate > seconddate) {
          return 1;
        } else {
          return 0;
        }
      });
    },
    statusProgress() {
      console.log(this.formInfo.status);
      if (this.formInfoFilter.status == "staff") {
        document.getElementById("stat").innerHTML = "New Request";
        console.log("staff");
      } else if (this.formInfoFilter.status == "advisor") {
        document.getElementById("stat").classList.add("onprocess");
        document.getElementById("stat").innerHTML = "On Process";
      } else if (this.formInfoFilter.status == "dean") {
        document.getElementById("stat").classList.add("approve");
        document.getElementById("stat").innerHTML = "Aprrove";
      } else {
        document.getElementById("stat").classList.add("disapprove");
        document.getElementById("stat").innerHTML = "Disaprrove";
      }
    },
    onChangeId() {
      this.checked = "id";
      this.formInfo.sort(function (first, last) {
        let firstid = first.student_id;
        let secondid = last.student_id;
        if (firstid < secondid) {
          return -1;
        } else if (firstid > secondid) {
          return 1;
        } else {
          return 0;
        }
      });
    },
    onChangeName() {
      this.checked = "form_name";
      this.formInfo.sort(function (first, last) {
        let firstname = first.form_cat;
        let secondname = last.form_cat;
        if (firstname < secondname) {
          return -1;
        } else if (firstname > secondname) {
          return 1;
        } else {
          return 0;
        }
      });
    },
    onChangeStatus() {
      this.checked = "status";
    },
    filteredDate(filtered) {
      var vm = this;
      var startDate = vm.startDate;
      var endDate = vm.endDate;
      return filtered.filter((data) => {
        if (!this.startDate && !this.endDate) {
          return true;
        } else {
          var date = new Date(data.create_date).setHours(0, 0, 0, 0);
          return (
            date >= new Date(startDate).setHours(0, 0, 0, 0) &&
            date <= new Date(endDate).setHours(24, 0, 0, 0)
          );
        }
      });
    },
    onRefresh() {
      location.reload();
    },
    allPage(form) {
      let newArrayPage = [];
      for (let i = 0; i < Math.ceil(form.length / 13); i++) {
        if (form.length <= 13 * (i + 1)) {
          newArrayPage.push({ i: i + 1, start: i * 13, stop: form.length });
        } else {
          newArrayPage.push({ i: i + 1, start: i * 13, stop: 13 * (i + 1) });
        }
      }
      this.numChangeTable = newArrayPage;
    },
    onclickpage(start, stop) {
      this.head = start;
      this.last = stop;
    },
    addSelected(id, formcat, stuid) {
      if (!this.selectedformid.includes(id)) {
        this.selectedformid.push(id);
        this.selectrdformcat.push(formcat);
        this.selectrdformstuid.push(stuid);
      } else {
        const index = this.selectedformid.indexOf(id);
        if (index > -1) {
          this.selectedformid.splice(index, 1);
          this.selectrdformcat.splice(index, 1);
          this.selectrdformstuid.splice(index, 1);
        }
        console.log(this.selectedformid, this.selectrdformcat);
      }
    },
    confirmRequest(value) {
      this.$confirm("Are you sure?").then(() => {
        const formid = this.selectedformid;
        const formcat = this.selectrdformcat;
        const formstuid = this.selectrdformstuid;
        const deancomment = value 
        const senddata = Object.assign({}, { formid, formcat, formstuid,deancomment });
        console.log(senddata);
        const path = pathapi + "/deansubmit";
        axios
          .post(path, senddata)
          .then((res) => {
            console.log(res.data);
            this.$alert("The comment had added");
            location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    confirmAllRequest() {
      for (let ecform in this.formInfoFilter) {
        this.selectedformid.push(this.formInfoFilter[ecform].form_id);
        this.selectrdformcat.push(this.formInfoFilter[ecform].form_aka);
        this.selectrdformstuid.push(this.formInfoFilter[ecform].student_id);
      }
    },onCancel(value){
      this.$confirm("Are you sure?").then(() => {
        const formid = this.selectedformid;
        const formcat = this.selectrdformcat;
        const formstuid = this.selectrdformstuid;
        const deancomment = value 
        const senddata = Object.assign({}, { formid, formcat, formstuid,deancomment });
        console.log(senddata);
        const path = pathapi + "/deandisapprove";
        axios
          .post(path, senddata)
          .then((res) => {
            console.log(res.data);
            this.$alert("All request disapproved");
            location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  },
  created() {
    this.userid = JSON.parse(sessionStorage.getItem("user")).user_id;
    console.log(this.userid);
    this.getallform();
  },
  computed: {
    formInfoFilter() {
      let search = this.search.trim().toLowerCase();
      if (this.checked == "status") {
        return this.filteredDate(
          this.formInfo.filter((form) => {
            return form.status.toLowerCase().indexOf(search) > -1;
          })
        ).slice(this.head, this.last);
      } else if (this.checked == "form_name") {
        return this.filteredDate(
          this.formInfo.filter((form) => {
            return form.form_aka.toLowerCase().indexOf(search) > -1;
          })
        ).slice(this.head, this.last);
      } else if (this.checked == "id") {
        return this.filteredDate(
          this.formInfo.filter((form) => {
            return form.student_id.toString().indexOf(search) > -1;
          })
        ).slice(this.head, this.last);
      } else {
        return this.filteredDate(this.formInfo).slice(this.head, this.last);
      }
    },
  },
  watch: {
    search: function () {
      this.head = "0";
      this.last = 10;
    },
  },
};
</script>

<style scoped>
.active-cont {
  margin-left: 180px;
}
.side-right-navbar {
  width: 100%;
  height: 100%;
  position: absolute;
}
.active-nav {
  margin: 0;
}
.fillter-link:active,
.fillter-link:focus {
  background-color: #b6906490;
}
li {
  list-style-type: none;
}
.round li {
  background-color: #b0b6ba;
  line-height: 25px;
  border-radius: 40px;
  margin: 0;
}
li.approve {
  background-color: #28a745;
  line-height: 25px;
  border-radius: 40px;
  margin: 0;
}
li.disapprove {
  color: #fff;
  background-color: #dc3545;
  line-height: 25px;
  border-radius: 40px;
  margin: 0;
}
li.onprocess {
  background-color: #ffc107;
  line-height: 25px;
  border-radius: 40px;
  margin: 0;
}
.form-control-edit {
  padding: 0;
}

@media screen and (max-width: 1400px) {
  .smallfil {
    font-size: 12px;
    width: auto;
    height: auto;
  }
  .form-control-edit {
    font-size: 12px;
  }
}
</style>