let userStorage = window.localStorage;
const login = document.getElementById('login');
const pitch = document.getElementById('pitch');
const register = document.getElementById('register');
const logout = document.getElementById('logout');
console.log(userStorage.getItem('role'));
logout.style.display='none';
if(userStorage.getItem('role') !=null){
login.style.display='none';
register.style.display='none';
logout.style.display='inline';
    if(userStorage.getItem('role')=='Innovator'){
        document.getElementById('pitch-review').style.display='none';
        document.getElementById('investor').style.display='none';
        document.getElementById('investor-2').style.display='none';
        document.getElementById('investor-1').style.display='none';
        document.getElementById('reviewer-2').style.display='none';
        document.getElementById('reviewer-1').style.display='none';
        document.getElementById('v2').style.display='none';
    }

    if(userStorage.getItem('role')=='Investor'){
      document.getElementById('v2').style.display='none';
        document.getElementById('innovator').style.display='none';
        document.getElementById('pitch-review').style.display='none';
        document.getElementById('innpvator-2').style.display='none';
        document.getElementById('innpvator-1').style.display='none';
        document.getElementById('reviewer-2').style.display='none';
        document.getElementById('reviewer-1').style.display='none';
    }
    if(userStorage.getItem('role')=='Reviewer'){
      document.getElementById('v1').style.display='none';
        document.getElementById('innovator').style.display='none';
        document.getElementById('investor').style.display='none';
        document.getElementById('innpvator-2').style.display='none';
        document.getElementById('innpvator-1').style.display='none';
        document.getElementById('investor-2').style.display='none';
        document.getElementById('investor-1').style.display='none';
    }
}
else{
  document.getElementById('rewards').style.display='none';
  document.getElementById('insights').style.display='none';
   window.location.href='login.html';
login.style.display='inline';
register.style.display='inline';
document.getElementById('profile').style.display  = 'none';
logout.style.display='none';
document.getElementById('innovator').style.display='none';
document.getElementById('pitch-review').style.display='none';
document.getElementById('investor').style.display='none';
}
$(document).ready(function(){
    SuccessForLocation();
    getPitchByIndustry();
  });
  function sortByValue(prop){
    return function(a,b){
        if(a[prop]<b[prop]){
            return 1;
        }
        else if(a[prop]>b[prop]){
            return -1;
        }
        return 0;
        }
    };
  const getPitchByIndustry = () =>{
    const xhr  = new XMLHttpRequest();
    xhr.open('GET','https://meekapi20201003140427.azurewebsites.net/API/Reports/GetReportsByIndustry');
    xhr.onload=()=>{
        const data = JSON.parse(xhr.response)
        console.log(data);
        data.sort(sortByValue("values"));
        let result = data.map(a=> a.Industry);
        let values = data.map(b=> b.values);
        if(userStorage.getItem('role') == 'Investor'){
          document.getElementById('text-change2').innerText = "The above industry is the most popular amoung submitted applications follow the link to that catergory and find a business to invest in";
          if(result[0] == 'Food and Nutrition'){
              document.getElementById('investor-link2').setAttribute('href','food.html');
          }
          if(result[0] == 'Health'){
              document.getElementById('investor-link2').setAttribute('href','Health.html');
          }
          if(result[0] == 'Information Technology'){
              document.getElementById('investor-link2').setAttribute('href','IT.html');
          }
          if(result[0] == 'Construction'){
              document.getElementById('investor-link2').setAttribute('href','construction.html');
          }
      }
      else if(userStorage.getItem('role') == 'Reviewer'){
        document.getElementById('text-change2').innerText="The above stats show the popularity of the industry, the smallest industry has fewer applications submitted";
        if(result[0] == 'Food and Nutrition'){
            document.getElementById('reviewer-link2').setAttribute('href','foodNotRev.html');
        }
        if(result[0] == 'Health'){
            document.getElementById('reviewer-link2').setAttribute('href','HealthNotReviewed.html');
        }
        if(result[0] == 'Information Technology'){
            document.getElementById('reviewer-link2').setAttribute('href','ITnotReviewed.html');
        }
        if(result[0] == 'Construction'){
            document.getElementById('reviewer-link2').setAttribute('href','constructionNotRev.html');
        }
    }
        console.log(result);
        console.log(values);
let labels1=result
let data1=values;
colors1=['#49A9EA','#36CAAB','#89cff0','#f0de89','#ab89f0','#9bf089','#899bf0']
let myChart1 = document.getElementById("myAreaChart2").getContext('2d');

let chart1 = new Chart(myChart1,{
    type:'doughnut',
    data:{
        labels:labels1,
        datasets:[{
            data:data1,
            backgroundColor:colors1
        }]
    },
    options:{
      maintainAspectRatio: true,
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

        data.sort(sortByValue("values"));
        let result = data.map(a=> a.ManagementLocation);
        console.log(result);
        let values = data.map(b=> b.values);
        console.log(values);
        
        if(userStorage.getItem('role') == 'Investor'){
          document.getElementById('investor-link1').setAttribute('href',`viewByLocation.html?Location=${result[0]}`);
          document.getElementById('text-change1').innerText="Applications are categorized per location, most of appplication submitted are in the same area as the investors";
        }
        else if(userStorage.getItem('role') == 'Reviewer'){
          document.getElementById('reviewer-link1').setAttribute('href',`viewByLocationNotReviewed.html?Location=${result[result.length-1]}`);
          document.getElementById('text-change1').innerText="Applications are categorized per location and the above location is the least popular one for successful appplication. This might be because less  investors are located in that area";
        }
  
  
  let labels1=result
  let data1=values;
  colors1=['#49A9EA','#36CAAB','#89cff0','#f0de89','#ab89f0','#9bf089','#899bf0']
  let myChart1 = document.getElementById("myAreaChart1").getContext('2d');
  let chart1 = new Chart(myChart1,{
    type:'doughnut',
    data:{
        labels:labels1,
        datasets:[{
            data:data1,
            backgroundColor:colors1
        }]
    },
    options:{
      maintainAspectRatio: true,
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