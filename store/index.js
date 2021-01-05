export const state = () => ({
    appLoading: false,
    aMessageObj: null,
    allUsers: null,
    allPages: null,
});

export const getters = {
    appLoading: state => state.appLoading,
    aMessage: state => state.aMessageObj,
    myId: state => (state.auth && state.auth.loggedIn ? state.auth.user._id : null),
    myProfile: state => (state.auth && state.auth.loggedIn ? state.auth.user : null),
    marcus: state => {
        return !!(
            state.auth &&
            state.auth.loggedIn &&
            state.auth.user &&
            state.auth.user.email == 'md.wiseman@hotmail.com'
        );
    },
    schedule: state => {
        if (!state.allPages) return null;
        const sch = state.allPages.find(x => x.title == 'schedule');
        if (sch) return sch.text;
        else return null;
    },
    exercise_items: state => {
        if (!state.allPages) return null;
        const items = state.allPages.find(x => x.title == 'exercise_items');
        if (items) return items.text;
        else return null;
    },
    current_events: state => {
        if (!state.allPages) return null;
        const events = state.allPages.find(x => x.title == 'events');
        if (events) return events.text;
        else return null;
    },
};

export const mutations = {
    appLoading(state, bool) {
        state.appLoading = bool;
    },
    setAMessage(state, params) {
        state.aMessageObj = params;
    },
    allUsers(state, users) {
        state.allUsers = users;
    },
    allPages(state, pages) {
        state.allPages = pages;
    },
};

export const actions = {
    async nuxtServerInit({ commit }, { app }) {
        await app.$axios
            .$get('/content/allPages')
            .then(res => {
                if (res && res.pages) {
                    commit('allPages', res.pages);
                }
            })
            .catch(err => {
                console.warn('Get pages error :>> ', err);
            })
            .finally(() => {
                return;
            });
    },
    getAllUsers({ commit }) {
        this.$axios
            .$get('/users/allUsers')
            .then(res => {
                if (res && res.users) {
                    commit('allUsers', res.users);
                }
            })
            .catch(err => {
                console.warn('Get users error :>> ', err);
            });
    },
    async getAllPages({ commit }) {
        return await this.$axios
            .$get('/content/allPages')
            .then(res => {
                if (res && res.pages) {
                    commit('allPages', res.pages);
                }
            })
            .catch(err => {
                console.warn('Get pages error :>> ', err);
            })
            .finally(() => {
                return;
            });
    },
    login({ commit, getters }, params) {
        if (getters.myId) return;
        commit('appLoading', true);

        return this.$auth
            .loginWith('local', {
                data: { username: params.username.toLowerCase(), password: params.password },
            })
            .then(() => {
                setTimeout(() => {
                    if (getters.myProfile)
                        commit('setAMessage', { message: `Welcome back, ${getters.myProfile.email}!` });
                }, 0);
            })
            .catch(err => {
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
            .catch(err => {
                console.warn('Logout error :>> ', err);
                commit('setAMessage', { message: 'Logout error, please try again', name: 'error' });
            })
            .finally(() => {
                commit('appLoading', false);
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
            .catch(err => {
                console.warn('Forgot password error :>> ', err);
                commit('setAMessage', { message: 'Forgot password error, please try again', name: 'error' });
            })
            .finally(() => {
                commit('appLoading', false);
            });
    },
    addUser({ commit }, params) {
        commit('appLoading', true);

        this.$axios
            .$post('/users/addNewUser', params)
            .then(res => {
                if (res.statusCode > 0) {
                    commit('setAMessage', { message: 'Added user', countdown: 6000 });
                } else {
                    console.warn('addUser error :>> ', err);
                    commit('setAMessage', { message: 'Add user error, please try again', name: 'error' });
                }
            })
            .catch(err => {
                console.warn('addUser error :>> ', err);
                commit('setAMessage', { message: 'Add user error, please try again', name: 'error' });
            })
            .finally(() => {
                commit('appLoading', false);
                return;
            });
    },
    async deleteUser({ commit, dispatch }, id) {
        commit('appLoading', true);

        return await this.$axios
            .$delete(`/users/deleteUser/${id}`)
            .then(() => {
                commit('setAMessage', { message: 'Deleted user', countdown: 6000 });
                dispatch('getAllUsers');
            })
            .catch(err => {
                console.warn('deleteUser error :>> ', err);
                commit('setAMessage', { message: 'Delete user error', name: 'error' });
            })
            .finally(() => {
                commit('appLoading', false);
                return;
            });
    },
    addToPage({ commit, dispatch }, params) {
        commit('appLoading', true);

        this.$axios
            .$patch(`/content/addToPage/${params.page}`, params.data)
            .then(async () => {
                await dispatch('getAllPages');
            })
            .catch(err => {
                console.warn('Add to page error :>> ', err);
                commit('setAMessage', { message: 'Add to page error', name: 'error' });
            })
            .finally(() => {
                commit('appLoading', false);
                return;
            });
    },
    async populateDBPages({ commit }) {
        let pages = [
            {
                title: 'header',
                text: [
                    {
                        which: 'title',
                        body: 'CVÍČO ZUZI',
                    },
                    {
                        which: 'quote',
                        body: '"Síla nepochází z fyzických schopností, ale z nezlomné vůle."',
                    },
                    {
                        which: 'who',
                        body: '​-Mahátma Gándhí',
                    },
                    {
                        which: 'button',
                        body: 'AKCE/AKTUALITY',
                    },
                ],
                media: [],
            },
            {
                title: 'index',
                text: [
                    {
                        which: 'quote',
                        body:
                            '"Myslím, že cvičení by mělo být formou aktivního odpočinku a tak se snažím, aby si každý z hodiny odnesl nejen dobrý pocit z toho, že pro sebe něco udělal, ale především se odprostil od běžných starostí a odcházel s úsměvem"',
                    },
                    {
                        which: 'email',
                        body: 'cvicovestec@gmail.com',
                    },
                    {
                        which: 'facebook',
                        body: 'https://www.facebook.com/profile.php?id=100009177529273',
                    },
                    {
                        which: 'headline',
                        body: 'Co se u nás děje?',
                    },
                ],
                media: [
                    {
                        which: 'zuzana',
                        pics: [
                            'https://res.cloudinary.com/dqrpaoopz/image/upload/v1602930176/zuzana/profile/zprofile_x9gut8.jpg',
                        ],
                    },
                ],
            },
            {
                title: 'aktuality',
                text: [
                    {
                        which: 'headline',
                        body: 'Co se u nás děje?',
                    },
                ],
                media: [
                    {
                        which: 'flyer',
                        pics: [
                            'https://res.cloudinary.com/dqrpaoopz/image/upload/v1604151141/zuzana/flyer/Move_Academy_Tour_Praha_2018-1_dzfznq.jpg',
                        ],
                    },
                    {
                        which: 'carousel',
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
            {
                title: 'rozpis_lekci',
                text: [
                    {
                        which: 'line1',
                        body: '*lekce může být nahrazena sobotní cvičební akcí',
                    },
                    {
                        which: 'line2',
                        body: 'v sekci "cvičení-Zuzi"',
                    },
                    {
                        which: 'phone',
                        body: '777 100 015',
                    },
                    {
                        which: 'email',
                        body: 'cvicozuzi@gmail.com',
                    },
                    {
                        which: 'line3',
                        body: 'Cena lekce: 120 Kč/55 min',
                    },
                    {
                        which: 'line4',
                        body: 'Cena permanentky: 1.000 Kč/10 lekcí',
                    },
                    {
                        which: 'line5',
                        body: 'Úterní lekce Bodystylingu probíhá v ZŠ Šeberov, ul. V Ladech 6, Šeberov',
                    },
                    {
                        which: 'line6',
                        body: '(vstup z boční strany budovy)',
                    },
                ],
                media: [],
            },
            {
                title: 'cviceni',
                text: [
                    {
                        which: 'DeepWORK',
                        body:
                            'Jedná se o velmi intenzivní trénínk, při kterém budujeme nejen fyzickou zdatnost, vytrvalost a sílu, ale zároveň je zaměřený na naší duchovní sílu a vnitřní rovnováhu. Je inspirován fylozofií dálného východu a vždy respektuje rovnováhu mezi jin a jang. V průběhu hodiny projdete 5 základními elementy - země, dřevo, oheň, kov a voda. Používáme vždy jen vlastní váhu těla, lekce se cvičí naboso. Cvičení je určené pro všechny, kdo se rádi hýbou, milují výzvy a chtějí zlepšit svou fyzičku. Je určené pro muže i ženy, začátečníky i pokročilé.',
                    },
                    {
                        which: 'Spinning',
                        body:
                            'Je energeticky účinné cvičení. Lekce je vedena na stacionárních kolech, kdy za doprovodu motivační muziky a zkušeného lektora, užijete nejen skvělou atmosféru, ale hlavně odvedete účinný kardio-vaskulární trénink. Spinning vám nejen vytvaruje postavu, zlepší fyzickou kondici, ale určitě vás i skvěle odreaguje. Lekce je opět určena pro všechny věkové skupiny, začátečníky i pokročilé. Nezapomeňte vodu, ručník, na sebe ideálně oblečení jako na kolo.',
                    },
                    {
                        which: 'Bosu cardio/body',
                        body:
                            'Při lekci využijeme speciální balanční pomůcku bosu balance trainer, díky které je cvičení mnohem efektivnější - kromě běžných svalů zapojíme i vnitřní stabilizační systém (hluboké svaly). Cvičení je zaměřené na formování postavy, rozvoje síly, stability a zlepšení fyzické kondice.',
                    },
                    {
                        which: 'Bosu slow',
                        body:
                            'Jedná se o lekci body&mind, kdy v pomalém tempu zaposilujeme a zároveň protáhneme svaly celého těla, včetně našeho core (středu těla). Cvičení probíhá naboso s využitím balanční pomůcky bosu balance trainer.',
                    },
                    {
                        which: 'Power jóga',
                        body:
                            'Vychází z klasické jógy, avšak jednotlivé pozice se dynamicky střídají. Je zaměřená na posílení středu těla a práci hlubokého stabilizačního systému. Cvičení vede k posílení a protažení svalů celého těla, rozvíjí koordinaci, sílu, flexibilitu, zároveň se však naučíte správně a hluboce dýchat.',
                    },
                    {
                        which: 'Pilates',
                        body:
                            'Je cvičební systém, který je zaměřen na posílení svalů celého těla, zejména však hlubokých břišních a zádových svalů a svalů pánevního dna. Rozvíjí sílu, ohebnost, koordinaci a dýchání. Pravidelné cvičení pomáhá od bolesti zad a zlepšuje držení celého těla.',
                    },
                    {
                        which: 'Kruhový trénink',
                        body:
                            'V průběhu lekce vystřídáte v pravidelných intervalech několik stanovišť, z nichž na každém jsou připraveny cviky na různé svalové skupiny (někdy s pomůckou, někdy jen s vlastní váhou). Efektivně tak procvičíte celé tělo, formujete postavu, rozvíjíte sílu a vytrvalost. Cvičení je vhodné pro muže i ženy.',
                    },
                    {
                        which: 'BodyArt',
                        body:
                            'Jedná se o lekci body&mind - pomalého cvičení, které spojuje východní fylozofii, prvky jógy a zdravotní fitness cvičení.  Základní pozice a sestavy z jógy jsou přizpůsobeny zdravotním omezením běžné klientely. BodyArt byl původně vyvinutý jako terapeutická metoda. Klade velký důraz na hluboké dýchání, je založen na principu jin a jang a 5 prvků z tradiční čínské medicíny. Pravidelné cvičení vede k odstranění svalových dysbalancí, rozvíjí sílu, flexibilitu a pomáhá k odbourávání stresu. Cvičí se naboso a je vhodné pro muže i ženy, začátečníky ale i aktivní sportovce.',
                    },
                    {
                        which: 'Bodystyling',
                        body:
                            'Po krátkém zahřátí následuje posilování svalů celého těla. Občas i s využitím cvičebních pomůcek jako bosu balance trainer, činek, gumiček, převážně však cvičíme jen s vlastní váhou těla. Lekce je zaměřená na rozvoj síly a formováí postavy.',
                    },
                    {
                        which: 'Dance aerobic',
                        body:
                            'Aerobní cvičení, ve kterém se postupně naučíme lehkou sestavu s využitím tanečních prvků. Perfektní pro odreagování, spálení kalorií a tvarování postavy zábavnou formou.',
                    },
                    {
                        which: 'Fitbox',
                        body:
                            'Intenzivní aerobní cvičební s využitím speciálních totemů. Prvky boxu jsou přizpůsobeny běžné klientele, zvládne skutečně každý. Při cvičení se nejen zapotíte, ale především odbouráte veškerý stres. Zároveň posilujete a formujete postavu. Vhodné pro muže i ženy, začátečníky i pokročilé.',
                    },
                ],
                media: [],
            },
            {
                title: 'osobni_profil',
                text: [
                    {
                        which: 'headline1',
                        body: 'Něco málo o mě:',
                    },
                    {
                        which: 'description',
                        body:
                            'Vítejte na mých stránkách.Jsem instruktorkou DeepWORKu, BodyARTu, Spinningu, Bosu, Fitboxu a různých forem aerobního cvičení.Sportu se věnuji již řadu let, ale lektorkou jsem se stala v roce 2000 a od té doby pravidelně navštěvují různá školení a kongresy v Čechách i v zahraničí.Ráda se neustále vzdělávám, jedině tak mohu předat svým klientům to nejlepší.Poslední dobou se mou velkou láskou stal především deepWORK a silovější formy cvičení.Ráda se ale občas vrátím i ke klasickému dance aerobicu.Je pro mě moc důležité, aby se klienti při cvičení cítili fajn.Těší mě, když mohu být součástí jejich progresu a když mohu vidět, že z fitka odchází s úsměvem a dobrou náladou.To je tou největší odměnou.Pak vím, že má práce má smysl.',
                    },
                    {
                        which: 'headline2',
                        body: 'Osobní profil:',
                    },
                    {
                        which: 'description2',
                        body:
                            'Narodila jsem se 26.5.1978 - ve znamení Blíženců. Aerobicu se věnuji cca od svých 16 let. Zaměřuji se na různé formy cvičení - dance aerobic, P-class, body-stylling, body-bar, step aerobic, dále fitbox a spinning.',
                    },
                    {
                        which: 'headline3',
                        body: 'Dosažené vzdělání:',
                    },
                    {
                        which: 'line1',
                        body: '• r. 2018 - BodyART Stretch',
                    },
                    {
                        which: 'line2',
                        body: '• r. 2017 - BodyART Instructor',
                    },
                    {
                        which: 'line3',
                        body: '• r. 2015 - deepWORK Instructor',
                    },
                    {
                        which: 'line4',
                        body: '• r. 2013 - Piloxing Instructor',
                    },
                    {
                        which: 'line5',
                        body: '• r. 2011 - Zumba Basics',
                    },
                    {
                        which: 'line6',
                        body: '• r. 2010 - Stretch Basic diplom',
                    },
                    {
                        which: 'line7',
                        body: '• r. 2009 - Flexi-bar Basic',
                    },
                    {
                        which: 'line8',
                        body: '• r. 2007 - Bosu Core diplom',
                    },
                    {
                        which: 'line9',
                        body: '• r. 2006 - Spinning Clinic - lektorka spinningu JGSI',
                    },
                    {
                        which: 'line10',
                        body: '• r. 2006 - Fitbox academy - licence Instruktor Basic',
                    },
                    {
                        which: 'line11',
                        body: '• r. 2002 - kurz cvičitele aerobiku I. tř. (získání živnostenského oprávnění)',
                    },
                    {
                        which: 'line12',
                        body: '• r. 2000 - kurz cvičitele aerobiku II. a III. tř. v Akademii cvičitelů a instruktorů',
                    },
                    {
                        which: 'line13',
                        body: '• pravidelné návštěvy seminářů a workshopů',
                    },
                    {
                        which: 'line14',
                        body: 'o deepWORK',
                    },
                    {
                        which: 'line15',
                        body: 'o bodyART',
                    },
                    {
                        which: 'line16',
                        body: 'o kickbox aerobik, fitbox',
                    },
                    {
                        which: 'line17',
                        body: 'o bodyform, body styling',
                    },
                    {
                        which: 'line18',
                        body: 'o dance aerobik',
                    },
                    {
                        which: 'line19',
                        body: 'o spinning - Heart rate training',
                    },
                    {
                        which: 'line20',
                        body: 'o step aerobik',
                    },
                    {
                        which: 'headline4',
                        body: 'Hobby:',
                    },
                    {
                        which: 'line21',
                        body: 'in-liny, cyklistika, jogging, lyžování',
                    },
                    {
                        which: 'headline5',
                        body: 'Jaká jsem?',
                    },
                    {
                        which: 'line22',
                        body: 'Optimistický nadšenec do všeho nového :-)',
                    },
                    {
                        which: 'line23',
                        body: 'Cvičení je pro mě aktivní forma relaxace - bez něj to zkrátka nejde!',
                    },
                ],
                media: [
                    {
                        which: 'profile',
                        pics: [
                            'https://res.cloudinary.com/dqrpaoopz/image/upload/v1602930177/zuzana/profile/profile_nyyw3n.jpg',
                        ],
                    },
                    {
                        which: 'profile_yoga',
                        pics: [
                            'https://res.cloudinary.com/dqrpaoopz/image/upload/v1602930179/zuzana/profile/8339_k66xbf.jpg',
                            'https://res.cloudinary.com/dqrpaoopz/image/upload/v1602930178/zuzana/profile/8344_uydm6w.jpg',
                            'https://res.cloudinary.com/dqrpaoopz/image/upload/v1602930174/zuzana/profile/8341_tgy6mb.jpg',
                        ],
                    },
                ],
            },
            {
                title: 'kontakt',
                text: [
                    {
                        which: 'phone',
                        body: '777 100 015',
                    },
                    {
                        which: 'email',
                        body: 'cvicozuzi@gmail.com',
                    },
                    {
                        which: 'reserve',
                        body: 'Spolupracujeme s Rodinným centrem Baráček:',
                    },
                    {
                        which: 'reserve_link',
                        body: 'www.rcbaracek.cz',
                    },
                    {
                        which: 'address1',
                        body: 'ZŠ',
                    },
                    {
                        which: 'address2',
                        body: 'Lidická 384, Dobříš',
                    },
                    {
                        which: 'facebook',
                        body: 'https://www.facebook.com/profile.php?id=100009177529273',
                    },
                ],
                media: [],
            },
            {
                title: 'schedule',
                text: [
                    {
                        which: 'header1',
                        body: '',
                    },
                    {
                        which: 'header2',
                        body: '7:15-8:15',
                    },
                    {
                        which: 'header3',
                        body: '18:30-19:45',
                    },
                    {
                        which: 'header4',
                        body: '19-19:55',
                    },
                    {
                        which: 'col1-row1',
                        body: 'PO',
                    },
                    {
                        which: 'col1-row2',
                        body: 'ÚT',
                    },
                    {
                        which: 'col1-row3',
                        body: 'ST',
                    },
                    {
                        which: 'col1-row4',
                        body: 'ČT',
                    },
                    {
                        which: 'col1-row5',
                        body: 'PÁ',
                    },
                    {
                        which: 'col1-row6',
                        body: 'SO',
                    },
                    {
                        which: 'col1-row7',
                        body: 'NE',
                    },
                    {
                        which: 'col2-row1',
                        body: '',
                    },
                    {
                        which: 'col2-row2',
                        body: 'DeepWORK Euforie Smíchov',
                    },
                    {
                        which: 'col2-row3',
                        body: 'BodyART uzavřená lekce',
                    },
                    {
                        which: 'col2-row4',
                        body: '',
                    },
                    {
                        which: 'col2-row5',
                        body: '',
                    },
                    {
                        which: 'col2-row6',
                        body: 'Speciální akce dle rozpisu',
                    },
                    {
                        which: 'col2-row7',
                        body: '',
                    },
                    {
                        which: 'col3-row1',
                        body: '',
                    },
                    {
                        which: 'col3-row2',
                        body: '',
                    },
                    {
                        which: 'col3-row3',
                        body: 'BodyART Esmarin Mníšek pod Brdy',
                    },
                    {
                        which: 'col3-row4',
                        body: '',
                    },
                    {
                        which: 'col3-row5',
                        body: '',
                    },
                    {
                        which: 'col3-row6',
                        body: '',
                    },
                    {
                        which: 'col3-row7',
                        body: '',
                    },
                    {
                        which: 'col4-row1',
                        body: 'BodyART Kanadská škola Osnice',
                    },
                    {
                        which: 'col4-row2',
                        body: '',
                    },
                    {
                        which: 'col4-row3',
                        body: '',
                    },
                    {
                        which: 'col4-row4',
                        body: '',
                    },
                    {
                        which: 'col4-row5',
                        body: '',
                    },
                    {
                        which: 'col4-row6',
                        body: '',
                    },
                    {
                        which: 'col4-row7',
                        body: '',
                    },
                ],
                media: [],
            },
            {
                title: 'exercise_items',
                text: [
                    {
                        which: 'BodyART',
                        body:
                            'Jedná se o lekci body&mind - pomalého cvičení, které spojuje východní fylozofii, prvky jógy a zdravotní fitness cvičení.  Základní pozice a sestavy z jógy jsou přizpůsobeny zdravotním omezením běžné klientely. BodyArt byl původně vyvinutý jako terapeutická metoda. Klade velký důraz na hluboké dýchání, je založen na principu jin a jang a 5 prvků z tradiční čínské medicíny. Pravidelné cvičení vede k odstranění svalových dysbalancí, rozvíjí sílu, flexibilitu a pomáhá k odbourávání stresu. Cvičí se naboso a je vhodné pro muže i ženy, začátečníky ale i aktivní sportovce.',
                    },
                    {
                        which: 'DeepWORK',
                        body:
                            'Jedná se o velmi intenzivní trénínk, při kterém budujeme nejen fyzickou zdatnost, vytrvalost a sílu, ale zároveň je zaměřený na naší duchovní sílu a vnitřní rovnováhu. Je inspirován fylozofií dálného východu a vždy respektuje rovnováhu mezi jin a jang. V průběhu hodiny projdete 5 základními elementy - země, dřevo, oheň, kov a voda. Používáme vždy jen vlastní váhu těla, lekce se cvičí naboso. Cvičení je určené pro všechny, kdo se rádi hýbou, milují výzvy a chtějí zlepšit svou fyzičku. Je určené pro muže i ženy, začátečníky i pokročilé.',
                    },
                    {
                        which: 'Spinning',
                        body:
                            'Je energeticky účinné cvičení. Lekce je vedena na stacionárních kolech, kdy za doprovodu motivační muziky a zkušeného lektora, užijete nejen skvělou atmosféru, ale hlavně odvedete účinný kardio-vaskulární trénink. Spinning vám nejen vytvaruje postavu, zlepší fyzickou kondici, ale určitě vás i skvěle odreaguje. Lekce je opět určena pro všechny věkové skupiny, začátečníky i pokročilé. Nezapomeňte vodu, ručník, na sebe ideálně oblečení jako na kolo.',
                    },
                    {
                        which: 'Power joga',
                        body:
                            'Vychází z klasické jógy, avšak jednotlivé pozice se dynamicky střídají. Je zaměřená na posílení středu těla a práci hlubokého stabilizačního systému. Cvičení vede k posílení a protažení svalů celého těla, rozvíjí koordinaci, sílu, flexibilitu, zároveň se však naučíte správně a hluboce dýchat.',
                    },
                    {
                        which: 'Bosu',
                        body:
                            'Při lekci využijeme speciální balanční pomůcku bosu balance trainer, díky které je cvičení mnohem efektivnější - kromě běžných svalů zapojíme i vnitřní stabilizační systém (hluboké svaly). Cvičení je zaměřené na formování postavy, rozvoje síly, stability a zlepšení fyzické kondice.',
                    },
                    {
                        which: 'Bodystyling',
                        body:
                            'Po krátkém zahřátí následuje posilování svalů celého těla. Občas i s využitím cvičebních pomůcek jako bosu balance trainer, činek, gumiček, převážně však cvičíme jen s vlastní váhou těla. Lekce je zaměřená na rozvoj síly a formováí postavy.',
                    },
                ],
                media: [],
            },
            {
                title: 'events',
                text: [
                    {
                        which: 'multisport',
                        body: 'V našem fitness bez problémů můžete využít kartu MultiSport',
                    },
                    {
                        which: 'title',
                        body: 'Další připravované akce:',
                    },
                    {
                        which: 'event1',
                        body: '3-5.4.2020 - Sportovní víkend Starý Svět',
                    },
                    {
                        which: 'event2',
                        body: '29-31.5.2020 - Sportovní víkend Orea Resort Horizont Šumava',
                    },
                    {
                        which: 'event3',
                        body: '22-29.6.2020 - Cvičení u moře – Chorvatsko Lanterna',
                    },
                    {
                        which: 'event4',
                        body: '',
                    },
                    {
                        which: 'event5',
                        body: '',
                    },
                ],
                media: [],
            },
        ];

        commit('appLoading', true);

        await pages.forEach(async p => {
            await this.$axios
                .$post('/content/addNewPage', { page: p })
                .then(() => {})
                .catch(err => {
                    console.log('err :>> ', err);
                });
        });

        commit('appLoading', false);
    },
    async updatePageText({ commit, dispatch }, params) {
        commit('appLoading', true);

        return await this.$axios
            .$patch('/content/updatePageText', params)
            .then(async () => {
                commit('setAMessage', { message: 'Updated text on page!', countdown: 6000 });
                await dispatch('getAllPages');
            })
            .catch(err => {
                console.warn('Update text error :>> ', err);
                commit('setAMessage', { message: 'Update text error, please try again', name: 'error' });
            })
            .finally(() => {
                commit('appLoading', false);
                return;
            });
    },
    async updatePagePics({ commit, dispatch }, c) {
        commit('appLoading', true);

        return await this.$axios
            .$patch('/content/updatePagePics', { c })
            .then(async () => {
                await dispatch('getAllPages');
            })
            .catch(err => {
                console.warn('Move pic error :>> ', err);
                commit('setAMessage', { message: 'Move pic error, please try again', name: 'error' });
            })
            .finally(() => {
                commit('appLoading', false);
                return;
            });
    },
    async addPicToPage({ commit, dispatch }, params) {
        commit('appLoading', true);

        return await this.$axios
            .$patch('/content/addPicToPage', params)
            .then(async () => {
                commit('setAMessage', { message: 'Added pic to page!', countdown: 6000 });
                await dispatch('getAllPages');
            })
            .catch(err => {
                console.warn('Delete pic error :>> ', err);
                commit('setAMessage', { message: 'Add pic to DB error, please try again', name: 'error' });
            })
            .finally(() => {
                commit('appLoading', false);
                return;
            });
    },
    async removePicFromPage({ commit, dispatch }, params) {
        commit('appLoading', true);

        return await this.$axios
            .$patch('/content/removePicFromPage', params)
            .then(async () => {
                commit('setAMessage', { message: 'Removed pic from page!', countdown: 6000 });
                await dispatch('getAllPages');
            })
            .catch(err => {
                console.warn('Delete pic error :>> ', err);
                commit('setAMessage', { message: 'Delete pic from DB error', name: 'error' });
            })
            .finally(() => {
                commit('appLoading', false);
                return;
            });
    },
    async deletePage({ commit, dispatch }, id) {
        commit('appLoading', true);

        return await this.$axios
            .$delete('content/deletePage/' + id)
            .then(async () => {
                commit('setAMessage', { message: 'Page removed' });
                await dispatch('getAllPages');
            })
            .catch(err => {
                console.warn('Delete page error :>> ', err);
                commit('setAMessage', { message: 'Delete page error', name: 'error' });
            })
            .finally(() => {
                commit('appLoading', false);
                return;
            });
    },
};
