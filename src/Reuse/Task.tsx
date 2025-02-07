

import { CiEdit } from 'react-icons/ci';
import { CiStar } from "react-icons/ci";

interface TaskProps {
  title: string,
  subtitle: string,
  time: string,
  items: number,
  priority: String
}

const Task = ({ title, subtitle, time,  items, priority }: TaskProps) => {

  // const [task, setTask] = useState({
  //   Title: title,
  //   SubTitle: subtitle,
  //   Time: time,
  //   Point: points,
  //   Items: items,
  //   Priority: priority
  // })



  return (
    <div className="bg-white rounded-lg p-6 shadow-sm max-w-2xl">

      <div className="border-b border-gray-100 last:border-0 py-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 text-base">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            <p className="text-xs text-gray-400 mt-2">{time}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gray-100 w-8 h-8 flex items-center justify-center">
                <span className="text-sm cursor-pointer text-gray-600"><CiStar/></span>
              </div>
              <div className="text-sm text-gray-600">{items}</div>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-medium `}>
              {priority}
            </span>
          </div>
        </div>
      </div>


      <button className="flex cursor-pointer items-center gap-2 mt-4 text-gray-400 hover:text-gray-600 transition-colors">
        <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
          <span className="text-lg"><CiEdit /></span>
        </div>
        <span className="text-sm">Edit Task</span>
      </button>
    </div>
  );
};

export default Task;