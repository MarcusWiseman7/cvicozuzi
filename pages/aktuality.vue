<template>
    <div class="info">
        <div class="info--inner">
            <h1 class="info__title">{{ findText('headline') }}</h1>

            <!-- FLYER -->
            <img v-if="findPic('flyer')" :src="findPic('flyer')" alt="flyer" class="info__flyer" />

            <current-events></current-events>

            <!-- SPECIAL SALES -->
            <div v-if="akce && akce[0].item">
                <h2 class="info__subtitle">Další připravované akce:</h2>
                <h2 class="info__item" v-for="(item, i) in akce" :key="i">{{ item.item }}</h2>
            </div>
        </div>

        <carousel
            v-show="goCarousel"
            :autoplay="true"
            :loop="true"
            :autoplayTimeout="3000"
            :autoplayHoverPause="true"
            :perPage="1"
        >
            <slide v-for="(pic, i) in findPics('carousel')" :key="i">
                <img :src="pic" alt="Exercise class" />
            </slide>
        </carousel>
    </div>
</template>

<script>
import CurrentEvents from '@/components/CurrentEvents';
import { Carousel, Slide } from 'vue-carousel';
import helpers from '@/utils/helpers';

export default {
    components: { CurrentEvents, Carousel, Slide },
    mixins: [helpers],
    data() {
        return {
            akce: null,
            goCarousel: false,
        };
    },
    mounted() {
        setTimeout(() => {
            this.goCarousel = true;
        }, 200);
    },
};
</script>

<style lang="scss" scoped>
.info {
    &__title {
        margin: 24px 0;
    }

    &__flyer {
        max-width: 100%;
        margin-bottom: 24px;
    }

    &__subtitle {
        text-decoration: underline;
    }

    &--inner {
        padding: 0 20px 20px;

        @media only screen and (min-width: 960px) {
            padding: 0 0 20px;
        }
    }
}

/deep/ .VueCarousel-inner {
    align-items: center;
}

/deep/ .VueCarousel-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    img {
        max-width: 100%;
        max-height: 100%;
    }
}

/deep/ .VueCarousel-dot-container {
    margin-top: 0 !important;
}
</style>
