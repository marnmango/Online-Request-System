<template>
  <div>
    <Navbar />
    <div class="container">
      <div>
        <div class="p-1 active-cont justify-content-md-center">
          <div class="row my-4">
            <div
              class="col col-md-6 mb-4 mb-lg-0 col-lg-4"
              v-for="item in nameDashbox"
              :key="item"
            >
              <div class="card shadow-sm mb-4">
                <div class="card-body">
                  <h6 class="card-title">{{ item.name }}</h6>
                  <h6 class="card-text text-center">
                    {{ item.input }}
                    <p style="display: inline">Request</p>
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <!-- <Charts /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../student/navStudent.vue";

export default {
  data() {
    return {
      nameDashbox: [
        { name: "New Requests", input: 10 },
        { name: "Approved", input: 4 },
        { name: "Disapproved", input: 0 },
        { name: "Register More/Less Credits", input: 30 },
        { name: "Leave for Absence", input: 11 },
        { name: "Re-entering students", input: 12 },
        { name: "Being Reinstated to student status", input: 1 },
        { name: "Maintaining Student Status", input: 0 },
        { name: "Student Reinstated", input: 2 },
        { name: "Enroll in course", input: 13 },
      ],
    };
  },

  components: {
    Navbar,
  },
};
</script>

<style>
.active-cont {
  margin-left: 12%;
}
</style>