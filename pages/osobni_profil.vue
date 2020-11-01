<template>
    <div class="profile">
        <img class="profile__img" :src="findPic('profile')" alt="Profile image" />

        <div class="profile__items">
            <h3>Něco málo o mě:</h3>
            <p>Vítejte na mých stránkách. Jsem instruktorkou DeepWORKu, BodyARTu, Spinningu, Bosu, Fitboxu a různých forem aerobního cvičení. Sportu se věnuji již řadu let, ale lektorkou jsem se stala v roce 2000 a od té doby pravidelně navštěvují různá školení a kongresy v Čechách i v zahraničí. Ráda se neustále vzdělávám, jedině tak mohu předat svým klientům to nejlepší. Poslední dobou se mou velkou láskou stal především deepWORK a silovější formy cvičení. Ráda se ale občas vrátím i ke klasickému dance aerobicu. Je pro mě moc důležité, aby se klienti při cvičení cítili fajn. Těší mě, když mohu být součástí jejich progresu a když mohu vidět, že z fitka odchází s úsměvem a dobrou náladou. To je tou největší odměnou. Pak vím, že má práce má smysl.</p>
            <h3>Osobní profil:</h3>
            <p>Narodila jsem se 26.5.1978 - ve znamení Blíženců. Aerobicu se věnuji cca od svých 16 let. Zaměřuji se na různé formy cvičení - dance aerobic, P-class, body-stylling, body-bar, step aerobic, dále fitbox a spinning.</p>
            <h3>Dosažené vzdělání:</h3>
            <p>* r. 2018 - BodyART Stretch</p>
            <p>* r. 2017 - BodyART Instructor</p>
            <p>* r. 2015 - deepWORK Instructor</p>
            <p>* r. 2013 - Piloxing Instructor</p>
            <p>* r. 2011 - Zumba Basics</p>
            <p>* r. 2010 - Stretch Basic diplom</p>
            <p>* r. 2009 - Flexi-bar Basic</p>
            <p>* r. 2007 - Bosu Core diplom</p>
            <p>* r. 2006 - Spinning Clinic - lektorka spinningu JGSI</p>
            <p>* r. 2006 - Fitbox academy - licence Instruktor Basic</p>
            <p>* r. 2002 - kurz cvičitele aerobiku I. tř. (získání živnostenského oprávnění)</p>
            <p>• r. 2000 - kurz cvičitele aerobiku II. a III. tř. v Akademii cvičitelů a instruktorů</p>
            <p>• pravidelné návštěvy seminářů a workshopů</p>
            <p>o deepWORK</p>
            <p>o bodyART</p>
            <p>o kickbox aerobik, fitbox</p>
            <p>o bodyform, body styling</p>
            <p>o dance aerobik</p>
            <p>o spinning - Heart rate training</p>
            <p>o step aerobik</p>
            <h3>Hobby:</h3>
            <p>in-liny, cyklistika, jogging, lyžování</p>
            <h3>Jaká jsem?</h3>
            <p>Optimistický nadšenec do všeho nového :-)</p>
            <p>Cvičení je pro mě aktivní forma relaxace - bez něj to zkrátka nejde!</p>
        </div>

        <div class="profile__yoga-pics">
            <img
                v-for="(pic, i) in findPics('profile_yoga')"
                :key="i"
                :src="pic"
                alt="Yoga form"
            />
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
.profile {
    &__img {
        max-width: 100%;
        margin-bottom: 40px;
    }

    &__yoga-pics {
        max-width: 100%;
        display: flex;
        justify-content: space-between;
        margin: 40px 0;

        img {
            width: 32%;
            height: auto;
        }
    }
}

h3 {
    text-decoration: underline;
    margin-top: 2.5rem;
    margin-bottom: 1.5rem;
    font-size: 1.75rem;
    letter-spacing: .5px;
}

p {
    font-size: 1.2rem;
    letter-spacing: .5px;
    line-height: 28px;
    margin-left: 20px;
}
</style>
