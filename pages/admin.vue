<template>
    <div class="admin">
        <transition name="slide">
            <div v-if="showSideIndex" class="side-index">
                <ul v-if="allPages && allPages.length > 0">
                    <li
                        v-for="(page, i) in allPages"
                        :key="i"
                        :class="{ 'side-index--active': selectedPage == page }"
                        @click="selectPage(page)"
                    >
                        {{ page.title.replace('_', ' ') }}
                    </li>
                </ul>
            </div>
        </transition>
        <div class="open-icon" :class="{ 'open-icon--closed': !showSideIndex }" @click="showSideIndex = !showSideIndex">
            <img src="@/assets/icons/open.svg" alt="Open" />
        </div>

        <div v-if="selectedPage" class="admin__main">
            <h1 v-if="selectedPage.title" class="admin--headline">{{ selectedPage.title.replace('_', ' ') }}</h1>

            <section v-if="selectedPage.media && selectedPage.media.length > 0" class="admin__section">
                <h2>Images</h2>
                <div class="admin__pics-container" v-for="(container, i) in selectedPage.media" :key="i">
                    <h4>{{ container.which }}</h4>
                    <div class="admin__pics">
                        <draggable :list="container.pics" @end="onDrag(container)" class="admin__pics">
                            <div
                                v-for="(pic, j) in container.pics"
                                :key="j"
                                class="admin__pics__pic"
                                @click="askToDeletePic({ mediaId: container._id, picURL: pic })"
                            >
                                <img :src="pic" height="100px" />
                            </div>
                        </draggable>
                        <label class="admin__pics__add" for="input-add-pic" @click="picToAddMediaId = container._id">
                            <img src="@/assets/icons/add-pic.svg" alt="Add" />
                        </label>
                    </div>
                    <z-button v-if="marcus" size="medium" modifier="solid" @clicked="emptyMedia(container._id)"
                        >Empty media</z-button
                    >
                </div>
            </section>

            <section v-if="selectedPage.text" class="admin__section">
                <h2>Text</h2>
                <div v-for="(item, i) in selectedPage.text" :key="i">
                    <z-input :label="item.which">
                        <input type="text" placeholder="Add text..." v-model="item.body" />
                    </z-input>
                </div>
                <div class="admin--actions">
                    <z-button size="medium" modifier="solid" @clicked="updatePageText">Update text</z-button>
                </div>
            </section>

            <section v-if="marcus && selectedPage._id" class="admin__section">
                <h2>Add new text section</h2>
                <div class="admin__new-text">
                    <z-input label="Which">
                        <input type="text" placeholder="Add description..." v-model="newTextWhich" />
                    </z-input>
                    <z-input label="Text">
                        <input type="text" placeholder="Add text..." v-model="newTextBody" />
                    </z-input>
                </div>
                <div class="admin--actions">
                    <z-button size="medium" modifier="solid" @clicked="addPageText">Add text</z-button>
                </div>
            </section>

            <z-button v-if="marcus && selectedPage._id" size="medium" modifier="solid" @clicked="deletePage"
                >Delete page</z-button
            >
            <z-button
                v-if="marcus && (!allPages || !allPages.length > 0)"
                size="medium"
                modifier="solid"
                @clicked="populateAllPages"
                >Populate pages</z-button
            >
            <z-button
                v-if="marcus && allPages && allPages.length > 0"
                size="medium"
                modifier="solid"
                @clicked="deleteAllPages"
                >Delete all pages</z-button
            >
        </div>

        <z-popup v-if="askToDeletePopup" @close="closeAskToDeletePic">
            <div class="delete-popup">
                <img :src="picToDeleteURL" alt="Pic to delete" />
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
import { mapState, mapGetters } from 'vuex';
import ZInput from '@/components/ZInput';
import ZPopup from '@/components/ZPopup';
import ZButton from '@/components/ZButton';
import draggable from 'vuedraggable';

export default {
    name: 'Admin',
    layout: 'admin',
    middleware: 'auth',
    components: { ZInput, ZPopup, ZButton, draggable },
    data() {
        return {
            selectedPage: null,
            uploadedFile: null,
            picToAddMediaId: null,
            picToDeleteURL: null,
            picToDeleteMediaId: null,
            askToDeletePopup: false,
            newTextWhich: '',
            newTextBody: '',
            showSideIndex: false,
        };
    },
    computed: {
        ...mapState(['allPages']),
        ...mapGetters(['myId', 'myProfile', 'marcus']),
    },
    methods: {
        emptyMedia(mediaId) {
            this.$store.dispatch('emptyAllMediaFromSection', mediaId);
        },
        selectPage(page) {
            this.selectedPage = null;
            this.selectedPage = JSON.parse(JSON.stringify(page));
            this.showSideIndex = false;
        },
        reselectPage() {
            setTimeout(() => {
                const id = this.selectedPage._id;
                const page = this.allPages.find(x => x._id == id);
                this.selectedPage = JSON.parse(JSON.stringify(page));
            }, 100);
        },
        addPageText() {
            this.$store
                .dispatch('addToPage', {
                    data: {
                        text: { which: this.newTextWhich, body: this.newTextBody },
                    },
                    page: this.selectedPage.title,
                })
                .then(() => {
                    this.newTextWhich = '';
                    this.newTextBody = '';
                    this.reselectPage();
                });
        },
        updatePageText() {
            this.$store
                .dispatch('updatePageText', {
                    id: this.selectedPage._id,
                    text: this.selectedPage.text,
                })
                .then(() => {
                    this.reselectPage();
                });
        },
        onDrag(c) {
            this.$store.dispatch('updatePagePics', c);
        },
        async addPic() {
            if (event.target.files.length == 1) this.uploadedFile = event.target.files[0];
            event.target.value = ''; // Allow upload of same file after cancel

            // add file to cloudinary
            const formData = new FormData();
            formData.append('file', this.uploadedFile);
            formData.append('upload_preset', 'u9rrbz3a');

            const blah = this.$axios.defaults.headers.common['Authorization'];
            this.$axios.setToken(false);

            let picURL;

            await this.$axios
                .post('https://api.cloudinary.com/v1_1/dqrpaoopz/image/upload', formData)
                .then(res => {
                    picURL = res.data.secure_url;
                })
                .catch(err => {
                    console.warn('Error in picURL :>> ', err);
                })
                .finally(() => {
                    if (blah) this.$axios.setToken(blah);
                });

            if (!picURL) return;

            // add pic URL to DB
            this.$store
                .dispatch('addPicToPage', {
                    mediaId: this.picToAddMediaId,
                    picURL,
                })
                .then(() => {
                    this.reselectPage();
                });
        },
        askToDeletePic(params) {
            this.picToDeleteURL = params.picURL;
            this.picToDeleteMediaId = params.mediaId;
            this.askToDeletePopup = true;
        },
        closeAskToDeletePic() {
            this.askToDeletePopup = false;
            this.picToDeleteURL = null;
            this.picToDeleteMediaId = null;
        },
        async realDeletePic() {
            await this.$store
                .dispatch('removePicFromPage', {
                    mediaId: this.picToDeleteMediaId,
                    picURL: this.picToDeleteURL,
                })
                .then(() => {
                    this.reselectPage();
                });
            this.closeAskToDeletePic();
        },
        deletePage() {
            this.$store.dispatch('deletePage', this.selectedPage._id).then(() => {
                this.reselectPage();
            });
        },
        deleteAllPages() {
            this.allPages.forEach(async x => {
                await this.$store.dispatch('deletePage', x._id);
            });
        },
        populateAllPages() {
            this.$store.dispatch('populateDBPages');
        },
    },
};
</script>

<style lang="scss" scoped>
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
        text-transform: capitalize;
        font-weight: 600;
        font-size: 46px;
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
                background-color: scale-color($color: $bgcolor, $lightness: 5%, $alpha: 1);
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
.open-icon {
    position: absolute;
    top: 60px;
    left: 270px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.5s;

    &--closed {
        left: 0;
        transform: rotate(180deg);
    }
}

.side-index {
    position: fixed;
    left: 0;
    top: 60px;
    bottom: 67px;
    border-right: 1px solid $shadow;
    background-color: $bgcolor;
    z-index: 3;
    overflow-y: auto;

    li {
        font-size: 22px;
        padding: 30px 60px;
        cursor: pointer;
        text-transform: capitalize;

        &:hover {
            background-color: $shadow;
        }
    }

    &--active {
        background-color: $shadow;
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

.slide-enter-active,
.slide-leave-active {
    transition: all 0.5s;
}

.slide-enter,
.slide-leave-to {
    transform: translateX(-100%);
}
</style>
