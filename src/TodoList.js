import React from 'react';
import {v4 as uuidv4} from "uuid";
import { useState } from 'react';

const TodoList = () => {

    const [inputTask, setInputTask] = useState("");
    const [list, setList] = useState([]);
    const [editTaskID, setEditTaskID] = useState(null);
    const [editTask, setEditTask] = useState("");

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

    const handleEditTodo = (taskId, updatedTask) => {
        const updatedList = list.map((task) => 
            taskId === task.id ? {...task, todo: updatedTask} : task
        );

        setList(updatedList);
    }

    const handleSaveEdit = (taskId) => {
        handleEditTodo(taskId, editTask);

        setEditTaskID(null);
        setEditTask("");
    }

    const handleCancelEdit = () => {
        setEditTaskID(null);
        setEditTask("");
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
                        {editTaskID === task.id ? (
                            <div>
                                <div>
                                    <input 
                                        type='text'
                                        className='input'
                                        value={editTask}
                                        onChange={(e) => setEditTask(e.target.value)}
                                    />
                                </div>

                                <button onClick={() => handleSaveEdit(task.id)}>Save</button>
                                <button onClick={handleCancelEdit}>Cancel</button>

                            </div>
                        ) : (
                            <div>
                                {task.todo}

                                <button onClick={() => {
                                    setEditTaskID(task.id);
                                    setEditTask(task.todo);
                                }}>Edit</button>
                            </div>
                        )}

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