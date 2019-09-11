<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <VLoginFormComponent />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import VLoginFormComponent from '../components/loginFormComponent.vue';

export default {
  name: 'loginPage',
  components: {
    VLoginFormComponent,
  },
};
</script>
