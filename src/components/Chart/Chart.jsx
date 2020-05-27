import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";

import { fetchDailyData } from "../../api";

import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: ["#7F7FFF", "#7FFF7F", "#FF7F7F"],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: true },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  const lineChart = dailyData[0] ? (
    <Line
      options={{
        scales: {
          xAxes: [
            {
              display: true,
            },
          ],
          yAxes: [
            {
              type: "linear",
              display: true,
              position: "left",
            },
          ],
        },
        responsive: true,
        line: {
          backgroundColor: "aqua",
          borderColor: "aqua",
        },
      }}
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map((data) => data.confirmed),
            label: "Infected",
            borderColor: "#7F7FFF",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.deaths),
            label: "Deaths",
            borderColor: "#FF7F7F",
            backgroundColor: "tomato",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
