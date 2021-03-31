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
                <button type="button" class="btn btn-outline-danger p-0">
                  <img
                    src="@/assets/binicon.png"
                    alt="delete-bin"
                    style="width: 35px; heigth: auto"
                  />
                </button>
              </div>
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  style="width: 500px; text-align: left"
                  id="Search"
                  placeholder="Search"
                />
              </div>
              <div class="col">
                <button type="button" class="btn btn-outline-success">
                  Search
                </button>
              </div>
            </div>
          </nav>

          <nav
            class="navbar fixed-bottom navbar-light bg-light active-cont align-self-center justify-content-center"
          >
            <div style="text-align: center; margin-right: 180px">
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
                <th scope="col "></th>
                <th scope="col ">Date</th>
                <th scope="col">Request Form</th>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>

            <tbody class="text-center">
              <tr v-for="info in formInfo" :key="info">
                <div v-on:click="()=>getFormData(info.form_id)">
                  <td scope="row">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </td>
                  <td>
                    {{ info.create_date }}
                  </td>
                  <td>{{ info.form_aka }}</td>
                  <td>{{ info.student_id }}</td>
                  <td>{{ info.student_name }}</td>
                  <td>
                    <button type="button" class="btn btn-round">
                      {{ info.status }}
                    </button>
                  </td>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- fillter -->
        <div class="col-2">
          <div
            class="side-navbar active-nav d-flex justify-content-between flex-wrap flex-column bg-light"
          >
            <ul class="flex-column">
              <h6 class="my-2">Filter</h6>
              <li href="#" class="mx-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    value=""
                    id="nameAZ"
                  />
                  <label class="form-check-label" for="nameAZ">
                    Name A-Z
                  </label>
                </div>
              </li>
              <li href="#" class="mx-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    value=""
                    id="school"
                  />
                  <label class="form-check-label" for="school"> School </label>
                </div>
              </li>
              <li href="#" class="mx-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    value=""
                    id="ID"
                  />
                  <label class="form-check-label" for="ID"> ID </label>
                </div>
              </li>
              <li href="#" class="mx-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    value=""
                    id="status"
                  />
                  <label class="form-check-label" for="status"> Status </label>
                </div>
              </li>
              <li href="#" class="mx-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    value=""
                    id="semeter1"
                  />
                  <label class="form-check-label" for="semeter1">
                    Semeter 1
                  </label>
                </div>
              </li>
              <li href="#" class="mx-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    value=""
                    id="semeter2"
                  />
                  <label class="form-check-label" for="semeter2">
                    Semeter 2
                  </label>
                </div>
              </li>
              <li href="#" class="mx-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    value=""
                    id="academic"
                  />
                  <label class="form-check-label" for="academic">
                    Academic Year
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- fillter -->
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/student/navStudent.vue";
import axios from 'axios';
export default {
	props: {
    info: Object,
  },
  components: {
    Navbar,
  },
  data() {
    return {
      formInfo:''
    };
  },
  methods:{
  getallform(){
    const path = 'http://127.0.0.1:5000/getall209';
			axios.get(path)
				.then((res)=>{
					console.log(res.data)
					this.formInfo = res.data;
				})
				.catch((error)=>{
					console.log(error)
				})
		},
    getFormData(id) { 
      const address = 'Reg209Staff'      
      this.$router.push({ name: address ,
                    params: { id: id }})
    }
  },
  created(){
		this.getallform();
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
.btn-round {
  background-color: #b0b6ba;
  line-height: 10px;
  border-radius: 40px;
}
</style>
