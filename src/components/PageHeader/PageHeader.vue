<template>
    <div class="header">
        <div class="header__content">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <button
                        :class="{ activeBtn: nameButton === 'materials' }"
                        class="nav-link"
                        vs-value="materials"
                        type="button"
                        aria-current="page"
                        @click="
                            $router.push({ name: 'Materials' });
                            buttonClick($event, 'materials');
                        "
                    >
                        Материалы
                    </button>
                </li>
                <li class="nav-item">
                    <button
                        :class="{ activeBtn: nameButton === 'indivPlan' }"
                        class="nav-link"
                        vs-value="indivPlan"
                        @click="
                            $router.push({ name: 'IndividualPlan' });
                            buttonClick($event, 'indivPlan');
                        "
                    >
                        Индивидуальный план
                    </button>
                </li>
                <li class="nav-item">
                    <button
                        :class="{ activeBtn: nameButton === 'colleagues' }"
                        class="nav-link"
                        vs-value="colleagues"
                        @click="
                            $router.push({ name: 'Colleagues' });
                            buttonClick($event, 'colleagues');
                        "
                    >
                        Коллеги
                    </button>
                </li>
                <div class="navbar-brand">
                    <img src="../../assets/logo.svg" alt="logo" width="130" height="58" />
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
import '@/styles/pageHeader/PageHeader.css';

export default {
    name: 'PageHeader',
    data() {
        return {
            nameButton: '',
            msg: 'PageHeader',
        };
    },
    methods: {
        buttonClick(event, id) {
            this.nameButton = id;
        },
    },
};
</script>
