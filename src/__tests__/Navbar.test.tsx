import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

describe("Navbar Component", () => {
  afterEach(() => {
    localStorage.clear(); 
  });

  test("renders Navbar with title and login/signup links when no token", () => {
    render(
      <AuthContext.Provider
        value={{ user: null, login: jest.fn(), logout: jest.fn() }}
      >
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Table Reservation")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Signup")).toBeInTheDocument();
  });

  test("renders dashboard & logout when user is logged in", () => {
    localStorage.setItem("token", "fakeToken");

    render(
      <AuthContext.Provider
        value={{
          user: { username: "testUser", role: "user" },
          login: jest.fn(),
          logout: jest.fn(),
        }}
      >
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("renders admin panel when user is an admin", () => {
    localStorage.setItem("token", "fakeToken");

    render(
      <AuthContext.Provider
        value={{
          user: { username: "adminUser", role: "admin" },
          login: jest.fn(),
          logout: jest.fn(),
        }}
      >
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Admin Panel")).toBeInTheDocument();
  });

  test("calls logout function when logout button is clicked", () => {
    localStorage.setItem("token", "fakeToken");
    const mockLogout = jest.fn();

    render(
      <AuthContext.Provider
        value={{
          user: { username: "test_user", role: "user" },
          login: jest.fn(),
          logout: mockLogout,
        }}
      >
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
  });
});
