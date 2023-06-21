import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header, MainContainer, CreateContainer } from './components'
import { AnimatePresence } from 'framer-motion'
import { getAllFoodItems } from './utils/firebaseFunctions'
import { useStateValue } from './context/StateProvider'
import { actionType } from './context/reducer'

export const App = () => {
  // eslint-disable-next-line
  const [{ }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then(data => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data
      });
    });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [])

  return (
    <AnimatePresence mode='wait'>
      <div className='w-full max-w-screen h-auto flex flex-col bg-primary'>
        <Header />
        <main className='mt-14 md:mt-20 p-4 md:px-16 w-full'>
          <Routes>
            <Route path='/*' element={<MainContainer />} />
            <Route path='/createItem' element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  )
}

export default App