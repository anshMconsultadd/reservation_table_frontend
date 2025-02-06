import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dashboard from "../pages/Dashboard"; // Update path if needed
import {
  getAvailableTables,
  reserveTable,
  cancelReservation,
} from "../services/tableService";
import { MemoryRouter } from "react-router-dom";

jest.mock("../services/tableService", () => ({
  getAvailableTables: jest.fn(),
  reserveTable: jest.fn(),
  cancelReservation: jest.fn(),
}));

describe("Dashboard Component", () => {
  const mockTables = [
    { id: 1, capacity: 4, is_reserved: false },
    { id: 2, capacity: 2, is_reserved: false },
  ];

  beforeEach(() => {
    localStorage.setItem("token", "mockToken");
    (getAvailableTables as jest.Mock).mockResolvedValue(mockTables);
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("displays available tables on load", async () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(getAvailableTables).toHaveBeenCalledWith("mockToken");

    // Wait for tables to load
    await waitFor(() => {
      expect(screen.getByText(/Table #1/i)).toBeInTheDocument();
      expect(screen.getByText(/Capacity: 4/i)).toBeInTheDocument();
      expect(screen.getByText(/Available/i)).toBeInTheDocument();
    });
  });

  test("reserves a table when reserve button is clicked", async () => {
    (reserveTable as jest.Mock).mockResolvedValue({});

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Table #1/i)).toBeInTheDocument()
    );

    const reserveButton = screen.getByRole("button", { name: /reserve/i });
    fireEvent.click(reserveButton);

    await waitFor(() => {
      expect(reserveTable).toHaveBeenCalledWith(1, "mockToken");
    });
  });

  test("cancels a reservation when cancel button is clicked", async () => {
    (cancelReservation as jest.Mock).mockResolvedValue({});

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Table #1/i)).toBeInTheDocument()
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(cancelReservation).toHaveBeenCalledWith(1, "mockToken");
    });
  });
});
