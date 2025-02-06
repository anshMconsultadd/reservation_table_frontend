import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  getAvailableTables,
  reserveTable,
  cancelReservation,
} from "../services/tableService"; 

describe("Table Reservation Services", () => {
  let mock: MockAdapter;
  const API_BASE_URL = "http://localhost:8000";
  const token = "test-token";

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test("getAvailableTables should return data on success", async () => {
    const mockData = [{ table_id: 1, capacity: 4, is_reserved: false }];

    mock.onGet(`${API_BASE_URL}/user/tables`).reply(200, mockData);

    const data = await getAvailableTables(token);
    expect(data).toEqual(mockData);
  });

  test("getAvailableTables should throw error on failure", async () => {
    mock
      .onGet(`${API_BASE_URL}/user/tables`)
      .reply(401, { message: "Unauthorized" });

    await expect(getAvailableTables(token)).rejects.toThrow(
      "Request failed with status code 401"
    );
  });

  test("reserveTable should return success response", async () => {
    const tableId = 1;
    const mockResponse = { message: "Table reserved successfully" };

    mock
      .onPost(`${API_BASE_URL}/user/tables/reserve?table_id=${tableId}`)
      .reply(200, mockResponse);

    const response = await reserveTable(tableId, token);
    expect(response).toEqual(mockResponse);
  });

  test("cancelReservation should return success response", async () => {
    const tableId = 1;
    const mockResponse = { message: "Reservation canceled successfully" };

    mock
      .onDelete(`${API_BASE_URL}/user/tables/cancel?table_id=${tableId}`)
      .reply(200, mockResponse);

    const response = await cancelReservation(tableId, token);
    expect(response).toEqual(mockResponse);
  });
});
