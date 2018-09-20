// Return a value not negative or zero
const noNeg = (value) => (value < 0 ? 0 : value);

export const hashString = (s) => {
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
};

export const formatPrice = (value) => (value < 0 ? 'N/A' : `$${parseFloat(value).toLocaleString()}`);

export const capitalizeFirstLetter = (value) => (value.charAt(0).toUpperCase() + value.slice(1));

export const getFullProviderName = (provider) => {
  switch (provider) {
    case 'gcp':
      return 'Google Cloud Platform';
    case 'aws':
      return 'Amazon Web Services';
    default:
      return '';
  }
}

export const concatProvidersData = (dataArray) => {
  const dataClone = dataArray.slice(0);
  let res = [];

  res = res.concat(...dataClone);

  res.sort((a,b) => {
    if (a.total < b.total)
      return -1;
    if (a.total > b.total)
      return 1;
    return 0;
  });
  return res;
}

// Format data to match Plotly.js pie chart expectations
export const dataToPieChart = (data) => {
  const res = [{
    values: [data.details.frequent.usd, data.details.infrequent.usd, data.details.archive.usd],
    labels: ['Frequent', 'Infrequent', 'Archive'],
    type: 'pie',
    marker: {
      colors: ['#4885ed', '#ff9900', '#d6413b'],
    }
  }];
  return res;
}

// Format data to match Plotly.js bar chart expectations
export const dataToBarChart = (data, colorcode) => {

  const dataClone = data.slice(0);
  dataClone.sort((a,b) => {
    if (a.region < b.region)
      return -1;
    if (a.region > b.region)
      return 1;
    return 0;
  });

  const xValues = [];
  const frequentY = [];
  const infrequentY = [];
  const archiveY = [];

  for (let i = 0; i < dataClone.length; i += 1) {
    const element = dataClone[i];
    const region = capitalizeFirstLetter(element.region);
    const frequentPrice = noNeg(element.details.frequent.usd);
    const infrequentPrice = noNeg(element.details.infrequent.usd);
    const archivePrice = noNeg(element.details.archive.usd);

    xValues.push(region);
    frequentY.push(frequentPrice);
    infrequentY.push(infrequentPrice);
    archiveY.push(archivePrice);
  }

  const frequent = {
    x: xValues,
    y: frequentY,
    name: 'Frequent',
    type: 'bar',
    opacity: 0.9,
    marker: {
    color: colorcode,
  }
};


  const infrequent = {
    x: xValues,
    y: infrequentY,
    name: 'Infrequent',
    type: 'bar',
    opacity: 0.6,
    marker: {
    color: colorcode,
  }
};


  const archive = {
    x: xValues,
    y: archiveY,
    name: 'Archive',
    type: 'bar',
    opacity: 0.3,
    marker: {
    color: colorcode,
  }
};


  return [frequent, infrequent, archive];
}
