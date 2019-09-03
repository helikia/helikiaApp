<template>
    <v-navigation-drawer
      v-model="drawer"
      app
      :mini-variant.sync="mini"
      permanent
      clipped
      color="grey lighten-4"
    >
        <v-list dense>
            <v-list-item
                v-for="item in items"
                :key="item.title"
                :to="item.path "
                link
            >
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title class="sub-title">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
         </v-list>
        <v-btn
            absolute
            depressed
            left
            bottom
            justify="center"
            align="center"
            icon
            @click.stop="mini = !mini"
        >
          <v-icon justify="center">double_arrow</v-icon>
        </v-btn>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: 'navigationComponent',
  data: () => ({
    drawer: null,
    mini: true,
    items: [
      { title: 'Ephad', icon: 'home_work', path: '/kyrios/etablishements' },
      { title: 'Utilisateurs', icon: 'supervisor_account' },
    ],
  }),
};
</script>
