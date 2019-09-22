<template>
  <v-row justify="center">
    <v-dialog v-model="dialogDeleteUser" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <div class="headline">Suppression de l'utilisateur {{ user.firstname }} {{ user.lastname }}</div>
        </v-card-title>
        <v-card-text>
          <v-container class="text-md-center">
              Etes vous sur de vouloir supprimer l'utilisateur {{ user.firstname }} {{ user.lastname }}
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="error" @click="closeDialog">Annuler</v-btn>
          <v-btn color="success" @click="submitForm">Confirmer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import gql from 'graphql-tag';
import { DELETE_USER } from '../../../../graphql/KyriosMutations';
import { GET_USERS } from '../../../../graphql/kyriosQueries';

export default {
  name: 'DeleteUserModalComponent',
  props: {
    dialogDeleteUser: {
      type: Boolean,
      default: false,
    },
    userDelete: {
      type: String,
      default: '',
    },
    user: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    noRender() {
      return this.userDelete.length !== 0;
    },
  },
  methods: {
    closeDialog() {
      this.$emit('closeDeleteModalUser');
    },
    async submitForm() {
      this.$emit('closeDeleteModalUser');
      await this.$apollo.mutate({
        mutation: DELETE_USER,
        variables: {
          email: this.user.email,
        },
      });
    },
  },
};
</script>
