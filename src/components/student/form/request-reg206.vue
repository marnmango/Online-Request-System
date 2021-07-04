<template>
  <div class="text-start">
    <h4>Request</h4>
    <div>
      <p>Request to Register More/Less Credits</p>
      <div class="row">
        <div class="col-md-4">
          <label for="semeterselect" class="form-label mb-0">Semeter</label>
          <select
            class="form-select"
            id="semeterselect"
            v-model="selectsemes"
            @change="onChange"
          >
            <option v-for="(text, index) in semeter" :key="index">
              {{ text }}
            </option>
          </select>
        </div>
        <div class="col-md-4">
          <label for="academicselect" class="form-label mb-0"
            >Academic year</label
          >
          <select
            class="form-select"
            id="academicselect"
            v-model="selectyear"
            @change="onChange"
          >
            <option v-for="(year, index) in yeargen" :key="index">
              {{ year }}
            </option>
          </select>
        </div>
      </div>
      <div class="border mt-3 bg-white">
        <div class="p-3">
          <p class="mb-2">Reason of request</p>
          <div class="ms-3">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="reason" />
              <label class="form-check-label" for="flexRadioDefault1">
                Reason 1
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="reason" />
              <label class="form-check-label" for="flexRadioDefault2">
                Reason 2
              </label>
            </div>
          </div>
          <p class="mt-3 mb-2">The total credits register</p>
          <div class="ms-3 row">
            <div class="form-check col-md-4">
              <input class="form-check-input" type="radio" name="reason" />
              <label class="form-check-label" for="flexRadioDefault1">
                Less than 9 credits
              </label>
            </div>
            <div class="form-check col-md-4">
              <input class="form-check-input" type="radio" name="reason" />
              <label class="form-check-label" for="flexRadioDefault2">
                More than 21 credits
              </label>
            </div>
          </div>
          <p class="ms-3" style="color: red">
            *** The student have GPAX less than 2.00. You can not select more
            than 21 credits.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>