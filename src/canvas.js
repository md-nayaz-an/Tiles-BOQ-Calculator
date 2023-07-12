import { Stage, Layer, Rect } from "react-konva";
import { useEffect, useState } from "react";
export default function Canvas(props) {
  var scaleVar;

  const padding = 5;
  
  const [canvaProp, setCanvaProp] = useState({
    h: props.canvaProp.h - padding * 2,
    w: props.canvaProp.w - padding * 2
  })
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setCanvaProp({
      h: props.canvaProp.h - padding * 2,
      w: props.canvaProp.w - padding * 2
    });
    if(props.state.height > props.state.width) {
      scaleVar = canvaProp.h / props.state.height;
    }
    else {
      scaleVar = canvaProp.w / props.state.width;
    }
    setScale(scaleVar);

    console.log(props.canvaProp);
    console.log(scale * props.state.width, scale * props.state.height);
    
    
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
          width={props.state.width * scale}
          height={props.state.height * scale}
          fill="#c5c7c7"
          stroke="#646666"
      />
      {props.tileRectComp.map((item) => {
        return <Rect
          x={padding + item.x * scale}
          y={padding + item.y * scale}
          width={item.w * scale}
          height={item.h * scale}
          fill="#8afff7"
          stroke="#646666"
        />
      })
      }</Layer>
    </Stage>
  )
}