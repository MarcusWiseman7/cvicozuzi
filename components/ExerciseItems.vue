<template>
    <div class="exercise-items">
        <div v-if="items" class="card-holder">
            <div
                v-for="(item, i) in items"
                :key="i"
                class="card--wrapper"
                @click="activeCard = { which: item.which, body: item.body }"
            >
                <div class="card">
                    <h2 class="card--title">{{ item.which }}</h2>
                </div>
            </div>
        </div>

        <div v-if="items1" class="card-holder">
            <div
                v-for="(item, i) in items1"
                :key="i"
                class="card--wrapper"
                @click="activeCard = { which: item.which, body: item.body }"
            >
                <div class="card">
                    <h2 class="card--title">{{ item.which }}</h2>
                </div>
            </div>
        </div>

        <z-popup v-if="activeCard" @close="activeCard = null">
            <h2>{{ activeCard.which }}</h2>
            <p>{{ activeCard.body }}</p>
        </z-popup>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ZPopup from '@/components/ZPopup';

export default {
    name: 'ExerciseItems',
    components: { ZPopup },
    data () {
        return {
            activeCard: null,
        }
    },
    computed: {
        ...mapGetters(['exercise_items']),
        items() {
            if (!this.exercise_items) return null;
            return this.exercise_items.slice(0, 3);
        },
        items1() {
            if (!this.exercise_items) return null;
            return this.exercise_items.slice(3, 6);
        },
    },
}
</script>

<style lang="scss" scoped>
.exercise-items {
    background-color: #303030;
    margin-bottom: 66px;
    padding: 40px 0;
}

.card-holder {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    @media screen and (min-width: 800px) {
        flex-direction: row;
    }
}

.card {
    // color: #fc1c7d;
    color: #fff;
    text-decoration: underline #fc1c7d;
    cursor: pointer;

    &--wrapper {
        position: relative;
        width: 100%;
    }
}

p { 
    font-size: 1.3rem;
    letter-spacing: .7px;
    text-align: justify;
    line-height: 1.7;
}

h2 {
    font-weight: normal;
    text-align: center;
    font-size: 1.5rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
}

@media screen and (min-width: 800px) {
    h2 {
        font-size: 2.5rem;
        padding: 2.5rem 0;
    }
}
</style>
