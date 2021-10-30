import { useHistory } from "react-router-dom";
import { Button } from "../../components";
import style from "./Home.module.scss";

export const Home = () => {
  const history = useHistory();

  const navigate = () => {
    history.push("/orders");
  };

  return (
    <div className={style.home}>
      <h1>Welcome!</h1>
      <Button onClick={navigate}>Scan orders</Button>
    </div>
  );
};
