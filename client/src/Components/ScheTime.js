import React from 'react';
import '../css/grid.css';

const ScheTime = (props) => {
  
  var mon=0;
  var tue=0;
  var wed=0;
  var thrs=0;
  var fri=0;
  var sat=0;
  var sun=0;
  return (<>
    <div className="divTable">
    <table>
      <thead>
        <tr>
          <td></td>
          {props.showtime.map((val,index)=>{
            return <th  className='gridtimeWidth'>{val.time}</th>
          })}
       </tr>
        </thead>
        <tbody>
        <tr>
          <td>Monday</td>
          {props.showtime.map((val,index)=>{
           return <> {val.allweek !==undefined && val.allweek.filter(v => v.day === 'mon').map((innervar,i)=>{
              return <>
               {
               (innervar.day === 'mon' && innervar.row!==0) ?
               ( mon=(innervar.row-1),  <td colSpan={innervar.row} className="stage-green gridWidth">Available</td>):
               ( mon===0 ? <td></td> : (mon--,<></>))}
              </>
               })} </>
          })}
        </tr>
        <tr>
          <td>Tuesday</td>
          {props.showtime.map((val,index)=>{
           return <> {val.allweek !==undefined && val.allweek.filter(v => v.day === 'tue').map((innervar,i)=>{
              return <>
               {
               (innervar.day === 'tue' && innervar.row!==0) ?
               ( tue=(innervar.row-1),  <td colSpan={innervar.row} className="stage-green gridWidth">Available</td>):
               ( tue===0 ? <td></td> : (tue--,<></>))}
              </>
               })} </>
          })}
        </tr>
        <tr>
          <td>Wednesday</td>
          {props.showtime.map((val,index)=>{
           return <> {val.allweek !==undefined && val.allweek.filter(v => v.day === 'wed').map((innervar,i)=>{
              return <>
               {
               (innervar.day === 'wed' && innervar.row!==0) ?
               ( wed=(innervar.row-1),  <td colSpan={innervar.row} className="stage-green gridWidth">Available</td>):
               ( wed===0 ? <td></td> :(wed--,<></>))}
              </>
               })} </>
          })}
          </tr>
          <tr>
           <td>Thursday</td>
          {props.showtime.map((val,index)=>{
           return <> {val.allweek !==undefined && val.allweek.filter(v => v.day === 'thrs').map((innervar,i)=>{
              return <>
               {
               (innervar.day === 'thrs' && innervar.row!==0) ?
               ( thrs=(innervar.row-1),  <td colSpan={innervar.row} className="stage-green gridWidth">Available</td>):
               ( thrs===0 ? <td></td> : (thrs--,<></>))}
              </>
               })} </>
          })}
          </tr>
          <tr>
           <td>Friday</td>
          {props.showtime.map((val,index)=>{
           return <> {val.allweek !==undefined && val.allweek.filter(v => v.day === 'fri').map((innervar,i)=>{
              return <>
               {
               (innervar.day === 'fri' && innervar.row!==0) ?
               ( fri=(innervar.row-1),  <td colSpan={innervar.row} className="stage-green gridWidth">Available</td>):
               ( fri===0 ? <td></td> : (fri--,<></>))}
              </>
               })} </>
          })}
          </tr>
          <tr>
           <td>Saturday</td>
          {props.showtime.map((val,index)=>{
           return <> {val.allweek !==undefined && val.allweek.filter(v => v.day === 'sat').map((innervar,i)=>{
              return <>
               {
               (innervar.day === 'sat' && innervar.row!==0) ?
               ( sat=(innervar.row-1),  <td colSpan={innervar.row} className="stage-green gridWidth">Available</td>):
               ( sat===0 ? <td></td> : (sat--,<></>))}
              </>
               })} </>
          })}
          </tr>
          <tr>
           <td>Sunday</td>
          {props.showtime.map((val,index)=>{
           return <> {val.allweek !==undefined && val.allweek.filter(v => v.day === 'sun').map((innervar,i)=>{
              return <>
               {
               (innervar.day === 'sun' && innervar.row!==0) ?
               ( sun=(innervar.row-1),  <td colSpan={innervar.row} className="stage-green gridWidth">Available</td>):
               ( sun===0 ? <td></td> : (sun--,<></>))}
              </>
               })} </>
          })}
        </tr>
        </tbody>
    </table>
    </div>
</>);
}
 
export default ScheTime;