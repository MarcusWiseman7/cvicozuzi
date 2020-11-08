<template>
    <table>
        <thead v-if="headers">
            <tr>
                <th v-for="(header, i) in headers" :key="i">
                    {{ header }}
                </th>
            </tr>
        </thead>

        <tbody v-if="rows">
            <tr v-for="(row, i) in rows" :key="i">
                <td>{{ row.col1 }}</td>
                <td>{{ row.col2 }}</td>
                <td>{{ row.col3 }}</td>
                <td>{{ row.col4 }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'ExerciseSchedule',
    computed: {
        ...mapGetters(['schedule']),
        headers() {
            if (!this.schedule) return null;
            let h = []
            for (let i = 0; i < this.schedule.length; i++) {
                if (this.schedule[i].which.startsWith('header'))
                    h.push(this.schedule[i].body);
                else
                    break;
            }
            return h;
        },
        rows() {
            if (!this.schedule) return null;
            let items = [{}, {}, {}, {}, {}, {}, {}];

            this.schedule.forEach(o => {
                if (!o.which.startsWith('header')) {
                    items[parseInt(o.which.slice(-1) - 1)][o.which.slice(0, 4)] = o.body;
                }
            });
            return items;
        },
    },
}
</script>

<style lang="scss" scoped>
table {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

thead {
    background: rgba(0, 0, 0, 0.2);
}

th {
    padding: 30px 0;
    border-right: 1px solid rgba(0, 0, 0, 0.05);

    &:last-child {
        border-right: none;
    }
}

td {
    text-align: center;
    padding: 20px 10px;
    width: 30%;
    border-right: 1px solid rgba(0, 0, 0, 0.05);

    &:first-child {
        width: 10%;
    }

    &:last-child {
        border-right: none;
    }
}

tr {
    &:nth-child(2n) {
        background: rgba(0, 0, 0, 0.2);
    }
}
</style>
