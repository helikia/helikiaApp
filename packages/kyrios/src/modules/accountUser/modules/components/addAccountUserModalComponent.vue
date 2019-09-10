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
                <v-text-field v-model='lastname' label="Nom*" placeholder="Nom de l'utilisateur" required />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model='firstname' label="Prénom*" placeholder="Prénom de l'utilisateur" required />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model='email' label="Email*" placeholder="email@email.com" required />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select v-model='role' :items="['Admin', 'Modérateur']" label="Rôle*" required />
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field v-model='password' label="Password*" type="password" required />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="error" @click="closeDialog">Fermer</v-btn>
          <v-btn color="success" @click="submitForm">Ajouter un utilisateur</v-btn>
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
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    creationDate: '',
    role: '',
  }),
  methods: {
    closeDialog() {
      this.$emit('closeModal');
    },
    async submitForm() {
      await this.$apollo.mutate({
        mutation: UPSERT_USER_KYRIOS,
        variables: {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
          creationDate: new Date(),
          role: this.role,
        },
      });
      this.$emit('closeModal');
    },
  },
};
</script>
