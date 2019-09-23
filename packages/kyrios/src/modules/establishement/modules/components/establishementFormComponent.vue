<template>
    <div>
        <v-card elevation="0">
            <v-card-text>
                <v-row>
                    <v-col :cols="6">
                        <v-tabs fixed-tabs>
                            <v-tab>Information</v-tab>
                            <v-tab>Contenu</v-tab>
                        </v-tabs>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-form>
            <v-card elevation="0">
                <v-card-text>
                <EstablishementContactFormComponent :establishement="establishement"/>
                <hr>
                <EstablishementAccomodation />
                <hr>
                <EstablishementAncillaryServiceFormComponent />
                </v-card-text>
            </v-card>
            <v-spacer/>
            <v-btn
                color="success"
                class="mt-4 float-right"
            >
                Enregistrer
            </v-btn>
        </v-form>
    </div>
</template>

<script>
import EstablishementContactFormComponent from './establishementContactFormComponent.vue';
import EstablishementAccomodation from './establishementAccomodationFormComponent.vue';
import EstablishementAncillaryServiceFormComponent from './establishementAncillaryServiceFormComponent.vue';

export default {
  name: 'EstablishementFormComponent',
  components: {
    EstablishementContactFormComponent,
    EstablishementAccomodation,
    EstablishementAncillaryServiceFormComponent,
  },

  props: {
    establishement: {
      type: Object,
      default() {
        return {};
      },
    },
  },

};
</script>
