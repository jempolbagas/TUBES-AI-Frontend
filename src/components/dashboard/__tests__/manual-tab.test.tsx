import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ManualTab } from "../manual-tab";
import { LanguageProvider } from "@/i18n";

describe("ManualTab Sliders and Bidirectional Binding", () => {
  const defaultProps = {
    onPredict: jest.fn(),
    isLoading: false,
  };

  const renderComponent = (props = defaultProps) => {
    return render(
      <LanguageProvider>
        <ManualTab {...props} />
      </LanguageProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all sliders and numeric inputs and verifies bidirectional binding", () => {
    const { container } = renderComponent();

    // Verify presence of AQI elements
    const aqiSlider = container.querySelector("#aqi-slider");
    const aqiInput = container.querySelector("input#aqi") as HTMLInputElement;

    expect(aqiSlider).toBeInTheDocument();
    expect(aqiInput).toBeInTheDocument();

    // Verify initial values (should be 80)
    expect(aqiSlider).toHaveValue("80");
    expect(aqiInput).toHaveValue(80);

    // Update via slider and verify numeric input is updated
    if (aqiSlider) {
      fireEvent.change(aqiSlider, { target: { value: "150" } });
    }
    expect(aqiSlider).toHaveValue("150");
    expect(aqiInput).toHaveValue(150);

    // Update via numeric input and verify slider is updated
    fireEvent.change(aqiInput, { target: { value: "200" } });
    expect(aqiInput).toHaveValue(200);
    expect(aqiSlider).toHaveValue("200");
  });

  test("submits form with correct synchronized data", () => {
    const onPredict = jest.fn();
    const { container } = renderComponent({ ...defaultProps, onPredict });

    // Change temperature via slider
    const tempSlider = container.querySelector("#temperature_2m_mean-slider");
    if (tempSlider) {
      fireEvent.change(tempSlider, { target: { value: "35.5" } });
    }

    // Find submit button and submit
    const submitBtn = screen.getByRole("button", { name: /Simulasikan & Prediksi|Simulate & Predict/i });
    fireEvent.click(submitBtn);

    // Verify onPredict was called with updated temperature and default values for other fields
    expect(onPredict).toHaveBeenCalledTimes(1);
    expect(onPredict).toHaveBeenCalledWith(
      expect.objectContaining({
        aqi: 80,
        temperature_2m_mean: 35.5,
        temperature_2m_min: 24.0,
        precipitation_sum: 0,
        wind_speed_10m_mean: 10,
        relative_humidity_2m_mean: 75,
        surface_pressure_mean: 1010,
        cloud_cover_mean: 50,
        shortwave_radiation_sum: 15,
      })
    );
  });
});
