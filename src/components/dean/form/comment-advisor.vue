<template>
  <div style="text-align: left">
    <h4>Advisor's comment</h4>
    <div class="row mb-1 g-2">
      <div class="col p-3 border bg-white mx-3 shadow-sm">
        <textarea
          class="form-control"
          v-model="advisorComment"
          rows="5"
          readonly
        >
        </textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    advisorComments: String,
  },
  data() {
    return {
      advisorComment: "",
    };
  },
  methods: {
    getadvisorcomment() {
      this.advisorComment = this.advisorComments;
    },
  },
  mounted() {
    this.getadvisorcomment();
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
</style>
