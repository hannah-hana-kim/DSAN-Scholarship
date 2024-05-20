// variables
const title_font_size = '2.2em';
const subtitle_font_size = '1.8em';
const axis_label_font_size = '1.5em';
const axis_tick_label_font_size = '1.3em';
const legend_item_font_size = '1.3em';
const tooltip_font_size = '1.3em';

const scatters_color = '#eda4bd';
const line_color = '#7d1128';
const bar_historical_color = '#6B7FD7';
const bar_4_5_color = '#eb7bc0';
const bar_8_5_color = '#4c2a85';
const dry_soil_color = '#E0BF00';
const evaporation_color = '#7d1128';
const precipitation_color = '#6b7fd7';
const color_1980 = '#6b7fd7';
const color_2018 = '#eb7bc0';
const color_2024 = '#4c2a85';

const heatmap_max_color = '#04aa6d'

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
      width: 800,
      height: 600,
    },
    title: {
        text: 'Relationship between the Plant Litter and Annual Temperature',
        align: 'left',
        style: {
            fontSize: title_font_size,
        }
    },
    xAxis: {
        min: 0,
        max: 30,
        title: {
        	text: 'Plant Litter (%)',
            style: {
                fontSize: axis_label_font_size,
            }
        },
        labels: {
            style: {
                fontSize: axis_tick_label_font_size,
            }
        }
    },
    yAxis: {
        min: 10,
        title: {
        	text: 'Annual Temperature (°C)',
            style: {
                fontSize: axis_label_font_size,
            }
        },
        labels: {
            style: {
                fontSize: axis_tick_label_font_size,
            }
        }
    },
    legend: {
        itemStyle: {
            fontSize: legend_item_font_size,
        }
    },
    tooltip: {
        style: {
            fontSize: tooltip_font_size,
        },
        formatter: function() {
            return '<b>Annual Temperature:</b> ' + this.y + '°C<br>' +
                   '<b>Plant Litter:</b> ' + this.x + '%';
        }
    },
    series: [{
        type: 'line',
        name: 'Trend Line',
        data: getTrendLine(dataset),
        color: line_color,
        marker: {
            enabled: false
        },
        states: {
            hover: {
                lineWidth: 2
            }
        },
        enableMouseTracking: false
    }, {
        type: 'scatter',
        name: 'Plant Litter',
        data: dataset,
        color: scatters_color, 
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
      text: 'Volumetric Water Content by Season and RCP',
      align: 'left',
        style: {
            fontSize: title_font_size,
        }
  },
  xAxis: {
      categories: ['Spring', 'Summer', 'Fall', 'Winter'],
      title: {
          text: 'Season',
          style: {
            fontSize: axis_label_font_size,
          }
      },
      labels: {
        style: {
            fontSize: axis_tick_label_font_size,
        }
      },
      gridLineWidth: 1,
      lineWidth: 0
  },
  yAxis: {
      min: 0,
      title: {
        text: 'Volumetric Water Content (VWC)',
        style: {
            fontSize: axis_label_font_size,
        }
      },
      labels: {
        overflow: 'justify',
        style: {
            fontSize: axis_tick_label_font_size,
        }
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
    x: -1,
    y: 20,
    floating: true,
    borderWidth: 1,
    backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
    shadow: true,
    itemStyle: {
        fontSize: legend_item_font_size,
    }
  },
  credits: {
      enabled: false
  },
  series: [{
    name: 'Historical',
    data: [0.111, 0.068, 0.094, 0.125],
    color: bar_historical_color
  }, {
      name: 'RCP 4.5',
      data: [0.118, 0.073, 0.099, 0.132],
    color: bar_4_5_color
  }, {
      name: 'RCP 8.5',
      data: [0.119, 0.073, 0.099, 0.133], 
    color: bar_8_5_color
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
    text: 'The Trend of the Summer Indicators',
    align: 'left',
    style: {
        fontSize: title_font_size,
    }
  },
  subtitle: {
    text: 'Days of Dry Soil vs. Evaporation vs. Precipitation',
    align: 'left',
    style: {
        fontSize: subtitle_font_size,
    }
  },
  xAxis: {
      title: {
        text: 'Year',
        style: {
            fontSize: axis_label_font_size,
        }
      },
      categories: data.map(item => item[0].toString()), // Use year as categories
      labels: {
          overflow: 'justify'
      },
      labels: {
        style: {
            fontSize: axis_tick_label_font_size,
        }
      }

  },
  yAxis: {
      title: {
        text: 'Normalized Value of the Indicators',
        style: {
            fontSize: axis_label_font_size,
        }
      },
      labels: {
        style: {
            fontSize: axis_tick_label_font_size,
        }
      },
      minorGridLineWidth: 0,
      gridLineWidth: 0,
      alternateGridColor: null
  },

  legend: {
    itemStyle: {
        fontSize: legend_item_font_size,
    },
  },
  tooltip: {
    valueSuffix: '',
    style: {
        fontSize: tooltip_font_size,
    }
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
      color: dry_soil_color

  }, {
      name: 'Evaporation (cm)',
      data: evaporation,
      color: evaporation_color
  }, {
      name: 'Precipitation (cm)',
      data: precipitation,
      color: precipitation_color
  }],
  navigation: {
      menuItemStyle: {
          fontSize: '15px'
      }
  }
});

//////////////////// Vegetation Heatmap ////////////////////////

// Substring template helper for the responsive labels
Highcharts.Templating.helpers.substr = (s, from, length) =>
    s.substr(from, length);

// Create the chart
Highcharts.chart('vegetation-heatmap', {

    chart: {
        type: 'heatmap',
        width: 600,
        height: 600,
        marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 1,
        backgroundColor: 'transparent',
    },

    title: {
        text: 'Correlation among the Vegetation Indicators',
        style: {
            fontSize: title_font_size
        }
    },

    xAxis: {
        categories: ['Longitude', 'Latitude', 'Year', 'RCP', 'Tree Canopy', 'Bare', 'Herb', 'Annual Herb', 'Litter', 'Shrub'],
        title: {
            text: 'Indicators of Summer',
            style: {
                fontSize: axis_label_font_size
            }
        },
        labels: {
            style: {
                fontSize: axis_tick_label_font_size
            }
        }
    },

    yAxis: {
        categories: ['Longitude', 'Latitude', 'Year', 'RCP', 'Tree Canopy', 'Bare', 'Herb', 'Annual Herb', 'Litter', 'Shrub'],
        title: {
            text: 'Indicators of Summer',
            style: {
                fontSize: axis_label_font_size
            }
        },
        reversed: true,
        labels: {
            style: {
                fontSize: axis_tick_label_font_size
            }
        }
    },

    accessibility: {
        point: {
            descriptionFormat: '{(add index 1)}. ' +
                '{series.xAxis.categories.(x)} sales ' +
                '{series.yAxis.categories.(y)}, {value}.'
        }
    },

    colorAxis: {
        min: -1,
        minColor: '#FFFFFF',
        maxColor: heatmap_max_color,
        reversed: false
    },

    legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280,
        itemStyle: {
            fontSize: legend_item_font_size
        }
    },

    tooltip: {
        formatter: function() {
            return '<b>' + this.series.xAxis.categories[this.point.x] + '</b><br>' +
                   '<b>' + this.series.yAxis.categories[this.point.y] + '</b><br>' +
                   '<b>' + this.point.value.toFixed(3) + '</b><br>';
        },
        style: {
            fontSize: tooltip_font_size
        }
    },

    series: [{
        name: 'Correlation matrix',
        borderWidth: 1,
        data: [
            [0, 0, 1.000], [0, 1, 0.518], [0, 2, -0.010], [0, 3, 0.209], [0, 4, 0.168], [0, 5, -0.289], [0, 6, 0.087], [0, 7, 0.036], [0, 8, 0.296], [0, 9, 0.221],
            [1, 0, 0.518], [1, 1, 1.000], [1, 2, -0.007], [1, 3, 0.105], [1, 4, -0.092], [1, 5, -0.133], [1, 6, -0.032], [1, 7, 0.041], [1, 8, 0.274], [1, 9, 0.072],
            [2, 0, -0.010], [2, 1, -0.007], [2, 2, 1.000], [2, 3, 0.626], [2, 4, -0.013], [2, 5, 0.011], [2, 6, -0.006], [2, 7, -0.003], [2, 8, -0.003], [2, 9, -0.007],
            [3, 0, 0.209], [3, 1, 0.105], [3, 2, 0.626], [3, 3, 1.000], [3, 4, 0.020], [3, 5, -0.035], [3, 6, 0.011], [3, 7, -0.028], [3, 8, 0.039], [3, 9, 0.026],
            [4, 0, 0.168], [4, 1, -0.092], [4, 2, -0.013], [4, 3, 0.020], [4, 4, 1.000], [4, 5, -0.403], [4, 6, 0.303], [4, 7, -0.138], [4, 8, 0.146], [4, 9, 0.396],
            [5, 0, -0.289], [5, 1, -0.133], [5, 2, 0.011], [5, 3, -0.035], [5, 4, -0.403], [5, 5, 1.000], [5, 6, -0.696], [5, 7, -0.276], [5, 8, -0.836], [5, 9, -0.915],
            [6, 0, 0.087], [6, 1, -0.032], [6, 2, -0.006], [6, 3, 0.011], [6, 4, 0.303], [6, 5, -0.696], [6, 6, 1.000], [6, 7, 0.186], [6, 8, 0.485], [6, 9, 0.617],
            [7, 0, 0.036], [7, 1, 0.041], [7, 2, -0.003], [7, 3, -0.028], [7, 4, -0.138], [7, 5, -0.276], [7, 6, 0.186], [7, 7, 1.000], [7, 8, 0.279], [7, 9, 0.336],
            [8, 0, 0.296], [8, 1, 0.274], [8, 2, -0.003], [8, 3, 0.039], [8, 4, 0.146], [8, 5, -0.836], [8, 6, 0.485], [8, 7, 0.279], [8, 8, 1.000], [8, 9, 0.803],
            [9, 0, 0.221], [9, 1, 0.072], [9, 2, -0.007], [9, 3, 0.026], [9, 4, 0.396], [9, 5, -0.915], [9, 6, 0.617], [9, 7, 0.336], [9, 8, 0.803], [9, 9, 1.000]
        ],
        dataLabels: {
            enabled: true,
            color: '#000000'
        }
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                yAxis: {
                    labels: {
                        format: '{substr value 0 1}'
                    }
                }
            }
        }]
    }

});

//////////////////////////// Summer Heatmap ////////////////////////////
// Create the chart
Highcharts.chart('summer-heatmap', {
    chart: {
        type: 'heatmap',
        width: 600,
        height: 600,
        marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 1,
        backgroundColor: 'transparent',
    },

    title: {
        text: 'Correlation among the Summer Indicators',
        style: {
            fontSize: title_font_size
        }
    },

    xAxis: {
        categories: [
            'Longitude', 'Latitude', 'Year', 'RCP', 'Dry Soil Days', 'Evaporation', 'Non-Dry SWA', 'Precipitation', 'Max Temp', 'VWC'
        ],
        title: {
            text: 'Indicators of Summer',
            style: {
                fontSize: axis_label_font_size
            }
        },
        labels: {
            style: {
                fontSize: axis_tick_label_font_size
            }
        }
    },

    yAxis: {
        categories: [
            'Longitude', 'Latitude', 'Year', 'RCP', 'Dry Soil Days', 'Evaporation', 'Non-Dry SWA', 'Precipitation', 'Max Temp', 'VWC'
        ],
        reversed: true,
        title: {
            text: 'Indicators of Summer',
            style: {
                fontSize: axis_label_font_size
            }
        },
       
        labels: {
            style: {
                fontSize: axis_tick_label_font_size
            }
        }
    },

    accessibility: {
        point: {
            descriptionFormat: '{(add index 1)}. {series.xAxis.categories.[point.x]} and {series.yAxis.categories.[point.y]}: {point.value}.'
        }
    },

    colorAxis: {
        min: -1,
        max: 1,
        reversed: false,
        minColor: '#FFFFFF',
        maxColor: heatmap_max_color
    },

    legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280,
        itemStyle: {
            fontSize: legend_item_font_size
        }
    },

    tooltip: {
        formatter: function() {
            return '<b>' + this.series.xAxis.categories[this.point.x] + '</b><br>' +
                   '<b>' + this.series.yAxis.categories[this.point.y] + '</b><br>' +
                   '<b>' + this.point.value + '</b><br>';
        },
        style: {
            fontSize: tooltip_font_size
        }
    },

    series: [{
        name: 'Correlation values',
        borderWidth: 1,
        data: [
            [0, 0, 1.000], [0, 1, 0.518], [0, 2, -0.010], [0, 3, -0.013], [0, 4, -0.021], [0, 5, 0.051], [0, 6, 0.187], [0, 7, 0.077], [0, 8, -0.197], [0, 9, 0.502],
            [1, 0, 0.518], [1, 1, 1.000], [1, 2, -0.007], [1, 3, -0.007], [1, 4, 0.013], [1, 5, 0.028], [1, 6, 0.165], [1, 7, 0.066], [1, 8, -0.191], [1, 9, 0.320],
            [2, 0, -0.010], [2, 1, -0.007], [2, 2, 1.000], [2, 3, 0.703], [2, 4, 0.001], [2, 5, -0.073], [2, 6, 0.042], [2, 7, -0.019], [2, 8, 0.268], [2, 9, 0.013],
            [3, 0, -0.013], [3, 1, -0.007], [3, 2, 0.703], [3, 3, 1.000], [3, 4, -0.004], [3, 5, -0.038], [3, 6, 0.036], [3, 7, 0.003], [3, 8, 0.250], [3, 9, 0.011],
            [4, 0, -0.021], [4, 1, 0.013], [4, 2, 0.001], [4, 3, -0.004], [4, 4, 1.000], [4, 5, -0.083], [4, 6, -0.071], [4, 7, 0.001], [4, 8, -0.002], [4, 9, 0.016],
            [5, 0, 0.051], [5, 1, 0.028], [5, 2, -0.073], [5, 3, -0.038], [5, 4, -0.083], [5, 5, 1.000], [5, 6, 0.352], [5, 7, 0.014], [5, 8, -0.004], [5, 9, 0.227],
            [6, 0, 0.187], [6, 1, 0.165], [6, 2, 0.042], [6, 3, 0.036], [6, 4, -0.071], [6, 5, 0.352], [6, 6, 1.000], [6, 7, 0.004], [6, 8, -0.002], [6, 9, 0.521],
            [7, 0, 0.077], [7, 1, 0.066], [7, 2, -0.019], [7, 3, 0.003], [7, 4, 0.001], [7, 5, 0.014], [7, 6, 0.004], [7, 7, 1.000], [7, 8, -0.258], [7, 9, 0.005],
            [8, 0, -0.197], [8, 1, -0.191], [8, 2, 0.268], [8, 3, 0.250], [8, 4, -0.002], [8, 5, -0.004], [8, 6, -0.002], [8, 7, -0.258], [8, 8, 1.000], [8, 9, -0.003],
            [9, 0, 0.502], [9, 1, 0.320], [9, 2, 0.013], [9, 3, 0.011], [9, 4, 0.016], [9, 5, 0.227], [9, 6, 0.521], [9, 7, 0.005], [9, 8, -0.003], [9, 9, 1.000]
        ],
        dataLabels: {
            enabled: true,
            color: '#000000'
        }
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                yAxis: {
                    labels: {
                        formatter: function() {
                            return this.value.substr(0, 1);
                        }
                    }
                }
            }
        }]
    }
});
