<template>
    <div class="event">
        <h3 class="event__info">V našem fitness bez problémů můžete využít kartu MultiSport</h3>
        <h2 v-if="akce && akce.length && akce[0].item" class="event__title">
            Další připravované akce:
        </h2>
        <div v-if="akce && akce.length && akce[0].item">
            <div v-for="(item, i) in akce" :key="i">
                <h2>{{ item.item }}</h2>
                <nuxt-link v-if="item.link" :to="item.link">
                    <h3>{{ item.linkText }}</h3>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CurrentEvents',
    data() {
        return {
            akce: [
                { item: '3-5.4.2020 - Sportovní víkend Starý Svět' },
                { item: '29-31.5.2020 - Sportovní víkend Orea Resort Horizont Šumava' },
                { item: '22-29.6.2020 - Cvičení u moře – Chorvatsko Lanterna' },
            ]
        }
    },
}
</script>

<style lang="scss" scoped>
.event {
    &__info {
        margin: 16px 0;
    }

    &__title {
        text-decoration: underline;
        margin-bottom: 6px;
    }
}
</style>
