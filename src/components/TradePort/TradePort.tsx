import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Marquee from "./Marquee";
import {
  kTradeAssistLabels,
  kTradeDirectoryLabels,
  kTradeMakerLabels,
  kTradeSignalsLabels,
} from "./constants";

function TradePort() {
  const fartRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();
  const playFart = () => {
    return;
    const audio = fartRef.current!;
    if (audio.paused) {
      audio.play();
    } else {
      audio.currentTime = 0;
      audio.play();
    }
  };
  return (
    <StyledTradePortWrapper>
      <div id="logoWrapper"></div>
      <audio ref={fartRef} src="fart.mp3"></audio>

      <div id="mainArea">
        <h1>
          Welcome to <span className="PhilbinText">Philbin Corp™</span>
        </h1>
        <Marquee />
        <p>the premier international trade website on the internet</p>
        <p>
          There is no fee to use{" "}
          <span className="PhilbinText">Philbin Corp™</span>, but registration
          is required
        </p>
        <div id="registrationWrapper">
          <button
            onClick={() => {
              playFart();
            }}
          >
            Registered User
          </button>
          <button
            onClick={() => {
              playFart();
            }}
          >
            New User
          </button>
        </div>
        <StyledTradeMaker>
          <h3>Trade Maker</h3>
          <div className="metalContainer" id="iconsParent">
            {kTradeMakerLabels.map(({ imgUrl, text, url }) => {
              return (
                <div
                  className="_90sBorder iconWrapper"
                  key={text}
                  onClick={() => {
                    if (url) {
                      navigate(url);
                    }
                    playFart();
                  }}
                >
                  <div>
                    <img src={`/icons/${imgUrl}`}></img>
                  </div>
                  <p>{text}</p>
                </div>
              );
            })}
          </div>
        </StyledTradeMaker>
        <StyledBottomColumns>
          {[
            { title: "Trade Directory", list: kTradeDirectoryLabels },
            { title: "Trade Signals", list: kTradeSignalsLabels },
            { title: "Trade Assist", list: kTradeAssistLabels },
          ].map((entry) => {
            return (
              <StyledBottomColumn key={entry.title}>
                <h3>{entry!.title}</h3>
                <div className="metalContainer columnWrapper">
                  {entry!.list.map(({ imgUrl, text }) => {
                    return (
                      <div
                        key={text}
                        className="entry _90sBorder"
                        onClick={() => {
                          navigate(`/${text.replaceAll(" ", "")}`);
                          playFart();
                        }}
                      >
                        <img src={`/icons/${imgUrl}`}></img>
                        <p>{text}</p>
                      </div>
                    );
                  })}
                </div>
              </StyledBottomColumn>
            );
          })}
        </StyledBottomColumns>
      </div>
    </StyledTradePortWrapper>
  );
}
const StyledBottomColumn = styled.div`
  padding: 5px;
  max-width: 250px;
  display: flex;
  flex-direction: column;

  h3 {
    color: blue;
    margin: 0.5rem;
  }
  .columnWrapper {
    padding: 5px;
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    gap: 0.5rem;
    flex: 1;
    /* height: 100%; */
  }

  .entry {
    display: flex;
    align-items: center;
    padding: 0px !important;
    &:active {
      border-style: inset; /* Inset border on click */
    }
    /* justify-content: center; */

    p {
      align-self: center;
      width: 100%;
      color: blue;
      font-weight: bold;
      font-size: 1.2rem;
      margin: 0px;
    }
    img {
      flex-basis: 30%;
      min-width: 0px;
      height: auto;
    }
  }
`;
const StyledBottomColumns = styled.div`
  display: flex;
  /* grid-template-columns: repeat(3, 1fr); */
  flex-wrap: wrap;
  justify-content: center;
  width: fit-content;
  margin: auto;
  gap: 1rem;
`;

const StyledTradeMaker = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  p {
    margin: 0px;
    font-weight: bold;
    /* margin-top: auto; */
  }
  .iconWrapper {
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 3px 3px;
    max-width: 6rem;
    overflow: hidden;
    &:active {
      border-style: inset; /* Inset border on click */
    }
    > div {
      position: relative;
      flex: 1;
    }

    img {
      position: absolute;
      margin: auto;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 100%;
      max-height: 100%;
    }
  }
  #iconsParent {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: fit-content;
    padding: 10px 10px; /* Padding around text */

    /* grid-template-columns: repeat(5, 1fr); */
    gap: 1rem;
  }
`;

const StyledTradePortWrapper = styled.div`
  max-width: 100%;
  height: 100svh;
  font-family: "Times New Roman", Times, serif;
  display: flex;
  justify-content: center;

  .PhilbinText {
    font-weight: bold;
    color: blue;
  }

  #logoWrapper {
    /* width: 100%; */
    /* width: 100px; */
    /* Media query for phones */
    @media (max-width: 600px) {
      display: none;
    }
    min-width: 200px;
    background-image: url("/philbinLogo.png");
    background-size: 100%;
  }
  #registrationWrapper {
    margin: auto;
    display: flex;
    gap: 1rem;
  }
  p {
    margin: 0.4rem;
  }
  .iconWrapper {
    p {
      color: blue;
      text-transform: uppercase;
    }
  }

  #mainArea {
    display: flex;
    /* justify-content: center; */
    flex-direction: column;
    overflow-x: hidden;
    /* max-width: 100%; */
  }

  button,
  ._90sBorder {
    background-color: #c0c0c0; /* Gray background */
    color: black; /* Black text */
    border: 3px outset #fff; /* 3D effect border */

    font-size: 14px; /* Small font size */
    text-align: center; /* Centered text */
    cursor: pointer; /* Pointer cursor on hover */
    text-decoration: none; /* No underline for text */
  }

  .metalContainer {
    font-family: Arial, sans-serif; /* Typical 90s font */
    border: 3px outset; /* 3D effect border */
    background-image: url("/tileableMetal.jpg");
    background-size: 48px;
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.8);
    padding: 10px;
  }

  button {
    padding: 5px 10px; /* Padding around text */

    display: inline-block; /* Inline-block for button-like behavior */
  }

  button:active {
    border-style: inset; /* Inset border on click */
  }
`;

export default TradePort;
