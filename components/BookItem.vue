<template>
    <div :class="{ 'border-gray-700': $colorMode.value === 'dark' }"  class="border rounded-lg overflow-hidden shadow-md">
      <img :src="book.cover_url" alt="Book Cover" class="w-full h-48 object-cover">
      <div class="p-4">
        <h3 class="text-lg font-semibold">{{ book.title }}</h3>
        <p class="text-sm text-gray-600 mb-2">by {{ book.author_name }}</p>
        <div class="flex items-center mb-2">
          <span class="ml-2">Description: {{ book.description }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      book: {
        type: Object,
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  