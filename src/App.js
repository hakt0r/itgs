
import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Model } from "./DataModel";
import { Checkbox } from '@material-ui/core';
import { Slider } from '@material-ui/core';

let defaultValue = {done:{}};
const data = localStorage.getItem('itgs');

if ( data ){
  try {
    defaultValue = JSON.parse(data);
  } catch (e) {

  }
}

function App() {
  const [state,setState] = useState(defaultValue);
  const toggle = (name)=> (e,v) => setState({...state,done:{...state.done,[name]:v}});
  useEffect( $=> localStorage.setItem('itgs',JSON.stringify(state)), [state] )
  return (
    <div className="App">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">@</TableCell>
              <TableCell align="right">@</TableCell>
              <TableCell align="right">Erledigt</TableCell>
              <TableCell align="left">Thema</TableCell>
              <TableCell align="right">Gebiet</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Model.map(([order,system,point,desc,area]) => {
              const key = `${system}${point}`; 
              return (
              <TableRow key={key}>
                <TableCell align="right">{order}</TableCell>
                <TableCell align="right">{system} {point}</TableCell>
                <TableCell align="right">
                  <Slider
                    name={key}
                    value={state.done[key]||0}
                    onChange={toggle(key)}
                    step={1}
                    marks
                    min={0}
                    max={4}
                  />
                </TableCell>
                <TableCell component="th" align="left">{desc}</TableCell>
                <TableCell scope="row" align="right">{area}</TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
