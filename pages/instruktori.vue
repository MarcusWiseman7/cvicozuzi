<template>
    <div class="page-container">
        <div
            v-for="(item, i) in instructors"
            :key="i"
            class="fg"
        >
            <div xs12 sm6 lg4>
                <!-- <img v-if="item.src" :src="require('~/assets/pics/' + item.src)" /> -->
            </div>
            <div class="info--text">
                <h1>{{ item.name }}</h1>
                <h3 v-if="item.sub">{{ item.sub }}</h3>
                <div>
                    <p v-for="(item, i) in item.zItems" :key="i">
                        {{ item.item }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            instructors: [
                {
                    src: '8341.jpg',
                    name: 'Zuzana Doudová',
                    sub: 'Dosažené vzdělání:',
                    zItems: [
                        { item: 'BodyART Instructor' },
                        { item: 'deepWORK Instructor' },
                        { item: 'Piloxing Instructor' },
                        { item: 'Zumba Basics' },
                        { item: 'Stretch Basic diplom' },
                        { item: 'Flexi-bar Basic' },
                        { item: 'Bosu Core diplom' },
                        { item: 'Spinning Clinic - lektorka spinningu JGSI' },
                        { item: 'Fitbox academy - licence Instruktor Basic' },
                        { item: 'kurz cvičitele aerobiku I. tř. (získání živnostenského oprávnění)' },
                        { item: 'kurz cvičitele aerobiku II. a III. tř. v Akademii cvičitelů a instruktorů' }
                    ],
                },
                {
                    src: 'katka.jpg',
                    name: 'Kateřina Kůrková "Kačka"',
                    zItems: [
                        { item: 'Power jóga, lektor jógy pro těhotné systémem A. Smékalové' },
                        { item: 'Workshopy:  Vinyasa, Prana Flow, asistence v ásánách' }
                    ],
                },
                {
                    name: 'Tomáš Klápa',
                    zItems: [
                        { item: 'Spinning' }
                    ],
                },
            ],
        }
    },
}
</script>

<style lang="scss" scoped>
p {
  color: #d5d5d5;
  font-size: 1.2rem;
  letter-spacing: .5px;
  line-height: 28px;
}
</style>
