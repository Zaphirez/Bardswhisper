import { useEffect, useState } from 'react';
import App from '../App'
import httpClient from '../httpClient';

const ChatPage = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    (async() => {
      try {
        const resp = await httpClient.get("//localhost:5000/@me")

        setUser(resp.data)
      } catch (e) {
        console.log("Not Auth")
      }
    })();
  }, [])

  return (
    <div>
      <h1 className='Chat-Header'>Welcome!</h1>
      {user != null ? (
        <div className='Chat-Box'>
          <App />
        </div>
      ) : (<p>You are not logged in!</p>)}
    </div>
  )
}

export default ChatPage;