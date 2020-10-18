<template>
    <div class="rozpis">
        <div class="rozpis--side">
            <exercise-schedule></exercise-schedule>
        </div>
        <div class="rozpis--side">
            <p>*lekce může být nahrazena sobotní cvičební akcí</p>
            <p> v sekci "cvičení-Zuzi"</p>
            <br>
            <p>mob: <a href="tel:+420777100015">777 100 015</a></p>
            <p>email: <a href="mailto:cvicozuzi@gmail.com">cvicozuzi@gmail.com</a></p>
            <br>
            <p>Cena lekce: 120 Kč/55 min</p>
            <p>Cena permanentky: 1.000 Kč/10 lekcí</p>
            <br>
            <p>Úterní lekce Bodystylingu probíhá v ZŠ Šeberov, ul. V Ladech 6, Šeberov</p>
            <p>(vstup z boční strany budovy)</p>
        </div>
    </div>
</template>

<script>
import ExerciseSchedule from '~/components/ExerciseSchedule';

export default {
    name: 'RozpisLekci',
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
