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
          <v-list-item v-for="item in items" :key="item.title" :to="item.path" link>
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
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
  data: () => ({
    items: [
      { title: 'Paramètres', icon: 'settings', path: '/kyrios/settings/11223311' },
      { title: 'Se déconnecter', icon: 'logout', path: '/logout' },
    ],
  }),
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
