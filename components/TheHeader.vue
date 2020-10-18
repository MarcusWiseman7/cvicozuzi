<template>
    <div>
        <transition name="slidefromleft">
            <div v-if="sideNav" class="side-nav" @click.stop="">
                <ul>
                    <li
                        v-for="(item, i) in menuItems"
                        :key="i"
                        class="side-nav__item"
                        @click="goLink(item.link)"
                    >
                        <span>{{ item.title }}</span>
                    </li>
                </ul>
            </div>
        </transition>
        
        <header :style="`height: ${mainbarHeight}px`">
            <div class="menu-btn" @click="openSideNav">MENU</div>
            <nuxt-link to="/">
                <h1>Zuzana Doudová</h1>
            </nuxt-link>
        </header>
    </div>
</template>

<script>
export default {
    name: 'TheHeader',
    data() {
        return {
            sideNav: false,
            menuItems: [
                { title: 'HOME', link: '/' },
                { title: 'AKTUALITY', link: '/aktuality' },
                { title: 'ROZPIS LEKCÍ', link: '/rozpis_lekci' },
                { title: 'CVIČENÍ', link: '/cviceni' },
                { title: 'OSOBNÍ PROFIL', link: '/osobni_profil' },
                // { title: 'INSTRUKTOŘI', link: '/instruktori' },
                { title: 'KONTAKT', link: '/kontakt' }
            ],
        }
    },
    props: {
        offsetTop: { type: Number, default: 0 },
    },
    computed: {
        mainbarHeight() {
            if (this.offsetTop <= 100) return 175;
            else return 60;
        }
    },
    methods: {
        openSideNav() {
            this.sideNav = true;
            setTimeout(() => {
                document.addEventListener('click', this.closeSideNav, false);
            }, 0);
        },
        closeSideNav() {
            this.sideNav = false;
            document.removeEventListener('click', this.closeSideNav);
        },
        goLink(link) {
            this.$router.push(link);
            this.closeSideNav();
        },
    },
}
</script>

<style lang="scss" scoped>
header {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: #fc1c7d;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    transition: all .3s ease;
    max-width: 100vw;
    z-index: 1;

    a {
        color: #fff;
    }
}

h1 {
    font-size: 1.75em;

    @media only screen and (min-width: 960px) {
        font-size: 2em;
    }
}

.menu-btn {
    position: absolute;
    left: 10px;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    font-size: 12px;

    @media only screen and (min-width: 960px) {
        font-size: 16px;
    }

    &:hover {
        background: hsla(0,0%,100%,.2);
    }
}

.side-nav {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 30;
    width: 300px;
    padding-top: 20px;
    background-color: #424242;
    box-shadow: 0 8px 10px -5px rgba(0,0,0,.2), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12);

    &__item {
        font-size: 14px;
        font-weight: 500;
        color: #fff;
        cursor: pointer;
        padding: 16px 20px;

        &:hover {
            background: hsla(0,0%,100%,.08);
        }
    }
}

.slidefromleft-enter-active {
    transition: all .3s ease;
}

.slidefromleft-leave-active {
    transition: all .5s ease;
}

.slidefromleft-enter,
.slidefromleft-leave-to {
    transform: translateX(-100%);
}
</style>
