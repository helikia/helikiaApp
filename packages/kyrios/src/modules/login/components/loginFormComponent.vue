<template>
    <v-card :elevation="5" class="elevation-12">
        <v-card-title class="justify-center">Helikia</v-card-title>
        <v-card-text>
            <form
            method="POST"
            ref="form"
            lazy-validation
            >
                <v-text-field
                    id="email"
                    required
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
            <v-btn width="100%" large color="primary" @click="submit">Se connecter</v-btn>
            <v-btn text class="mt-5" to="/forgot-password">Mot de passe oublié</v-btn>
            </v-col>
        </v-card-actions>
        </v-card>
</template>
<script>
import gql from 'graphql-tag';

export default {
  name: 'LoginFormComponent',
  
  data: () => ({
   
  }),
  apollo: {
    me: gql`
    query {
      me { 
        id
        name
        email
      }
    }
  `,
  },
  methods: {
    async submit() {
      console.log(result);
    },
  },
};
</script>
