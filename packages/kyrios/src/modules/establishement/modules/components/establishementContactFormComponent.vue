<template>
    <div>
        <v-row>
            <v-col :cols="12">
                <v-row>
                <v-col :col="6">
                    <h2 class="subtitle-1">
                        Informations de contact
                    </h2>
                </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row>
            <v-col :cols="3">
                <v-text-field
                    v-model="establishement.name"
                    label="Nom de l'Ehpad"
                    required
                    :value="establishement.name"
                />
            </v-col>
            <v-col :cols="3">
                <v-text-field
                   
                    label="Email de l'établishement"
                    required
                    :value="establishement.email"
                />
            </v-col>

            <v-col :cols="3">
                <v-text-field
               
                    label="Nom du Directeur"
                    required
                    value="John Doe"
                />
            </v-col>

            <v-col :cols="3">
                <v-text-field
                    v-model="establishement.phone"
                    label="Numéro du téléphone"
                    required
                    :value="establishement.phone"
                />
            </v-col>
        </v-row>

        <v-row>
            <v-col :cols="3">
                <v-text-field
                    label="Adresse"
                    required
                    :value="establishement.street"
                />
            </v-col>
            <v-col :cols="3">
                <v-text-field
                    label="Code postal"
                    required
                    :value="establishement.cp"
                />
            </v-col>

            <v-col :cols="3">
                <v-text-field
                    label="Ville"
                    required
                    :value="establishement.city"
                />
            </v-col>

            <v-col :cols="3">
                <v-select
                    label="Capacité d'accueil"
                    :items="items"
                    value="0-15"
                />
            </v-col>
        </v-row>

        <v-row>
            <v-col :cols="3">
                 <v-select
                    label="Choisir l'aides"
                    :items="socialHelp"
                    value="APPL"
                />
            </v-col>

            <v-col :cols="3">
                 <v-select
                    label="Choisir le type d'accompagnement"
                    :items="accompaniment"
                    value="APPL"
                />
            </v-col>

            <v-col :cols="3">
                <v-radio-group :mandatory="false" class="mt-0">
                    <v-radio label="Accueil permanent" value="full-time"/>
                    <v-radio label="Accueil de jour" value="half-time"/>
                </v-radio-group>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
  name: 'EstablishementContactForm',
  props: {
    establishement: {
        type: Array,
        default: []
    },
  },
  data: () => ({
    items: ['0-15', '15-30', '30-45', '50-100', '+ 100'],
    socialHelp: ['APL', 'APP', 'TOOT'],
    accompaniment: ['Foo', 'Bar', 'Fooz'],
  }),

};
</script>
