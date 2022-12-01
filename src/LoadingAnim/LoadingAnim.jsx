import "./LoadingAnim.css";
import React, { useState, useEffect } from "react";


export default function LoadingAnim() {

  return (
  <div className='LoadingAnim'>
        <div className='cubeContainer'>
          <div>
              <div className="hole">
                  <div className="face bottom "></div>
              </div>
            </div>
            <div className="cubeMover">
                <div className="cube">
                    <div className="face left"></div>
                    <div className="face right"></div>
                    <div className="face top"></div>
                </div>
                <div className="cursor">
                    <img src="../static/textures/cursor-01.png" />
                </div>
            </div>
            <div>
              <div className="hole">
                  <div className="face bottom front"></div>
              </div>
            </div>
        </div>
  </div>
);
}