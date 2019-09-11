<template>
  <div>
    <v-app-bar
      app
      clipped-left
      flat
      color="grey lighten-4"
      class="header"
    >
      <div class="headline" to="/dashboard">Helikia</div>
      <div class="flex-grow-1"></div>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon>account_circle</v-icon>
          </v-btn>
        </template>
        <v-list rounded :elevation="0">
          <v-list-item to="/kyrios/settings/122345" link>
            <v-list-item-icon>
                <v-icon>settings</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Paramètres</v-list-item-title>
          </v-list-item>

          <v-list-item @click="logout" link>
            <v-list-item-icon>
                <v-icon>logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Se déconnecter</v-list-item-title>
          </v-list-item>

        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <VNavigationComponent/>
      <v-container fluid fill-height class="grey lighten-4 f">
        <div style="width:100%;">
          <router-view></router-view>
        </div>
      </v-container>
    </v-content>
  </div>
</template>


<script>
import VNavigationComponent from './components/navigationComponent.vue';

export default {
  name: 'kyriosContainer',
  components: {
    VNavigationComponent,
  },

  methods: {
    async logout() {
      localStorage.removeItem('HelikiaToken');
      await this.$router.push('/');
    },
  },
};
</script>
 <style lang="scss" scoped>
 .v-application .grey.lighten-4 {
  border-bottom-color: #d7d7d7 !important;
 }
 .header {
   border-bottom: 1px solid #d7d7d7 !important;
 }
 </style>
