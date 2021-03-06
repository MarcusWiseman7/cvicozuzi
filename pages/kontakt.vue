<template>
    <div class="contact">
        <div class="contact--inner">
            <div class="contact--info">
                <h1>Kontakt</h1>
            
                <h2>Zuzana Doudová</h2>
                <p>mob: <a :href="'tel:+420' + phone.replace(' ', '')">{{ phone }}</a></p>
                <p>
                    e-mail:
                    <a :href="'mailto:' + email">{{ email }}</a>
                </p>
                <p>
                    {{ findText('reserve') }}
                    <a :href="'http://' + reserveLink">{{ reserveLink }}</a>
                </p>
            
                <a
                    v-for="(item, i) in socialItems"
                    :key="i"
                    :href="(item.which == 'email' ? 'mailto:' : '') + findText(item.which)"
                >
                    <img :src="item.icon" alt="Social icon" />
                </a>
            
                <p>{{ findText('address1') }}</p>
                <p>{{ findText('address2') }}</p>
            </div>
            
            <div id="mapa" class="gmap"></div>
        </div>     
    </div>
</template>

<script>
import helpers from '@/utils/helpers';

export default {
    name: "Kontakt",
    mixins: [helpers],
    head() {
        return {
            script: [
               { src: "https://api.mapy.cz/loader.js" }, 
            ],
        }
    },
    data() {
        return {
            socialItems: [
                { which: 'facebook', icon: require('@/assets/icons/facebook.svg') },
                { which: 'email', icon: require('@/assets/icons/email.svg') },
            ],
        };
    },
    computed: {
        email() {
            return this.findText('email');
        },
        phone() {
            return this.findText('phone');
        },
        reserveLink() {
            return this.findText('reserve_link');
        },
    },
    mounted() {
        this.initLoader();
    },
    methods: {
        initMap() {
            let center = SMap.Coords.fromWGS84(14.1751418523, 49.7836911871);
            let mapa = new SMap(JAK.gel("mapa"), center, 16);
            mapa.addDefaultLayer(SMap.DEF_SMART_BASE).enable();
            mapa.addDefaultControls();

            var layer = new SMap.Layer.Marker();
            mapa.addLayer(layer).enable();

            var options = {};
            var marker = new SMap.Marker(center, "myMarker", options);
            layer.addMarker(marker);
        },
        initLoader() {
            try {
                Loader.async = true;
                Loader.load(null, null, this.initMap);
            } catch (err) {
                setTimeout(() => {
                    this.initLoader();
                }, 100);
            }
        },
    }
};
</script>

<style lang="scss" scoped>
.gmap {
    margin: 20px 0;
    height: 300px;

    @media only screen and (min-width: 960px) {
        height: 500px;
    }

    @media only screen and (min-width: 1264px) {
        height: 600px;
    }
}

.contact {
    position: fixed;
    top: 175px;
    right: 0;
    bottom: 60px;
    left: 0;
    padding-bottom: 80px;
    background-color: #fff;
    color: #000;
    font-weight: 700;
    display: flex;
    justify-content: center;
    user-select: none;
    overflow-x: hidden;

    &::after {
        content: '';
        background-image: url('https://res.cloudinary.com/dqrpaoopz/image/upload/v1602930210/zuzana/instructors_s1nvti.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        opacity: 0.6;
        top: 0;
        left: 0;
        bottom: -140px;
        right: 0;
        position: absolute;
        z-index: -1;

        @media only screen and (min-width: 960px) {
            bottom: 0;
        }
    }

    &--inner {
        padding: 40px 24px 80px 24px;
        max-width: 100vw;

        @media only screen and (min-width: 960px) {
            min-width: 700px;
            max-width: 900px;
        }

        @media only screen and (min-width: 1264px) {
            max-width: 1185px;
        }
    }

    &--info {
        background-color: rgba(255, 255, 255, 0.9);
        padding: 20px;
        line-height: 1.75;
    }
}
</style>
