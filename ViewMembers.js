import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewMembers.css';

function ViewMember() {
  const [members, setMembers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    userName: '',
    userNic: '',
    address: '',
    email: '',
    regDate: '',
    contact: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const BASE_URL = 'http://localhost:8083/user-app/users';

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOrUpdate = async () => {
  try {
    if (editingId) {
      
      await axios.put(`${BASE_URL}/${editingId}`, formData);
      setEditingId(null);
    } else {
      await axios.post(BASE_URL, formData);
    }
    fetchMembers();
    setFormData({
      userName: '',
      userNic: '',
      address: '',
      email: '',
      regDate: '',
      contact: ''
    });
  } catch (error) {
    console.error('Error saving member:', error);
  }
};

  const handleEdit = (id) => {
    const member = members.find((m) => m.userId === id);
    if (member) {
      setFormData({
        userName: member.userName,
        userNic: member.userNic,
        address: member.address,
        email: member.email,
        regDate: member.regDate ? member.regDate.split('T')[0] : '',
        contact: member.contact
      });
      setEditingId(id);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      fetchMembers();
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const filteredMembers = members.filter((m) =>
    Object.values(m).some(
      (val) =>
        val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="view-members-container">
      <h2>Member Management</h2>

      <div className="form-section">
        <input
          name="userName"
          placeholder="Name"
          value={formData.userName}
          onChange={handleInputChange}
        />
        <input
          name="userNic"
          placeholder="NIC"
          value={formData.userNic}
          onChange={handleInputChange}
        />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          name="regDate"
          type="date"
          value={formData.regDate}
          onChange={handleInputChange}
        />
        <input
          name="contact"
          placeholder="Contact"
          value={formData.contact}
          onChange={handleInputChange}
        />
        <button onClick={handleAddOrUpdate}>
          {editingId ? 'Update' : 'Add'}
        </button>
      </div>

      <input
        className="search-input"
        placeholder="Search members..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="members-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>NIC</th>
            <th>Address</th>
            <th>Email</th>
            <th>Reg Date</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((m) => (
            <tr key={m.userId}>
              <td>{m.userId}</td>
              <td>{m.userName}</td>
              <td>{m.userNic}</td>
              <td>{m.address}</td>
              <td>{m.email}</td>
              <td>{m.regDate ? m.regDate.split('T')[0] : ''}</td>
              <td>{m.contact}</td>
              <td>
                <button onClick={() => handleEdit(m.userId)}>Edit</button>
                <button onClick={() => handleDelete(m.userId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewMember;