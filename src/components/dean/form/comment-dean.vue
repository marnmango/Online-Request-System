<template>
  <div style="text-align: left">
    <h4>Dean's comment</h4>
    <div class="row mb-1 g-2">
      <div class="col p-3 border bg-white mx-3 shadow-sm">
        <textarea
          class="form-control"
          id="deancomment"
          v-model="deanComment"
          rows="5"
        >
        </textarea>
      </div>
      <div class="modal-footer">
        <div class="form-check mx-1">
          <input
            class="form-check-input"
            type="radio"
            name="radioAprrove"
            id="approve"
            v-bind:checked="approve"
            v-on:click="checkapprove"
          />
          <label class="form-check-label" for="approve"> Approve </label>
        </div>
        <div class="form-check mx-4">
          <input
            class="form-check-input"
            type="radio"
            name="radioAprrove"
            id="disapprove"
            v-bind:checked="disapprove"
            v-on:click="checkdisapprove"
          />
          <label class="form-check-label" for="disapprove"> Disapprove </label>
        </div>
        <button
          type="button"
          id="submit"
          class="btn btn-outline-success"
          v-on:click="deanchoice"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deanComment: "",
      approve: false,
      disapprove: false,
    };
  },
  methods: {
    onCancel: function () {
      if (this.deanComment.trim() == "") {
        this.$alert("please enter the comment");
      } else if (this.deanComment.trim() != "") {
        document.getElementById("submit").disabled = true;
        this.$emit("onCancel", this.deanComment);
      } else {
        alert("error");
      }
    },
    onSubmit: function () {
      if (this.deanComment.trim() == "") {
        this.$alert("please enter the comment");
      } else if (this.deanComment.trim() != "") {
        document.getElementById("submit").disabled = true;
        this.$emit("onSubmit", this.deanComment);
      } else {
        alert("error");
      }
    },
    deanchoice() {
      if (this.approve == true) {
        this.onSubmit();
      } else if (this.disapprove == true) {
        this.onCancel();
      } else {
        alert("please select one");
      }
    },
    checkapprove: function () {
      (this.approve = true), (this.disapprove = false);
    },
    checkdisapprove: function () {
      (this.disapprove = true), (this.approve = false);
    },
  },
};
</script>

<style>
p,
label {
  font-size: 14px;
}
input {
  text-align: center;
}
.modal-footer {
  border: 0;
}
</style>
