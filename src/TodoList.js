import React from 'react';
import {v4 as uuidv4} from "uuid";
import { useState } from 'react';

const TodoList = () => {

    const [inputTask, setInputTask] = useState("");
    const [list, setList] = useState([]);

    const handleInputChange = (event) => {
        setInputTask(event.target.value);
    };

    const handleAddTodo = (task) => {
        const newTask = {
            id: uuidv4(),
            todo: task
        };

        setList([...list, newTask]);
        setInputTask("");
    }

    const handleDeleteTodo = (taskId) => {
        const newList = list.filter(
            (task) => task.id !== taskId
        );

        setList(newList);
    }

    return (
        <div className='Todo'>
            <h1>My Todo-List</h1>
            <div className='Top'>
                <input 
                    className='input' 
                    type='text' 
                    value={inputTask} 
                    onChange={handleInputChange} 
                    placeholder='Enter your task'
                />

                <button 
                    className='btn' 
                    onClick={() => handleAddTodo(inputTask)}
                >ADD</button>
            </div>

            <ul>
                {list.map((task) => (
                    <li className='task' key={task.id}> 
                        {task.todo}

                        <button onClick={() => handleDeleteTodo(task.id)}>
                            Delete
                        </button>
                    
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default TodoList;