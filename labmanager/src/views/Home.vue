<template>
  <div class="home">
      <div id="demo">
        <div v-if="user">
            <div>Welcome {{profile}}</div>
            <div><button @click="$auth.logout()">logout</button></div>
        </div>
        <div v-else>
            Please sign-in
            <button @click="login()">login</button>
        </div>
    </div>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    login: async function() {
      this.user = await this.$auth.login();
      this.profile = await this.$api.getProfile();
    }
  },
  data: function() {
    return {
      user: null,
      profile: null
    }
  }
}

</script>
