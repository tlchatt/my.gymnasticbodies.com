import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  setList: {
    padding: 0,
    margin: 0,
    listStyle: 'none'
  },
  dropDown: {
    padding: '0 12px',
    [theme.breakpoints.down('xs')]: {
      padding: 0
    },
  }
}));

export default function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const warmUpsIds = [42, 255, 302]

  const isStretchFollow = (id) => [287, 286, 288].includes(id);

  // const courseIconToLevel = {
  //   'AP': 'AutoPilot',
  //   'BYO': 'Build Your Own'
  // }

  useEffect(() => {
    if (open) setOpen(false);
    return () => setOpen(false);
    // eslint-disable-next-line
  }, [props.date])

  const handleName = (id) => {
    let name = 'Set'

    if (id && id === 42) {
      name = 'WRS';
    }

    if (id && (id === 255 || id === 302 )) {
      name = 'WU';
    }
    return name;
  }


  let completed = 0;
  let legacyHistory;
  if (row.type === 'Programs') {
    row.progression.forEach(prog => {
      if (prog.status > 0) {
        completed++;
      }
    })
    legacyHistory = (
      <TableRow>
        <TableCell className={classes.dropDown} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {/* <Typography variant="h6" gutterBottom component="div">
                History
              </Typography> */}
              <Table size="small" aria-label="history">
                <TableHead>
                  <TableRow>
                    <TableCell>Progression</TableCell>
                    <TableCell>Sets</TableCell>
                    <TableCell align="right">Completed</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.progression.map((historyRow) => (
                    <React.Fragment key={historyRow.name}>
                      <TableRow>
                        <TableCell component="th" scope="row" style={{width: '50%'}}>
                        <strong>Strength:</strong> {historyRow.name} { warmUpsIds.includes(historyRow.exerciseId) || isStretchFollow(historyRow.exerciseId) ? null : historyRow.setsAndReps}
                        </TableCell>
                        <TableCell style={{ padding: '6px 0 6px 10px' }}>
                          <ul className={classes.setList}>
                            {
                              historyRow.setsAndRepsList.map((set, index) => {
                                if (isStretchFollow(historyRow.exerciseId)) {
                                  return <li key={index}></li>
                                }
                                return <li key={index}>{handleName(historyRow.exerciseId)} {set.sets}: {set.repsCompleted}</li>
                              })
                            }
                          </ul>
                        </TableCell>
                        <TableCell align="right">{
                          isStretchFollow(historyRow.exerciseId)
                            ? historyRow.status === 100 ? 'Yes' : 'No'
                            : `${historyRow.status}%`
                        }
                        </TableCell>
                      </TableRow>
                      {
                        historyRow.mobilityName
                          ? <TableRow>
                              <TableCell component="th" scope="row">
                                <strong>Mobility:</strong> {historyRow.mobilityName}
                              </TableCell>
                              <TableCell style={{ padding: '6px 0 6px 10px' }}>
                                <ul className={classes.setList}>
                                  <li>{ historyRow.mobSetsReps}</li>
                                </ul>
                              </TableCell>
                            <TableCell align="right">{ historyRow.mobCompleted === 'true' ? '100%' : '0%' }</TableCell>
                            </TableRow>
                          : null
                      }
                      {
                        historyRow.notes ? <TableRow key={`${historyRow.name} notes`}><TableCell colSpan={6}><b>Notes:</b> {historyRow.notes}</TableCell></TableRow> : null
                      }
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <React.Fragment>
      <TableRow className={ row.type === 'Programs' ? classes.root : null }>
        <TableCell style={{ display: 'flex', alignItems: 'center' }} component="th" scope="row" colSpan={3}>
          {
            row.courseName || row.exerciseName
          }
          {
            row.type === 'Programs'
              ? <IconButton style={{ marginLeft: 8 }} aria-label="expand row" size="small" onClick={() => setOpen(!open)}>{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</IconButton>
              : null
          }
          {
            row.type==="Exercise" ? ` : ${row.rounds}x${row.repsOrSecs} - ${row.level}` : null
          }
        </TableCell>
        <TableCell align="right" colSpan={3}>{ row.type === 'Classes' || row.type==="Exercise" ? 1 : row.type === 'Programs' ? completed : 'Logged'}</TableCell>
      </TableRow>
      {
        row.type !== 'Classes'
          ? legacyHistory
          : null
      }

    </React.Fragment>
  );
}
