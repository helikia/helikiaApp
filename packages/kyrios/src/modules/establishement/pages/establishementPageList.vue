<template>
  <div>
    <v-row>
      <v-col :cols="12">
        <v-row>
          <v-col :col="6">
            <h1 class="title">
              Liste des établissements
            </h1>
          </v-col>
          <v-col :cols="6">
            <v-btn large class="float-right" color="grey-4">Ajouter un établissement</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12">
        <ListComponent :allEstablishements="allEstablishements" @deleteEhpad="deleteEhpad"/>
      </v-col>
    </v-row>
    <DeleteEstablishementModalComponent
      :dialogDeleteEstablishement="dialogDeleteEstablishement"
      @closeDeleteModalEstablishement="closeDeleteModalEstablishement"
    />
  </div>
</template>

<script>
import { GET_ESTABLISHEMENTS } from '../../../graphql/kyriosQueries';
import ListComponent from '../modules/components/establishementListComponent.vue';

export default {
  name: 'etablishementPageList',
  components: {
    ListComponent,
    DeleteEstablishementModalComponent: () => import('../modules/components/deleteEstablishementModalComponent'),
  },
  data() {
    return {
      allEstablishements: [],
      dialogDeleteEstablishement: false,
    };
  },
  apollo: {
    allEstablishements: {
      query: GET_ESTABLISHEMENTS,
    },
  },
  methods: {
    closeDeleteModalEstablishement() {
      this.dialogDeleteEstablishement = false;
    },
    async deleteEhpad() {
      console.log('toto');
    },
  },
};
</script>
