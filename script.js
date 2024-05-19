// Scatterplot with regression line
const dataset = [
	    [1, 11.700],
        [2, 12.444],
        [3, 12.093],
        [5, 11.589],
        [6, 12.057],
        [7, 12.034],
        [8, 12.067],
        [9, 12.051],
        [10, 11.846],
        [11, 12.057],
        [12, 12.064],
        [13, 11.778],
        [14, 11.568],
        [15, 11.769],
        [16, 11.195],
        [17, 12.293],
        [18, 11.603],
        [19, 11.904],
        [20, 10.954],
        [21, 11.525],
        [22, 12.104],
        [24, 11.292],
        [25, 11.738],
        [26, 11.319]
];

function getTrendLine(data) {
    const n = data.length;

    let sumX = 0,
        sumY = 0,
        sumXY = 0,
        sumX2 = 0;

    // Calculate the sums needed for linear regression
    for (let i = 0; i < n; i++) {
        const [x, y] = data[i];
        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumX2 += x ** 2;
    }

    // Calculate the slope of the trend line
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);

    // Calculate the intercept of the trend line
    const intercept = (sumY - slope * sumX) / n;

    const trendline = []; // Array to store the trend line data points

    // Find the minimum and maximum x-values from the scatter plot data
    const minX = Math.min(...data.map(([x]) => x));
    const maxX = Math.max(...data.map(([x]) => x));

    // Calculate the corresponding y-values for the trend line using the slope
    // and intercept
    trendline.push([minX, minX * slope + intercept]);
    trendline.push([maxX, maxX * slope + intercept]);

    return trendline;
}

Highcharts.chart('scatterplot', {
    chart: {
      backgroundColor: 'transparent',
    },
    title: {
        text: 'Relationship between the Plant Litter and Annual Temperature'
    },
    xAxis: {
        min: 0,
        max: 30,
        title: {
        	text: 'Plant Litter (%)'
        }
    },
    yAxis: {
        min: 10,
        title: {
        	text: 'Annual Temperature (Celsius)'
        }
    },
    series: [{
        type: 'line',
        name: 'Trend Line',
        data: getTrendLine(dataset),
        color: '#A2AD59',
        marker: {
            enabled: false
        },
        states: {
            hover: {
                lineWidth: 0
            }
        },
        enableMouseTracking: false
    }, {
        type: 'scatter',
        name: 'Observations',
        data: dataset,
        color: '#C1AE9F', 
        marker: {
            radius: 4,
            symbol: 'circle'
        }
    }]
});


// Bar chart
Highcharts.chart('barchart', {
  chart: {
      type: 'bar',
      backgroundColor: 'transparent',
  },
  title: {
      text: 'Soil Water Content by Season and RCP'
  },
  xAxis: {
      categories: ['Spring', 'Summer', 'Fall', 'Winter'],
      title: {
          text: 'Season'
      },
      gridLineWidth: 1,
      lineWidth: 0
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Volumetric Water Content (VWC)',
          align: 'high'
      },
      labels: {
          overflow: 'justify'
      },
      gridLineWidth: 0
  },
  tooltip: {
      valueSuffix: ''
  },
  plotOptions: {
      bar: {
          borderRadius: '50%',
          dataLabels: {
              enabled: true
          },
          groupPadding: 0.1
      }
  },
  legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -5,
      y: 20,
      floating: true,
      borderWidth: 1,
      backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
      shadow: true
  },
  credits: {
      enabled: false
  },
  series: [{
      name: 'Historical',
      data: [0.111, 0.068, 0.094, 0.125],
    color: '#A2AD59'
  }, {
      name: 'RCP 4.5',
      data: [0.118, 0.073, 0.099, 0.132],
    color: '#C1AE9F'
  }, {
      name: 'RCP 8.5',
      data: [0.119, 0.073, 0.099, 0.133], 
    color: '#D3BDB0'
  }]
});

// Line chart
// Data for the chart
const data = [
  [1980, 0.514445, 0.000000, 0.000000],
  [1981, 0.256030, 0.832311, 0.577172],
  [1982, 0.324410, 0.622359, 0.599253],
  [1983, 0.139147, 0.799591, 0.664836],
  [1984, 0.232441, 0.795501, 0.564759],
  [1985, 0.326531, 0.087935, 0.190047],
  [1986, 0.291810, 0.664622, 0.614303],
  [1987, 0.204877, 0.603954, 0.733714],
  [1988, 0.328916, 0.650988, 0.502142],
  [1989, 0.342433, 0.357192, 0.354608],
  [1990, 0.832494, 0.322427, 0.243546],
  [1991, 0.401272, 0.534424, 0.340986],
  [1992, 0.326266, 0.491479, 0.288696],
  [1993, 0.411079, 0.195637, 0.287158],
  [1994, 0.592897, 0.110429, 0.022081],
  [1995, 0.325735, 0.599182, 0.373833],
  [1996, 1.000000, 0.378323, 0.215643],
  [1997, 0.157699, 0.477164, 0.519609],
  [1998, 0.358866, 0.364008, 0.291223],
  [1999, 0.102041, 1.000000, 1.000000],
  [2000, 0.629208, 0.331288, 0.211249],
  [2001, 0.193480, 0.563054, 0.472591],
  [2002, 0.925523, 0.161554, 0.055366],
  [2003, 0.416645, 0.353783, 0.281006],
  [2004, 0.628677, 0.085208, 0.031528],
  [2005, 0.187384, 0.511247, 0.462814],
  [2006, 0.400477, 0.561691, 0.409096],
  [2007, 0.366022, 0.475119, 0.420191],
  [2008, 0.280413, 0.391275, 0.355927],
  [2009, 0.502518, 0.068848, 0.028892],
  [2010, 0.173602, 0.595092, 0.640558],
  [2011, 0.428306, 0.503067, 0.269691],
  [2012, 0.448450, 0.284254, 0.348566],
  [2013, 0.507024, 0.308793, 0.463364],
  [2014, 0.300027, 0.400818, 0.374602],
  [2015, 0.000000, 0.866394, 0.823575],
  [2016, 0.290750, 0.443081, 0.392288],
  [2017, 0.305327, 0.331970, 0.329781],
  [2018, 0.867479, 0.092706, 0.177414],
  [2021, 0.373708, 0.402181, 0.379985],
  [2022, 0.399682, 0.351057, 0.341646],
  [2023, 0.344023, 0.448534, 0.458970],
  [2024, 0.416645, 0.295160, 0.329672]
];

// Prepare the data for the series
const drySoilDays = data.map(item => [item[0], item[1]]);
const evaporation = data.map(item => [item[0], item[2]]);
const precipitation = data.map(item => [item[0], item[3]]);

Highcharts.chart('linechart', {
  chart: {
      type: 'spline',
      scrollablePlotArea: {
          minWidth: 600,
          scrollPositionX: 1
      },
      backgroundColor: 'transparent',
  },
  title: {
      text: 'Relationship the Summer Indicators',
      align: 'center'
  },
  subtitle: {
      text: 'Days of Dry Soil vs. Evaporation vs. Precipitation',
      align: 'center'
  },
  xAxis: {
      title: {
          text: 'Year'
      },
      categories: data.map(item => item[0].toString()), // Use year as categories
      labels: {
          overflow: 'justify'
      }
  },
  yAxis: {
      title: {
          text: 'Normalized Value'
      },
      minorGridLineWidth: 0,
      gridLineWidth: 0,
      alternateGridColor: null
  },
  tooltip: {
      valueSuffix: ''
  },
  plotOptions: {
      spline: {
          lineWidth: 3,
          states: {
              hover: {
                  lineWidth: 3
              }
          },
          marker: {
              enabled: false
          }
      }
  },
  series: [{
      name: 'Days of Dry Soil',
      data: drySoilDays,
      color: '#A2AD59'

  }, {
      name: 'Evaporation (cm)',
      data: evaporation,
      color: '#C1AE9F'
  }, {
      name: 'Precipitation (cm)',
      data: precipitation,
      color: '#D3BDB0'
  }],
  navigation: {
      menuItemStyle: {
          fontSize: '10px'
      }
  }
});

// 