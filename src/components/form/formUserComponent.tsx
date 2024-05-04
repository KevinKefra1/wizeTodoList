import React, { useState } from 'react';
import { listAssignes } from '../../api/data';
import { Assignee, ModalUserProps, } from '../../model';



export default function FormUserComponent({ onAddUser, onDeleteUser, user }: ModalUserProps) {
    const [formData, setFormData] = useState({ email: user?.email ?? "", name: user?.name ?? "", phone: user?.phone ?? "" });
    const [isValidTitle, setIsValidTitle] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [isNotValidemail, setValidEmail] = useState(true);


    const { email, name, phone } = formData;


    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const isValidEmailFormat = (email: string): boolean => {
        const emailRegex = /^([^\s@]+@[^\s@]+\.[^\s@]+)$/;
        return emailRegex.test(email);
    }

    const handleEmailChange = (event: any) => {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };


    const searchUserByName = (name: string, id: number): boolean => {
        const foundUser = listAssignes.find(user => user.name.trim().toLocaleLowerCase() === name.trim().toLocaleLowerCase());
        if (foundUser !== undefined && foundUser?.id === id) {
            return false; //
        }
        return foundUser !== undefined;
    }
    const handleAddUser = (event: any) => {
        event.preventDefault();
        searchUserByName(name, user?.id ?? -1)
        if (name.trim().length < 3) {
            setIsValidTitle(false);
            setErrorMessage("Name is invalid !!")
        } else if (searchUserByName(name, user?.id ?? -1)) {
            setIsValidTitle(false);
            setErrorMessage("Name is use by another user !!")
        }
        else {
            setIsValidTitle(true);
        }


        if (!isValidEmailFormat(email)) {
            setValidEmail(false);
        } else {
            setValidEmail(true)
        }

        if (name.trim().length < 3 && !isValidEmailFormat(email)) {
            return;
        }

        const newUser: Assignee = {
            id: user?.id ?? Math.floor(Math.random() * 10000000) + 1,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
        }
        onAddUser(newUser);

    };





    return (
        <div>

            <div className=' px-4 md:px-8 mt-4'>
                <form onSubmit={handleAddUser} className="flex flex-col gap-8">
                    <div className="mt-4 flex flex-col items-start ">
                        <input type="text" name="name" placeholder='Name ' className={`mt-1 p-4 w-full border rounded-md ${!isValidTitle && "border-red-500"}`} required value={name}
                            onChange={handleInputChange} />
                        <span className={`${isValidTitle ? "hidden" : ""} mt-2 `}>{errorMessage}</span>
                    </div>
                    <div className="mt-4 flex flex-col items-start ">
                        <input type={'text'} name="phone" placeholder='Tel: 6xx xxx xxx ' pattern="[6][0-9]{2}[0-9]{3}[0-9]{3}" className={`mt-1 p-4 w-full border rounded-md `} required value={phone}
                            onChange={handleInputChange} />
                        {/* <span className={`${isValidTitle ? "hidden" : ""} mt-2 `}>Name is not valid</span> */}
                    </div>
                    <div className="mt-4 flex flex-col items-start ">
                        <input type="email" name="email" placeholder='Email ' className={`mt-1 p-4 w-full border rounded-md ${!isNotValidemail && "border-red-500"}`} required value={email}
                            onChange={handleEmailChange} />
                        <span className={`${isNotValidemail ? "hidden" : ""} mt-2 `}>Email is not valid</span>
                    </div>

                    <div className='w-full flex flex-row mb-8 items-end justify-between'>
                        {user?.id !== undefined ? <button type='button' onClick={e => onDeleteUser(user)} className='w-24 bg-white border text-red-500 border-red-500 px-4 py-2 rounded rounded-lg hover:bg-red-500 hover:text-white  '>Delete</button>
                            : (<div className='w-full'></div>)}
                        <button type='submit' className='w-24  bg-white border text-blue-500 border-blue-500 px-4 py-2 rounded rounded-lg hover:bg-blue-500 hover:text-white  '>Save</button>

                    </div>
                </form>
            </div>
        </div>
    );
}