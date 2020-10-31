<template>
    <transition name="popup">
        <div v-if="transitionEffect" class="popup__holder" @click="$emit('close')">
            <div class="popup" @click.stop="">
                <div class="popup__container">
                    <img class="popup__closer" src="@/assets/icons/close.svg" alt="Close" @click="$emit('close')" />
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'ZPopup',
    data() {
        return {
            transitionEffect: false,
        }
    },
    mounted() {
        this.transitionEffect = true;
    },
}
</script>

<style lang="scss" scoped>
.popup {
    user-select: none;
    width: 500px;
    max-width: calc(100% - 24px);
    max-height: calc(100% - 24px);
    height: auto;

    &__holder {
        max-height: 100vh;
        height: 100vh; /* Fallback for browsers that do not support Custom Properties */
        height: calc(var(--vh, 1vh) * 100);
        width: 100%;
        left: 0;
        bottom: 0;
        position: fixed;
        z-index: 30;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.7);
    }

    &__container {
        position: relative;
        display: flex;
        flex-flow: column nowrap; // 1)
        align-items: center;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        border-radius: 16px;
        background: #303030;
        box-shadow: 0px 0px 10px rgba(252, 28, 125, 0.2);
        color: #fc1c7d;
        padding: 0 30px 30px 30px;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;


        & > * {
            flex-shrink: 0;
            flex-grow: 0;
        }

        &::after {
            content: '';
            flex: 0 0 30px;
            width: 100%;
            height: 30px;
        }
    }

    &__closer {
        position: absolute;
        top: 0;
        right: 0;
        padding: 10px;
        cursor: pointer;
    }
}

.popup-enter-active,
.popup-leave-active {
    transition: opacity 0.3s;

    & > div {
        transition: transform 0.25s;
    }
}

.popup-enter,
.popup-leave-to {
    opacity: 0;

    & > div {
        transform: scale(0.8) translate3d(0, 0, 0);
    }
}
</style>