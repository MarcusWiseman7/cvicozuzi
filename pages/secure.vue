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
                @keypress.enter="tryLogin"
            />
        </z-input>

        <div :class="{ hide: !showPassword }">
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
                    @keypress.enter="tryLogin"
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
                @clicked="tryLogin"
            >Login</z-button>
        </div>
    </div>
</template>

<script>
import ZInput from '@/components/ZInput';
import ZButton from '@/components/ZButton';

export default {
    name: 'Secure',
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
            showPassword: false,
        }
    },
    computed: {
        formOK() {
            if (!this.showPassword) {
                return this.success.email;
            } else {
                return this.success.email && this.success.password;
            }
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
        showPasswordNow() {
            this.showPassword = true;
            this.contact.password = '';
            this.$refs.passwordInput.focus();
        },
        async tryLogin() {
            if (!this.success.password)
                return this.showPasswordNow();

            this.$store.commit('appLoading', true);

            try {
                let result = await this.$store.dispatch('login', {
                    username: this.contact.email,
                    password: this.contact.password,
                });

                if (result && result.statusCode > 0)
                    this.$router.replace('/admin');
                else
                    this.showPasswordNow();
            } finally {
                this.$store.commit('appLoading', false);
            }
        },
        sendForgotPasswordEmail() {
            if (this.success.email) {
                this.$store.dispatch('forgotPassword', this.contact.email);
                this.forgotPasswordPopup = false;
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