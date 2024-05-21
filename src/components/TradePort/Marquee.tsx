import styled from "styled-components";
const kText = "Philbin Corp™";

const kNumRepeats = 30;

function Marquee() {
  const inside = [];

  for (let i = 0; i < kNumRepeats; i++) {
    inside.push(
      <div className="inside">
        <p>{kText}</p>
        <img src="/gifs/Bemvindo1.gif"></img>
      </div>
    );
  }
  return <StyledMarquee>{inside}</StyledMarquee>;
}

const StyledMarquee = styled.div`
  @keyframes marquee {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-100%, 0);
    }
  }
  p {
    font-size: 2rem;
  }
  img {
    height: 70px;
    width: 220px;
  }
  width: 100%;
  background-color: blue;
  color: white;
  /* overflow-x: hidden; */
  white-space: nowrap;
  .inside {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    animation: marquee 3s linear infinite;
  }
`;

export default Marquee;
