<template>
    <div id="app">
        <page-header />
        <router-view />
    </div>
</template>

<script>
import PageHeader from '@/components/pageHeader/PageHeader.vue';

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
