import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
// import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  drawerWidh: {
    width: "250px"
  }
});

function DrawerList({ list }) {
  const classes = useStyles();

  return (
    <List className={classes.drawerWidh}>
      <ListItem>
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
  );
}

export default DrawerList;
