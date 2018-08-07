

// function for displaying list of universities
// The selected country of the user is passed into the url to ensure that the displayUnis function 
// is dynamic and scalable
function displayUnis(country){
var apirequest = $.ajax({
  type: 'GET',
  url: 'https://cors-anywhere.herokuapp.com/http://universities.hipolabs.com/search?country='+country,
  async: false,
  beforeSend: function (xhr) {
    if (xhr && xhr.overrideMimeType) {
      xhr.overrideMimeType('application/json;charset=utf-8');
    }
  },
  dataType: 'json',
  success: function (data) {
     var  html = '<table class="unilist"><tr><th>&nbspNo.&nbsp</th><th>Name of University</th><th>Website</th> </tr>';
     var number = 1;
     $.each(data, function(index, data){
        html += '<tr><td>' + number + '</td>';
        html += '<td id="name">' + data.name  + '</td>';
        html += '<td><a target="_blank" href="'+data.web_pages+'">'+data.domains+'</a></td></tr>';
        number++;
        // console.log(data);
     });
     html += '</table><p></p>';
      $('#list').html(html);
  }
});

apirequest.done(function (data){
  console.log("done "+data);
});

}


// Global variables for reading statistics and plotting graphs
var selectedCountry;
var selectedIndicator;
var myChart = null;
var total = null;
var unknown = "Unknown";


// function to read the country selected by user and display it
function readCountry(countryCode){
   if(countryCode == 'CMR'){
     $(".countryName").text("Statistics for Cameroon")
     $(".countryName").css({"backgroundColor":"#3AAFA9", "text-align": "center", "color":"white"})
   }
   else if(countryCode == 'MUS'){
    $(".countryName").text("Statistics for Mauritius")
    $(".countryName").css({"backgroundColor":"#3AAFA9", "text-align": "center", "color":"white"})
   }
   else{
     $(".countryName").text(" Statistics for United Kingdom")
     $(".countryName").css({"backgroundColor":"#3AAFA9", "text-align": "center", "color":"white"})
   }
   selectedCountry = countryCode;
  // console.log(selectedCountry);
}


// function to read the indicator selected by user
function readCode(indicatorCode){
  var selectedIndicator = indicatorCode;
  // console.log(selectedIndicator);
  readStats(selectedCountry, selectedIndicator);
}


// function selectedOption(){
//   // Get the container element
//   var container = document.getElementById("vertical-menu");

//   // Get all options with class="option" inside the container
//   var options = container.getElementsByClassName("option");

//   // Loop through the buttons and add the active class to the current/clicked button
//   for (var i = 0; i < options.length; i++) {
//     options[i].addEventListener("click", function() {
//       var current = document.getElementsByClassName("active");
//       current[0].className = current[0].className.replace(" active", "");
//       this.className += " active";
//     });
//   }
// }

//function to display statistics for user's selected country and indicator
function readStats(selectedCountry, selectedIndicator){
  var apiworldbank = $.ajax({
  type: 'GET',
  url: 'http://api.worldbank.org/v2/countries/' + selectedCountry + '/indicators/' + selectedIndicator + '?date=2009:2015&format=json',
  async: false,
  beforeSend: function (xhr) {
    if (xhr && xhr.overrideMimeType) {
      xhr.overrideMimeType('application/json;charset=utf-8');
    }
  },
  complete: function(data){
    // console.log(data);

  },
  dataType: 'json',
  success: function (data) {
    console.log(data);
    var xaxis = [];
    var yaxis = [];
    var label = '';
    if (selectedIndicator == 'SE.TER.ENRL'){
      for(var i =0; i<data[1].length; i++){
        // unshift method adds values to the beginning of the array
        xaxis.unshift(data[1][i].date);
        yaxis.unshift(data[1][i].value);
      }
        label = data[1][0].indicator.value;
        barChart(xaxis,yaxis, label);
    } 
    else if (selectedIndicator == 'UIS.FOSEP.56.F600') {
  
      for(var i =0; i<data[1].length; i++){
        total += data[1][i].value;
        xaxis.unshift(data[1][i].date);
        yaxis.unshift(data[1][i].value);
        // To represent unknown or null values on pie chart
        if(i==data[1].length-1){
          xaxis[i+1] = unknown;
          yaxis[i+1] = 100-total;
        }
      }
        label = data[1][0].indicator.value;
        pieChart(xaxis,yaxis, label);
    } 
    else if (selectedIndicator == 'UIS.FOSEP.56.F140') {
      for(var i =0; i<data[1].length; i++){
        xaxis.unshift(data[1][i].date);
        yaxis.unshift(data[1][i].value);
      }
        label = data[1][0].indicator.value;
        lineChart(xaxis,yaxis, label);
    } 
    else if (selectedIndicator == 'UIS.FOSEP.56.F500') {
       for(var i =0; i<data[1].length; i++){
        xaxis.unshift(data[1][i].date);
        yaxis.unshift(data[1][i].value);
      }
        label = data[1][0].indicator.value;
        barChart(xaxis,yaxis, label);
    } 
    else if (selectedIndicator == 'UIS.FOSEP.56.F700') {
       for(var i =0; i<data[1].length; i++){
        xaxis.unshift(data[1][i].date);
        yaxis.unshift(data[1][i].value);
      }
        label = data[1][0].indicator.value;
        barChart(xaxis,yaxis, label);
    } 
    else if (selectedIndicator == 'UIS.FOSEP.56.F200') {
       for(var i =0; i<data[1].length; i++){
        xaxis.unshift(data[1][i].date);
        yaxis.unshift(data[1][i].value);
      }
        label = data[1][0].indicator.value;
        barChart(xaxis,yaxis, label);
    } 
    else if (selectedIndicator == 'UIS.FOSEP.56.F400') {
       for(var i =0; i<data[1].length; i++){
        xaxis.unshift(data[1][i].date);
        yaxis.unshift(data[1][i].value);
        // To represent unknown or null values on pie chart
        if(i==data[1].length-1){
          xaxis[i+1] = unknown;
          yaxis[i+1] = 100-total;
        }
      }
        label = data[1][0].indicator.value;
        pieChart(xaxis,yaxis, label);
    } 
    else if (selectedIndicator == 'UIS.FOSEP.56.F800') {
       for(var i =0; i<data[1].length; i++){
        xaxis.unshift(data[1][i].date);
        yaxis.unshift(data[1][i].value);
      }
        label = data[1][0].indicator.value;
        lineChart(xaxis,yaxis, label);
    } 
    else if (selectedIndicator == 'UIS.FOSEP.56.F300') {
       for(var i =0; i<data[1].length; i++){
        xaxis.unshift(data[1][i].date);
        yaxis.unshift(data[1][i].value);
      }
        label = data[1][0].indicator.value;
        barChart(xaxis,yaxis, label);
    } 
    else {
       for(var i =0; i<data[1].length; i++){
        xaxis.unshift(data[1][i].date);
        yaxis.unshift(data[1][i].value);
      }
        label = data[1][0].indicator.value;
        lineChart(xaxis,yaxis, label);
    }
     
     // });
      // $('#list').html(html);
  }
});

}

// function to plot a bar chart
function barChart(xaxis, yaxis, label){
  // If there is a chart already, this removes it and creates a new canvas for the new chart
  if(myChart){
      myChart.canvas.remove();
      $("div#charts").append('<canvas id="theChart" width="400" height="400"></canvas>');
  }
  myChart = document.getElementById("theChart").getContext('2d');
  var chart = new Chart(myChart, {
  type: "bar",
  data: {
    labels: xaxis,
    datasets: [{
      label: label,
      data: yaxis,
      backgroundColor:[
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(54, 200, 99, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(54, 200, 99, 1)',
        'rgba(153, 102, 255, 1)'
      ],
            borderWidth: 1

    }]
  }

})
}

// function to plot a pie chart
function pieChart(xaxis, yaxis, label){
  if(myChart){
      myChart.canvas.remove();
      $("div#charts").append('<canvas id="theChart" width="400" height="400"></canvas>');
  }
  var myChart = document.getElementById("theChart").getContext('2d');
  var chart = new Chart(myChart, {
  type: "pie",
  data: {
    labels: xaxis,
    datasets: [{
      label: label,
      data: yaxis,
      backgroundColor:[
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(54, 200, 99, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(54, 200, 99, 1)',
        'rgba(153, 102, 255, 1)'
      ],
            borderWidth: 1

    }]
  }

})
}

// function to plot a line chart
function lineChart(xaxis, yaxis, label){
  if(myChart){
      myChart.canvas.remove();
      $("div#charts").append('<canvas id="theChart" width="400" height="400"></canvas>');
  }
  var myChart = document.getElementById("theChart").getContext('2d');
  var chart = new Chart(myChart, {
  type: "line",
  data: {
    labels: xaxis,
    datasets: [{
      label: label,
      data: yaxis,
      backgroundColor:[
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(54, 200, 99, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(54, 200, 99, 1)',
        'rgba(153, 102, 255, 1)'
      ],
            borderWidth: 1

    }]
  }

})
}

