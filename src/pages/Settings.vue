<template>
  <v-ons-page>
    <custom-toolbar backLabel="Retour"></custom-toolbar>
    <div class="content">
      <v-ons-list>
        <v-ons-list-title>Settings</v-ons-list-title>
        <v-ons-list-item>
          <div class="center">Groupe test</div>
          <div class="right">
            <v-ons-switch v-model="gamificationMode"></v-ons-switch>
          </div>
        </v-ons-list-item>
      </v-ons-list>
      <v-ons-list>
        <v-ons-list-title>{{ $t('usersConnected') }}</v-ons-list-title>
        <v-ons-list-item v-for="(user,index) in userList" v-bind:key="index">
          <div class="center">{{user.info.name}}</div>
        </v-ons-list-item>
      </v-ons-list>
    </div>
  </v-ons-page>
</template>
<style>
</style>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    userList() {
      return this.$store.state.users.userList;
    },

    gamificationMode: {
      get() {
        return this.$store.state.user.gamificationMode;
      },
      set(val) {
        this.$store.commit("user/setGamificationMode", val);
      }
    }
  }
};
</script>
