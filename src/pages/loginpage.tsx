import LoginForm from "../components/login/login";
import styles from "./pages-styles.module.css";

function LoginPage() {
  return (
    <>
      <div className={`${styles.resultPage} `}>
        <LoginForm onLogin={function (token: string): void {
          throw new Error("Function not implemented.");
        } } />
      </div>
    </>
  );
}

export default LoginPage;
