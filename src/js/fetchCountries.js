const apiURL = 'https://restcountries.com/v3.1';

export const fetchCountries = async (countryName) => {
    const response = await fetch(`${apiURL}/name/${countryName}?fields=name,capital,population,flags,languages`);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  };
  