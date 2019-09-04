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
import gql from 'graphql-tag';
import VLoginFormComponent from '../components/loginFormComponent.vue';

export default {
  name: 'loginPage',
  components: {
    VLoginFormComponent,
  },
  data() {
    return {
      me: null,
    };
  },
  apollo: {
    me: gql` query {
      me {
        id
        name
        email
      }
    }`,
  },
};
</script>
