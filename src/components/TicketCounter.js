import React, { useState } from'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

function TicketCounter() {
  const [jql, setJql] = useState('');
  const [count, setCount] = useState(null);
  const [error, setError] = useState(null);

  const handleCheck = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/ticket-count`, {
        params: { jql }
      });

      setCount(response.data.count);
      setError(null);
    } catch (err) {
      setError('Ошибка при получении данных');
      console.error(err);
    }
  };

  return (
    <div>
      <input type="text" value={jql} onChange={(e) => setJql(e.target.value)} />
      <button onClick={handleCheck}>Проверить</button>
      {error? (
        <p style={{ color:'red' }}>{error}</p>
      ) : count!== null? (
        <p>Количество тикетов: {count}</p>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default TicketCounter;