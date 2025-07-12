// src/pages/ViewBooks.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewBooks.css';

const BASE_URL = 'http://localhost:8082/book-app/books';

const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('bname'); // 'bname', 'aname', or 'category'
  const [formData, setFormData] = useState({
    bname: '',
    aname: '',
    category: ''
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setBooks(res.data);
    } catch (err) {
      alert('Error loading books: ' + err.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddOrUpdate = async () => {
    try {
      if (editingBook) {
        await axios.put(BASE_URL, { ...formData, id: editingBook.id });
      } else {
        await axios.post(BASE_URL, formData);
      }
      setFormData({ bname: '', aname: '', category: '' });
      setEditingBook(null);
      fetchBooks();
    } catch (err) {
      alert('Save failed: ' + err.message);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      bname: book.bname,
      aname: book.aname,
      category: book.category
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`${BASE_URL}/${id}`);
        fetchBooks();
        if (editingBook?.id === id) {
          setEditingBook(null);
          setFormData({ bname: '', aname: '', category: '' });
        }
      } catch (err) {
        alert('Delete failed: ' + err.message);
      }
    }
  };

  const handleCancel = () => {
    setEditingBook(null);
    setFormData({ bname: '', aname: '', category: '' });
  };

  const handleSearch = async () => {
    try {
      if (!searchTerm.trim()) {
        fetchBooks();
        return;
      }

      const params = {
        [searchField === 'bname'
          ? 'name'
          : searchField === 'aname'
          ? 'aname'
          : 'category']: searchTerm
      };

      const res = await axios.get(BASE_URL, { params });
      setBooks(res.data);
    } catch (err) {
      alert('Search failed: ' + err.message);
    }
  };

  return (
    <div className="view-books-container">
      <h2>Add / View Books</h2>

      <div style={{ marginBottom: '1rem' }}>
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          style={{ marginRight: 8 }}
        >
          <option value="bname">Book Name</option>
          <option value="aname">Author Name</option>
          <option value="category">Category</option>
        </select>

        <input
          type="text"
          placeholder={`Search by ${
            searchField === 'bname'
              ? 'book name'
              : searchField === 'aname'
              ? 'author name'
              : 'category'
          }...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="search-input"
        />
        <button onClick={handleSearch}>Search</button>
        <button
          onClick={() => {
            setSearchTerm('');
            fetchBooks();
          }}
        >
          Clear Search
        </button>
      </div>

      <div className="form-section">
        <input
          type="text"
          name="bname"
          placeholder="Book Name"
          value={formData.bname}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="aname"
          placeholder="Author Name"
          value={formData.aname}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleInputChange}
        />
        <button onClick={handleAddOrUpdate}>
          {editingBook ? 'Update' : 'Add'}
        </button>
        {editingBook && <button onClick={handleCancel}>Cancel</button>}
      </div>

      <table className="books-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan="5">No books found</td>
            </tr>
          ) : (
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.bname}</td>
                <td>{book.aname}</td>
                <td>{book.category}</td>
                <td>
                  <button onClick={() => handleEdit(book)}>Edit</button>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBooks;