import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function NewUserPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const constraints = {
      audio: false,
      video: { width: 1280, height: 720 },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        const video = videoRef.current!;
        video.srcObject = mediaStream;
        video.onloadedmetadata = () => {
          video.play();
          setIsLoaded(true);
        };
      })
      .catch((err) => {
        // always check for errors at the end.
        console.error(`${err.name}: ${err.message}`);
      });
  }, []);

  return (
    <StyledNewUserPage>
      new user
      <video ref={videoRef}></video>
      <canvas ref={canvasRef}></canvas>
    </StyledNewUserPage>
  );
}

const StyledNewUserPage = styled.div`
  video {
    max-width: 100%;
    transform: scaleX(-1);
  }
`;

export default NewUserPage;
