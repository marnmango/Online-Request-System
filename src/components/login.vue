<template>
  <div class="colorpage">
    <div>
      <div class="form-signin text-left">
        <img class="logosize d-block mb-2 mt-5" src="@/assets/logomfu.png" />
        <div class="text-center">
          <p class="fontlogo mb-0 fs-6">MAE FAH LUANG UNIVERSITY</p>
          <p class="fontlogo mt-0 fs-6">มหาวิทยาลัยแม่ฟ้าหลวง</p>
        </div>
        <label for="inputID" class="mx-1">ID</label>
        <input
          type="text"
          id="inputID"
          class="form-control"
          placeholder="ID number"
          v-model="userid"
          @keyup.enter="handlesubmit"
          required
          autofocus
        />
        <label for="inputPassword" class="mt-3 mx-1">Password</label>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          v-model="password"
          @keyup.enter="handlesubmit"
          required
        />
        <button
          class="w-100 btn btn-lg btn-success mt-3"
          type="submit"
          v-on:click="handlesubmit"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import pathapi from "../pathapi.js";
export default {
  data() {
    return {
      userid: "",
      password: "",
    };
  },
  methods: {
    handlesubmit() {
      const userid = this.userid;
      const password = this.password;
      const senddata = Object.assign({}, { userid, password });
      const path = pathapi + "/login";
      axios
        .post(path, senddata)
        .then((res) => {
          console.log(res.data);
          if (!res.data.auth) {
            this.$alert("Your ID or Password is incorrect.");
          } else {
            sessionStorage.setItem("user", JSON.stringify(res.data.user));
            sessionStorage.setItem("jwt", res.data.token);
            if (res.data.user.user_role == "student") {
              this.$router.push({
                name: "Liststudent",
                params: { userid: userid },
              });
            } else if (res.data.user.user_role == "staff") {
              this.$router.push({ name: "List", params: { userid: userid } });
            } else if (res.data.user.user_role == "advisor") {
              this.$router.push({
                name: "Listadvisor",
                params: { userid: userid },
              });
            } else if (res.data.user.user_role == "dean") {
              this.$router.push({
                name: "Listdean",
                params: { userid: userid },
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.colorpage {
  color: white;
  background-color: #732f27;
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}
.logosize {
  width: auto;
  height: 200px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
