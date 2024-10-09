import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import '../css/Directory.css';
import arrow from '../assets/arrow-down.png';

const Directory = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userCollection = collection(db, 'users');
        const userSnapshot = await getDocs(userCollection);
        const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userList);
        setFilteredUsers(userList);
      } catch (error) {
        console.error('Error fetching users: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = users.filter(user => {
      return (
        user.id.toLowerCase().includes(query) ||
        user.fullName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.department.toLowerCase().includes(query) ||
        (user.lockerNumber && user.lockerNumber.toString().includes(query))
      );
    });
    setFilteredUsers(filtered);
  };

  const handleSort = (field) => {
    const newSortOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newSortOrder);

    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (a[field] < b[field]) return newSortOrder === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return newSortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    
    setFilteredUsers(sortedUsers);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <div className='directoryContainer'>
        <div className='table-container'>
          <div className="search-filter">
            <div className='buttonSearch'>
              <input
                type="text"
                name="searchFilter"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="(Emp ID, Locker No, Name, Department or Email)"
                style={{ fontSize: '12px', height: '35px', width: '300px' }}
                required
              />
              <button onClick={handleSearch}>Search</button>
            </div>
            <div className='buttonFilter'>
              <div className="dropdown">
                <button className="dropbtn">
                  Sort by <img src={arrow} style={{ width: '12px', margin: '2px' }} alt="arrow" />
                </button>
                <div className="dropdown-content">
                  <a href="#!" onClick={() => handleSort('id')}>Employee ID</a>
                  <a href="#!" onClick={() => handleSort('fullName')}>Name</a>
                  <a href="#!" onClick={() => handleSort('department')}>Department</a>
                  <a href="#!" onClick={() => handleSort('lockerNumber')}>Locker Number</a>
                </div>
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort('id')}>Employee ID</th>
                <th onClick={() => handleSort('fullName')}>Full Name</th>
                <th onClick={() => handleSort('email')}>Email</th>
                <th onClick={() => handleSort('department')}>Department</th>
                <th onClick={() => handleSort('lockerNumber')}>Locker Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.department}</td>
                  <td>{user.lockerNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Directory;
