export const state = () => ({
    appLoading: false,
    aMessageObj: null,
    allUsers: null,
});

export const getters = {
    appLoading: state => state.appLoading,
    aMessage: state => state.aMessageObj,
    myId: state => state.auth && state.auth.loggedIn ? state.auth.user._id : null,
    myProfile: state => state.auth && state.auth.loggedIn ? state.auth.user : null,
    allUsers: state => state.allUsers,
};

export const mutations = {
    appLoading(state, bool) { state.appLoading = bool },
    setAMessage(state, params) { state.aMessageObj = params },
    allUsers(state, users) { state.allUsers = users },
};

export const actions = {
    getAllUsers({ commit }) {
        this.$axios
            .$get('/users/allUsers')
            .then((res) => {
                if (res && res.users) {
                    commit('allUsers', res.users);
                    commit('setAMessage', {
                        message: 'Users retrieved',
                        countdown: 6000,
                    });
                }
            })
            .catch((err) => {
                console.warn('Get users error :>> ', err);
                commit('setAMessage', { message: 'Get users error', name: 'error' });
            });
    },
    login({ commit, getters }, params) {
        if (getters.myId) return;
        commit('appLoading', true);

        return this.$auth
            .loginWith('local', {
                data: { username: params.username.toLowerCase(), password: params.password }
            })
            .then(() => {
                setTimeout(() => {
                    if (getters.myProfile)
                        commit('setAMessage', { message: `Welcome back, ${getters.myProfile.name}!` });
                }, 0);
            })
            .catch((err) => {
                console.warn('Login error :>> ', err);
                commit('setAMessage', { message: 'Login error, please try again', name: 'error' });
                return { statusCode: -1 };
            })
            .finally(() => {
                commit('appLoading', false);
            });
    },
    logout({ commit, getters }) {
        if (!getters.myId) return;
        commit('appLoading', true);

        this.$auth
            .logout({ data: { id: getters.myId } })
            .then(() => {
                commit('setAMessage', { message: 'Logged out, see you soon..' });
            })
            .catch((err) => {
                console.warn('Logout error :>> ', err);
                commit('setAMessage', { message: 'Logout error, please try again', name: 'error' });
            })
            .finally(() => {
                commit('appLoading', false);
            })
    },
    addUser({ commit }, params) {
        this.$axios
            .$post('/users/addNewUser', params)
            .then((res) => {
                if (res.statusCode > 0) {
                    commit('setAMessage', { message: 'Added user', countdown: 6000 });
                } else {
                    console.warn('addUser error :>> ', err);
                    commit('setAMessage', { message: 'Add user error, please try again', name: 'error' });
                }
            })
            .catch((err) => {
                console.warn('addUser error :>> ', err);
                commit('setAMessage', { message: 'Add user error, please try again', name: 'error' });
            })
            .finally(() => {
                return;
            });
    },
    forgotPassword({ commit, getters }, email) {
        if (getters.myId) return;
        commit('appLoading', true);

        this.$axios
            .$post('/users/forgotPassword', { email })
            .then(() => {
                commit('setAMessage', {
                    message: 'An email has been sent to you with instructions to reset your password',
                    countdown: 6000,
                });
            })
            .catch((err) => {
                console.warn('Forgot password error :>> ', err);
                commit('setAMessage', { message: 'Forgot password error, please try again', name: 'error' });
            })
            .finally(() => {
                commit('appLoading', false);
            });
    },
};
