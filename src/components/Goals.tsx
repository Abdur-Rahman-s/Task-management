import { useEffect, useState } from 'react';
import GoalImage from '/public/Goal.png';
import { CiEdit } from 'react-icons/ci';
import Alert from '../Reuse/Alert';

interface GoalProps {
    description: string;
    targetDate: string;
}

const Goals = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    const [goal, setGoal] = useState<string>('');
    const [time, setTime] = useState<string>(formattedDate);
    const [goals, setGoals] = useState<GoalProps[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [alertMessage, setAlertMessage] = useState<String | null>(null)

    const handleGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => setGoal(event.target.value);
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => setTime(event.target.value);

    const addGoal = () => {
        if (!goal.trim()) {
            setAlertMessage('Please enter a goal!')
            return;
        }
        if (goals.length > 0) {
            setAlertMessage('Multiple challenges are not acceptable.')
            return;
        }
        if (new Date(time) < currentDate) {
            setAlertMessage('Please select a valid future date.')
            return;
        }

        setGoals([{ description: goal, targetDate: time }]);
        resetForm();
    };




    const startEditing = (index: number) => {
        setEditIndex(index);
        setGoal(goals[index].description);
        setTime(goals[index].targetDate);
    };

    const updateGoal = () => {
        if (editIndex === null) return;

        if (!goal.trim()) {
            setAlertMessage('Please enter a goal!');
            return;
        }

        if (new Date(time) < currentDate) {
            setAlertMessage('Please select a valid future date.');
            return;
        }

        setGoals(goals.map((g, index) =>
            index === editIndex ? { description: goal, targetDate: time } : g
        ));

        setEditIndex(null);
        resetForm();
    };

    useEffect(()=> {
        setAlertMessage(null)
    } , [goal , time])

    const resetForm = () => {
        setGoal('');
        setTime(formattedDate);
    };

    return (
        <section className='w-full sm:w-[400px] bg-gradient-to-br from-[#D1CDFD] to-[#9E92F5] p-6 rounded-2xl shadow-lg'>
            {alertMessage && (
                <Alert
                    message={`${alertMessage}`}
                    onClose={() => setAlertMessage(null)}
                />
            )}


            <div className='flex flex-col items-center'>
                <img src={GoalImage} alt='Goal' className='h-24 mb-4' />
                <h1 className='text-3xl text-[#534591] font-extrabold mb-6'>Set Your Goal</h1>
            </div>

            <div className={`flex flex-col gap-4 ${goals.length > 0 && editIndex === null ? 'hidden' : 'block'}`}>
                <input type='text' placeholder='Add Your Goal' className='inputStyle' value={goal} onChange={handleGoalChange} />
                <input type='date' min={formattedDate} className='inputStyle' value={time} onChange={handleDateChange} />
                <button
                    onClick={editIndex !== null ? updateGoal : addGoal}
                    className={`w-full py-3 border-dashed border-white border-2 ${editIndex !== null ? 'bg-emerald-300 hover:bg-emerald-600' : 'bg-[#FDCB6E] hover:bg-[#E5A243]'} text-black font-semibold rounded-xl shadow-md transition-all cursor-pointer`}
                >
                    {editIndex !== null ? 'Update Goal' : goals.length > 0 ? 'Goal Added' : 'Set Your Goal'}
                </button>
            </div>

            <div className='mt-6'>
                {goals.map((g, index) => (
                    <div key={index} className='flex flex-col gap-2 bg-white p-4 rounded-xl shadow-md text-center mb-4'>
                        <h1 className='text-lg font-semibold text-[#534591]'>MY GOAL</h1>
                        <p className='text-gray-700 font-bold text-xl'>{g.description}</p>
                        <p className='text-gray-500 text-sm'>Target Date: {g.targetDate}</p>
                        <div className='flex justify-end'>
                            <button onClick={() => startEditing(index)} className='text-[#534591] cursor-pointer h-[40px] w-[40px] flex items-center justify-center rounded-full bg-amber-300 hover:text-[#42377D] transition-all text-xl mt-2'>
                                <CiEdit />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Goals;
