import React, { useState } from 'react';
import { db } from './firebaseConfig';
import { doc, updateDoc, deleteDoc, getDocs, getDoc, collection, query, where, addDoc } from 'firebase/firestore';
import '../css/form.css';

const Form = () => {
  const [employee, setEmployee] = useState({
    employeeId: '',
    fullName: '',
    email: '',
    department: '',
    lockerNumber: '',
    status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const clearForm = () => {
    setEmployee({
      employeeId: '',
      fullName: '',
      email: '',
      department: '',
      lockerNumber: '',
      status: '',
    });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('lockerNumber', '==', parseInt(employee.lockerNumber, 10)));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert(`Locker number ${employee.lockerNumber} is already occupied. Please choose another locker.`);
        return;
      } if (!employee.employeeId || !employee.fullName || !employee.fullName || !employee.department || !employee.lockerNumber) {
        alert("Please fill up the fields to add user.");
        return;
      }

      const userDoc = doc(db, 'users', employee.employeeId);
      await addDoc(userDoc, {
        fullName: employee.fullName,
        email: employee.email,
        department: employee.department,
        lockerNumber: parseInt(employee.lockerNumber, 10),
      });
      alert('User added successfully!');
      clearForm();
    } catch (error) {
      alert(`Employee ID ${employee.employeeId} already have a locker.`);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
        if (!employee.employeeId) {
            alert("Please enter a valid Employee ID to update.");
            return;
        } if (!employee.employeeId || !employee.fullName || !employee.fullName || !employee.department || !employee.lockerNumber) {
          alert("Please fill up all fields to update user.");
          return;
        }

        const userDoc = doc(db, 'users', employee.employeeId);

        const docSnapshot = await getDoc(userDoc);
        if (!docSnapshot.exists()) {
            alert(`No user found with Employee ID ${employee.employeeId}`);
            return;
        }

        await updateDoc(userDoc, {
            fullName: employee.fullName,
            email: employee.email,
            department: employee.department,
            lockerNumber: parseInt(employee.lockerNumber, 10),
            status: employee.status,
        });

        alert('User updated successfully!');
        clearForm();
    } catch (error) {
        console.error('Error updating user: ', error);
        alert('Error updating user. Please try again.');
    }
  };


  const handleDeleteUserByLockerNumber = async () => {
    try {
      if (!employee.lockerNumber) {
        alert("Please input locker number on the field to delete.");
        return;
      }

      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('lockerNumber', '==', parseInt(employee.lockerNumber, 10)));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert(`No user found for locker number ${employee.lockerNumber}`);
        return;
      }

      const userDoc = querySnapshot.docs[0].ref;
      await deleteDoc(userDoc);
      alert(`User for locker number ${employee.lockerNumber} deleted successfully!`);
      clearForm();
    } catch (error) {
      console.error('Error deleting user: ', error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <form>
          <div className='col'>
            <div className="form-group">
              <label>Employee ID</label>
              <input
                type="number"
                name="employeeId"
                value={employee.employeeId}
                onChange={handleChange}
                placeholder="EID Number" style={{fontSize: '12px', height: '35px'}}
                required
              />
            </div>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={employee.fullName}
                onChange={handleChange}
                placeholder="First Name | Last name" style={{fontSize: '12px', height: '35px'}}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={employee.email}
                onChange={handleChange}
                placeholder="Type here" style={{fontSize: '12px', height: '35px'}}
                required
              />
            </div>
          </div>
          <div className='col'>
            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={employee.department}
                onChange={handleChange}
                placeholder="Type here" style={{fontSize: '12px', height: '35px'}}
                required
              />
            </div>
            <div className="form-group">
              <label>Locker Number</label>
              <input
                type="number"
                name="lockerNumber"
                value={employee.lockerNumber}
                onChange={handleChange}
                placeholder="Type here" style={{fontSize: '12px', height: '35px'}}
                required
              />
            </div>
            <div className="form-actions">
              <button type="button" onClick={handleAddUser}>Add</button>
              <button type="button" onClick={handleUpdateUser}>Update</button>
              <button type="button" onClick={handleDeleteUserByLockerNumber}>Delete</button>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Form;
