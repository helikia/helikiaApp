<template>
    <v-card :elevation="0" color="rgba(0, 0, 0, 0.0)">
        <v-card-title class="justify-center">Helikia</v-card-title>
        <v-card-text>
            <v-form>
              <v-text-field
                id="email"
                v-model="email"
                required
                label="Email"
                placeholder="johndoe@email.com"
                name="login"
                prepend-icon="email"
                type="text"
              />
              <v-text-field
                id="password"
                v-model="password"
                required
                label="Mot de passe"
                placeholder="Votre mot de passe"
                name="password"
                prepend-icon="lock"
                type="password"
              />
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-col class="text-center" cols="12">
            <v-btn width="100%" large elevation="0" color="primary" @click="submitForm">Se connecter</v-btn>
            <v-btn text class="mt-5" to="/forgot-password">Mot de passe oublié</v-btn>
            </v-col>
        </v-card-actions>
        </v-card>
</template>
<script>
import { SIGNIN_USERKYRIOS } from '../../../graphql/KyriosMutations';
import { onLogin } from '../../../../../../apollo.config';

export default {
  name: 'LoginFormComponent',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async submitForm() {
      await this.$apollo.mutate({
        mutation: SIGNIN_USERKYRIOS,
        variables: {
          email: this.email,
          password: this.password,
        },
      }).then((data) => {
        onLogin(this.$apollo.provider.defaultClient, data.data.signinUserKyrios.token);
        this.$router.push('/kyrios/dashboard');
      }).catch((err) => {
        console.error(err);
      });
    },
  },
};
</script>
