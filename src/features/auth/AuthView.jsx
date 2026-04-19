import { useState } from "react";

const emptyRegisterForm = {
  name: "",
  email: "",
  dob: "",
  roll: "",
  officeId: "",
  designation: "",
  role: "student",
  password: "",
  confirmPassword: "",
};

export default function AuthView({ onLogin, onRegister, errorMessage }) {
  const [mode, setMode] = useState("login");
  const [loginForm, setLoginForm] = useState({ name: "", password: "" });
  const [registerForm, setRegisterForm] = useState(emptyRegisterForm);
  const [registerRole, setRegisterRole] = useState("student");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();
    onRegister({ ...registerForm, role: registerRole }, () => {
      setMode("login");
      setRegisterRole("student");
      setRegisterForm(emptyRegisterForm);
    });
  };

  return (
    <div className="auth-shell">
      <div className="auth-hero">
        <div className="hero-copy">
          <span className="eyebrow">Placify</span>
          <h1>Student placement workflows, built for real campus operations.</h1>
          <p>
            Track drives, manage rich student profiles, monitor applications,
            review analytics, and keep off-campus opportunities in one clean dashboard.
          </p>
          <div className="hero-points">
            <div>
              <i className="fa-solid fa-circle-check" />
              Drive eligibility and policy checks
            </div>
            <div>
              <i className="fa-solid fa-circle-check" />
              Student profile and readiness scoring
            </div>
            <div>
              <i className="fa-solid fa-circle-check" />
              Analytics, resources, and applications
            </div>
          </div>
        </div>
      </div>

      <div className="auth-card">
        <div className="auth-tabs">
          <button
            className={mode === "login" ? "active" : ""}
            type="button"
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={mode === "register" ? "active" : ""}
            type="button"
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        {mode === "login" ? (
          <form
            className="auth-form"
            onSubmit={(event) => {
              event.preventDefault();
              onLogin(loginForm);
            }}
          >
            <h2>Welcome back</h2>
            <p className="muted">
              Use Demo Student / demo or Placement Coordinator / coord.
            </p>
            <input
              type="text"
              placeholder="Full Name"
              value={loginForm.name}
              onChange={(event) =>
                setLoginForm((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
            />
            <div className="password-field">
              <input
                type={showLoginPassword ? "text" : "password"}
                placeholder="Password"
                value={loginForm.password}
                onChange={(event) =>
                  setLoginForm((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
              />
              <button
                className="password-toggle"
                type="button"
                onClick={() => setShowLoginPassword((current) => !current)}
              >
                {showLoginPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
            <button className="primary-button" type="submit">
              Sign In
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleRegister}>
            <h2>Create account</h2>
            <p className="muted">
              Registration creates a local browser profile for this demo.
            </p>
            <div className="auth-tabs role-tabs">
              <button
                className={registerRole === "student" ? "active" : ""}
                type="button"
                onClick={() => setRegisterRole("student")}
              >
                Register as Student
              </button>
              <button
                className={registerRole === "coordinator" ? "active" : ""}
                type="button"
                onClick={() => setRegisterRole("coordinator")}
              >
                Register as Coordinator
              </button>
            </div>
            <input
              type="text"
              placeholder="Full Name"
              required
              value={registerForm.name}
              onChange={(event) =>
                setRegisterForm((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={registerForm.email}
              onChange={(event) =>
                setRegisterForm((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
            />
            {registerRole === "student" ? (
              <>
                <input
                  type="date"
                  placeholder="Date of Birth"
                  required
                  value={registerForm.dob}
                  onChange={(event) =>
                    setRegisterForm((current) => ({
                      ...current,
                      dob: event.target.value,
                    }))
                  }
                />
                <input
                  type="text"
                  placeholder="University Roll Number"
                  required
                  value={registerForm.roll}
                  onChange={(event) =>
                    setRegisterForm((current) => ({
                      ...current,
                      roll: event.target.value,
                    }))
                  }
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Coordinator Office ID"
                  required
                  value={registerForm.officeId}
                  onChange={(event) =>
                    setRegisterForm((current) => ({
                      ...current,
                      officeId: event.target.value,
                    }))
                  }
                />
                <input
                  type="text"
                  placeholder="Designation (e.g., Placement Officer)"
                  required
                  value={registerForm.designation}
                  onChange={(event) =>
                    setRegisterForm((current) => ({
                      ...current,
                      designation: event.target.value,
                    }))
                  }
                />
              </>
            )}
            <div className="password-field">
              <input
                type={showRegisterPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={registerForm.password}
                onChange={(event) =>
                  setRegisterForm((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
              />
              <button
                className="password-toggle"
                type="button"
                onClick={() => setShowRegisterPassword((current) => !current)}
              >
                {showRegisterPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="password-field">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
                value={registerForm.confirmPassword}
                onChange={(event) =>
                  setRegisterForm((current) => ({
                    ...current,
                    confirmPassword: event.target.value,
                  }))
                }
              />
              <button
                className="password-toggle"
                type="button"
                onClick={() => setShowConfirmPassword((current) => !current)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
            <button className="primary-button" type="submit">
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
