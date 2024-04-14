<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
    <BookItem  :class="{ 'dark': $colorMode.value === 'dark' }" v-for="book in books" :key="book.key" :book="book" />
  </div>
</template>

<script>
import BookItem from './BookItem.vue';

export default {
  props: {
    books: {
      type: Array,
      required: true,
    },
  },
  components: {
    BookItem, 
  },
};
</script>

<style scoped>
</style>
