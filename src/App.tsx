import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TaskComponent from './components/task_component';
import UserComponent from './components/user_component';
import axios from 'axios';
import api from './api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './app.module.css'
import { useTranslation } from 'react-i18next';


api.onAny().passThrough();

function App() {
  const { t, i18n: {changeLanguage, language} } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language)
  
  const handleChangeCurrentLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "fr" : "en";
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  }


  const [page, setPage] = useState(1)
  const handleChangePage = (e: number) => {
    setPage(e)
  }
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <div className="App">
      <div className={`flex flex-row gap-2 items-center bg-gray-50 justify-between py-4 px-4 ${styles.menu}`}>
        <div className="block   p-4 flex justify-end">
          <svg
            className={`w-6 h-6  ${!open ? "" : "hidden"} sm:hidden`}
            onClick={handleToggle}
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
          <FontAwesomeIcon
            onClick={handleToggle}
            icon={faXmark}
            className={`w-6 h-6  ${open ? "" : "hidden"} sm:hidden`}
          ></FontAwesomeIcon>
        </div>
        <div className='flex md:mr-48 md:gap-8 text-gray-600'>
          <button
            onClick={(e) => {
              handleChangePage(1)
            }}

            className={`relative mx-3 md:mx-0 min-w-8   md:px-4 py-1 md:py-2 cursor-pointer rounded-xl hover:font-bold  font-medium text-lg hover:text-blue-500 group   ${page !== 0 ? "text-white ease-out text-blue-500" : ""} `}
          >  {t('task')}</button>
          <button
            onClick={(e) => {
              handleChangePage(0)
            }}
            className={`relative mx-3 md:mx-0  min-w-8   md:px-4  py-1 md:py-2 cursor-pointer rounded-xl hover:font-bold  font-medium text-lg hover:text-blue-500 group   ${page === 0 ? "text-white ease-out text-blue-500" : ""} `}> User </button>

        </div>
      </div>
      <div className='h-screen w-full bg-gray-100'>
        {page === 1 ? <TaskComponent onClick={handleToggle} isOpen={open} /> : (
          <UserComponent onClick={handleToggle} isOpen={open} />
        )}
      </div>
    </div>
  );
}

export default App;
