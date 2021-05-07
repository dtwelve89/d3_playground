import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Scatterplot from './Scatterplot';
import phl from '../data/phl_hec_all_confirmed.csv';
import * as d3 from 'd3';

const filteredList = [
  'P. Atmosphere Class',
  'P. Composition Class',
  'P. Disc. Method',
  'P. Habitable Class',
  'P. Mass Class',
  'P. Name',
  'P. Name KOI',
  'P. Name Kepler',
  'P. SPH',
  'P. Zone Class',
  'S. Constellation',
  'S. Name',
  'S. Name HD',
  'S. Name HIP',
  'S. Type',
  'S. [Fe/H]',
];

const Home = () => {
  const [data, setData] = useState([]);
  const [xVar, setXvar] = useState('P. ESI');
  const [yVar, setYvar] = useState('P. Radius (EU)');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await d3.csv(phl);
    setData(data);
  };

  const options =
    data.length === 0
      ? []
      : Object.keys(data[1]).filter(option => !filteredList.includes(option));

  const allData = data.map(datum => ({ x: datum[xVar], y: datum[yVar] }));

  return (
    <div className='container'>
      <Navbar />
      <div className='control-container'>
        <div className='control-wrapper'>
          <label htmlFor='xVar'>X-Axis: </label>
          <select
            id='xVar'
            value={xVar}
            className='custom-select'
            onChange={e => setXvar(e.target.value)}
          >
            {options
              .filter(option => option !== yVar)
              .map(option => (
                <option key={option}>{option}</option>
              ))}
          </select>
        </div>

        <div className='control-wrapper'>
          <label htmlFor='yVar'>Y-Axis: </label>
          <select
            id='yVar'
            value={yVar}
            className='custom-select'
            onChange={e => setYvar(e.target.value)}
          >
            {options
              .filter(option => option !== xVar)
              .map(option => (
                <option key={option}>{option}</option>
              ))}
          </select>
        </div>
      </div>
      <Scatterplot xTitle={xVar} yTitle={yVar} data={allData} />
    </div>
  );
};

export default Home;
