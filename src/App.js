import * as React from 'react';
import { useReducer, useRef, useEffect, useState } from 'react';
import { Rect } from 'react-konva';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Input from './input.js';
import Canvas from './canvas.js';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  [theme.breakpoints.up('md')]: {
    height: "95vh"
  }
}));

function valid(value) {
  if(!isNaN(value))
    return true;
}



export default function App() {

  const [tileRectComp, setTileRectComp] = useState([]);

  function reducer(state, action) {
    switch (action.type) {
      case 'height':
        setTileRectComp([]);
        const h = Number(action.payload);
        if(valid(h)) {     
          return {...state, height: h, area: state.width * h };
        }
        return state;
  
      case 'width':
        setTileRectComp([]);
        const w = Number(action.payload);
        if(!isNaN(w)) {
          return {...state, width: w, area: state.height * w };
        }
        return state;
      case 'tileheight':
        setTileRectComp([]);
        const th = Number(action.payload);
        if(valid(th)) {     
          return {...state, tileHeight: th, tileArea: state.tileWidth * th };
        }
        return state;
  
      case 'tilewidth':
        setTileRectComp([]);
        const tw = Number(action.payload);
        if(!isNaN(tw)) {
          return {...state, tileWidth: tw, tileArea: state.tileHeight * tw};
        }
        return state;
  
      case 'numTiles':
        var numX = 0, numY = 0, extra = 0, remX, remY;
        numY = Math.floor(state.height / state.tileHeight);
        numX = Math.floor(state.width / state.tileWidth); 
  
        remX = (state.height % state.tileHeight);
        remY = (state.width % state.tileWidth);
        extra = Math.ceil(state.area / (numX * state.tileWidth * remX
                  + numY * state.tileHeight * remY
                  + remX * remY));
        if(!isFinite(extra))
          extra = 0;
        return {...state, numTiles: numX * numY, numExtras: extra};
  
      default:
        return state;
    }
  }

  const initial = {
    height: 0,
    width: 0,
    area: 0,
    tileHeight: 0,
    tileWidth: 0,
    tileArea: 0,
    numTiles: 0,
    numExtras: 0
  }

  const [state, dispatch] = useReducer(reducer, initial);

  const itemRef = useRef(null);
  
  const [canvaProp, setCanvaProp] = useState({h: 0, w: 0});
  
  useEffect(() => {

    const styles = getComputedStyle(itemRef.current);
    console.log(parseFloat(styles.height));
    if(itemRef.current) 
      setCanvaProp({
        h: parseFloat(styles.height),
        w: parseFloat(styles.width)
      });
  }, [itemRef.current]);

  const contructRect = () => {
    var tileArray = [];
    var i;
    var j;
    for(i = 0; i <= state.width - state.tileWidth; i += state.tileWidth) {
      for(j = 0; j <= state.height - state.tileHeight; j += state.tileHeight) {
        tileArray.push(
          {
            x: i,
            y: j,
            w: state.tileWidth,
            h: state.tileHeight
          }        
        )
      }
    }
    var numX = 0, numY = 0, extra = 0, remX, remY;
        numY = Math.floor(state.height / state.tileHeight);
        numX = Math.floor(state.width / state.tileWidth); 
        remX = (state.height % state.tileHeight);
        remY = (state.width % state.tileWidth);
    
    for(var m = 0; m < numY; m++) {
      tileArray.push(
        {
          x: i,
          y: m * state.tileHeight,
          w: state.width - i,
          h: state.tileHeight,
        }
      )
    }
    for(var m = 0; m < numX; m++) {
      tileArray.push(
        {
          x: m * state.tileWidth,
          y: j,
          w: state.tileWidth,
          h: state.height - j,
        }
      )
    }
    tileArray.push(
      {
        x: numX * state.tileWidth,
        y: numY * state.tileHeight,
        w: state.width - i,
        h: state.height - j

      }
    )
    
    setTileRectComp(tileArray);
    console.log(tileRectComp);
  }

  return (
    <Box sx={{ flexGrow: 1, height: "100vh"}}>
      <Grid container spacing={2} sx={{height: "100vh"}}>
        <Grid item xs={12} md={3} sx={{height: "35vh"}}>
          <Item sx={{height: "30vh", overflow: "scroll"}}>
            <Input 
              state={state}
              dispatch={dispatch}
              contructRect={contructRect}
            />
          </Item>
        </Grid>
        <Grid item xs={12} md={9} sx={{height: "65vh"}}>
          <Item sx={{height: "60vh"}} ref={itemRef}>
            <Canvas
              canvaProp={canvaProp}
              state={state}
              tileRectComp={tileRectComp}
            />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}