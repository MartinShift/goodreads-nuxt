<template>
  <div class="mx-4 my-8">
    <h1 class="text-2xl font-bold mb-4">Search Authors</h1>
    <div class="flex mb-4">
      <div class="relative flex items-center">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <i class="pi pi-search"></i>
        </span>
        <input type="text" v-model="authorQuery" class="py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter author's name" @input="handleSearchInput">
      </div>
    </div>
    <div v-if="authors.length > 0">
      <h2 class="text-xl font-semibold mt-4">Search Results</h2>
      <ul class="list-none">
        <li v-for="author in authors" :key="author.key" class="mb-4">
          <h3 class="text-lg font-semibold">{{ author.name }}</h3>
          <p class="text-sm text-gray-600 mb-2">Works: {{ author.work_count }}</p>
          <NuxtLink class="bg-blue-500 text-white px-4 py-2 rounded-lg" :to="'/authors/'+author.key">View</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import authorService from '@/services/authorService';

export default {
  data() {
    return {
      authorQuery: '',
      authors: [],
      debounceTimeout: null,
    };
  },
  methods: {
    async searchAuthors() {
      if (!this.authorQuery.trim()) {
        this.authors = [];
        return;
      }
      try {
        const authors = await authorService.getAuthors(this.authorQuery);
        this.authors = authors;
      } catch (error) {
        console.error('Error searching authors:', error);
      }
    },
    handleSearchInput() {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.searchAuthors();
      }, 300); 
    },
  },
};
</script>

<style scoped>
</style>
