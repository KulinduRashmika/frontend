import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './issued.css';

const BASE_URL = 'http://localhost:8081/issued-app/issued-books';

function Issued() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    userId: '',
    bookId: '',
    borrowDate: '',
    returnDate: '',
    returned: false,
  });
  const [editingId, setEditingId] = useState(null); 

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setRecords(response.data);
    } catch (error) {
      alert('Failed to load issued records: ' + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.userId || !form.bookId || !form.borrowDate) {
      alert('User ID, Book ID, and Borrow Date are required.');
      return;
    }

    const payload = {
      uid: parseInt(form.userId),
      bid: parseInt(form.bookId),
      borrowDate: form.borrowDate,
      returnDate: form.returnDate || null,
      returned: form.returned,
    };

    try {
      if (editingId !== null) {
        // Update record
        await axios.put(BASE_URL, { ...payload, id: editingId });
        setEditingId(null);
      } else {
        // Create new record
        await axios.post(BASE_URL, payload);
      }

      fetchRecords();
      setForm({
        userId: '',
        bookId: '',
        borrowDate: '',
        returnDate: '',
        returned: false,
      });
    } catch (error) {
      alert('Failed to save record: ' + error.message);
    }
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    setForm({
      userId: record.uid.toString(),
      bookId: record.bid.toString(),
      borrowDate: record.borrowDate,
      returnDate: record.returnDate || '',
      returned: record.returned,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({
      userId: '',
      bookId: '',
      borrowDate: '',
      returnDate: '',
      returned: false,
    });
  };

  return (
    <div className="issued-container">
      <h2>Issued / Borrowed Books</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="issued-form">
        <div>
          <label>User ID: </label>
          <input
            type="text"
            name="userId"
            value={form.userId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Book ID: </label>
          <input
            type="text"
            name="bookId"
            value={form.bookId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Borrow Date: </label>
          <input
            type="date"
            name="borrowDate"
            value={form.borrowDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Return Date: </label>
          <input
            type="date"
            name="returnDate"
            value={form.returnDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Returned: </label>
          <input
            type="checkbox"
            name="returned"
            checked={form.returned}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{editingId ? 'Update Record' : 'Add Record'}</button>
        {editingId && <button type="button" onClick={handleCancel}>Cancel</button>}
      </form>

      {/* Table */}
      <table className="issued-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Book ID</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
            <th>Returned</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.uid}</td>
              <td>{r.bid}</td>
              <td>{r.borrowDate}</td>
              <td>{r.returnDate || 'Not Returned'}</td>
              <td>
                <input
                  type="checkbox"
                  checked={r.returned}
                  readOnly
                />
              </td>
              <td>
                <button onClick={() => handleEdit(r)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Issued;