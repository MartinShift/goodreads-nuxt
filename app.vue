<script setup lang="ts">
import Navbar from './components/navbar.vue';
import ThemePanel from './components/ThemePanel.vue';
const router = useRouter()

const nav = [
  { label: 'index', to: '/' },
  { label: 'About', to: '/about' },
  { label: "authorDetails", to: "/authorDetails/:authorKey"},
]

</script>

<template>
  <Navbar></Navbar>
  <NuxtExample dir="routing/pages" :nav="nav" current-route>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtExample>
  <ThemePanel></ThemePanel>
</template>

<style>

@tailwind base;
@tailwind components;
@tailwind utilities;


.dark {
}

:root {
  --background-light: #ffffff;
  --text-light: #333333;
  --background-dark: #333333;
  --text-dark: #ffffff;
}

.dark {
  --background: var(--background-dark);
  --text: var(--text-dark);
}

.light {
  --background: var(--background-light);
  --text: var(--text-light);
}

body {
  background-color: var(--background);
  color: var(--text);
}

</style>
