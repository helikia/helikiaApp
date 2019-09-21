<template>
  <v-row justify="center" v-if="noRender">
    <v-dialog v-model="dialogEditUser" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <div class="headline">Modifier l'utilisateur {{ user.firstname }}</div>
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
          <v-btn color="success" @click="submitForm">Modifier l'utilisateur</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import gql from 'graphql-tag';
import { EDIT_USER } from '../../../../graphql/KyriosMutations';

export default {
  name: 'editUserModalComponent',
  props: {
    dialogEditUser: {
      type: Boolean,
      default: false,
    },
    userEdit: {
      type: String,
      default: '',
    },
    user: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    firstname: '',
    lastname: '',
    email: '',
    role: '',
    password: '',
  }),
  computed: {
    noRender() {
      this.firstname = this.user.firstname;
      this.lastname = this.user.lastname;
      this.email = this.user.email;
      this.role = this.user.role;
      return this.userEdit.length !== 0;
    },
  },
  methods: {
    closeDialog() {
      this.$emit('closeEditModalUser');
    },
    async submitForm() {
      await this.$apollo.mutate({
        mutation: EDIT_USER,
        variables: {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
          creationDate: new Date(),
          role: this.role,
        },
      });
      this.$emit('closeEditModalUser');
    },
  },
};
</script>
