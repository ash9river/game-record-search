import { BeatLoader } from "react-spinners";

function LoadingSpinner() {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
      }}
    >
      <BeatLoader
        color="#ef4343"
        style={{
          position: "absolute",
          top: "50%",
          left: "calc( 50% - 73.5px )",
        }}
        size={45}
      />
    </div>
  );
}

export default LoadingSpinner;
