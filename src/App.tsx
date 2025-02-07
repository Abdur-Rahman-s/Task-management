
import './App.css'
import AddTask from './components/AddTask'
import Goals from './components/Goals'
import Navbar from './Reuse/Navbar'


function App() {

  return (
    <>
      <Navbar />
      <section className='container mx-auto md:flex justify-center gap-12 mt-9' >

        <Goals />
        <AddTask />
      </section>
    </>
  )
}

export default App
