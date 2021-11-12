import "../styles/Spinner.css";

export default function Spinner(): JSX.Element {
  return (
    <div className="loader center">
      <i className="fa fa-cog fa-spin" />
    </div>
  );
}
