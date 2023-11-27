import React, { useState } from "react";
import styles from "./login.module.css";

interface LoginFormProps {
  onLogin: (token: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Введите логин и пароль");
      return;
    }

    // Логика аутентификации или запрос к серверу
    try {
      const token = await authenticate(username, password);

      onLogin(token);
    } catch (error) {
      setError("Неверный логин или пароль");
    }
  };

  const authenticate = async (
    username: string,
    password: string
  ): Promise<string> => {
    // Логика аутентификации здесь
    return "example_token";
  };

  return (
    <form onSubmit={handleLogin} className={styles.loginForm}>
      <div>
        <label htmlFor="username">Логин:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Пароль:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button type="submit">Войти</button>
    </form>
  );
};

export default LoginForm;
