<template>
    <div class="main">
        <section>
            <img
                class="main-img"
                src="https://res.cloudinary.com/dqrpaoopz/image/upload/v1602930176/zuzana/profile/zprofile_x9gut8.jpg"
                alt="Zuzana"
            />
            <div class="main__quote">
                <blockquote>"Myslím, že cvičení by mělo být formou aktivního odpočinku a tak se snažím, aby si každý z hodiny odnesl nejen dobrý pocit z toho, že pro sebe něco udělal, ale především se odprostil od běžných starostí a odcházel s úsměvem"</blockquote>
                <div class="main__social">
                    <a
                        v-for="(item, index) in socialItems"
                        :key="index"
                        :href="item.link"
                    >
                        <img class="main__social-icon" :src="item.icon" alt="Social icon" />
                    </a>
                </div>
            </div>
        </section>
        <section>
            <div>
                <h1>Co se u nás děje?</h1>
                <current-events></current-events>
            </div>
            <exercise-schedule></exercise-schedule>
        </section>
        <exercise-items></exercise-items>
    </div>
</template>

<script>
import ExerciseItems from '@/components/ExerciseItems'
import CurrentEvents from '@/components/CurrentEvents'
import ExerciseSchedule from '@/components/ExerciseSchedule'

export default {
    layout: 'landing',
    components: { ExerciseItems, CurrentEvents, ExerciseSchedule },
    data() {
        return {
            socialItems: [
                { link: 'https://www.facebook.com/profile.php?id=100009177529273', icon: require('@/assets/icons/facebook.svg') },
                { link: 'mailto:cvicovestec@gmail.com', icon: require('@/assets/icons/email.svg') },
            ],
        }
    },
}
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
