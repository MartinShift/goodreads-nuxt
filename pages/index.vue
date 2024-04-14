<template>
    <div class="mx-4 my-8">
      <h1 class="text-2xl font-bold mb-4">Search Books</h1>
      <div class="flex mb-4">
        <div class="relative flex items-center">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <i class="pi pi-search"></i>
          </span>
          <input type="text" v-model="searchQuery" class="py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter search term" @input="handleSearchInput">
        </div>
        <div class="ml-4">
          <label for="searchBy" class="mr-2">Search By:</label>
          <select id="searchBy" v-model="searchBy" class="py-2 px-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" @change="handleSearchInput">
            <option v-for="(option, index) in searchOptions" :key="index" :value="option.value">{{ option.label }}</option>
          </select>
        </div>
      </div>
      <div v-if="searchResults.length > 0">
        <h2 class="text-xl font-semibold mt-4">Search Results</h2>
          <book-list :books="searchResults" />
      </div>
    </div>
  </template>
  
  <script>
  import openLibraryService from '@/services/bookService';
  import BookList from '@/components/BookList.vue';
  export default {
    data() {
      return {
        searchQuery: '',
        searchBy: 'title',
        searchResults: [],
        debounceTimeout: null,
        searchOptions: [
          { label: 'Title', value: 'title' },
          { label: 'Author', value: 'author' },
        ],
      };
    },
    methods: {
      async searchBooks() {
        if (!this.searchQuery.trim()) {
          this.searchResults = [];
          return;
        }
        try {
          const books = await openLibraryService.searchBooks(this.searchQuery.trim(), this.searchBy);
          this.searchResults = books;
          console.log(this.searchResults)
        } catch (error) {
          console.error('Error searching books:', error);
        }
      },
      handleSearchInput() {
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
          this.searchBooks();

        }, 300);
      },
    },
  };
  </script>
  
  <style scoped>
  .fa-star {
    color: #FFD700; /* Yellow */
  }
  </style>
  