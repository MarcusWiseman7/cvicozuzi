<template>
<div class="admin">
    <div class="side-index">
        <ul v-if="true || allPages">
            <li v-for="(page, i) in fake" :key="i" @click="selectedPage = page">{{ page.title }}</li>
        </ul>
    </div>

    <div v-if="selectedPage" class="admin__main">
        <h1 v-if="selectedPage.title" class="admin--headline">{{ selectedPage.title }} CONTENT</h1>

        <section v-if="selectedPage.text" class="admin__section">
            <h2>Text</h2>
            <div v-for="(item, i) in selectedPage.text" :key="i">
                <z-input :label="item.which">
                    <input type="text" v-model="item.body" />
                </z-input>
            </div>
        </section>

        <section v-if="selectedPage.pics && selectedPage.pics.length > 0" class="admin__section">
            <h2>Images</h2>
            <div class="admin__pics">
                <div v-for="(pic, i) in selectedPage.pics" :key="i" class="admin__pics__pic">
                    <img :src="pic" height="100px" />
                    <img src="@/assets/icons/delete.svg" alt="Delete" @click="selectedPage.pics.slice(i, 1)" />
                </div>
            </div>
        </section>

        <div class="admin--actions">
            <z-button size="large" modifier="solid">Update page</z-button>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import ZInput from '@/components/ZInput';

export default {
    name: 'Admin',
    layout: 'admin',
    components: { ZInput },
    data() {
        return {
            selectedPage: null,
            fake: [
                { title: 'page 1', text: [{ body: 'skdjfhsdjghdjf', which: 'Header' }, { body: 'sdljfklsdjg', which: 'Paragraph' }], pics: [
                'https://res.cloudinary.com/dqrpaoopz/image/upload/v1602930149/zuzana/slideshow/013_dgnpew.jpg',
                'https://res.cloudinary.com/dqrpaoopz/image/upload/v1602930150/zuzana/slideshow/030_spuheg.jpg',
                'https://res.cloudinary.com/dqrpaoopz/image/upload/v1602930152/zuzana/slideshow/046_vtq1l5.jpg',
                'https://res.cloudinary.com/dqrpaoopz/image/upload/v1602930153/zuzana/slideshow/097_oofvy6.jpg',
                'https://res.cloudinary.com/dqrpaoopz/image/upload/v1602930151/zuzana/slideshow/111_jf7ocg.jpg',
                'https://res.cloudinary.com/dqrpaoopz/image/upload/v1602930154/zuzana/slideshow/8029_ls4pzw.jpg',
            ] },
                { title: 'page 2' },
                { title: 'page 3' },
                { title: 'page 4' },
                { title: 'page 5' },
            ],
        }
    },
    computed: {
        ...mapGetters(['allUsers', 'allPages']),
    },
    mounted() {
        this.$store.dispatch('getAllUsers');
        this.$store.dispatch('getAllPages');
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/SCSS/_variables';

.admin {
    width: 1000px;
    max-width: calc(100vw - 40px);
    height: 100%;

    &__main {
        height: 100%;
    }

    &--headline {
        text-align: center;
        margin-bottom: 60px;
    }

    &__section {
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        padding: 30px;

        h2 {
            text-align: center;
            margin-bottom: 30px;
        }
    }

    &__pics {
        display: flex;

        &__pic {
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 120px;
        }
    }

    &--actions {
        display: flex;
        justify-content: center;
        margin-top: 60px;
        
        button {
            width: 60%;
        }
    }
}

.side-index {
    position: fixed;
    left: 0;
    top: 60px;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    height: 100%;

    li {
        font-size: 22px;
        padding: 20px 30px;
        cursor: pointer;

        &:hover {
            background-color:  rgba(255, 255, 255, 0.2);
        }
    }
}
</style>