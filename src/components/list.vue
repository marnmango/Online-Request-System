<template>
  <div>
    <Navbar />
    <div class="active-cont">
      <div class="row g-0">
        <div class="col-10">
          <nav
            class="navbar navbar-expand-lg navbar-light bg-light align-self-center justify-content-center"
          >
            <div class="row">
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

          <nav
            class="navbar fixed-bottom navbar-light bg-light active-cont align-self-center justify-content-center"
          >
            <div
              style="
                text-align: center;
                margin-right: 180px;
                margin-left: 180px;
              "
            >
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <table class="table table-hover">
            <thead class="text-center">
              <tr>
                <th scope="col">#</th>
                <th scope="col" class="w-25">Date</th>
                <th scope="col">Request Form</th>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>

            <tbody class="text-center w-0">
              <tr
                v-for="form in searchName"
                :key="form"
                v-on:click="() => getFormData(form.form_id)"
              >
                <td class="text-center">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                    scope="row"
                  />
                </td>
                <td>
                  {{ form.create_date }}
                </td>
                <td>{{ form.form_aka }}</td>
                <td>{{ form.student_id }}</td>
                <td>{{ form.student_name }}</td>
                <td class="round">
                  <li id="stat" class="w-100 h-25">
                    {{ form.status }}
                  </li>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- fillter -->
        <div class="col-2">
          <div class="container side-navbar active-nav bg-light p-3">
            <h4>Filter</h4>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="filter"
                id="formName"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Form Name
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="filter"
                id="ID"
              />
              <label class="form-check-label" for="flexRadioDefault2">
                ID
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="filter"
                id="status"
                v-on:click="sortStatus"
              />
              <label class="form-check-label" for="flexRadioDefault2">
                Status
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="filter"
                id="descending_date"
                v-on:click="sortDateDescend"
              />
              <label class="form-check-label" for="flexRadioDefault2">
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
              <label class="form-check-label" for="flexRadioDefault2">
                Ascending created date
              </label>
            </div>
          </div>
        </div>
        <!-- fillter -->
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/student/navStudent.vue";
import axios from "axios";
export default {
  props: {
    info: Object,
  },
  components: {
    Navbar,
  },
  data() {
    return {
      formInfo: [],
      search: "",
      checked: "",
    };
  },
  methods: {
    getallform() {
      const path = "http://127.0.0.1:5000/getallform";
      axios
        .get(path)
        .then((res) => {
          console.log(res.data);
          this.formInfo = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFormData(id, form_cat) {
      const address = "Reg209Staff";
      console.log(form_cat);
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
      this.formInfo.sort(function (first, last) {
        let firstdate = first.status;
        let seconddate = last.status;
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
      if (this.formInfo.status == "staff") {
        document.getElementById("stat").innerHTML = "New Request";
        console.log("staff");
      } else if (this.formInfo.status == "advisor") {
        document.getElementById("stat").classList.add("onprocess");
        document.getElementById("stat").innerHTML = "On Process";
      } else if (this.formInfo.status == "dean") {
        document.getElementById("stat").classList.add("approve");
        document.getElementById("stat").innerHTML = "Aprrove";
      } else {
        document.getElementById("stat").classList.add("disapprove");
        document.getElementById("stat").innerHTML = "Disaprrove";
      }
    },
  },
  created() {
    this.getallform();
  },
  computed: {
    formInfoFilter() {
      let search = this.search.trim().toLowerCase();
      if (this.checked == "status") {
        return this.formInfo.filter((form) => {
          return form.status.toLowerCase().indexOf(search) > -1;
        });
      } else if (this.checked == "form_name") {
        return this.formInfo.filter((form) => {
          return form.form_aka.toLowerCase().indexOf(search) > -1;
        });
      } else {
        return this.formInfo.filter((form) => {
          return form.student_id.toString().indexOf(search) > -1;
        });
      }
    },
    searchName() {
      if (!this.search) {
        return this.formInfo;
      }
      let searchText = this.search.toLowerCase();
      return this.formInfo.filter((form) => {
        return form.student_name.toLowerCase().includes(searchText);
      });
    },
  },
  mounted() {
    this.statusProgress();
  },
};
</script>

<style scoped>
.active-cont {
  margin-left: 180px;
}
.side-navbar {
  width: 100%;
  height: 100%;
  position: fixed;
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
</style>