<template>
    <div class="event">
        <h3 class="event__info">{{ infoline }}</h3>
        <h2 class="event__title">{{ title }}</h2>
        <div v-for="(event, i) in events" :key="i">
            <h2>{{ event.body }}</h2>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'CurrentEvents',
    computed: {
        ...mapGetters(['current_events']),
        events() {
            if (!this.current_events) return null;
            return this.current_events.filter(x => x.body && x.which.startsWith('event'));
        },
        title() {
            if (!this.current_events) return null;
            const t = this.current_events.find(x => x.which == 'title');
            if (t) return t.body;
            else return null;
        },
        infoline() {
            if (!this.current_events) return null;
            const t = this.current_events.find(x => x.which == 'multisport');
            if (t) return t.body;
            else return null;
        },
    },
}
</script>

<style lang="scss" scoped>
.event {
    &__info {
        margin: 16px 0;
    }

    &__title {
        text-decoration: underline;
        margin-bottom: 6px;
    }
}
</style>
