<template>
    <div class="profile">
        <img class="profile__img" :src="findPic('profile')" alt="Profile image" />

        <div class="profile__items">
            <component
                v-for="(item, i) in findTexts()"
                :key="i"
                :is="item.which.startsWith('headline') ? 'h3' : 'p'"
            >{{ item.body }}</component>
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
