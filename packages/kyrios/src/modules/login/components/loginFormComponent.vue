<template>
    <v-card :elevation="0" color="rgba(0, 0, 0, 0.0)">
        <v-card-title class="justify-center">Helikia</v-card-title>
        <v-card-text>
            <form>
              <v-text-field
                id="email"
                required
                 v-validate="'required|email'"
                label="Email"
                placeholder="johndoe@email.com"
                name="login"
                prepend-icon="email"
                type="text"
              />
              <v-text-field
                id="password"
                required
                label="Mot de passe"
                placeholder="Votre mot de passe"
                name="password"
                prepend-icon="lock"
                type="password"
              />
            </form>
        </v-card-text>
        <v-card-actions>
            <v-col class="text-center" cols="12">
            <v-btn width="100%" large elevation="0" color="primary" @click="submit">Se connecter</v-btn>
            <v-btn text class="mt-5" to="/forgot-password">Mot de passe oublié</v-btn>
            </v-col>
        </v-card-actions>
        </v-card>
</template>
<script>
import gql from 'graphql-tag';

export default {
  name: 'LoginFormComponent',
  apollo: {
    me: gql`
    query {
      etablishement { 
        _id
        name
      }
    }
  `,
  },
  methods: {
    async submit() {
      console.log('result');
    },
  },
};
</script>
