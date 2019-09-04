<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <div class="headline">Ajouter un utilisateur</div>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model='user.lastname' label="Nom*" placeholder="Nom de l'utilisateur" required />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model='user.firstname' label="Prénom*" placeholder="Prénom de l'utilisateur" required />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model='user.email' label="Email*" placeholder="email@email.com" required />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select :items="['Admin', 'Modérateur']" label="Rôle*" required />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model='user.password' label="Password*" type="password" required />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Password*" type="password" required />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="error" @click="closeDialog">Fermer</v-btn>
          <v-btn color="success">Ajouter un utilisateur</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { UPSERT_USER_KYRIOS } from '../../../../graphql/KyriosMutations';

export default {
  name: 'addUserModalComponent',
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    user: {
      firstname: 'matthieu',
      lastname: 'jacquqes',
      email: 'landar@hpotma.fr',
      password: 'toto',
    },
  }),
  methods: {
    closeDialog() {
      this.$emit('closeModal');
    },
    async submitForm() {
      const userCreated = await this.$apollo.mutate({
        mutation: UPSERT_USER_KYRIOS,
        variables: {
          user: this.user,
        },
      });
      console.log(userCreated);
    },
  },
};
</script>
