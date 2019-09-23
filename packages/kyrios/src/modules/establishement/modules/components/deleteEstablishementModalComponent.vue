<template>
  <v-row justify="center">
    <v-dialog v-model="dialogDeleteEstablishement" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <div class="headline">Suppression de l'EHPAD </div>
        </v-card-title>
        <v-card-text>
          <v-container class="text-md-center">
              Etes vous sur de vouloir supprimer l'EHPAD
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
import { DELETE_ESTABLISHEMENT } from '../../../../graphql/KyriosMutations';

export default {
  name: 'DeleteEstablishementModalComponent',
  props: {
    dialogDeleteEstablishement: {
      type: Boolean,
      default: false,
    },
    userDelete: {
      type: String,
      default: '',
    },
    establishementId: {
      type: String,
      default: '',
    },
  },
  methods: {
    closeDialog() {
      this.$emit('closeDeleteModalEstablishement');
    },
    async submitForm() {
      this.$emit('closeDeleteModalUser');
      await this.$apollo.mutate({
        mutation: DELETE_ESTABLISHEMENT,
        variables: {
          _id: this.user.email,
        },
      });
    },
  },
};
</script>
