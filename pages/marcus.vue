<template>

    <div class="marcus">

        <section class="marcus__section">

            <h2>Add new user</h2>

            <z-input label="Email" :error="errors.email" errorMsg="Please enter a valid email" :success="success.email">

                <input
                    type="email"
                    autocomplete="off"
                    maxlength="40"
                    v-model="contact.email"
                    @blur="checkError('email')"
                    @input="recheckError('email')"
                />

            </z-input>

            <div>

                <z-input
                    label="Password"
                    :error="errors.password"
                    errorMsg="Password must be at least 6 characters"
                    :success="success.password"
                >

                    <input
                        :type="passwordType ? 'password' : 'text'"
                        id="password"
                        autocomplete="off"
                        v-model="contact.password"
                        @input="recheckError('password')"
                        @blur="checkError('password')"
                        @keypress.enter="addUser"
                        ref="passwordInput"
                    />

                    <img
                        v-if="passwordType"
                        class="eye"
                        src="@/assets/icons/eye-closed.svg"
                        alt="Hide"
                        @click="passwordType = false"
                    />

                    <img v-else class="eye" src="@/assets/icons/eye.svg" alt="Show" @click="passwordType = true" />

                </z-input>

            </div>

            <div class="actions">

                <z-button size="large" modifier="solid" :disabled="!formOK" @clicked="addUser">Add user</z-button>

            </div>

        </section>

        <section v-if="allUsers && allUsers.length > 0" class="marcus__section">

            <h2>Manage users</h2>

            <ul>

                <li v-for="(user, i) in allUsers" :key="i" class="marcus__user">

                    <p>{{ user.email }}</p>

                    <img src="@/assets/icons/delete.svg" alt="delete" @click="askToDeleteUser(user)" />

                </li>

            </ul>

        </section>

        <z-popup v-if="deletePopup" @close="closeAskToDeleteUser">

            <div class="delete-popup">

                <h1>Delete user</h1>

                <p>{{ `Are you sure you want to delete ${userToDelete.email} from your website?` }}</p>

                <div class="delete-popup__actions">

                    <z-button modifier="outline" size="medium" @clicked="closeAskToDeleteUser">Cancel</z-button>

                    <z-button modifier="solid" size="medium" @clicked="deleteUser">Delete</z-button>

                </div>

            </div>

        </z-popup>

    </div>

</template>

<script>
import ZInput from '@/components/ZInput';
import ZButton from '@/components/ZButton';
import ZPopup from '@/components/ZPopup';
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'Marcus',
    layout: 'admin',
    middleware: 'auth',
    components: { ZInput, ZButton, ZPopup },
    data() {
        return {
            contact: {
                email: '',
                password: '',
            },
            regex: {
                email: /\S+@\S+\.\S+/,
                password: /^.{6,}$/,
            },
            errors: {
                email: false,
                password: false,
            },
            success: {
                email: false,
                password: false,
            },
            passwordType: true,
            deletePopup: false,
            userToDelete: null,
        };
    },
    computed: {
        ...mapState(['allUsers']),
        ...mapGetters(['marcus']),
        formOK() {
            return this.success.email && this.success.password;
        },
    },
    methods: {
        closeAskToDeleteUser() {
            this.userToDelete = null;
            this.deletePopup = false;
        },
        askToDeleteUser(user) {
            this.userToDelete = user;
            this.deletePopup = true;
        },
        deleteUser() {
            if (this.userToDelete) {
                this.$store.dispatch('deleteUser', this.userToDelete._id).then(() => {
                    this.closeAskToDeleteUser();
                });
            }
        },
        recheckError(err) {
            if (err == 'linkedin' || err == 'github') return;
            if (this.errors[err]) this.checkError(err);
            else this.checkSuccess(err);
        },
        checkError(err) {
            if (err == 'linkedin' || err == 'github') return;
            this.errors[err] = this.contact[err].match(this.regex[err]) === null;
            if (!this.errors[err]) this.checkSuccess(err);
        },
        checkSuccess(err) {
            this.success[err] = this.contact[err].match(this.regex[err]) !== null;
        },
        async addUser() {
            if (!this.formOK) return;

            this.$store.dispatch('addUser', {
                email: this.contact.email,
                password: this.contact.password,
            });
        },
    },
    mounted() {
        if (!this.marcus) this.$router.replace('/');
        else this.$store.dispatch('getAllUsers');
    },
};
</script>

<style lang="scss" scoped>
.marcus {
    width: 600px;
    max-width: calc(100vw - 40px);

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

    &__user {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;

        img {
            cursor: pointer;
        }

        &:hover {
            background-color: $shadow;
        }
    }
}

.eye {
    position: absolute;
    right: 12px;
    top: 10px;
}

.hide {
    overflow: hidden;
    height: 0;
}

.actions {
    @media only screen and (min-width: 800px) {
        margin-top: 40px;
    }
}

.delete-popup {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;

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

