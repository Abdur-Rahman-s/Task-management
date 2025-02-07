
import Logo from '/public/Logo.svg'
import { IoBagAdd } from "react-icons/io5";



const Navbar = () => {
   
    return (
        <nav className='container mx-auto ' >
            <div className="navbar bg-base-100 flex ">
                <div className="flex-1">

                    <img src={Logo} alt="Logo" className='h-[100px]' />

                </div>
                <div className="flex items-center justify-center gap-4">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div >
                                {/* add button  */}
                                <button  className=" cursor-pointer bg-indigo-600 text-white hover:bg-indigo-400 transition-colors flex items-center gap-4 px-3 py-2 rounded-md border-dashed border-2 "   >
                                    <span>Sing up</span>
                                </button>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </nav>
    )
}

export default Navbar