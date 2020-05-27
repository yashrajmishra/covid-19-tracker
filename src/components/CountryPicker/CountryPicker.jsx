import React, { useState, useEffect } from "react";
import { Select, FormControl, MenuItem } from "@material-ui/core";

import { fetchCountries } from "../../api";

import styles from "./CountryPicker.module.css";
const Countries = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountries());
    };

    fetchAPI();
  }, []);

  return (
    <FormControl variant="outlined" className={styles.formControl}>
      <Select
        className={styles.selector}
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <MenuItem className={styles.selector} value="">
          Global
        </MenuItem>
        {countries.map((country, i) => (
          <MenuItem key={i} value={country}>
            {country}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Countries;
