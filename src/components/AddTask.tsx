import React, { useState, useEffect } from 'react';
import { CiEdit } from 'react-icons/ci';
import { AiTwotoneDelete } from "react-icons/ai";

interface TaskProps {
    title: string;
    subtitle: string;
    priority: string;
    time: string;
}

const AddTask = () => {
    const currentDate = new Date().toISOString().slice(0, 16);

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [time, setTime] = useState(currentDate);
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
    const handleSubtitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setSubtitle(event.target.value);
    const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => setPriority(event.target.value);
    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => setTime(event.target.value);

    const addTask = () => {
        if (!title.trim()) {
            setAlertMessage('Please enter a task title!');
            return;
        }
        if (new Date(time) < new Date()) {
            setAlertMessage('Please select a valid future date and time.');
            return;
        }

        const newTask = { title, subtitle, priority, time };
        if (editIndex !== null) {
            const updatedTasks = tasks.map((task, index) => (index === editIndex ? newTask : task));
            setTasks(updatedTasks);
            setEditIndex(null);
        } else {
            setTasks([...tasks, newTask]);
        }
        resetForm();
    };

    const resetForm = () => {
        setTitle('');
        setSubtitle('');
        setPriority('Medium');
        setTime(currentDate);
    };

    const startEditing = (index: number) => {
        const task = tasks[index];
        setTitle(task.title);
        setSubtitle(task.subtitle);
        setPriority(task.priority);
        setTime(task.time);
        setEditIndex(index);
    };

    const deleteTask = (index: number) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };
    

    useEffect(() => {
        setAlertMessage(null);
    }, [title, subtitle, priority, time]);

    return (
        <section className="bg-[#FFFBEA] p-6 rounded-3xl shadow-xl w-full sm:w-[400px] border border-yellow-300">
            {alertMessage && (
                <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-md border border-red-300">
                    {alertMessage}
                </div>
            )}

            <div className="flex items-center gap-2 mb-6">
                <div className="text-2xl">📝</div>
                <h1 className="text-lg font-handwritten text-yellow-700">Task Manager</h1>
            </div>

            <div className="space-y-4">
                {/* Title Input */}
                <div>
                    <label htmlFor="title" className="block text-yellow-600 font-medium">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="What's your task?"
                        className="w-full p-3 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-yellow-50"
                    />
                </div>

                {/* Subtitle Input */}
                <div>
                    <label htmlFor="subtitle" className="block text-yellow-600 font-medium">
                        Subtitle
                    </label>
                    <input
                        type="text"
                        id="subtitle"
                        value={subtitle}
                        onChange={handleSubtitleChange}
                        placeholder="Add a short description"
                        className="w-full p-3 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-yellow-50"
                    />
                </div>

                {/* Priority Select */}
                <div>
                    <label htmlFor="priority" className="block text-yellow-600 font-medium">
                        Priority
                    </label>
                    <select
                        id="priority"
                        value={priority}
                        onChange={handlePriorityChange}
                        className="w-full p-3 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-yellow-50"
                    >
                        <option value="High" >High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                {/* Time Input */}
                <div>
                    <label htmlFor="time" className="block text-yellow-600 font-medium">
                        Time
                    </label>
                    <input
                        type="datetime-local"
                        id="time"
                        value={time}
                        onChange={handleTimeChange}
                        className="w-full p-3 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-yellow-50"
                    />
                </div>
            </div>

            {/* Add/Update Task Button */}
            <button
                onClick={addTask}
                className="mt-4 w-full py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            >
                {editIndex !== null ? 'Update Task' : 'Add Task'}
            </button>

            {/* Task List */}
            <div className="mt-6 space-y-4">
                {tasks.map((task, index) => (
                    <div
                        key={index}
                        className="bg-[#FFFBEA] p-4 rounded-lg flex flex-col gap-1 shadow-md border border-yellow-300"
                    >
                        <h2 className="text-lg font-bold font-handwritten text-yellow-700">{task.title}</h2>
                        <p className=" font-semibold text-md text-yellow-600">{task.subtitle}</p>

                        <p className="text-sm text-yellow-600">
                            Priority:
                            <span
                                className={`px-2 ml-2 py-1 rounded ${task.priority === 'High'
                                    ? 'bg-green-600/10 text-green-800'
                                    : task.priority === 'Medium'
                                        ? 'bg-amber-600/10 text-orange-800'
                                        : task.priority === 'Low'
                                            ? 'bg-cyan-600/10 text-cyan-800'
                                            : ''
                                    }`}

                            >
                                {task.priority}
                            </span>
                        </p>

                        <p className="text-sm text-yellow-600">Time: {task.time}</p>
                        <div className='flex items-center justify-between' >
                            <button
                                onClick={() => startEditing(index)}
                                className="text-yellow-600 mt-2 cursor-pointer text-sm flex items-center gap-1 hover:text-yellow-800"
                            >
                                <CiEdit /> Edit Task
                            </button>
                            <button 
                                onClick={()=> deleteTask(index)}
                                className=' h-5 w-5 mt-2 hover:text-red-600 cursor-pointer text-yellow-600 ' >
                                <AiTwotoneDelete />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AddTask;