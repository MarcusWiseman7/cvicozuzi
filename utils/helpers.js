export default {
    methods: {
        findPic(which) {
            const page = this.$store.state.allPages.find(x => x.title == this.$route.name);
            if (!!(!page
                || !page.hasOwnProperty('media')
                || !page.media.find(x => x.which == which)
                || !page.media.find(x => x.which == which).hasOwnProperty('pics')
                || !page.media.find(x => x.which == which).pics[0]
            )) return '';

            return page.media.find(x => x.which == which).pics[0];
        },
        findPics(which) {
            const page = this.$store.state.allPages.find(x => x.title == this.$route.name);
            if (!!(!page
                || !page.hasOwnProperty('media')
                || !page.media.find(x => x.which == which)
                || !page.media.find(x => x.which == which).hasOwnProperty('pics')
            )) return '';

            return page.media.find(x => x.which == which).pics;
        },
        findText(which) {
            const page = this.$store.state.allPages.find(x => x.title == this.$route.name);
            if (!!(!page
                || !page.hasOwnProperty('text')
                || !page.text.find(x => x.which == which)
                || !page.text.find(x => x.which == which).hasOwnProperty('body')
            )) return '';

            return page.text.find(x => x.which == which).body;
        },
        findTexts() {
            const page = this.$store.state.allPages.find(x => x.title == this.$route.name);
            if (!!(!page
                || !page.hasOwnProperty('text')
            )) return '';

            return page.text;
        },
    },
}
