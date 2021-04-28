<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style>
#app {
    font-family: "Poppins", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
<script>
export default {
    mounted() {
    window.onpopstate = event => {
      if (
        sessionStorage.getItem('user') != null &&
        this.$route.path == "/login"
      ) {
          let user = JSON.parse(sessionStorage.getItem('user')).user_role
          if(user=="student"){
              this.$router.push({ name: "Liststudent"});
          }else if(user=="staff"){
              location.reload();
          }else if(user=="advisor"){
              this.$router.push({ name: "Listadvisor"});
          }else if(user=="dean"){
              this.$router.push({ name: "Listdean"});
          }else{
              console.log(event)
          }
      }
    };
  }
}
    

</script>

