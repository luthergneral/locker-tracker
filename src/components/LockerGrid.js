import React, { useState, useEffect } from 'react';
import '../css/LockerGrid.css';
import { db } from './firebaseConfig';
import { collection, query, getDocs, where } from 'firebase/firestore';
import arrow from '../assets/arrow-down.png';

const LockerGrid = () => {
  const lockers = Array.from({ length: 40 }, (_, i) => i + 1);
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [lockerData, setLockerData] = useState(null);
  const [occupiedLockers, setOccupiedLockers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOccupiedLockers = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const occupied = querySnapshot.docs.map((doc) => doc.data().lockerNumber);
        setOccupiedLockers(occupied);
      } catch (error) {
        console.error('Error fetching occupied lockers:', error);
      }
      setLoading(false);
    };

    fetchOccupiedLockers();
  }, []);

  const handleLockerClick = async (lockerNumber) => {
    setSelectedLocker(lockerNumber);
    setLoading(true);

    try {
      const q = query(collection(db, 'users'), where('lockerNumber', '==', lockerNumber));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setLockerData(userData);
      } else {
        console.log('No such document for this lockerNumber!');
        setLockerData(null);
      }
    } catch (error) {
      console.error('Error fetching locker data:', error);
      setLockerData(null);
    }

    setLoading(false);
  };

  return (
    <div className="locker-tracker">
      <div className="locker-grid">
        {lockers.map((locker) => (
          <div
            key={locker}
            className={`locker ${occupiedLockers.includes(locker) ? 'occupied' : ''}`}
            onClick={() => handleLockerClick(locker)}
          >
            {locker}
          </div>
        ))}
      </div>
      <div className="search-filter">
        <button>001 - 040 <img src={arrow} style={{ margin: '0 0 2px 3px' }} alt="arrow icon" /></button>
      </div>

      {selectedLocker && (
        <div className="selected-locker">
          <h1>Locker #{selectedLocker}</h1>
          {loading ? (
            <p>Loading...</p>
          ) : lockerData ? (
            <div>
              <p style={{ fontSize: '24px' }}>This Locker is occupied by</p>
              <p style={{ fontSize: '18px' }}>Name</p>
              <p style={{ fontSize: '38px', lineHeight: '0.5' }}>{lockerData.fullName}</p>
              <p style={{ fontSize: '18px' }}>Email</p>
              <p style={{ fontSize: '30px', lineHeight: '0.5' }}>{lockerData.email}</p>
              <p style={{ fontSize: '18px' }}>Department</p>
              <p style={{ fontSize: '30px', lineHeight: '0.5' }}>{lockerData.department}</p>
              <br />
              <p style={{ fontSize: '16px' }}>Please fill up the form to update the details.</p>
              <p style={{ fontSize: '16px', lineHeight: '0.5' }}>or enter locker number on the field to delete.</p>
            </div>
          ) : (
            <>
              <p>This locker is available.</p>
              <p>Please fill up the form to assign the locker.</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LockerGrid;
