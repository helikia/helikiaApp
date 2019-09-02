<template>
<v-content>
  <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" md="5">
        <v-card :elevation="0" color="rgba(0, 0, 0, 0.0)">
            <v-card-title class="display-2 justify-center font-weight-medium text-uppercase ">La page n'existe pas</v-card-title>
            <v-card-text class="text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat finibus ipsum ut sagittis. Donec condimentum id ante non dictum.
            </v-card-text>
            <v-card-actions>
                <v-col class="text-center" cols="12">
                    <v-btn width="50%" large elevation="0" color="primary" to="/">Revenir à la page précédente</v-btn>
                </v-col>
            </v-card-actions>
            </v-card>
        </v-col>
      </v-row>
  </v-container>
</v-content>
</template>
<script>
export default {
  name: 'notFoundComponent',
};
</script>
