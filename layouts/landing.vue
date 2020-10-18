<template>
    <div>
        <the-header :offsetTop="200"></the-header>
        <div class="hero"></div>
        <div class="info">
            <div class="info__title">CVÍČO ZUZI</div>
            <p class="info--quote">"Síla nepochází z fyzických schopností, ale z nezlomné vůle."</p>
            <p>​-Mahátma Gándhí</p>
            <nuxt-link class="btn" to="aktuality"><h2>AKCE/AKTUALITY</h2></nuxt-link>
        </div>
        <Nuxt />
        <the-footer></the-footer>
    </div>
</template>

<script>
import TheFooter from '@/components/TheFooter'
import TheHeader from '@/components/TheHeader'

export default {
  components: {
    TheFooter,
    TheHeader
  }
}
</script>

<style lang="scss" scoped>
.hero {
    height: 400px;
    max-height: 400px;
    margin-top: 60px;

    &::after {
        content: '';
        background-image: url('https://res.cloudinary.com/dqrpaoopz/image/upload/v1602930400/zuzana/hero1_ffuypg.jpg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        background-color: #999999;
        position: absolute;
        top: 60px;
        right: 0;
        left: 0;
        height: 400px;
        opacity: 0.2;
    }
}

.info {
    position: absolute;
    top: 60px;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #000;
    height: 400px;
    max-height: 400px;
    padding: 40px;

    &__title {
        font-size: 50px;
        font-weight: 700;
        line-height: 1.5;

        @media only screen and (min-width: 960px) {
            font-size: 75px;
        }
    }

    &--quote {
        font-style: italic;
        margin-top: 20px;
    }
}

.btn {
    padding: 10px 16px;
    border: 2px solid #fc1c7d;
    border-radius: 8px;
    margin-top: 40px;
}

p {
    font-weight: 600;
}
</style>
