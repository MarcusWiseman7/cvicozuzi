<template>
    <div
        class="a-input"
        :class="{
            'a-input--error': error,
            'a-input--label-space': label,
        }"
    >
        <div v-if="label" class="a-input__label" :class="{ 'a-input__label--error': error }">{{ label }}</div>

        <slot></slot>

        <p v-if="error" class="a-input__error-msg">{{ errorMsg }}</p>
    </div>
</template>

<script>
export default {
    name: 'ZInput',
    props: {
        label: { type: String, default: '' },
        error: { type: Boolean, default: false },
        errorMsg: { type: String, default: '' },
        success: { type: Boolean, default: false },
    },
};
</script>

<style lang="scss" scoped>
.a-input {
    position: relative;
    border-radius: 4px;
    border: 1px solid $shadow;
    margin: 20px 0 40px 0;

    input,
    textarea {
        background: $bgcolor;
        font-size: 22px;
        color: #fff;
        margin: 0 0 0 14px;
    }

    input {
        width: 90%;
        height: 46px;
    }

    textarea {
        width: 95% !important;
    }

    &--label-space {
        margin-top: 36px;
    }

    &--error {
        border: 2px solid $errorcolor;
    }

    &__label {
        position: absolute;
        top: -28px;
        left: 16px;
        color: $maincolorlight;
        font-size: 18px;
        font-weight: 600;

        &--error {
            color: $errorcolor;
        }
    }

    &__error-msg {
        position: absolute;
        bottom: -20px;
        left: 16px;
        font-size: 12px;
        color: $errorcolor;
    }
}
</style>
