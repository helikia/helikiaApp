<template>
  <div>
    <v-data-table
      calculate-widths
      :headers="headers"
      :items="allUserKyrios"
      :search="search"
      :items-per-page="100"
    >
      <template v-slot:item.action="{ item }">
        <v-btn height="0" width="0" min-width="0" :elevation="0" to="/kyrios/etablissements/1">
          <v-icon small class="mr-2">
          edit
        </v-icon>
        </v-btn>
        <v-btn height="0" width="0" min-width="0" :elevation="0" to="/kyrios/etablissements/1">
          <v-icon small>
            delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'AccountUserListComponent',
  props: {
    allUserKyrios: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      headers: [
        {
          text: 'Nom',
          value: 'lastname',
        },
        {
          text: 'Prénom',
          value: 'firstname',
        },
        {
          text: 'Email',
          value: 'email',
        },
        {
          text: 'Date de création',
          value: 'creationDate',
        },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      search: '',
      rowsPerPageItems: [10, 20, 30, 50],
      pagination: {
        rowsPerPage: [10, 20, 30, 50],
      },
    };
  },
};

</script>
<style lang="scss">
.v-data-table td, .v-data-table th {
    height: 55px;
}
</style>
