<template>
    <div class="page-container page-container--admin">
        <the-header :offsetTop="200" :admin="true"></the-header>
        <div class="page-container--inner">
            <Nuxt />
        </div>
        <the-footer></the-footer>

        <transition name="opacityfade">
            <a-spinner v-if="appLoading"></a-spinner>
        </transition>

        <transition name="slidefrombottom">
            <a-message
                v-if="aMessage"
                :name="aMessage.name"
                :message="aMessage.message"
                :location="aMessage.location"
                :countdown="aMessage.countdown"
            ></a-message>
        </transition>
    </div>
</template>

<script>
import TheHeader from '@/components/TheHeader';
import TheFooter from '@/components/TheFooter';
import AMessage from '@/components/AMessage';
import ASpinner from '@/components/ASpinner';
import { mapGetters } from 'vuex';

export default {
    components: { TheHeader, TheFooter, AMessage, ASpinner },
    data () {
        return {
            
        }
    },
    computed: {
        ...mapGetters(['aMessage', 'appLoading']),
    },
    methods: {
        
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
