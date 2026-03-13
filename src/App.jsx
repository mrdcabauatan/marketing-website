import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import Events from "./components/Events";
import Reviews from "./components/Reviews";
import FindUs from "./components/FindUs";
import { useEffect } from "react";

const useMouseClickSound = () => {
  useEffect(() => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const playClick = () => {
      const bufferSize = audioCtx.sampleRate * 0.02; // very short
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);

      // create sharp noise burst (mouse click feel)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize / 4));
      }

      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const gainNode = audioCtx.createGain();
      gainNode.gain.value = 0.25;

      noise.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      noise.start();
    };

    const handleClick = () => {
      playClick();
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
}

const App = () => {
  useMouseClickSound();

  return (
    <div className="w-screen overflow-x-hidden">
      <Navbar />
      <Home />
      <Menu />
      <Gallery />
      <Events />
      <Reviews />
      <FindUs />
    </div>
  )
}

export default App