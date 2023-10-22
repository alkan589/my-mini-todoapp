"use client"
import React, { useState } from 'react';
import { AiOutlineFileAdd, AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
  const [post, setPost] = useState('');
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]); // Initialize as an empty array
  const [formData, setFormData] = useState({ title: '', description: '', tags: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addHandler = () => {
    const newData = {
      title: formData.title,
      description: formData.description,
      tags: formData.tags,
    };
    const {title,description,tags}=newData;
    if(title && description && tags){
      setData((prevData) => [...prevData, newData]);
      setFormData({ title: '', description: '', tags: '' });
    }
    
  };

  return (
    <>
      <div className='flex justify between items-center h-16 max-w-screen-md mx-auto'>
        <input
          onChange={(e) => {
            setPost(e.target.value);
          }}
          className={`${
            isInputOpen ? 'flex-1' : ''
          } inset-0 border-b border-4 h-8 flex items-center bg-white outline-none`}
          value={post}
          placeholder='Filtering'
          //Filtering is not working
          onClick={() => setIsInputOpen(!isInputOpen)}
        />
        <AiOutlineFileAdd onClick={() => setIsModalOpen(true)} />
      </div>
      <div>
        {isModalOpen ? (
          <div className='flex space-x-10 justify-center items-center mt-7'>
            <div className='w-[450px]'>
              <div className='flex-row h-20 flex justify-between'>
                <p className='text-4xl'>Share post</p>
                <AiOutlineClose onClick={() => setIsModalOpen(false)} />
              </div>
              <form>
                <input
                  className='mt-5 p-3 w-full border border-1 shadow-sm'
                  onChange={handleInputChange}
                  name='title'
                  value={formData.title}
                  placeholder='Title'
                />
                <input
                  className='mt-5 p-3 w-full border border-1 shadow-sm'
                  onChange={handleInputChange}
                  name='description'
                  value={formData.description}
                  placeholder='Description'
                />
                <input
                  className='mt-5 p-3 w-full border border-1 shadow-sm'
                  onChange={handleInputChange}
                  name='tags'
                  value={formData.tags}
                  placeholder='Tags'
                />
                <button onClick={addHandler} type='button' className='mt-3 bg-black text-white p-3 w-full'>
                  Send
                </button>
              </form>
            </div>
          </div>
        ) : (
          <p>No modal</p>
        )}
        <div>
          {data.map(todo => {
            return (
              <div>
                <div className='flex w-[450px] border-1 border shadow-md flex-row m-auto mt-4 items-center'>
                  <div className='flex flex-start justify-center items-center'>
                    <div className='h-[100px] w-[150px] flex justify-center items-center rounded-md bg-red-500 '>
                      <p className='text-2xl text-white '>{todo.title.charAt(0).toUpperCase()}</p>
                    </div>
                  </div>
                  
                  <div className='px-4'>
                    <h1 className='text-3xl'>{todo.title}</h1>
                    <p className='text-2xl'>{todo.description}</p>  
                    <p className='text-gray text-sm'>{todo.tags}</p>
                  </div>
                  
                </div>
                
              </div>
              
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
