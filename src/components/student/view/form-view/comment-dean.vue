<template>
  <div style="text-align: left">
    <h4>Dean's comment</h4>
    <div class="mb-0">
      <div class="p-3 border bg-white shadow-sm">
        <textarea class="form-control" v-model="deanComment" rows="3" readonly>
        </textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    deanComments: String,
  },
  data() {
    return {
      deanComment: "",
    };
  },
  methods: {
    getdeancomment() {
      this.deanComment = this.deanComments;
    },
  },
  mounted() {
    this.getdeancomment();
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
