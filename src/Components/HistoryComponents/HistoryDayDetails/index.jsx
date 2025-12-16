import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'

import Row from './Row'

export default function HistoryDayDetails(props) {
  const { date, history } = props;
  const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const chosenDate = `${Months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  const dataDate = moment(date).format('YYYY-MM-DD');

  const customColor = props.customColor ? '#FF9435' : '#1e88e5';


  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow style={{background: customColor, color: 'white'}}>
            <TableCell style={{color: 'white'}} colSpan={3}>{chosenDate}</TableCell>
            <TableCell style={{color: 'white'}} align="right" colSpan={3}>Completed Excercises</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            history && history[dataDate]
              ? history[dataDate].map((row, index) => (<Row key={(row.courseName || row.exerciseName) + index} row={row} date={date} />))
              : <TableRow>
                  <TableCell align='center' colSpan={6}>
                    <Typography variant='h6' align='center'> No Exercises logged for {` ${Months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}  </Typography>
                  </TableCell>
                </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
