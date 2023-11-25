import { TailSpin } from "react-loader-spinner";
import SpinnerStyles from "./spinner.module.css";

function Spinner() {
  return (
    <div className={SpinnerStyles.main}>
      <TailSpin
        color="white"
        // strokeColor="grey"
        // strokeWidth="5"
        // animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
}

export default Spinner;
