import React from 'react';
import logo from './logo.svg';
import './App.css';
import TaskComponent from './components/task_component';

function App() {
  return (
    <div className="App">

      <div className='h-screen w-full bg-gray-100'>
        <TaskComponent></TaskComponent>
      </div>
    </div>
  );
}

export default App;
