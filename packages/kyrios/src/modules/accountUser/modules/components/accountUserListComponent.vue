<template>
  <div>
    <v-data-table
      calculate-widths
      :headers="headers"
      :items="userKyrios"
      :item-key="userKyrios.email"
      :search="search"
      :items-per-page="100"
    >
      <template v-slot:item.action="{ item }">
        <v-btn height="0" width="0" min-width="0" :elevation="0" @click="editModalUser(item.email)">
          <v-icon small class="mr-2">
          edit
        </v-icon>
        </v-btn>
        <v-btn height="0" width="0" min-width="0" :elevation="0" @click="deleteModal(item.email)">
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
    userKyrios: {
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
          text: 'Rôle',
          value: 'role',
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
  methods: {
    deleteModal(user) {
      this.$emit('displayDeleteModal', user);
    },
    editModalUser(user) {
      this.$emit('editModalUser', user);
    },
  },
};

</script>
<style lang="scss">
.v-data-table td, .v-data-table th {
    height: 55px;
}
</style>
