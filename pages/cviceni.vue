<template>
    <div class="exercise">
        <div class="exercise__container">
            <div
                v-for="(item, index) in items"
                :key="index"
                :id="item.id"
                class="exercise__item"
            >
                <h2 class="exercise__title">{{ item.title }}</h2>
                <p class="exercise__text">{{ item.info }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            items: [
                { id: 'spinning', title: 'DeepWORK', info: 'Jedná se o velmi intenzivní trénínk, při kterém budujeme nejen fyzickou zdatnost, vytrvalost a sílu, ale zároveň je zaměřený na naší duchovní sílu a vnitřní rovnováhu. Je inspirován fylozofií dálného východu a vždy respektuje rovnováhu mezi jin a jang. V průběhu hodiny projdete 5 základními elementy - země, dřevo, oheň, kov a voda. Používáme vždy jen vlastní váhu těla, lekce se cvičí naboso. Cvičení je určené pro všechny, kdo se rádi hýbou, milují výzvy a chtějí zlepšit svou fyzičku. Je určené pro muže i ženy, začátečníky i pokročilé.' },
                { id: 'bosu', title: 'Spinning', info: 'Je energeticky účinné cvičení. Lekce je vedena na stacionárních kolech, kdy za doprovodu motivační muziky a zkušeného lektora, užijete nejen skvělou atmosféru, ale hlavně odvedete účinný kardio-vaskulární trénink. Spinning vám nejen vytvaruje postavu, zlepší fyzickou kondici, ale určitě vás i skvěle odreaguje. Lekce je opět určena pro všechny věkové skupiny, začátečníky i pokročilé. Nezapomeňte vodu, ručník, na sebe ideálně oblečení jako na kolo.' },
                { id: '', title: 'Bosu cardio/body', info: 'Při lekci využijeme speciální balanční pomůcku bosu balance trainer, díky které je cvičení mnohem efektivnější - kromě běžných svalů zapojíme i vnitřní stabilizační systém (hluboké svaly). Cvičení je zaměřené na formování postavy, rozvoje síly, stability a zlepšení fyzické kondice.' },
                { id: 'powerjoga', title: 'Bosu slow', info: 'Jedná se o lekci body&mind, kdy v pomalém tempu zaposilujeme a zároveň protáhneme svaly celého těla, včetně našeho core (středu těla). Cvičení probíhá naboso s využitím balanční pomůcky bosu balance trainer.' },
                { id: '', title: 'Power jóga', info: 'Vychází z klasické jógy, avšak jednotlivé pozice se dynamicky střídají. Je zaměřená na posílení středu těla a práci hlubokého stabilizačního systému. Cvičení vede k posílení a protažení svalů celého těla, rozvíjí koordinaci, sílu, flexibilitu, zároveň se však naučíte správně a hluboce dýchat.' },
                { id: 'kruhovy', title: 'Pilates', info: 'Je cvičební systém, který je zaměřen na posílení svalů celého těla, zejména však hlubokých břišních a zádových svalů a svalů pánevního dna. Rozvíjí sílu, ohebnost, koordinaci a dýchání. Pravidelné cvičení pomáhá od bolesti zad a zlepšuje držení celého těla.' },
                { id: 'bodyart', title: 'Kruhový trénink', info: 'V průběhu lekce vystřídáte v pravidelných intervalech několik stanovišť, z nichž na každém jsou připraveny cviky na různé svalové skupiny (někdy s pomůckou, někdy jen s vlastní váhou). Efektivně tak procvičíte celé tělo, formujete postavu, rozvíjíte sílu a vytrvalost. Cvičení je vhodné pro muže i ženy.' },
                { id: '', title: 'BodyArt', info: 'Jedná se o lekci body&mind - pomalého cvičení, které spojuje východní fylozofii, prvky jógy a zdravotní fitness cvičení.  Základní pozice a sestavy z jógy jsou přizpůsobeny zdravotním omezením běžné klientely. BodyArt byl původně vyvinutý jako terapeutická metoda. Klade velký důraz na hluboké dýchání, je založen na principu jin a jang a 5 prvků z tradiční čínské medicíny. Pravidelné cvičení vede k odstranění svalových dysbalancí, rozvíjí sílu, flexibilitu a pomáhá k odbourávání stresu. Cvičí se naboso a je vhodné pro muže i ženy, začátečníky ale i aktivní sportovce.' },
                { id: '', title: 'Bodystyling', info: 'Po krátkém zahřátí následuje posilování svalů celého těla. Občas i s využitím cvičebních pomůcek jako bosu balance trainer, činek, gumiček, převážně však cvičíme jen s vlastní váhou těla. Lekce je zaměřená na rozvoj síly a formováí postavy.' },
                { id: '', title: 'Dance aerobic', info: 'Aerobní cvičení, ve kterém se postupně naučíme lehkou sestavu s využitím tanečních prvků. Perfektní pro odreagování, spálení kalorií a tvarování postavy zábavnou formou.' },
                { id: '', title: 'Fitbox', info: '​Intenzivní aerobní cvičební s využitím speciálních totemů. Prvky boxu jsou přizpůsobeny běžné klientele, zvládne skutečně každý. Při cvičení se nejen zapotíte, ale především odbouráte veškerý stres. Zároveň posilujete a formujete postavu. Vhodné pro muže i ženy, začátečníky i pokročilé.' }
            ],
        }
    },
}
</script>

<style lang="scss" scoped>
.exercise {
    &__item {
        color: #a9e976;
        border-bottom: 1px solid hsla(0,0%,100%,.12);
        padding-bottom: 24px;

        &:last-child {
            border-bottom: none;
        }
    }

    &__title {
        text-align: center;
        font-weight: normal; 
        font-size: 1.75rem;
        letter-spacing: 1.5px;
        margin: 24px 0;
    }

    &__text {
        line-height: 1.75;
        text-align: justify;
        font-size: 1.1rem;
        letter-spacing: .7px;
    }
}
</style>
