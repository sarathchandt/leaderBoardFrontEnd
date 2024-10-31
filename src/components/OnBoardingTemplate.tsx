import React, {  ReactNode, useEffect, useState } from 'react'
import GradientRound from './GradientRound';
import GradientButton from './GradientButton';

type OnBoardingTemplateProps = {
    children:ReactNode
    mainTitle:string;
    firstRoundGradientStyle:string;
    secondRoundGradientStyle:string;
}

const OnBoardingTemplate = ({children,firstRoundGradientStyle,mainTitle,secondRoundGradientStyle}:OnBoardingTemplateProps) => {

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    useEffect(() => {
        const handleResize = () => {
          setWidth(window.innerWidth);
          setHeight(window.innerHeight);
        };
    
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);
    
      const dynamicWidth =
        Math.floor((width * 20) / 100) > 150 ? Math.floor((width * 20) / 100) : 150;
      const dynamicHeight = (height * 70) / 100 > 600 ?(height * 70) / 100 :600
    
      return (
        <div className="w-screen h-screen  relative">

          <div className="h-full w-full grid md:grid-cols-2 grid-cols-1">
            <div className=" h-full hidden md:block relative "></div>
            <div className=" h-full  relative z-10 ">
              <GradientRound
                height={dynamicWidth}
                width={dynamicWidth}
                additionalStyle={firstRoundGradientStyle}
              />
              <GradientRound
                height={dynamicWidth / 1.5}
                width={dynamicWidth / 1.5}
                additionalStyle={secondRoundGradientStyle}
              />
            </div>
            <div className="absolute z-20 w-full h-full md:grid md:grid-cols-12  ">
              <div className="lg:col-span-7 md:col-span-6  md:h-full  flex items-center ">
                <div className="w-full md:pl-20 md:px-0 px-4 md:mt-0 mt-4  ">
                  <h1 className="text-whiteV1 font-extrabold md:text-5xl lg:text-7xl  text-3xl tracking-widest">
                    {mainTitle}
                  </h1>
                  <div className="w-full h-0 border-t-whiteV1 border-t-2 border-dashed mt-4 "></div>
                </div>
              </div>
              <div className="lg:col-span-5 md:col-span-6 h-full w-full   ">
                <div className="w-full h-full md:pr-20 md:pl-0 pl-4 pr-4 mt-10 md:mt-0 md:flex md:items-center">
                  <div
                    style={{
                      height: `${dynamicHeight}px`,
                    }}
                    className="w-full  backdrop-blur-md border-[1px] rounded-[20px] border-whiteV1  "
                  >
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default OnBoardingTemplate