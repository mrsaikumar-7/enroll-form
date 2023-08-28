import Register from './components/register/Register';
import './App.css';
import UserContainer from './components/userContainer/UserContainer';
import { useState } from 'react';
const App = () => {
  const [updateTrigger, setUpdateTrigger] = useState(0); // Initialize a state for triggering updates

  const handleUserUpdate = () => {
    // This function will be called from Register after successful submission
    // Increment the updateTrigger state to trigger re-render of UserContainer
    setUpdateTrigger(prevTrigger => prevTrigger + 1);
  };

  return (
    <div>
      <Register className='register' onUpdate={handleUserUpdate} />
      <UserContainer updateTrigger={updateTrigger} />
    </div>
  );
};
export default App;
