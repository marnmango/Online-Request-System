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
              <button
					type="button"
					id="submit"
					class="btn btn-success my-2 mx-2"
					style="width: 100px"
					v-on:click="confirmRequest"
				>
					Confirm selected request
				</button>
         <button
					type="button"
					id="submit"
					class="btn btn-success my-2 mx-2"
					style="width: 100px"
					v-on:click="confirmAllRequest"
				>
					Confirm all request
				</button>
            </div>
          </nav>
         
          <!-- เปลี่ยนหน้า array -->
          <nav
            class="navbar fixed-bottom navbar-light bg-light active-cont align-self-center justify-content-center"
          >
            <div style="margin-right: 180px">
              <ul class="pagination">
                <li class="page-item" v-for="(item,index) in numChangeTable" :key="index">
                  <a class="page-link" v-on:click="() => onclickpage(item.start,item.stop)">{{item.i}}</a>
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
              <tr v-for="form in formInfoFilter" :key="form.form_id">
                <td class="text-center">
                  <input
                    v-bind:checked="selectedformid.includes(form.form_id) ? true:false"
                    class="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                    scope="row"
                    v-on:click="() => addSelected(form.form_id,form.form_aka,form.student_id)"
                  />
                </td>
                <td v-on:click="() => getFormData(form.form_id,form.form_cat)">
                  {{ form.create_date }}
                </td>
                <td v-on:click="() => getFormData(form.form_id,form.form_cat)">
                  {{ form.form_aka }}
                </td>
                <td v-on:click="() => getFormData(form.form_id,form.form_cat)">
                  {{ form.student_id }}
                </td>
                <td v-on:click="() => getFormData(form.form_id,form.form_cat)">
                  {{ form.student_name }}
                </td>
                <td
                  v-on:click="() => getFormData(form.form_id,form.form_cat)"
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
        <div class="col-2">
          <div class="container side-navbar active-nav bg-light p-3 w-25">
            <h4>Filter</h4>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="filter"
                id="formName"
                v-on:click="onChangeName"
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
                v-on:click="onChangeId"
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
            <!-- ที่ใส่วันที่filter -->
            <div style="width: 210px">
              <div class="form-check mt-4 mb-2">
                <p class="m-0">Start Date</p>
                <input type="date" v-model="startDate" class="form-control" />
              </div>
              <div class="form-check mb-2">
                <p class="m-0">End Date</p>
                <input type="date" v-model="endDate" class="form-control" />
                <!-- ปุ่มรีเฟรชหน้า -->
                <div class="d-grid gap-2 mt-3">
                  <button
                    type="button"
                    class="btn btn-outline-success"
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
      startDate: "",
      endDate: "",
      colorStatus: {
        staff: "#b0b6ba",
        advisor: "#ffc107",
        dean: "#28a745",
        Disapproved: 'red'
      },
      head:0,
      last:'',
      numChangeTable: [],
      selectedformid:[],
      selectrdformcat:[],
      selectrdformstuid:[]
    };
  },
  methods: {
    getallform() {
      const path = "http://127.0.0.1:5000/getformdean";
      axios
        .get(path)
        .then((res) => {
          console.log(res.data);
          this.formInfo = res.data;
          return this.formInfo
        })
        .catch((error) => {
          console.log(error);
        }).then((form)=>{
          this.allPage(form)
          if(form.length<10){
              this.last=form.length
          }else{
              this.last=10
          }
          })
    },
    getFormData(id, form_cat) {
      const address = "Reg209Dean";
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
    },allPage(form){
      let newArrayPage =[]
      for(let i= 0;i<Math.ceil((form.length/10));i++){
          if(form.length<=10*(i+1)){
              newArrayPage.push({i:i+1,start:i*10,stop:form.length})
          }
          else{
            newArrayPage.push({i:i+1,start:i*10,stop:10*(i+1)})
          }
      }
      this.numChangeTable = newArrayPage
    },onclickpage(start,stop){
      this.head=start
      this.last=stop
    },addSelected(id,formcat,stuid){
        if(!this.selectedformid.includes(id)){
            this.selectedformid.push(id)
            this.selectrdformcat.push(formcat)
            this.selectrdformstuid.push(stuid)
        }else{
            const index = this.selectedformid.indexOf(id);
            if (index > -1) {
           this.selectedformid.splice(index, 1);
           this.selectrdformcat.splice(index,1)
           this.selectrdformstuid.splice(index,1)
          }
          console.log(this.selectedformid,this.selectrdformcat)
        }
    },confirmRequest(){
        this.$confirm("Are you sure?").then(() => {
        const formid=this.selectedformid;
        const formcat=this.selectrdformcat
        const formstuid=this.selectrdformstuid
      const senddata = Object.assign({},{formid,formcat,formstuid})
      console.log(senddata)
      const path = 'http://127.0.0.1:5000/deansubmit';
			axios.post(path,senddata)
				.then((res)=>{
					console.log(res.data)
          this.$alert("The comment had added")
          location.reload();
				})
				.catch((error)=>{
					console.log(error)
				})
})
    },confirmAllRequest(){
      for(let ecform in this.formInfoFilter){
            this.selectedformid.push(this.formInfoFilter[ecform].form_id)
            this.selectrdformcat.push(this.formInfoFilter[ecform].form_aka)
            this.selectrdformstuid.push(this.formInfoFilter[ecform].student_id)
      }
      this.confirmRequest()
    }
  },
  created() {
    this.getallform()
  },
  computed: {
    formInfoFilter() {
      let search = this.search.trim().toLowerCase();
      if (this.checked == "status") {
        return this.filteredDate(
          this.formInfo.filter((form) => {
            return form.status.toLowerCase().indexOf(search) > -1;
          })
        ).slice(this.head,this.last)
      } else if (this.checked == "form_name") {
        return this.filteredDate(
          this.formInfo.filter((form) => {
            return form.form_aka.toLowerCase().indexOf(search) > -1;
          })
        ).slice(this.head,this.last)
      } else if (this.checked == "id") {
        return this.filteredDate(
          this.formInfo.filter((form) => {
            return form.student_id.toString().indexOf(search) > -1;
          })
        ).slice(this.head,this.last)
      } else {
        return this.filteredDate(this.formInfo).slice(this.head,this.last);
      }
    }
  },watch:{
      search:function() {
          this.head='0'
          this.last=10
      }
  }
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