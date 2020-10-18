<template>
    <div class="page-container">
        <the-header :offsetTop="offsetTop"></the-header>
        <div class="page-container--inner">
            <Nuxt />
        </div>
        <the-footer></the-footer>
    </div>
</template>

<script>
import TheHeader from '@/components/TheHeader';
import TheFooter from '@/components/TheFooter';

export default {
    components: { TheHeader, TheFooter },
    data () {
        return {
            offsetTop: 0,
        }
    },
    methods: {
        onScroll() {
            this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
        },
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll, false);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll);
    },
}
</script>

<style>

</style>
