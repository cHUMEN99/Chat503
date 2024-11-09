import { collection, getDocs } from 'firebase/firestore';
import React, { cloneElement, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../firebase';


const Userinfo = () => {
    const {id}=useParams()
    const[users,setUser]=useState([])
    const [search,setSearch]=useState('')


const handlesearch = (searchText, userArray) => {
        if (!searchText) return userArray;
        return userArray.filter((user) =>
            user.useremail.toLowerCase().includes(searchText.toLowerCase())
        );
    };

    useEffect(()=>{
        const debounce=setTimeout(()=>{
            const filteredMessages=handlesearch(search,users)
            setUser(filteredMessages)
        },300)
        return () => clearTimeout(debounce);
    },[search,users])

    useEffect(()=>{
        const fetchusers=async()=>{
            try{
                const userColection=collection(db,'userss')
                const data=await getDocs(userColection)
                const userData=data.docs.map((doc)=>({
                    id:doc.id,
                    ...doc.data()
                }))
                setUser(userData)
            }catch(error){
                console.error("Помилка",error)
            }
        }
        fetchusers();
    },[]);
    return (
        <div>
            <h1>Імя користувача</h1>
            <input placeholder='Введіть пошту для пошуку' value={search} onChange={(event)=>setSearch(event.target.value)}/>
            <ul className='rounded-lg bg-slate-500' >
                {users.map((user)=>(
                    <li key={user.id}>
                        <strong >Email:</strong> {user.useremail} 
                        
                        <strong>password:</strong> {user.password} 
                        {user.password ? user.password : "пароля не було"}

                    </li>
                    
                ))}
            </ul>
            <Link to='/chat'>
            <button className='bg-yellow-300 p-3 m-10 flex       rounded-lg'>Назад</button>
            </Link>
        </div>
    );
};

export default Userinfo;