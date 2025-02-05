import { render, screen, fireEvent } from "@testing-library/react";
import SignUpForm from "../components/SignupForm";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { signupUser } from "../services/authService";

jest.mock("../services/authService", () => ({
  signupUser: jest.fn(),
}));

describe("SignUpForm Component", () => {
  test("renders the Signup heading", () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );

    expect(screen.getByText("Signup")).toBeInTheDocument();
  });

  test("displays error when fields are empty", async () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /signup/i }));

    expect(
      screen.getByText("Both username and password are required.")
    ).toBeInTheDocument();
  });

  test("allows user to type username and password", () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(usernameInput).toHaveValue("testuser");
    expect(passwordInput).toHaveValue("password123");
  });

  test("calls signup function when valid data is entered", async () => {
    (signupUser as jest.Mock).mockResolvedValueOnce(undefined);

    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /signup/i }));

    expect(signupUser).toHaveBeenCalledWith("testuser", "password123", "user");
  });

  test("shows error message when signup fails", async () => {
    (signupUser as jest.Mock).mockRejectedValueOnce(new Error("Signup failed"));

    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /signup/i }));

    expect(
      await screen.findByText("Signup failed, please try again.")
    ).toBeInTheDocument();
  });
});
