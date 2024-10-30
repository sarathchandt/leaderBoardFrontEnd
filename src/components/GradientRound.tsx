import React from 'react'

type GradientRoundProps = {
    width:number;
    height:number;
   additionalStyle:string;
}

const GradientRound = ({additionalStyle  ,height,width}:GradientRoundProps) => {
  return (
    <div
            style={{ width: `${width}px`, height: `${height}px` }}
            className={`  rounded-full ${additionalStyle}`}
          ></div>
  )
}

export default GradientRound