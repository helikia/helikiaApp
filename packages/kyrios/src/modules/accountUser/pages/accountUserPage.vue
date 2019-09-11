<template>
  <div>
    <v-row>
      <v-col :cols="12">
        <v-row>
          <v-col :col="6">
            <h1 class="title">
              Liste des utilisateurs
            </h1>
          </v-col>
          <v-col :cols="6">
            <v-btn large class="float-right" color="grey-4" @click="openDialog">Ajouter un utilisateur</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12">
        <ListComponent :allUserKyrios="allUserKyrios" />
      </v-col>
    </v-row>
    <AddUserModalComponent :dialog="dialog" @closeModal="closeModal" />
  </div>
</template>

<script>
import { GET_USERS } from '../../../graphql/kyriosQueries';
import ListComponent from '../modules/components/accountUserListComponent.vue';
import AddUserModalComponent from '../modules/components/addAccountUserModalComponent.vue';

export default {
  name: 'accountUserPageList',
  components: {
    ListComponent,
    AddUserModalComponent,
  },
  data() {
    return {
      allEstablishements: [],
      dialog: false,
    };
  },
  apollo: {
    allUserKyrios: {
      query: GET_USERS,
    },
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeModal() {
      this.dialog = false;
    },
  },
};
</script>
