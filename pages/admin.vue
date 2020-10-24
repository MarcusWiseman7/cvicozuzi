<template>
    <div>
        hi
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Admin',
    layout: 'admin',
    computed: {
        ...mapGetters(['allUsers']),
    },
    mounted() {
        this.$store.dispatch('getAllUsers');
    },
}
</script>

<style lang="scss" scoped>

</style>