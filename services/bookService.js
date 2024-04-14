import axios from 'axios';

const base = 'https://openlibrary.org';
const covers = 'https://covers.openlibrary.org'
const instance = axios.create({
  baseURL: base,
});

export default {
  async searchBooks(query, searchBy) {
      switch(searchBy){
      case 'title':
        return this.mapBooks(await this.getBooksByTitle(query));
      case 'author':
        return this.mapBooks(await this.getBooksByAuthor(query));
      }
  },

  async getBooksByTitle(title) {
    try {
      const response = await instance.get('/search.json', {
        params: {
          title,
        },
      });
      console.log(response.data.docs);
      return response.data.docs;
    } catch (error) {
      console.error('Error fetching books by title:', error);
      throw error;
    }
  },
  constructCoverUrl(book) {
    if (book.cover_i) {
      return `${covers}/b/id/${book.cover_i}-M.jpg`;
    } else if (book.cover_edition_key) {
      return `${covers}/b/olid/${book.cover_edition_key}-M.jpg`;
    }
    else if(book.covers?[0] : null)
    {
      return `${covers}/b/id/${book.covers[0]}-M.jpg`;
    }
    return null;
  },
  async getBookDetails(bookId) {
    try {
      const response = await instance.get(`/works/${bookId}.json`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching book details for ID ${bookId}:`, error);
      throw error;
    }
  },

  mapBooks(books)
  {
    return books.map(book => ({
      key: book.key,
      title: book.title,
      author_name: book.author_name,
      description: book.description,
      cover_url: this.constructCoverUrl(book),
    }));
  },
};
