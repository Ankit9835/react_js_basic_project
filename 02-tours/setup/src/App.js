import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'
function App() {
  const[loading,setLoading] = useState(true);
  const[tours,setTour] = useState([]);

  const removeTour = (id) => {
    const newTour = tours.filter((tour) => tour.id !== id)
    setTour(newTour);
  }

  const fetchTour = async () => {
    setLoading(true);
      try{
        const response = await fetch(url);
        const tours = await response.json();
        setLoading(false);
        setTour(tours);
        console.log(tours);
      } catch(error) {
        setLoading(false);
      }
  }

  useEffect(() => {
    fetchTour()
  }, []);

  if(loading){
    return (
      <main>
          <Loading />
      </main>
    )
  }
  if(tours.length === 0){
    return (
      <main>
          Tours Not Available
          <button className='btn' onClick={fetchTour}>
            Refresh
          </button>
      </main>
    )
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour}/>
    </main>
  )
}

export default App
