import React, { useState } from 'react';
import data from './data.json';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState(data); // mengambil contoh data dari data.json (ganti dengan useState([]) jika mau mulai tanpa data)
  const [todoInput, setTodoInput] = useState('');
  
  const addTodo = (input) => {
    let copy = [...todoList];
    copy = [...copy, { id: todoList.length + 1, task: input, complete: false }];
    setTodoList(copy);
  }

  // menghandle ketika form add todo disubmit
  const handleSubmitInput = (e) => {
    e.preventDefault()
    addTodo(todoInput) // menjalankan fungsi addTodo di atas
    setTodoInput('')
    console.log('Submitted!')
  }

  // menghandle perubahan value pada input
  const handleChangeInput = (e) => {
    setTodoInput(e.target.value)
  }

  // menghandle ketika ada task yang dicentang (mencocokkan id & menggantikan status complete nya)
  const handleCheckComplete = (id) => {
    let mapped_list = todoList.map(task => {
      return task.id === id ? { ...task, complete: !task.complete } : { ...task };
    });
    setTodoList(mapped_list);
  }

  // menghandle penghapusan semua task yang telah dicentang dengan cara filtering
  const handleDeleteComplete = () => {
    let filtered = todoList.filter(task => {
      return !task.complete;
    });
    console.log(filtered)
    setTodoList(filtered);
  }

  return (
    <div className='flex flex-col justify-center items-center gap-10 py-10 bg-slate-100'>
      <span className='font-bold text-3xl'>To Do List</span>

      { /* add todo */ }
      <form onSubmit={handleSubmitInput} className="flex flex-col items-center w-1/3 gap-5">
        <input className='w-full px-3 py-2 rounded-lg border border-blue-600' value={todoInput} type="text" onChange={handleChangeInput} placeholder="Insert things you want to do today"/>
        <button className='w-60 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg'>Insert</button>
      </form>

      { /* list todo */ }
      <div className='flex flex-col items-center w-1/3 gap-5'>
        <div className='w-full'>
        {todoList.map(todo => {
          return (
          <div className={todo.complete ? "strike" : ""}>
            <input className='mr-3' type="checkbox" checked={todo.complete} onClick={() => handleCheckComplete(todo.id)}/>
            {todo.task}
          </div>
          )
        })}
        </div>
        <button className='w-60 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg' onClick={handleDeleteComplete}>Delete all checked task</button>
      </div>
    </div>
  );
}

export default App;
