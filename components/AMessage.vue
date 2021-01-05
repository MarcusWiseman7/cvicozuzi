<template>
    <div class="a-message__holder">
        <div class="a-message" :class="`a-message--${name}`">
            {{ message }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'AMessage',
    props: {
        name: { type: String, default: 'success' },
        message: { type: String, default: '' },
        countdown: { type: Number, default: 4000 },
    },
    mounted() {
        setTimeout(() => {
            this.$store.commit('setAMessage', null);
        }, this.countdown);
    },
};
</script>

<style lang="scss" scoped>
@import './assets/SCSS/_variables.scss';

.a-message {
    color: #fff;
    font-size: 18px;
    letter-spacing: 0.75px;
    height: 50px;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;

    &__holder {
        width: 100%;
        left: 0;
        bottom: 0;
        position: fixed;
        z-index: 30;
        margin-bottom: 50px;
        display: flex;
        justify-content: center;
    }

    &--error {
        background-color: $errorcolor;
    }

    &--success {
        background-color: $successcolor;
    }

    &--info {
        background-color: $infocolor;
    }
}
</style>
