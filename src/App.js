import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import "./App.css";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import CloseIcon from "@material-ui/icons/Close";

const countriesURL = "https://restcountries.eu/rest/v2/all";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  drawerWidh: {
    width: "250px"
    // backgroundColor : "green",
    // height : '100%'
  },
  closeIcon: {
    cursor: "pointer"
  }
});

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [open, setOpen] = useState(false);
  const [list, setList] = useState({
    name: "",
    capital: "",
    img: "",
    population: "",
    region: "",
    languages: [],
    currencies: [],
    nativeName: ""
  });

  const classes = useStyles();

  const getCountriesWithAxios = async () => {
    const response = await axios.get(countriesURL);
    setCountriesData(response.data);
    setCountriesData(response.data);
  };

  useEffect(() => {
    getCountriesWithAxios();
  }, []);

  function openDrawer(e) {
    console.log(e);
    setList({
      name: e.name,
      capital: e.capital,
      img: e.flag,
      population: e.population,
      region: e.region,
      languages: e.languages,
      currencies: e.currencies,
      nativeName: e.nativeName
    });
    setOpen(true);
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Flag</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Capital</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Population</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Region</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countriesData.map((country) => (
                  <TableRow
                    classes={{
                      root: classes.closeIcon
                    }}
                    onClick={() => openDrawer(country)}
                  >
                    <TableCell component="th" scope="row">
                      {country.name}
                    </TableCell>
                    <TableCell align="right">
                      <img src={country.flag} alt="" width="32px" />
                    </TableCell>
                    <TableCell align="right">{country.capital}</TableCell>
                    <TableCell align="right">{country.population}</TableCell>
                    <TableCell align="right">{country.region}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
            <CloseIcon
              classes={{
                root: classes.closeIcon
              }}
              onClick={() => setOpen(false)}
            />
            <List className={classes.drawerWidh}>
              <ListItem>
                {" "}
                <img src={list.img} alt="flag" height="70px" />
              </ListItem>
              <Divider />
              <ListItem>{"Name : " + list.name}</ListItem>
              <ListItem> {"Capital : " + list.capital} </ListItem>
              <ListItem> {"Region : " + list.region} </ListItem>
              <ListItem> {"Population : " + list.population} </ListItem>
              <ListItem>{"Native Name : " + list.nativeName}</ListItem>
              <Divider />
              <ListItem>
                {
                  <>
                    <p>{"Languages"}</p>
                    <ul>
                      {list.languages.map((lang) => (
                        <li>{lang.name}</li>
                      ))}
                    </ul>
                  </>
                }
              </ListItem>
              <Divider />
              <ListItem>
                {
                  <>
                    <p>{"Currencies"}</p>
                    <ul>
                      {list.currencies.map((curr) => (
                        <li>{curr.name}</li>
                      ))}
                    </ul>
                  </>
                }
              </ListItem>
            </List>
          </Drawer>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
