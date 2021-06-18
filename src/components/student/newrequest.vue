<template>
  <div>
    <Navbar />
    <div class="container">
      <div>
        <div class="content text-center mb-0">
          <div class="my-5">
            <h4>Request Form</h4>
          </div>
          <div class="row gy-2">
            <div class="col-12 col-md-6 col-sm-12">
              <div class="p-3 border bg-light h-100">
                <h6>
                  Request Form for Register More/Less Credits than those
                  Stipulated
                </h6>
                <p class="text-center">(REG-206)</p>
                <p class="m-0">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Iure, nostrum.
                </p>
              </div>
            </div>
            <div class="col-12 col-md-6 col-sm-12">
              <div
                class="p-3 border bg-light h-100"
                @click="$router.push('/reg208_student')"
              >
                <h6>Request Form for Leave of Absence Undergraduate Student</h6>
                <p class="text-center">(REG-208)</p>
                <p class="m-0">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Iure, nostrum.
                </p>
              </div>
            </div>
            <div class="col-12 col-md-6 col-sm-12">
              <div
                class="p-3 border bg-light h-100"
                @click="$router.push('/reg209_student')"
              >
                <h6>Request Form for Re-entering Student</h6>
                <p class="text-center">(REG-209)</p>
                <p class="m-0">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Iure, nostrum.
                </p>
              </div>
            </div>
            <div class="col-12 col-md-6 col-sm-12">
              <div class="p-3 border disable h-100">
                <h6>Request Form Being Reinstated to Student Status</h6>
                <p class="text-center">(REG-210)</p>
                <p class="text-start">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Sint, recusandae.
                </p>
              </div>
            </div>
            <div class="col-12 col-md-6 col-sm-12">
              <div class="p-3 border disable h-100">
                <h6>Request Form Maintaining Student Status</h6>
                <p class="text-center">(REG-211)</p>
                <p class="text-start">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Sint, recusandae.
                </p>
              </div>
            </div>
            <div class="col-12 col-md-6 col-sm-12">
              <div class="p-3 border disable h-100">
                <h6>Request Form Student Resignation</h6>
                <p class="text-center">(REG-214)</p>
                <p class="text-start">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Sint, recusandae.
                </p>
              </div>
            </div>
            <div class="col-12 col-md-6 col-sm-12">
              <div class="p-3 border disable h-100">
                <h6>
                  Request Form Enroll in courses with special concurrent
                  examinations
                </h6>
                <p class="text-center">(REG-217)</p>
                <p class="text-start">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Sint, recusandae.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../student/navStudent.vue";
export default {
  components: {
    Navbar,
  },
};
</script>

<style scoped>
.disable {
  background-color: #dddddd;
  color: #7e7e7e;
}
.bg-light:hover {
  opacity: 0.7;
}
</style>