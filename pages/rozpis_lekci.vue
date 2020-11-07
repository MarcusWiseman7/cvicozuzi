<template>
    <div class="rozpis">
        <div class="rozpis--side">
            <exercise-schedule></exercise-schedule>
        </div>
        <div class="rozpis--side">
            <p>{{ findText('line1') }}</p>
            <p>{{ findText('line2') }}</p>
            <br />
            <p>mob: <a :href="'tel:+420' + findText('phone').replace(' ', '')">{{ findText('phone') }}</a></p>
            <p>email: <a :href="'mailto:' + findText('email')">{{ findText('email') }}</a></p>
            <br />
            <p>{{ findText('line3') }}</p>
            <p>{{ findText('line4') }}</p>
            <br />
            <p>{{ findText('line5') }}</p>
            <p>{{ findText('line6') }}</p>
        </div>
    </div>
</template>

<script>
import helpers from '@/utils/helpers';
import ExerciseSchedule from '@/components/ExerciseSchedule';

export default {
    name: 'RozpisLekci',
    mixins: [helpers],
    components: { ExerciseSchedule },
}
</script>

<style lang="scss" scoped>
.rozpis {
    width: 100%;
    display: flex;
    flex-direction: column;

    @media only screen and (min-width: 960px) {
        flex-direction: row;
    }

    &--side {
        margin-bottom: 20px;

        @media only screen and (min-width: 960px) {
            width: 50%;
        }
    }
}

p {
    font-size: 1.2rem;
    letter-spacing: .5px;
    line-height: 28px;
    margin-left: 20px;
}
</style>
