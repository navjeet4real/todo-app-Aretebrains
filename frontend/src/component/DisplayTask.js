import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { GetCategory } from '../redux/slices/app';
import { Stack } from '@mui/material';



const DisplayTask = () => {
  const dispatch = useDispatch();
  const { display } = useSelector((state) => state.app);
  console.log(display, "hhhhhhhhhhhhhhh")
  const [name, setName] = useState();


  return (
    <>
      <Stack sx={{ maxWidth: 400 }}>
      
      </Stack>
      {/* {
      display && display
    } */}
    </>
  )
}

export default DisplayTask
