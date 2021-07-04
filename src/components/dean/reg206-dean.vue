<template>
  <div>
    <Navbar />
    <div>
      <div class="p-1 content" style="text-align: center">
        <div class="mx-4">
          <div class="my-4">
            <h4>REGISTRAR DIVISION, MAE FAH LUANG UNIVERSITY</h4>
            <h4>
              Request Form for Register More/Less Credits than those Stipulated
            </h4>
          </div>
          <div class="row gy-3 mb-3">
            <div class="col-xxl-5 col-md-12 col-sm-12 col-xl-12">
              <div class="p-3 border bg-light">
                <InformationForm />
              </div>
            </div>
            <div class="col-xxl-7 col-md-12 col-sm-12 col-xl-12">
              <div class="p-3 border bg-light h-100">
                <RequestForm />
              </div>
            </div>
            <div class="col-xxl-12 col-md-12 col-sm-12 col-xl-12">
              <div class="p-3 border bg-light h-100">
                <TableCouse />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../navbar.vue";
import InformationForm from "./form/information.vue";
import RequestForm from "./form/request-reg206.vue";
import TableCouse from "./form/tablecourse.vue";
export default {
  components: {
    Navbar,
    InformationForm,
    RequestForm,
    TableCouse,
  },
};
</script>

<style>
</style>