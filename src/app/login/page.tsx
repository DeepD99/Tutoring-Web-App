"use client";

import { useState } from "react";
import styles from "./login.module.css";

const roles = [
  { key: "student", label: "Student", color: "var(--color-student)" },
  { key: "parent", label: "Parent / Guardian", color: "var(--color-parent)" },
  { key: "tutor", label: "Tutor", color: "var(--color-tutor)" },
  { key: "admin", label: "Admin", color: "var(--color-admin)" },
] as const;

export default function LoginPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Student-Tutor Platform</h1>
        <p className={styles.subtitle}>
          Tutoring coordination & academic progress tracking
        </p>

        <div className={styles.actions}>
          <div
            className={styles.loginWrapper}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className={styles.loginBtn}>Log in</button>

            {dropdownOpen && (
              <ul className={styles.dropdown}>
                {roles.map((role) => (
                  <li key={role.key}>
                    <a
                      href={`/dashboard?role=${role.key}`}
                      className={styles.dropdownItem}
                      style={
                        { "--role-color": role.color } as React.CSSProperties
                      }
                    >
                      <span
                        className={styles.dot}
                        style={{ background: role.color }}
                      />
                      {role.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <a href="/signup" className={styles.signupBtn}>
            Sign up
          </a>
        </div>
      </div>
    </main>
  );
}
