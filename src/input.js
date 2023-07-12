import { TextField, Box, Typography, Button } from "@mui/material";
import { styled } from '@mui/material/styles';

const BoxStyled = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "space-around"      
  },

  [theme.breakpoints.up('md')]: {
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "flex-start"      
  }
}));

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  margin: 5
}));

export default function Input(props) {
  const { state, dispatch } = props;
  return(
    <Box
      sx={{
        height:"100%",
        display: "inline-flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignContent: "flex-start"
      }}>
    <BoxStyled
      sx={{
        display: "inline-flex",
        width:"90%",
        flexDirection: "column",
        justifyContent: "flex-start",
        marginBottom: 4
      }}
    >
      <Typography variant="caption" color="black" gutterBottom>
        Floor/Floor Dimensions
      </Typography>
      <TextFieldStyled
        id="width"
        label="Width"
        size="small"
        value={state.width}
        onChange={e => dispatch({type: 'width', payload: e.target.value})}
      />
      <TextFieldStyled
        id="height"
        label="Height"
        size="small"
        value={state.height}
        onChange={e => dispatch({type: 'height', payload: e.target.value})}
      />
      <TextFieldStyled
        id="area"
        label="Area"
        size="small"
        value={state.area + ' m²'}
        InputProps={{
          readOnly: true
        }}
        variant="filled"
      />
    </BoxStyled>
    
    <BoxStyled
      sx={{
        display: "flex",
        width: "90%",
        flexDirection: "column",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        marginBottom: 4
      }}
    >
    <Typography variant="caption" color="black" gutterBottom>
        Tile Dimensions
      </Typography>
      
      <TextFieldStyled
        id="tilewidth"
        label="Tile Width"
        size="small"
        value={state.tileWidth}
        onChange={e => dispatch({type: 'tilewidth', payload: e.target.value})}
      />
      <TextFieldStyled
        id="tileheight"
        label="Tile Height"
        size="small"
        value={state.tileHeight}
        onChange={e => dispatch({type: 'tileheight', payload: e.target.value})}
      />
      <Button 
        onClick={e => { dispatch({type: 'numTiles'}); props.contructRect()}}
        variant="contained"
        width="50%"
        padding={5}
      >
        Calculate
      </Button>
    </BoxStyled>

    <BoxStyled
      sx={{
        display: "flex",
        width: "90%",
        flexDirection: "column",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        marginBottom: 4
      }}
    >
    <Typography variant="caption" color="black" gutterBottom>
        No. of Tiles Required
      </Typography>
      
      <TextFieldStyled
        id="no"
        label="BOQ Apprx."
        size="small"
        value={state.numTiles + " + " + state.numExtras}
      />
    </BoxStyled>
    </Box>
  )
}
