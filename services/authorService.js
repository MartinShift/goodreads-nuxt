import axios from 'axios';
import bookService from './bookService';

const searchBase = 'https://openlibrary.org/authors';
const authorsBase = 'https://openlibrary.org/authors'
const instance = axios.create({
  baseURL: authorsBase,
});

export default {

  async getBooksByAuthor(authorName) {
    try {
      const response = await instance.get('/search.json', {
        params: {
          author: authorName,
        },
      });

      return response.data.docs;
    } catch (error) {
      console.error('Error fetching books by author:', error);
      throw error;
    }
  },

  async getAuthorDetails(authorKey) {
    try {
      const response = await instance.get(`/authors/${authorKey}.json`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching author details for key ${authorKey}:`, error);
      throw error;
    }
  },

    async getAuthors(query) {
      try {
        const response = await axios.get(`https://openlibrary.org/search/authors.json?q=${encodeURIComponent(query)}`);
        console.log(response.data.docs);
        return response.data.docs;
      } catch (error) {
        console.error('Error fetching authors:', error);
        throw error;
      }
    },
    async getAuthorDetails(authorKey) {
      try {
        const response = await axios.get(`${authorsBase}/${authorKey}.json`);
        return response.data;
      } catch (error) {
        console.error(`Error fetching author details for key ${authorKey}:`, error);
        throw error;
      }
    },
  
    async getAuthorWorks(authorKey, limit = 30, offset = 30, authorName) {
      try {
        const response = await instance.get(`/${authorKey}/works.json?limit=30`, {
          params: {
            limit,
            offset,
          },
        });
        console.log(response.data);
        return response.data.entries.map(book => ({
          key: book.key,
          title: book.title,
          author_name: authorName,
          description: "",
          cover_url: bookService.constructCoverUrl(book),
        }));
      } catch (error) {
        console.error(`Error fetching author works for key ${authorKey}:`, error);
        throw error;
      }
    },
};
