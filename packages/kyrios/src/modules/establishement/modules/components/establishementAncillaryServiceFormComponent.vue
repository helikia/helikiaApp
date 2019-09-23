<template>
    <div>
        <v-row>
            <v-col :cols="12">
                <v-row>
                <v-col :col="6">
                    <h2 class="subtitle-1">
                       Prestations annexe
                    </h2>
                </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-group>
            <v-row>
                <v-col :cols="3">
                    <v-autocomplete
                        label="Prestation annexe"
                        :items="services"
                        placeholder="Vin rouge"
                    />
                </v-col>
                <v-col :cols="3">
                    <v-text-field
                        label="Tarif"
                        required
                        placeholder="10€"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col :cols="6">
                    <v-textarea
                        name="input-7-1"
                        label="Default style"
                        value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                    ></v-textarea>
                </v-col>
            </v-row>
        </v-group>
        <v-btn>Ajouter une prestation</v-btn>
    </div>
</template>

<script>
export default {
  name: 'EstablishementAncillaryServiceForm',
  data: () => ({
    services: ['0-15', '15-30', '30-45', '50-100', '+ 100'],
  }),

};
</script>
