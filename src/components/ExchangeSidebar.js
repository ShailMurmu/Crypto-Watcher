import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { 
    Button,
    MenuItem,
    Select,
    Typography,
    } from "@material-ui/core";
import axios from "axios";
import { ExchangeRate } from "../config/api";

const useStyles = makeStyles({
  container: {
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospace",
  },
  profile: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%",
    color: "white",
  },
  exch: {
    height: "8%",
    width: "30%",
    backgroundColor: "#EEBC1D",
    marginTop: 20,
    alignItems: "center"
  },
  picture: {
    width: 200,
    height: 200,
    cursor: "pointer",
    backgroundColor: "#EEBC1D",
    objectFit: "contain",
  },
  watchlist: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "scroll",
  },
});

function ExchangeSidebar() {
  const classes = useStyles();
  const [state, setState] = useState({
    left: false
  });

  const [exchRate, setExchRate] = useState([]);
  const [exchData, setExchData] = useState(['', {}]);

  const fetchExchangeRates = async () => {
    const { data } = await axios.get(ExchangeRate());

    setExchRate(Object.entries(data.rates));
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    
    if(open){
      fetchExchangeRates();
    }

    setState({ ...state, [anchor]: open });
  };

  const handleExchData = (exchSymbol) => {
    const exchObj = exchRate.filter(el => el[0] === exchSymbol);
    if(exchObj.length > 0){
      setExchData(exchObj[0]);
    }
  };
  

  return (
    <div>
      {["left"].map((anchor, index) => (
        <React.Fragment key={index}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            style={{ width: "auto", height: 40, margin: 10, cursor: "pointer" }}
            variant="outlined"
          >Exchange Rate</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.container}>
              <div className={classes.profile}>
                <div>
                <Typography
                    variant="h4"
                    style={{
                        width: "100%",
                        fontSize: 25,
                        textAlign: "center",
                        fontWeight: "bolder",
                        wordWrap: "break-word",
                      }}
                    >
                    1 BTC                      
                </Typography>
                <Typography
                    variant="h5"
                    style={{
                    color: "white",
                    textAlign: "center",
                    textTransform: "capitalize",
                    fontFamily: "Montserrat",
                    }}
                >
                    = 
                </Typography>
                <Select
                    variant="outlined"
                    labelId="curr-simple-select-label"
                    id="curr-simple-select"
                    value={exchData[0]}
                    style={{ width: 85, height: 40, margin: 10 }}
                    onChange={(e) => handleExchData(e.target.value)}
                    >
                        {
                        exchRate.map((exchange, idx) => {
                            return <MenuItem key={idx} value={exchange[0]}>{exchange[0].toUpperCase()}</MenuItem>
                        })
                        }
                </Select>
                </div>
                <div>
                <Typography
                    variant="h5"
                    style={{
                    color: "white",
                    textTransform: "capitalize",
                    fontFamily: "Montserrat",
                    }}
                >
                    Name : {exchData[1].name}
                </Typography>
                <Typography
                    variant="h5"
                    style={{
                    color: "white",
                    textTransform: "capitalize",
                    fontFamily: "Montserrat",
                    }}
                >
                    Value : {exchData[1].value} {exchData[1].unit}
                </Typography>
                  {/* <span>Name : {exchData[1].name}</span><br></br>
                  <span>Value : {exchData[1].value} {exchData[1].unit}</span> */}
                </div>
              </div>
              <Button
                variant="contained"
                className={classes.exch}
                onClick={toggleDrawer(anchor, false)}
              >
                Close
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default ExchangeSidebar;
