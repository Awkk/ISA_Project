import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const EndPointRequestTable = ({ data }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Container>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Method</TableCell>
              <TableCell align="center">Endpoint</TableCell>
              <TableCell align="center">Requests</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.api_id}>
                <TableCell align="center">{row.method}</TableCell>
                <TableCell align="center">{row.endpoint}</TableCell>
                <TableCell align="center">{row.request}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </TableContainer>
  );
};

export default EndPointRequestTable;
