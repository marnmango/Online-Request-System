<template>
  <div>
    <h4 class="text-start">{{ nametitle.name }}</h4>
    <div class="mx-4">
      <!-- trigger modal -->
      <img
        v-bind:src="require('@/assets/' + nametitle.path)"
        class="img-fluid border shadow-sm pic imgh"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      />

      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {{ nametitle.name }}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <img
                v-bind:src="require('@/assets/' + nametitle.path)"
                class="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nametitle: Array,
  },
};
</script>

<style scoped>
.pic {
  height: 900px;
  width: auto;
}
.imgh {
  opacity: 1;
  transition: 0.3s;
}
.imgh:hover {
  opacity: 0.5;
  cursor: pointer;
}
</style>
