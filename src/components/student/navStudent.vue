<template>
  <div>
    <div class="sidebar">
      <li class="active cursorDe" @click="$router.push('/list-student')">
        <img class="logosize mb-2" src="@/assets/logomfu.png" />
        <div style="text-align: center">
          <p class="logotext mb-0" style="font-size: 12px">
            MAE FAH LUANG UNIVERSITY
          </p>
          <p class="logotext mt-0" style="font-size: 14px">
            มหาวิทยาลัยแม่ฟ้าหลวง
          </p>
        </div>
      </li>
      <div class="tab">
        <li class="mt-0 cursorDe" href="#" @click="$router.push('/newrequest')">
          New Requests
        </li>
        <li class="cursorDe" href="#">Approved</li>
        <li class="cursorDe" href="#">Disapproved</li>
        <li class="cursorDe" href="#">Payment</li>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
body {
  margin: 0;
  font-family: "Poppins", sans-serif;
}
.logotext {
  display: block;
}
.logosize {
  width: auto;
  height: 110px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: block;
}
.sidebar {
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #732f27;
  position: fixed;
  height: 100%;
  overflow: auto;
}

.sidebar li {
  display: block;
  color: white;
  padding: 16px;
  text-decoration: none;
}

.sidebar {
  background-color: #732f27;
  color: white;
}
li.active {
  margin-top: 20px;
  background-color: #732f27;
  color: white;
  padding-bottom: 0;
}
.sidebar li:hover:not(.active) {
  background-color: #b6906490;
  color: white;
}

div.content {
  margin-left: 200px;
  padding: 1px 16px;
}

.cursorDe {
  cursor: default;
}

@media screen and (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar li {
    float: none;
    display: inline-block;
  }
  div.tab {
    text-align: center;
  }
  div.content {
    margin-left: 0;
  }
  .fontlogo {
    font-size: 18px;
  }
  li.active {
    margin-top: 0;
    display: block;
  }
}

@media screen and (max-width: 400px) {
  .sidebar li {
    text-align: center;
    /* float: none; */
    display: block;
  }
}
</style>
