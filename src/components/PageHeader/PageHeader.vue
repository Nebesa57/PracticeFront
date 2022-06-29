<template>
    <div class="header">
        <div class="header__content">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <button type="button" class="nav-link" aria-current="page" @click="$router.push({name: 'Materials'})">Материалы</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" @click="$router.push({name: 'IndividualPlans'})">Индивидуальный план</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" @click="$router.push({name: 'Colleagues'})">Коллеги</button>
                </li>
                <div class="navbar-brand">
                    <img src="../../assets/logo.svg" alt="logo" width="130" height="58" />
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data() {
        return {
            msg: 'PageHeader',
        };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
    background-color: #198754;
    padding-top: 10px;
}
.header .nav {
    margin-left: 30px;
}
.header .nav-link {
    margin-left: 5px;
    color: #fff;
    font-size: 20px;
}
.header .nav-link button {
    color: #fff;
}
.header .nav-link:focus {
    background-color: #fff;
}
.header button:focus {
    color: #198754;
}
.header .navbar-brand {
    margin: 0px 50px 0px auto;
    padding-top: 0px;
}
</style>
