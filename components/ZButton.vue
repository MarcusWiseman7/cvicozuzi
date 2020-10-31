<template>
    <button
        class="z-button"
        :class="[
            `z-button--${size}`,
            `z-button--${modifier}`,
        ]"
        @click="$emit('clicked')"
        :disabled="disabled"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'ZButton',
    props: {
        modifier: { type: String, default: 'cta' },
        size: { type: String, default: 'small' },
        disabled: { type: Boolean, default: false },
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/SCSS/_variables.scss';

.z-button {
    color: $textcolor;
    background-color: transparent;
    border: none;
    border-radius: 4px;
    min-width: 60px;
    font-weight: 600;
    cursor: pointer;

    &--small {
        padding: 0 12px;
        margin: 0 5px;
        font-size: 14px;
        line-height: 16px;
        height: 32px;
    }

    &--medium {
        font-size: 18px;
        line-height: 22px;
        padding: 0 30px;
        height: 40px;
        min-width: 125px;
    }

    &--large {
        font-size: 22px;
        line-height: 26px;
        height: 46px;
        width: 100%;
    }

    &--outline {
        border: 2px solid $maincolorlight;
        color: $maincolorlight;
    }

    &--solid {
        background: $maincolorlight;
        color: #fff;
    }
}

@media screen and (max-width: 350px) {
    .z-button--large {
        font-size: 18px;
    }
}

.z-button--cta:hover:enabled,
.z-button--cta:active {
    background-color: scale-color($color: $maincolor, $lightness: -10%);
    color: $maincolor;
}

.z-button--solid:hover:enabled,
.z-button--solid:active {
    background-color: scale-color($color: $maincolor, $lightness: -10%);
}
</style>
