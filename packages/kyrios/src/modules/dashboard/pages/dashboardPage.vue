<template>
    <toto>
      <p slot="content">Mon super dashboard</p>
    </toto>
</template>

<script>
import toto from '../../../containers/kyrios.container.vue';

export default {
  name: 'dashboardPage',
  components: {
    toto,
  },
};
</script>
