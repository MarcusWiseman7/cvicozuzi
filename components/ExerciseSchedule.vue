<template>
    <table>
        <thead>
            <tr>
                <th v-for="(header, i) in headers" :key="i">
                    {{ header }}
                </th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(item, i) in items" :key="i">
                <td>{{ item.day }}</td>
                <td>{{ item.firstTime }}</td>
                <td>{{ item.secondTime }}</td>
                <td>{{ item.thirdTime }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'ExerciseSchedule',
    data() {
        return {
            headers: ['', '7:15-8:15', '18:30-19:45', '19-19:55'],
            items: [
                { day: 'PO', firstTime: '', secondTime: '', thirdTime: 'BodyART Kanadská škola Osnice' },
                { day: 'ÚT', firstTime: 'DeepWORK Euforie Smíchov', secondTime: '', thirdTime: '' },
                { day: 'ST', firstTime: 'BodyART uzavřená lekce', secondTime: '', thirdTime: '' },
                { day: 'ČT', firstTime: '', secondTime: 'BodyART Esmarin Mníšek pod Brdy ', thirdTime: '' },
                { day: 'PÁ', firstTime: '', secondTime: '', thirdTime: '' },
                { day: 'SO', firstTime: 'Speciální akce dle rozpisu', secondTime: '', thirdTime: '' },
                { day: 'NE', firstTime: '', secondTime: '', thirdTime: '' }
            ],
        }
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
    padding: 20px 0;
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
