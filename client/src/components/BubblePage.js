import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import Bubbles from './Bubbles';
import ColorList from './ColorList';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  const getColors = () => {
    // set that data to the colorList state property
    axiosWithAuth()
      .get('/api/colors')
      .then((res) => {
        console.log(res);
        //res.data
        setColorList(res.data);
      })
      .catch((err) => console.log(err));
  };

  //use effects for get color
  useEffect(() => {
    getColors();
  }, []);

  return (
    <>
      <ColorList 
        colors={colorList} 
        updateColors={setColorList} 
        getColors={getColors} 
        />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
