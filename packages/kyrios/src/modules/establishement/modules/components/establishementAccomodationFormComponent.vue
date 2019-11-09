<template>
    <div>
        <v-row>
            <v-col :cols="12">
                <v-row>
                <v-col :col="6">
                    <h2 class="subtitle-1">
                        Informations tarifaire
                    </h2>
                </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row>
            <v-col :cols="3">
                <div>
                    <h3 class="subtitle-2">
                        Hébergement temporaire
                    </h3>
                    <v-row>
                        <v-col :cols="12">
                            <v-text-field
            
                                label="Chambre Simple"
                                required
                                placeholder="100€"
                                persistent-hint
                                hint="Attention il s'agit d'un tarif par jour et par personne"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col :cols="12">
                            <v-text-field
                       
                                label="Chambre double"
                                required
                                placeholder="100€"
                                persistent-hint
                                hint="Attention il s'agit d'un tarif par jour et par personne"
                            />
                        </v-col>
                    </v-row>
                </div>
            </v-col>

            <v-col :cols="3">
                <div>
                    <h3 class="subtitle-2">
                        Hébergement long
                    </h3>
                    <v-row>
                        <v-col :cols="12">
                            <v-text-field
                  
                                label="Chambre Simple"
                                required
                                placeholder="100€"
                                persistent-hint
                                hint="Attention il s'agit d'un tarif par jour et par personne"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col :cols="12">
                            <v-text-field
               
                                label="Chambre double"
                                required
                                placeholder="100€"
                                persistent-hint
                                hint="Attention il s'agit d'un tarif par jour et par personne"
                            />
                        </v-col>
                    </v-row>
                </div>
            </v-col>


            <v-col :cols="6">
                <div>
                    <h3 class="subtitle-2">
                        Tarif dépendence TTC / jour / personne
                    </h3>
                    <v-row>
                        <v-col :cols="4">
                            <v-text-field
                     
                                label="GIR 1-2"
                                required
                                placeholder="10€"
                            />
                        </v-col>


                        <v-col :cols="4">
                            <v-text-field
              
                                label="GIR 3-4"
                                required
                                placeholder="10"
                            />
                        </v-col>


                        <v-col :cols="4">
                            <v-text-field
                     
                                label="GIR 5-6"
                                required
                                placeholder="10€"
                            />
                        </v-col>

                    </v-row>
                </div>
            </v-col>

        </v-row>
    </div>
</template>

<script>
export default {
  name: 'EstablishementAccomodationForm',
  data: () => ({
    items: ['0-15', '15-30', '30-45', '50-100', '+ 100'],
    socialHelp: ['APL', 'APP', 'TOOT'],
    accompaniment: ['Foo', 'Bar', 'Fooz'],
  }),

};
</script>
