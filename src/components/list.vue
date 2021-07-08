<template>
  <div>
    <Navbar />
    <div>
      <!-- navbar search -->
      <div
        class="
          navbar navbar-light
          bg-light
          align-self-center
          justify-content-center
          content
        "
      >
        <input
          v-model="search"
          type="text"
          class="form-control my-3"
          style="width: 500px"
          placeholder="Search"
        />

        <div class="mb-3 mx-2"></div>
      </div>

      <!-- table -->
      <div class="content p-0 row g-0 mb-5">
        <div class="col-md-10 col-sm-12">
          <table class="table table-hover mb-0 mb-3">
            <thead class="text-center">
              <tr>
                <th scope="col">No.</th>
                <th scope="col" class="w-25">Date</th>
                <th scope="col">Request Form</th>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>

            <tbody class="text-center">
              <tr v-for="(form, index) in formInfoFilter" :key="form.form_id">
                <td class="text-center">{{ index + 1 }}</td>
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
                    backgroundColor: colorStatus[form.status],
                  }"
                >
                  <li
                    id="stat"
                    class="w-100 h-25 align-self-center align-items-center"
                  >
                    {{ form.status }}
                  </li>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-md-2 col-sm-12">
          <div class="bg-light p-3 h-100 position-fixed">
            <h4>Filter</h4>
            <div>
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
              <div class="d-grid mt-4 mb-2">
                <p class="m-0">Start Date</p>
                <input type="date" v-model="startDate" class="" />
              </div>
              <div class="d-grid mb-2">
                <p class="m-0">End Date</p>
                <input type="date" v-model="endDate" class="" />
                <div class="d-grid mt-3">
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
      </div>
      <!-- เปลี่ยนหน้า -->
      <div
        class="
          navbar navbar-light
          bg-light
          active-cont
          align-self-center
          justify-content-center
          fixed-bottom
          content
        "
      >
        <ul class="pagination pagination-sm mt-2">
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
    </div>
  </div>
</template>

<script>
import Navbar from "./navbar.vue";
import axios from "axios";
import pathapi from "../pathapi.js";
export default {
  props: {
    info: Object,
  },
  components: {
    Navbar,
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
        dean: "#ffc107",
        Disapproved: "#dc3545",
        payment: "#ffc107",
        completed: "#28a745",
        complete: "#28a745",
      },
      head: 0,
      last: "",
      numChangeTable: [],
    };
  },
  methods: {
    getallform() {
      const path = pathapi + "/getstaffform";
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
        address = "Reg209Staff";
      } else if (form_cat == 208) {
        address = "Reg208Staff";
      }else if (form_cat == 206) {
        address = "Reg206Staff";
      }
      this.$router.push({
        name: address,
        params: { id: id, staff_id: this.userid },
      });
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
  },
  created() {
    // this.userid = this.$route.params.userid;
    // if (this.$route.query.debug) {
    //   this.debug = this.$route.query.debug;
    // }
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
li {
  list-style-type: none;
}
</style>