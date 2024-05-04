import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TaskComponent from './components/task_component';
import UserComponent from './components/user_component';
import axios from 'axios';
import api from './api';

api.onAny().passThrough();

function App() {
  const [page, setPage] = useState(1)
  const handleChangePage = (e: number) => {
    setPage(e)
  }
  return (
    <div className="App">
      <div className='flex flex-row gap-2 items-center bg-gray-50 justify-center py-8'>
        <button
          onClick={(e) => {
            handleChangePage(1)
          }}
          className={`relative mx-3 px-16 py-2 cursor-pointer rounded-xl hover:font-bold  font-medium text-lg hover:text-primary-300 group transition duration-500   ${page !== 0 ? "text-white ease-out bg-blue-300" : ""} `}
        > Task </button>
        <button
          onClick={(e) => {
            handleChangePage(0)
          }}
          className={`relative mx-3 px-16 py-2 cursor-pointer rounded-xl hover:font-bold  font-medium text-lg hover:text-primary-300 group transition duration-500   ${page === 0 ? "text-white ease-out bg-blue-300" : ""} `}> User </button>

      </div>
      <div className='h-screen w-full bg-gray-100'>
        {page === 1 ? <TaskComponent /> : (
          <UserComponent></UserComponent>
        )}
      </div>
    </div>
  );
}

export default App;
