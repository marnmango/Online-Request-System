<template>
   <img class="preview" :src="picture">
</template>

<script>
export default {
  props: {
    picture: String,
  },
  // methods:{
  //   dataURLtoFile(dataurl, filename) {
  //       var arr = dataurl.split(','),
  //           mime = arr[0].match(/:(.*?);/)[1],
  //           bstr = atob(arr[1]), 
  //           n = bstr.length, 
  //           u8arr = new Uint8Array(n);
  //       while(n--){
  //           u8arr[n] = bstr.charCodeAt(n);
  //       }
  //       return new File([u8arr], filename, {type:mime});
  //   }
  // },
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
