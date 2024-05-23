import { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

function TradePortLayout() {
  const [mouseOver, setMouseOver] = useState(false);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const spin = () => {
    const header = headerRef.current!;
    header.animate(
      [
        { transform: "rotate(0deg)" }, // Keyframe 1: Initial state
        { transform: "rotate(360deg)" }, // Keyframe 2: Final state
      ],
      {
        duration: 500, // Animation duration in milliseconds
        iterations: 1, // Number of times the animation should repeat
      }
    );
  };
  useEffect(() => {
    console.log(mouseOver);
    if (mouseOver) {
      spin();
    }
  }, [mouseOver]);
  return (
    <StyledTradePortLayout>
      <div
        id="header"
        onMouseOver={() => {
          setMouseOver(true);
        }}
        onMouseLeave={() => {
          setMouseOver(false);
        }}
        onClick={() => {
          spin();
        }}
      >
        <Link to={"/"}>
          <img id="logo" src="/philbinLogo.png"></img>
        </Link>
        <div>
          {/* <img src="gifs/money.gif"></img> */}
          <h1 ref={headerRef}>Philban Corp</h1>
        </div>
      </div>
      <Outlet />
    </StyledTradePortLayout>
  );
}

const StyledTradePortLayout = styled.div`
  /* display: flex; */
  #header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-image: url("/greenmesh.gif");
    #logo {
      width: 100px;
      height: auto;
    }
    h1 {
      color: white;
      margin-right: 10px;
    }
  }
`;

export default TradePortLayout;
