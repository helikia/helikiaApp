<template>
  <div>
    <v-row>
      <v-col :cols="12">
        <v-row>
          <v-col :col="6">
            <h1 class="title">
              {{ establishement.name }}
            </h1>
          </v-col>
          <v-col>
            <v-checkbox v-model="selected" label="Etablissement privé" value="private" class="mt-0 float-right" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12">
        <EstablishementForm :establishement="establishement" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { EventBus } from '../../../../../helpers/eventBus';
import gql from 'graphql-tag';
import EstablishementForm from '../modules/components/establishementFormComponent.vue';

export default {
  name: 'etablishementPage',
  components: {
    EstablishementForm,
  },
  data: () => ({
    selected: ['private'],
    establishement: [],
    establishementId: '5d68d3ebd8d0d9556d3a465d',
  }),

  async mounted() {
    this.getEstablishement();
  },

  methods: {
    async getEstablishement() {
      EventBus.$on('getEtablishementId', (id) => {
        this.establishementId = id;
      });
      const response = await this.$apollo.query({
        query: gql`
          query {
            getEstablishement(_id: "${this.establishementId}") {
              _id
                name
                phone
                cp
                street
                pricing
                categories
            }
          }`,
      });
      const { getEstablishement } = response.data;
      this.establishement = getEstablishement;
    },
  },

};
</script>;
