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
        document.getElementById('investor').style.display='none';
        document.getElementById('pitch-review').style.display='none';
        document.getElementById('investor-section').style.display='none';
        document.getElementById('reviewer-section').style.display='none';
        document.getElementById('common-section').style.display='none';
    }

    if(userStorage.getItem('role')=='Investor'){
        document.getElementById('innovator').style.display='none';
        document.getElementById('pitch-review').style.display='none';
        document.getElementById('common-section').style.display='none';
        document.getElementById('reviewer-section').style.display='none';
        document.getElementById('innovator-section').style.display='none';
    }
    if(userStorage.getItem('role')=='Reviewer'){
        document.getElementById('innovator').style.display='none';
        document.getElementById('investor').style.display='none';
        document.getElementById('investor-section').style.display='none';
        document.getElementById('innovator-section').style.display='none';
        document.getElementById('common-section').style.display='none';
    }
}
else{
    document.getElementById('rewards').style.display='none';
    document.getElementById('insights').style.display='none';
login.style.display='inline';
register.style.display='inline';
document.getElementById('reviewer-section').style.display='none';
document.getElementById('innovator-section').style.display='none';
logout.style.display='none';
document.getElementById('profile').style.display  = 'none';
document.getElementById('investor-section').style.display='none';
document.getElementById('innovator').style.display='none';
document.getElementById('pitch-review').style.display='none';
document.getElementById('investor').style.display='none';
}
$(document).ready(function(){
    getPitchByIndustry();
    getAllReviewersRegistered();
    getAllPitchSubmitted();
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
}
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
const getPitchByIndustry = () =>{
    const xhr  = new XMLHttpRequest();
    xhr.open('GET','https://meekapi20201003140427.azurewebsites.net/API/Reports/GetReportsByIndustry');
    xhr.onload=()=>{
        const data = JSON.parse(xhr.response);
        console.log(data);
        data.sort(sortByValue("values"));
        for  (var i in data){
            console.log(data[i].Industry);
        }
        let result = data.map(a=> a.Industry);
        if(userStorage.getItem('role') == 'Investor'){
            document.getElementById('change2').innerText=result[0].toLowerCase();
            if(result[0] == 'Food and Nutrition'){
                document.getElementById('link2').setAttribute('href','food.html');
            }
            if(result[0] == 'Health'){
                document.getElementById('link2').setAttribute('href','Health.html');
            }
            if(result[0] == 'Information Technology'){
                document.getElementById('link2').setAttribute('href','IT.html');
            }
            if(result[0] == 'Construction'){
                document.getElementById('link2').setAttribute('href','construction.html');
            }
        }
        else if(userStorage.getItem('role') == 'Innovator'){
            document.getElementById('change1').innerText=result[0].toLowerCase();
            if(result[0] == 'Food and Nutrition'){
                document.getElementById('link1').setAttribute('href','submitPitch.html');
            }
            if(result[0] == 'Health'){
                document.getElementById('link1').setAttribute('href','submitPitch.html');
            }
            if(result[0] == 'Information Technology'){
                document.getElementById('link1').setAttribute('href','submitPitch.html');
            }
            if(result[0] == 'Construction'){
                document.getElementById('link1').setAttribute('href','submitPitch.html');
            }
        }
        else if(userStorage.getItem('role') == 'Reviewer'){
            document.getElementById('change3').innerText=result[result.length-1].toLowerCase();
            if(result[0] == 'Food and Nutrition'){
                document.getElementById('link3').setAttribute('href','Reviewpitches.html');
            }
            if(result[0] == 'Health'){
                document.getElementById('link3').setAttribute('href','Reviewpitches.html');
            }
            if(result[0] == 'Information Technology'){
                document.getElementById('link3').setAttribute('href','Reviewpitches.html');
            }
            if(result[0] == 'Construction'){
                document.getElementById('link3').setAttribute('href','Reviewpitches.html');
            }
        }
        console.log(result);
        let values = data.map(b=> b.values);
        console.log(values);


let labels1=result
let data1=values;
colors1=['#49A9EA','#36CAAB','#89cff0','#f0de89','#ab89f0','#9bf089','#899bf0']
let myChart1;
if(userStorage.getItem('role ') == 'Reviewer'){
    myChart1=document.getElementById("usersBar3").getContext('2d');
}
else if(userStorage.getItem('role') == 'Innovator'){
    myChart1=document.getElementById("usersBar1").getContext('2d');
}
else if(userStorage.getItem('role') == 'Investor'){
    myChart1=document.getElementById("usersBar2").getContext('2d');
}
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