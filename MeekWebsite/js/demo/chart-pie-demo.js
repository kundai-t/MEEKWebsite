const chat1  = document.getElementById('myPieChart');
const chat2 = document.getElementById('myPieChart1');
const txt = document.getElementById('industry');
const txt2 = document.getElementById('location');
const txt3 = document.getElementById('heading');
const text4 = document.getElementById('text4');
const txt4 = document.getElementById('location1');
const txt5 = document.getElementById('industry1');
const barChat1 = document.getElementById('myAreaChart');
const barChat2 = document.getElementById('myAreaChart1');
const heading1 =  document.getElementById('heading1');
const userBar =document.getElementById('usersBar');
const locationSuccess =document.getElementById('locationInvestor');
const industryInvestor = document.getElementById('industryInvestor');
const chartSuccess1  =  document.getElementById('myPieChartSuccess');
const chartSuccess2 = document.getElementById('myPieChartSuccess2');
const tot_users=document.getElementById('tot_users');
const reviewers=document.getElementById('reviewers');
const pitch=document.getElementById('pitch');
const mobile=document.getElementById('mobile');
$(document).ready(function(){
  chat1.style.display='none';
  barChat2.style.display='none';
  chartSuccess2.style.display='none';

  getPitchByIndustry();
  getPitchByLocation();
  getSuccesfulPitchByIndustry();
  getSuccesfulPitchByLocation();
  getAllUsersByLocation();
  SuccessForIndustry();
  SuccessForLocation();
  getAllUsersOnMobile();
  getAllUsersRegistered();
  getAllReviewersRegistered();
  getAllPitchSubmitted();
});
locationSuccess.onclick = function LocationSuc(){
  chartSuccess2.style.display='none';
  chartSuccess1.style.display='block';
  heading1.innerHTML="Most Chosen Pitches By Investors Grouped By Region"
}
industryInvestor.onclick = function LocationSuc(){
  chartSuccess2.style.display='block';
  chartSuccess1.style.display='none';
  heading1.innerHTML="Most Chosen Pitches By Investors Grouped By Industry"
}
txt.onclick= function displayIndustry(){
  txt3.innerHTML="Pitches based by Industry";
  chat2.style.display='none';
  chat1.style.display='block';
}
txt2.onclick =  function displayLocation(){
  txt3.innerHTML="Pitches based by Location";
  chat1.style.display='none';
  chat2.style.display='block';
}
txt4.onclick= function displayLocation1(){
  text4.innerHTML="Pitches based by Location";
  barChat1.style.display='none';
  barChat2.style.display='block';
}
txt5.onclick =  function displayIndustry1(){
  text4.innerHTML="Pitches based by Industry";
  barChat1.style.display='block';
  barChat2.style.display='none';
}
const getAllUsersByLocation = ()=>{
  const xhr  = new XMLHttpRequest();
  xhr.open('GET','https://meekapi20201003140427.azurewebsites.net/API/Reports/GetAllUsersByLocation');
  xhr.onload=()=>{
      const data = JSON.parse(xhr.response)
      console.log(data);
      let result = data.map(a=> a.ManagementLocation);
      console.log(result);
      let values = data.map(b=> b.values);
      console.log(values);

      colors1=['#f0de89','#ab89f0','#9bf089','#899bf0','#2e59d9']
      var myLineChart = new Chart(userBar, {
        type: 'bar',
        data: {
          labels: result,
          datasets: [{
            label: "Location",
            backgroundColor: colors1,
            hoverBackgroundColor: "#2e59d9",
            borderColor: "#4e73df",
            data: values,
          }],
        },
        options: {
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 10,
              right: 25,
              top: 25,
              bottom: 0
            }
          },
          scales: {
            xAxes: [{
              time: {
                unit: 'Location'
              },
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                maxTicksLimit: 7
              }
            }],
            yAxes: [{
              ticks: {
                maxTicksLimit: 5,
                padding: 10,
              },
              gridLines: {
                color: "rgb(234, 236, 244)",
                zeroLineColor: "rgb(234, 236, 244)",
                drawBorder: false,
                borderDash: [2],
                zeroLineBorderDash: [2]
              }
            }],
          },
          legend: {
            display: false
          },
          tooltips: {
            titleMarginBottom: 10,
            titleFontColor: '#6e707e',
            titleFontSize: 14,
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10,
          }
        }
      });
  };
  xhr.send();
};
const getAllUsersRegistered =()=>{
  const xhr  = new XMLHttpRequest();
  xhr.open('GET','https://meekapi20201003140427.azurewebsites.net/API/Reports/GetAllRegisteredUsers');
  xhr.onload=()=>{
      const data = JSON.parse(xhr.response)
      console.log(data);
      let result = data.map(a=> a.mobile);
      console.log(result);
      tot_users.innerHTML=result[0];
}
xhr.send();
};
const getAllPitchSubmitted =()=>{
  const xhr  = new XMLHttpRequest();
  xhr.open('GET','https://meekapi20201003140427.azurewebsites.net/API/Reports/GetAllSubmitted');
  xhr.onload=()=>{
      const data = JSON.parse(xhr.response)
      console.log(data);
      let result = data.map(a=> a.mobile);
      console.log(result);
      pitch.innerHTML=result[0];
}
xhr.send();
};
const getAllReviewersRegistered =()=>{
  const xhr  = new XMLHttpRequest();
  xhr.open('GET','https://meekapi20201003140427.azurewebsites.net/API/Reports/GetAllRegisteredReviewers');
  xhr.onload=()=>{
      const data = JSON.parse(xhr.response)
      console.log(data);
      let result = data.map(a=> a.mobile);
      console.log(result);
      reviewers.innerHTML=result[0];
}
xhr.send();
};
const SuccessForIndustry = ()=>{
  const xhr  = new XMLHttpRequest();
  xhr.open('GET','https://meekapi20201003140427.azurewebsites.net/API/Reports/SuccessPitchByIndustryForInvestors');
  xhr.onload=()=>{
      const data = JSON.parse(xhr.response)
      console.log(data);
      let result = data.map(a=> a.Industry);
      console.log(result);
      let values = data.map(b=> b.values);
      console.log(values);


let labels1=result
let data1=values;
colors1=['#49A9EA','#36CAAB','#89cff0','#f0de89','#ab89f0','#9bf089','#899bf0']
let chart1 = new Chart(chartSuccess2,{
  type:'pie',
  data:{
      labels:labels1,
      datasets:[{
          data:data1,
          backgroundColor:colors1
      }]
  },
options:{
  maintainAspectRatio: false,
  tooltips: {
    backgroundColor: "rgb(255,255,255)",
    bodyFontColor: "#858796",
    borderColor: '#dddfeb',
    borderWidth: 1,
    xPadding: 15,
    yPadding: 15,
    displayColors: false,
    caretPadding: 10,
  },
  legend: {
    display: true
  },
  cutoutPercentage: 80,
}
});
  };
  xhr.send();
};
const SuccessForLocation = ()=>{
  const xhr  = new XMLHttpRequest();
  xhr.open('GET','https://meekapi20201003140427.azurewebsites.net/API/Reports/SuccessPitchByLocationForInvestors');
  xhr.onload=()=>{
      const data = JSON.parse(xhr.response)
      console.log(data);
      let result = data.map(a=> a.ManagementLocation);
      console.log(result);
      let values = data.map(b=> b.values);
      console.log(values);


let labels1=result
let data1=values;
colors1=['#49A9EA','#36CAAB','#89cff0','#f0de89','#ab89f0','#9bf089','#899bf0']
//let myChart1 = document.getElementById("myPieChart").getContext('2d');
let chart1 = new Chart(chartSuccess1,{
  type:'pie',
  data:{
      labels:labels1,
      datasets:[{
          data:data1,
          backgroundColor:colors1
      }]
  },
  options:{
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: true
    },
    cutoutPercentage: 80,
  }
});
  };
  xhr.send();
};
const getPitchByIndustry = () =>{
    const xhr  = new XMLHttpRequest();
    xhr.open('GET','https://meekapi20201003140427.azurewebsites.net/API/Reports/GetReportsByIndustry');
    xhr.onload=()=>{
        const data = JSON.parse(xhr.response)
        console.log(data);
        let result = data.map(a=> a.Industry);
        console.log(result);
        let values = data.map(b=> b.values);
        console.log(values);


let labels1=result
let data1=values;
colors1=['#49A9EA','#36CAAB','#89cff0','#f0de89','#ab89f0','#9bf089','#899bf0']
let myChart1 = document.getElementById("myAreaChart1").getContext('2d');
let chart1 = new Chart(myChart1,{
    type:'pie',
    data:{
        labels:labels1,
        datasets:[{
            data:data1,
            backgroundColor:colors1
        }]
    },
    options:{
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: true
      },
      cutoutPercentage: 80,
    }
});
    };
    xhr.send();

};
const getPitchByLocation = () =>{
  const xhr  = new XMLHttpRequest();
  xhr.open('GET','https://meekapi20201003140427.azurewebsites.net/API/Reports/GetReportsByProvice');
  xhr.onload=()=>{
      const data = JSON.parse(xhr.response)
      console.log(data);
      let result = data.map(a=> a.ManagementLocation);
      console.log(result);
      let values = data.map(b=> b.values);
      console.log(values);


let labels1=result
let data1=values;
colors1=['#49A9EA','#36CAAB','#89cff0','#f0de89','#ab89f0','#9bf089','#899bf0']
let myChart1 = document.getElementById("myPieChart1").getContext('2d');
let chart1 = new Chart(myChart1,{
  type:'pie',
  data:{
      labels:labels1,
      datasets:[{
          data:data1,
          backgroundColor:colors1
      }]
  },
  options:{
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: true
    },
    cutoutPercentage: 80,
  }
});
  };
  xhr.send();

};
const getSuccesfulPitchByIndustry =()=>{
  const xhr  = new XMLHttpRequest();
  xhr.open('GET','https://meekapi20201003140427.azurewebsites.net/API/Reports/SuccessPitchByIndustry');
  xhr.onload=()=>{
      const data = JSON.parse(xhr.response)
      console.log(data);
      let result = data.map(a=> a.Industry);
      console.log(result);
      let values = data.map(b=> b.values);
      console.log(values);

      colors1=['#f0de89','#ab89f0','#9bf089','#899bf0','#2e59d9']
      var ctx = document.getElementById("myAreaChart");
      var myLineChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: result,
          datasets: [{
            label: "Industry",
            backgroundColor: colors1,
            hoverBackgroundColor: "#2e59d9",
            borderColor: "#4e73df",
            data: values,
          }],
        },
        options: {
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 10,
              right: 25,
              top: 25,
              bottom: 0
            }
          },
          scales: {
            xAxes: [{
              time: {
                unit: 'date'
              },
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                maxTicksLimit: 7
              }
            }],
            yAxes: [{
              ticks: {
                maxTicksLimit: 5,
                padding: 10,
              },
              gridLines: {
                color: "rgb(234, 236, 244)",
                zeroLineColor: "rgb(234, 236, 244)",
                drawBorder: false,
                borderDash: [2],
                zeroLineBorderDash: [2]
              }
            }],
          },
          legend: {
            display: false
          },
          tooltips: {
            titleMarginBottom: 10,
            titleFontColor: '#6e707e',
            titleFontSize: 14,
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10,
          }
        }
      });
  };
  xhr.send();

};
const getSuccesfulPitchByLocation =()=>{
  const xhr  = new XMLHttpRequest();
  xhr.open('GET','https://meekapi20201003140427.azurewebsites.net/API/Reports/SuccessPitchByLocation');
  xhr.onload=()=>{
      const data = JSON.parse(xhr.response)
      console.log(data);
      let result = data.map(a=> a.Industry);
      console.log(result);
      let values = data.map(b=> b.values);
      console.log(values);

      colors1=['#f0de89','#ab89f0','#9bf089','#899bf0','#2e59d9']
      var ctx = document.getElementById("myAreaChart1");
      var myLineChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: result,
          datasets: [{
            label: "Industry",
            backgroundColor: colors1,
            hoverBackgroundColor: "#2e59d9",
            borderColor: "#4e73df",
            data: values,
          }],
        },
        options: {
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 10,
              right: 25,
              top: 25,
              bottom: 0
            }
          },
          scales: {
            xAxes: [{
              time: {
                unit: 'date'
              },
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                maxTicksLimit: 7
              }
            }],
            yAxes: [{
              ticks: {
                maxTicksLimit: 5,
                padding: 10,
              },
              gridLines: {
                color: "rgb(234, 236, 244)",
                zeroLineColor: "rgb(234, 236, 244)",
                drawBorder: false,
                borderDash: [2],
                zeroLineBorderDash: [2]
              }
            }],
          },
          legend: {
            display: false
          },
          tooltips: {
            titleMarginBottom: 10,
            titleFontColor: '#6e707e',
            titleFontSize: 14,
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10,
          }
        }
      });
  };
  xhr.send();

};
const getAllUsersOnMobile =()=>{
  const xhr  = new XMLHttpRequest();
  xhr.open('GET','https://meekapi20201003140427.azurewebsites.net/API/Reports/GetAllUsersOnMobile');
  xhr.onload=()=>{
      const data = JSON.parse(xhr.response)
      console.log(data);
      let result = data.map(a=> a.values);
      console.log(result);
      mobile.innerHTML=result[0];
}
xhr.send();
};
