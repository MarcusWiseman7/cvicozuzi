<template>
    <div class="main">
        <!-- <section>
            <img class="main-img" :src="findPic('zuzana')" alt="Zuzana" />
            <div class="main__quote">
                <blockquote>{{ findText('quote') }}</blockquote>
                <div class="main__social">
                    <a
                        v-for="(item, i) in socialItems"
                        :key="i"
                        :href="(item.which == 'email' ? 'mailto:' : '') + findText(item.which)"
                    >
                        <img class="main__social-icon" :src="item.icon" alt="Social icon" />
                    </a>
                </div>
            </div>
        </section>
        <section>
            <div class="main__info">
                <h1>{{ findText('headline') }}</h1>
                <current-events></current-events>
            </div>
            <div class="main__schedule">
                <exercise-schedule></exercise-schedule>
            </div>
        </section>
        <exercise-items></exercise-items> -->
    </div>
</template>

<script>
import ExerciseItems from '@/components/ExerciseItems';
import CurrentEvents from '@/components/CurrentEvents';
import ExerciseSchedule from '@/components/ExerciseSchedule';
import helpers from '@/utils/helpers';

export default {
    layout: 'main',
    name: 'Home',
    mixins: [helpers],
    components: { ExerciseItems, CurrentEvents, ExerciseSchedule },
    data() {
        return {
            socialItems: [
                { which: 'facebook', icon: require('@/assets/icons/facebook.svg') },
                { which: 'email', icon: require('@/assets/icons/email.svg') },
            ],
        };
    },
    mounted() {
        // this.$store.dispatch('populateDBPages');
    },
};
</script>

<style lang="scss" scoped>
.main {
    section {
        display: flex;
        flex-direction: column;
        padding: 10px;
        width: 100%;

        .main-img {
            width: 100%;
            height: auto;
        }

        @media only screen and (min-width: 960px) {
            padding: 40px;
            flex-direction: row;

            .main-img {
                width: 45%;
            }
        }
    }

    &__quote {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    &__social {
        padding: 20px 0;
        display: flex;
        justify-content: center;

        img {
            margin: 0 20px;
        }
    }

    &__info {
        width: 100%;
        margin-bottom: 20px;

        @media only screen and (min-width: 960px) {
            margin-bottom: 0;
        }
    }

    &__schedule {
        width: 100%;
    }
}

blockquote {
    text-align: justify;
    text-justify: inner-word;
    font-size: 2rem;
    font-style: italic;
    font-weight: 200;
    letter-spacing: 0.5px;
    line-height: 2.25rem;
    padding: 10px;
}

@media screen and (min-width: 600px) {
    blockquote {
        font-size: 2.25rem;
        line-height: 2.5rem;
        padding: 0 40px;
    }
}

@media screen and (min-width: 1264px) {
    blockquote {
        font-size: 2.75rem;
        line-height: 3rem;
        padding: 0 80px;
    }
}
</style>
