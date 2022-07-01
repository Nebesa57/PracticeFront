<template>
    <div class="header">
        <div class="header__content">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <button
                        type="button"
                        class="nav-link"
                        aria-current="page"
                        @click="$router.push({ name: 'Materials' })"
                    >
                        Материалы
                    </button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" @click="$router.push({ name: 'IndividualPlan' })">
                        Индивидуальный план
                    </button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" @click="$router.push({ name: 'Colleagues' })">Коллеги</button>
                </li>
                <div class="navbar-brand">
                    <img src="../../assets/logo.svg" alt="logo" width="130" height="58" />
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
import '@/styles/PageHeader/PageHeader.css';

export default {
    name: 'PageHeader',
    data() {
        return {
            msg: 'PageHeader',
        };
    },
};
</script>
