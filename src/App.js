import React from "react";

import { Cards, CountryPicker, Chart } from "./components";
import { fetchData } from "./api/";
import styles from "./App.module.css";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const data = await fetchData();

    this.setState({ data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);

    this.setState({ data, country: country });
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <a href="https://yashraj.now.sh">
          <img
            className={styles.image}
            href="https://yashraj-cdn.now.sh"
            src="https://yashraj-cdn.now.sh/logo.svg"
            alt="COVID-19"
          />
        </a>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
        <footer style={{ color: "#fff", padding: "30px 30px" }}>
          Made with <span></span>💖 by{" "}
          <a style={{ color: "#0A5BF2" }} href="https://yashraj.now.sh/">
            Yashraj Mishra
          </a>
        </footer>
      </div>
    );
  }
}

export default App;
