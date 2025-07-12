import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './staff.css';

const BASE_URL = 'http://localhost:8088/staff-app/staff'; // Adjust as needed

function Staff() {
  const [staffList, setStaffList] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    position: '',
    active: true,
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setStaffList(response.data);
    } catch (error) {
      alert('Failed to fetch staff records: ' + error.message);
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

    if (!form.name || !form.email || !form.position) {
      alert('Name, Email, and Position are required.');
      return;
    }

    const payload = {
      id: editingId,
      name: form.name,
      email: form.email,
      position: form.position,
      active: form.active,
    };

    try {
      if (editingId !== null) {
        // ✅ Use correct template literal syntax for PUT
        await axios.put(BASE_URL, payload);
      } else {
        await axios.post(BASE_URL, payload);
      }

      fetchStaff();
      resetForm();
    } catch (error) {
      alert('Failed to save staff record: ' + error.message);
    }
  };

  const handleEdit = (staff) => {
    setEditingId(staff.id);
    setForm({
      name: staff.name,
      email: staff.email,
      position: staff.position,
      active: staff.active,
    });
  };

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: '',
      email: '',
      position: '',
      active: true,
    });
  };

  const filteredStaff = staffList.filter((s) =>
    [s.name, s.email, s.position].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="staff-container">
      <h2>Staff Management</h2>

      {/* 🔍 Search Bar */}
      <div className="staff-search">
        <input
          type="text"
          placeholder="Search by name, email, or position..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Staff Form */}
      <form onSubmit={handleSubmit} className="staff-form">
        <div>
          <label>Name: </label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email: </label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Position: </label>
          <input type="text" name="position" value={form.position} onChange={handleChange} required />
        </div>
        <div>
          <label>Active: </label>
          <input type="checkbox" name="active" checked={form.active} onChange={handleChange} />
        </div>
        <button type="submit">{editingId ? 'Update Staff' : 'Add Staff'}</button>
        {editingId && <button type="button" onClick={handleCancel}>Cancel</button>}
      </form>

      {/* Staff Table */}
      <table className="staff-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStaff.length > 0 ? (
            filteredStaff.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.position}</td>
                <td>
                  <input type="checkbox" checked={s.active} readOnly />
                </td>
                <td>
                  <button onClick={() => handleEdit(s)}>Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No matching staff found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Staff;
