import React, {useState} from "react";
import EntryFormGW from './components/EntryFormGW'
import EntryFormALK from './components/EntryFormALK'
import ExitForm from './components/ExitForm'

function App() {
  const [isEditingEGW, setIsEditingEGW] = useState(false);
  const [isEditingEALK, setIsEditingEALK] = useState(false);
  const [isEditingExit, setIsEditingExit] = useState(false);
  
  const startEntryGWHandler = () => {
    setIsEditingEGW(true);
    setIsEditingEALK(false);
    setIsEditingExit(false);
  }

  const stopEntryGWHandler = () => {
    setIsEditingEGW(false);
  }

  const startEntryALKHandler = () => {
    setIsEditingEGW(false);
    setIsEditingEALK(true);
    setIsEditingExit(false);
  }

  const stopEntryALKHandler = () => {
    setIsEditingEALK(false);
  }

  const startExitHandler = () => {
    setIsEditingEGW(false);
    setIsEditingEALK(false);
    setIsEditingExit(true);
  }

  const stopExitHandler = () => {
    setIsEditingExit(false);
  }
  
  return (
    
    <div className="app">
      <div className = "form-actions-first">
        {!isEditingEGW && <button onClick={startEntryGWHandler}>Eintritt GW</button>}
        {!isEditingEALK && <button onClick={startEntryALKHandler}>Eintritt ALK</button>}
        {!isEditingExit && <button onClick={startExitHandler}>Austritt</button>}
      </div>
      
      {isEditingEGW && <EntryFormGW onCancel={stopEntryGWHandler}/>}
      {isEditingEALK && <EntryFormALK onCancel={stopEntryALKHandler}/>}
      {isEditingExit && <ExitForm onCancel={stopExitHandler}/>}
    </div>
  );
}

export default App;