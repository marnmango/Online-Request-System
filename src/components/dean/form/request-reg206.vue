<template>
  <div class="text-start">
    <h4>Request</h4>
    <div>
      <p>Request to Register More/Less Credits</p>
      <div class="row">
        <div class="col-md-4">
          <label for="semeterselect" class="form-label mb-0">Semeter</label>
          <input
            class="form-control"
            id="semeterselect"
            v-model="selectsemes"
            disabled
          />
        </div>
        <div class="col-md-4">
          <label for="academicselect" class="form-label mb-0"
            >Academic year</label
          >
          <input
            class="form-control"
            id="academicselect"
            v-model="selectyear"
            disabled
          />
        </div>
      </div>
      <div class="border mt-3 bg-white">
        <div class="p-3">
          <p class="mb-2">Reason of request</p>
          <div class="ms-3">
            <div class="row ms-4 my-2">
          <div class="form-check col-md-6 col-sm-12">
            <input
              class="form-check-input"
              type="radio"
              name="request_radio"
              id="request_radio_1"
              v-bind:checked="reason_list[0]"
              disabled
            />
            <label class="form-check-label" for="request_readio_1">
              Military Service
            </label>
          </div>
          <div class="form-check col-md-6 col-sm-12">
            <input
              class="form-check-input"
              type="radio"
              name="request_radio"
              id="request_radio_2"
              v-bind:checked="reason_list[1]"
              disabled
            />
            <label class="form-check-label" for="request_readio_1">
              Exchange Program
            </label>
          </div>
          <div class="form-check col-md-6 col-sm-12">
            <input
              class="form-check-input"
              type="radio"
              name="request_radio"
              id="request_radio_3"
              v-bind:checked="reason_list[2]"
              disabled
            />
            <label class="form-check-label" for="request_readio_1">
              Illness with a document and the name of a medical provider
            </label>
          </div>
          <div class="form-check col-md-6 col-sm-12">
            <input
              class="form-check-input"
              type="radio"
              name="request_radio"
              id="request_radio_4"
              v-bind:checked="reason_list[3]"
              disabled
            />
            <label class="form-check-label" for="request_checkbox_2">
              Other reason ( please provide the information )
            </label>
          </div>
        </div>
        </div>
          <p class="mt-3 mb-2">The total credits register</p>
          <div class="ms-3 row">
            <div class="form-check col-md-4">
              <input
              class="form-check-input"
              type="radio"
              name="wanted_radio"
              id="wanted_radio1"
              v-bind:checked="recredit_list[0]"
              disabled
            />
              <label class="form-check-label" for="flexRadioDefault1">
                Less than 9 credits
              </label>
            </div>
            <div class="form-check col-md-4">
              <input
              class="form-check-input"
              type="radio"
              name="wanted_radio"
              id="wanted_radio1"
              v-bind:checked="recredit_list[1]"
              disabled
            />
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
export default {
  props:{
      selectsemes:String,
      selectyear:Number,
      reason_list:Array,
      recredit_list:Array
  },
  }
</script>

<style>
</style>