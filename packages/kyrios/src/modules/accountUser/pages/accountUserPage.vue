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
            <v-btn large class="float-right" color="grey-4" @click="addUserModal">Ajouter un utilisateur</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12">
        <ListComponent :userKyrios="userKyrios" @editModalUser="editModalUser"/>
      </v-col>
    </v-row>
    <AddUserModalComponent :dialogAddUser="dialogAddUser" @closeAddModal="AddUserCloseModal" />
    <EditUserModalComponent :dialogEditUser="dialogEditUser" @closeEditModalUser="closeEditModalUser" :userEdit="userEdit" :user="user" />
  </div>
</template>

<script>
import gql from 'graphql-tag';
import { GET_USERS } from '../../../graphql/kyriosQueries';
import ListComponent from '../modules/components/accountUserListComponent.vue';

export default {
  name: 'accountUserPageList',
  components: {
    ListComponent,
    EditUserModalComponent: () => import('../modules/components/editAccountUserModalComponent'),
    AddUserModalComponent: () => import('../modules/components/addAccountUserModalComponent'),
  },
  data() {
    return {
      dialogAddUser: false,
      dialogEditUser: false,
      userEdit: '',
      user: {},
      email: '',
    };
  },
  apollo: {
    userKyrios: {
      query: GET_USERS,
    },
  },
  methods: {
    addUserModal() {
      this.dialogAddUser = true;
    },
    AddUserCloseModal() {
      this.dialogAddUser = false;
    },
    async editModalUser(value) {
      this.dialogEditUser = true;
      const response = await this.$apollo.query({
        query: gql`
        query {
          getUserKyrios(email: "matthieu.jacques.dev@gmail.com") {
            firstname lastname email
            password
            role
            creationDate
          }
        }`,
      });
      const { getUserKyrios } = response.data;
      this.user = getUserKyrios;
      this.userEdit = value;
    },
    closeEditModalUser() {
      this.dialogEditUser = false;
    },
  },
};
</script>
