<template>
  <div class="mx-4 my-8">
    <h1 class="text-2xl font-bold mb-4">Author Details</h1>
    <div v-if="author">
      <h2 class="text-xl font-semibold mb-2">{{ author.name }}</h2>
      <p class="text-sm text-gray-600 mb-2">Title: {{ author.title }}</p>
      <p class="text-sm text-gray-600 mb-2">Birth Date: {{ author.birth_date }}</p>
      <p class="text-sm text-gray-600 mb-2">Bio: {{ author.bio }}</p>
      <p class="text-sm text-gray-600 mb-2">Works Count: {{ author.works_count }}</p>
      <img :src="getPhotoUrl()" alt="Author Photo" class="w-48 h-48 object-cover rounded-full border border-gray-300">
    </div>

    <div v-if="authorWorks.length > 0">
      <h2 class="text-xl font-semibold mt-4">Works</h2>
      <book-list :books="authorWorks" />
    </div>
  </div>
</template>

<script>
import authorService from '@/services/authorService';
import BookList from '@/components/BookList.vue';

export default {
  components: {
    BookList,
  },
  data() {
    return {
      author: null,
      authorWorks: [],
    };
  },
  async created() {
    try {
      const authorKey = this.$route.params.authorKey; 
      this.author = await authorService.getAuthorDetails(authorKey);
      this.authorWorks = await authorService.getAuthorWorks(authorKey);
    } catch (error) {
      console.error('Error fetching author details:', error);
    }
  },
  methods: {
    getPhotoUrl() {
      if (this.author.photos && this.author.photos.length > 0) {
        const photoId = this.author.photos[0];
        return `https://covers.openlibrary.org/b/id/${photoId}-L.jpg`;
      }
      return 'https://via.placeholder.com/150';
    }
  }
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
