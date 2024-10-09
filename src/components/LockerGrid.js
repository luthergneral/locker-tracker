import React, { useState } from 'react';
import '../css/LockerGrid.css';
import { db } from './firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import arrow from '../assets/arrow-down.png';

const LockerGrid = () => {
  const lockers = Array.from({ length: 40 }, (_, i) => i + 1);
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [lockerData, setLockerData] = useState(null);
  const [loading, setLoading] = useState(false);

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
            className="locker" 
            onClick={() => handleLockerClick(locker)}
          >
            {locker}
          </div>
        ))}
      </div>
      <div className="search-filter">
        <button>001 - 040 <img src={arrow} style={{margin: '0 0 2px 3px'}}></img></button>
      </div>

      {selectedLocker && (
        <div className="selected-locker">
          <h1>Locker #{selectedLocker}</h1>
          {loading ? (
            <p>Loading...</p>
          ) : lockerData ? (
            <div>
              <p style={{fontSize: '24px'}}>This Locker is occupied by</p>
              <p style={{fontSize: '38px'}}>{lockerData.fullName}</p>
              <p style={{fontSize: '16px'}}>Please fill up the form to update the details.</p>
              <p style={{fontSize: '16px'}}>or enter locker number on the field to delete.</p>
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


