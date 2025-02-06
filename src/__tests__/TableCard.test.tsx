import { render, screen, fireEvent } from "@testing-library/react";
import TableCard from "../components/TableCard";
import React from "react";
describe("TableCard Component", () => {
  const mockOnReserved = jest.fn();
  const mockOnCanceled = jest.fn();

  test("renders available table details correctly", () => {
    const table = { id: 1, capacity: 4, is_reserved: false };

    render(
      <TableCard
        table={table}
        onReserved={mockOnReserved}
        onCanceled={mockOnCanceled}
      />
    );

    expect(screen.getByText(/Table #1/i)).toBeInTheDocument();
    expect(screen.getByText(/Capacity: 4/i)).toBeInTheDocument();
    expect(screen.getByText(/Available/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Reserve Table/i })
    ).toBeInTheDocument();
  });

  test("renders reserved table details correctly", () => {
    const table = { id: 2, capacity: 2, is_reserved: true };

    render(
      <TableCard
        table={table}
        onReserved={mockOnReserved}
        onCanceled={mockOnCanceled}
      />
    );

    expect(screen.getByText(/Table #2/i)).toBeInTheDocument();
    expect(screen.getByText(/Capacity: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Reserved/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Cancel Reservation/i })
    ).toBeInTheDocument();
  });

  test("calls onReserved when clicking reserve button", () => {
    const table = { id: 3, capacity: 6, is_reserved: false };

    render(
      <TableCard
        table={table}
        onReserved={mockOnReserved}
        onCanceled={mockOnCanceled}
      />
    );

    const reserveButton = screen.getByRole("button", {
      name: /Reserve Table/i,
    });
    fireEvent.click(reserveButton);

    expect(mockOnReserved).toHaveBeenCalledTimes(1);
    expect(mockOnReserved).toHaveBeenCalledWith(3);
  });

  test("calls onCanceled when clicking cancel button", () => {
    const table = { id: 4, capacity: 8, is_reserved: true };

    render(
      <TableCard
        table={table}
        onReserved={mockOnReserved}
        onCanceled={mockOnCanceled}
      />
    );

    const cancelButton = screen.getByRole("button", {
      name: /Cancel Reservation/i,
    });
    fireEvent.click(cancelButton);

    expect(mockOnCanceled).toHaveBeenCalledTimes(1);
    expect(mockOnCanceled).toHaveBeenCalledWith(4);
  });
});
