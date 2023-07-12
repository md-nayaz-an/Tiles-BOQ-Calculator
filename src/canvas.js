import { Stage, Layer, Rect } from "react-konva";
import { useEffect, useState } from "react";
export default function Canvas(props) {
  var scaleX,scaleY;

  const padding = 5;
  
  const [canvaProp, setCanvaProp] = useState({
    h: props.canvaProp.h - padding * 2,
    w: props.canvaProp.w - padding * 2
  })
  const [scale, setScale] = useState({x: 1, y: 1});

  useEffect(() => {
    setCanvaProp({
      h: props.canvaProp.h - padding * 2,
      w: props.canvaProp.w - padding * 2
    });
    if(props.state.height > props.state.width) {
      scaleY = canvaProp.h / props.state.height;
      scaleX = canvaProp.w / props.canvaProp.h * scaleY;
    }
    else {
      scaleX = canvaProp.w / props.state.width;
      scaleY = canvaProp.h / props.canvaProp.w * scaleX;
    }
    setScale({x: scaleX, y: scaleY});

    console.log(props.canvaProp);
    console.log(scaleX * props.state.width, scaleY * props.state.height);
    
    
    return
  }, [props]);


  return(
    <Stage
        width={props.canvaProp.w}
        height={props.canvaProp.h}
      style={{
        //backgroundColor: "blue"
      }}
    >
      <Layer>
      <Rect
          x={5}
          y={5}
          width={props.state.width * scale.x}
          height={props.state.height * scale.y}
          fill="#c5c7c7"
          stroke="#646666"
      />
      {props.tileRectComp.map((item) => {
        return <Rect
          x={padding + item.x * scale.x}
          y={padding + item.y * scale.y}
          width={item.w * scale.x}
          height={item.h * scale.y}
          fill="#8afff7"
          stroke="#646666"
        />
      })
      }</Layer>
    </Stage>
  )
}