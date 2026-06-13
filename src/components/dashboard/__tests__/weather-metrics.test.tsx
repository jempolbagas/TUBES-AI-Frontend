import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { WeatherMetrics } from "../weather-metrics";
import { LanguageProvider } from "@/i18n";
import { WeatherInput } from "@/types";

const mockData: WeatherInput = {
  aqi: 85,
  temperature_2m_mean: 29.2,
  temperature_2m_min: 23.5,
  precipitation_sum: 2.5,
  wind_speed_10m_mean: 12.1,
  relative_humidity_2m_mean: 80,
  surface_pressure_mean: 1008.5,
  cloud_cover_mean: 60,
  shortwave_radiation_sum: 14.2,
};

describe("WeatherMetrics Details Modal", () => {
  const renderComponent = () => {
    return render(
      <LanguageProvider>
        <WeatherMetrics data={mockData} />
      </LanguageProvider>
    );
  };

  test("modal is initially closed and opens on metric card click with correct details", () => {
    renderComponent();

    // Verify modal is initially empty/closed
    expect(screen.queryByTestId("close-modal-btn")).not.toBeInTheDocument();

    // Click on Avg Temperature card (usually identified by text or label)
    const tempCard = screen.getByText(/Suhu Rata-rata|Avg Temperature/i);
    fireEvent.click(tempCard);

    // Modal should now be open
    expect(screen.getByTestId("close-modal-btn")).toBeInTheDocument();
    
    // Verify the correct details are displayed
    expect(screen.getByText(/29.2 °C/i)).toBeInTheDocument();
    expect(screen.getByText(/T_mean =/i)).toBeInTheDocument();

    // Click close button
    const closeBtn = screen.getByTestId("close-modal-btn");
    fireEvent.click(closeBtn);

    // Modal should be closed
    expect(screen.queryByTestId("close-modal-btn")).not.toBeInTheDocument();
  });

  test("closes modal when clicking on the backdrop", () => {
    renderComponent();

    // Open the modal by clicking a card
    const aqiCard = screen.getByText(/AQI Saat Ini|Current AQI/i);
    fireEvent.click(aqiCard);

    // Verify modal is open
    const dialog = screen.getByTestId("details-dialog");
    expect(screen.getByTestId("close-modal-btn")).toBeInTheDocument();

    // Click on the dialog backdrop (the dialog element itself)
    fireEvent.click(dialog);

    // Modal should be closed
    expect(screen.queryByTestId("close-modal-btn")).not.toBeInTheDocument();
  });
});
