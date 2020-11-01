<template>
    <div class="exercise">
        <div class="exercise__container">
            <div
                v-for="(item, index) in findTexts()"
                :key="index"
                :id="item.id"
                class="exercise__item"
            >
                <h2 class="exercise__title">{{ item.which }}</h2>
                <p class="exercise__text">{{ item.body }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import helpers from '@/utils/helpers';

export default {
    mixins: [helpers],
}
</script>

<style lang="scss" scoped>
.exercise {
    &__item {
        color: #a9e976;
        border-bottom: 1px solid hsla(0,0%,100%,.12);
        padding-bottom: 24px;

        &:last-child {
            border-bottom: none;
        }
    }

    &__title {
        text-align: center;
        font-weight: normal; 
        font-size: 1.75rem;
        letter-spacing: 1.5px;
        margin: 24px 0;
    }

    &__text {
        line-height: 1.75;
        text-align: justify;
        font-size: 1.1rem;
        letter-spacing: .7px;
    }
}
</style>
