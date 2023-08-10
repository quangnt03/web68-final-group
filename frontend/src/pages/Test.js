import React, {useEffect} from 'react'

const Test = () => {
    useEffect(() => {
        fetch('http://localhost:5000/test-connection')
  .then(response => response.json())
  .then(data => {
    console.log('Data received from backend:', data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
    },[])
  return (
    <div>Test</div>
  )
}

export default Test