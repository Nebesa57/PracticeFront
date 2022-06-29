<template>
    <div id="app">
        <page-header />
        <img src="./assets/logo.png" class="fas fa-users-class" />
        <button>кнопка</button>
        <router-view />
    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader/PageHeader.vue';

export default {
    name: 'App',
    components: {
        PageHeader,
    },
};
</script>

<style>
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
