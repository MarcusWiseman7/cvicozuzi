<template>
<div class="admin">
    <div class="side-index">
        <ul v-if="true || allPages">
            <li
                v-for="(page, i) in fake"
                :key="i"
                :class="{ 'side-index--active': selectedPage == page }"
                @click="selectedPage = page"
            >{{ page.title }}</li>
        </ul>
    </div>

    <div v-if="selectedPage" class="admin__main">
        <h1 v-if="selectedPage.title" class="admin--headline">{{ selectedPage.title }}</h1>

        <section v-if="selectedPage.text" class="admin__section">
            <h2>Text</h2>
            <div v-for="(item, i) in selectedPage.text" :key="i">
                <z-input :label="item.which">
                    <input type="text" v-model="item.body" />
                </z-input>
            </div>
        </section>

        <section v-if="selectedPage.media && selectedPage.media.length > 0" class="admin__section">
            <h2>Images</h2>
            <div class="admin__pics-container" v-for="(container, i) in selectedPage.media" :key="i">
                <h4>{{ container.which }}</h4>
                <div class="admin__pics">
                    <div
                        v-for="(pic, j) in container.pics"
                        :key="j"
                        class="admin__pics__pic"
                        @click="askToDeletePic(i, pic, j)"
                    >
                        <img :src="pic" height="100px" />
                    </div>
                    <label class="admin__pics__add" for="input-add-pic" @click="picToAddContainer = i">
                        <img src="@/assets/icons/add-pic.svg" alt="Add" />
                    </label>
                </div>
            </div>
        </section>

        <div class="admin--actions">
            <z-button size="large" modifier="solid">Update page</z-button>
        </div>
    </div>

    <z-popup v-if="askToDeletePopup" @close="closeAskToDeletePic">
        <div class="delete-popup">
            <img :src="picToDeleteSrc" alt="Pic to delete" />
            <h1>Delete pic</h1>
            <p>Are you sure you want to delete this pic from your website?</p>
            <div class="delete-popup__actions">
                <z-button modifier="outline" size="medium" @clicked="closeAskToDeletePic">Cancel</z-button>
                <z-button modifier="solid" size="medium" @clicked="realDeletePic">Delete</z-button>
            </div>
        </div>
    </z-popup>

    <input type="file" id="input-add-pic" accept="image" @change="addPic" />
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import ZInput from '@/components/ZInput';
import ZPopup from '@/components/ZPopup';
import ZButton from '@/components/ZButton';

export default {
    name: 'Admin',
    layout: 'admin',
    components: { ZInput, ZPopup, ZButton },
    data() {
        return {
            selectedPage: null,
            uploadedFile: null,
            picToAddContainer: null,
            picToDelete: null,
            picToDeleteSrc: null,
            picToDeleteContainer: null,
            askToDeletePopup: false,
            fake: [
                { 
                    title: 'page 1',
                    text: [
                        { body: 'skdjfhsdjghdjf', which: 'Header' },
                        { body: 'sdljfklsdjg', which: 'Paragraph' }
                    ],
                    media: [
                        {
                            which: 'Flyer',
                            pics: [
                                'https://res.cloudinary.com/dqrpaoopz/image/upload/v1604151141/zuzana/flyer/Move_Academy_Tour_Praha_2018-1_dzfznq.jpg'
                            ],
                        },
                        {
                            which: 'Carousel',
                            pics: [
                                'https://res.cloudinary.com/dqrpaoopz/image/upload/v1602930149/zuzana/slideshow/013_dgnpew.jpg',
                                'https://res.cloudinary.com/dqrpaoopz/image/upload/v1602930150/zuzana/slideshow/030_spuheg.jpg',
                                'https://res.cloudinary.com/dqrpaoopz/image/upload/v1602930152/zuzana/slideshow/046_vtq1l5.jpg',
                                'https://res.cloudinary.com/dqrpaoopz/image/upload/v1602930153/zuzana/slideshow/097_oofvy6.jpg',
                                'https://res.cloudinary.com/dqrpaoopz/image/upload/v1602930151/zuzana/slideshow/111_jf7ocg.jpg',
                                'https://res.cloudinary.com/dqrpaoopz/image/upload/v1602930154/zuzana/slideshow/8029_ls4pzw.jpg',
                            ],
                        },
                    ],
                },
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
    methods: {
        async addPic() {
            if (event.target.files.length == 1)
                this.uploadedFile = event.target.files[0];
            event.target.value = ''; // Allow upload of same file after cancel

            // add file to cloudinary
            let pic = await 


            this.$store.dispatch('addPicToDB', {
                title: this.selectedPage.title,
                which: 'media[' + this.picToAddContainer + ']',
                pic,
            });
        },
        askToDeletePic(i, pic, j) {
            this.picToDelete = j;
            this.picToDeleteSrc = pic;
            this.picToDeleteContainer = i;
            this.askToDeletePopup = true;
        },
        closeAskToDeletePic() {
            this.askToDeletePopup = false;
            this.picToDelete = null;
            this.picToDeleteSrc = null;
            this.picToDeleteContainer = null;
        },
        async realDeletePic() {
            let response = await this.$store.dispatch('removePicFromDB', {
                title: this.selectedPage.title,
                pic: 'media[' + this.picToDeleteContainer + '].pics[' + this.picToDelete + ']',
            });

            // remove pic from cloudinary
            
            this.$store.dispatch('getAllPages');
            this.closeAskToDeletePic();
        },
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
        border: 2px solid $shadow;
        box-shadow: 0 0 10px $shadow;
        border-radius: 8px;
        padding: 30px;
        margin-bottom: 100px;

        &:last-child {
            margin-bottom: 0;
        }

        h2 {
            text-align: center;
            margin-bottom: 30px;
        }

        h4 {
            color: $maincolorlight;
            margin-bottom: 6px;
        }
    }

    &__pics {
        display: flex;
        flex-wrap: wrap;

        &__pic {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0 20px 20px 0;
            box-shadow: 0 0 6px $shadow;
            cursor: pointer;

            img {
                height: 160px;
            }

            &:hover {
                background-image: url('../assets/icons/delete.svg');
                background-repeat: no-repeat;
                background-position: center;
                box-shadow: 0 0 8px $maincolorlight;

                img {
                    opacity: 0.2;
                }
            }
        }

        &__add {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 20px 20px 0;
            box-shadow: 0 0 6px $shadow;
            width: 160px;
            height: 160px;
            cursor: pointer;

            img {
                height: 36px;
            }

            &:hover {
                background-color: scale-color($color: $bgcolor, $lightness: 5%, $alpha: 1.0);
            }
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
    border-right: 1px solid $shadow;
    height: 100%;

    li {
        font-size: 22px;
        padding: 30px 60px;
        cursor: pointer;

        &:hover {
            background-color:  $shadow;
        }
    }

    &--active {
        background-color:  $shadow;
    }
}

.delete-popup {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        max-width: 200px;
        max-height: 200px;
        margin: 30px 0;
    }

    p {
        margin: 10px 0 40px 0;
    }

    &__actions {
        display: flex;
        
        button {
            margin: 0 20px;
        }
    }
}
</style>