<template>
    <div class="secure">
        <z-input
            label="Email"
            :error="errors.email"
            errorMsg="Please enter a valid email"
            :success="success.email"
        >
            <input
                type="email"
                autofocus
                autocomplete="username"
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
                    autocomplete="current-password"
                    v-model="contact.password"
                    @input="recheckError('password')"
                    @blur="checkError('password')"
                    @keypress.enter="addUser"
                    ref="passwordInput"
                />
                <img v-if="passwordType" class="eye" src="@/assets/icons/eye-closed.svg" alt="Hide" @click="passwordType = false" />
                <img v-else class="eye" src="@/assets/icons/eye.svg" alt="Show" @click="passwordType = true" />
            </z-input>
        </div>

        <div class="actions">
            <z-button
                size="large"
                modifier="solid"
                :disabled="!formOK"
                @clicked="addUser"
            >Add user</z-button>
        </div>
    </div>
</template>

<script>
import ZInput from '@/components/ZInput';
import ZButton from '@/components/ZButton';

export default {
    name: 'Marcus',
    layout: 'admin',
    components: { ZInput, ZButton },
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
        }
    },
    computed: {
        formOK() {
            return this.success.email && this.success.password;
        },
    },
    methods: {
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

            this.$store.commit('appLoading', true);

            try {
                await this.$store.dispatch('addUser', {
                    username: this.contact.email,
                    password: this.contact.password,
                });
            } finally {
                this.$store.commit('appLoading', false);
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.secure {
    width: 600px;
    max-width: calc(100vw - 40px);
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
</style>