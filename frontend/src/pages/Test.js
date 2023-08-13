import React, { useEffect } from 'react'

const Test = () => {
  const handleFetch = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.log('Token is missing');
        alert('Vui lòng đăng nhập')
        return;
      }

      const response = await fetch('/protected', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        console.log('Request successful');
        alert('Request successful')
      }
      else if (response.status === 403) {
        alert('Access denied - Admin only')
      }
      else {
        console.log('Request failed:', response.statusText);
        alert('Request failed')
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  return (
    <button onClick={handleFetch}>Fetch Protected Data</button>
  );
}

export default Test