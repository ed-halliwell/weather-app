import "./styles/WindIcon.css";

interface Props {
  windDirection: number;
  windSpeed: number;
}

export default function WindIcon(props: Props) {
  let adjDirection = props.windDirection - 180;
  return (
    <div className="WindIcon-container">
      <div className="WindIcon-WindSpeed">{props.windSpeed}</div>
      <div
        className="WindIcon-Direction"
        style={{ transform: `rotate(${adjDirection}deg)` }}
      >
        &#8593;
      </div>
    </div>
  );
}
