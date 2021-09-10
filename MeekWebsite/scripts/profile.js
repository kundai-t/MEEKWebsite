const urlRoute ="https://meekapi20201003140427.azurewebsites.net/API/User/GetUserDetails";
const route="https://meekapi20201003140427.azurewebsites.net/API/User/UpdateUserDetails";
const routeRewards = "https://meekapi20201003140427.azurewebsites.net/API/GetRewards";
const routeGetCoupon="https://meekapi20201003140427.azurewebsites.net/API/GetCoupon";
const routeSaveCoupon="https://meekapi20201003140427.azurewebsites.net/API/SaveCoupon";
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
var userStorage=window.localStorage;
const id=userStorage.getItem('userId');
const userRole = userStorage.getItem('role');
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
    }

    if(userStorage.getItem('role')=='Investor'){
        document.getElementById('innovator').style.display='none';
        document.getElementById('pitch-review').style.display='none';
    }
    if(userStorage.getItem('role')=='Reviewer'){
        document.getElementById('innovator').style.display='none';
        document.getElementById('investor').style.display='none';
    }
}
else{
    document.getElementById('rewards').style.display='none';
    document.getElementById('insights').style.display='none';
login.style.display='inline';
register.style.display='inline';
logout.style.display='none';
document.getElementById('profile').style.display  = 'none';
document.getElementById('innovator').style.display='none';
document.getElementById('pitch-review').style.display='none';
document.getElementById('investor').style.display='none';
}
let file = {};
function chooseFile(e){
    file = e.target.files[0];
}
function uploadFile(event){
    event.preventDefault();
    firebase.storage().ref('users/' + id + '/profile.jpg').put(file).then(function(){
        console.log('Successfully uploaded');
        window.location.href='profile.html';
    }).catch(err=>{
        console.log(err.message);
    })
}
function getImageUrl(){
    firebase.storage().ref('users/' + id + '/profile.jpg').getDownloadURL().then(imgURL=>{
        document.getElementById('profile_pic').src=imgURL;
    }).catch(err=>{
        console.log(err);
    })
}
const sendHttpRequest = (method,url,data)=>{

    const promise = new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open(method,url);
        xhr.responseType = 'json';
        if(data){
            xhr.setRequestHeader('Content-Type','application/json');
        }
        xhr.onload = () => {
            if(xhr.status >=400){
                reject(xhr.response);
            }
            else{
                resolve(xhr.response);
            }
        };
        xhr.onerror = () => {
            reject('Something went wrong!');
          };
      
          xhr.send(JSON.stringify(data));
    });
    return promise;
    };
    function removeItemAll(arr, value) {
        var i = 0;
        while (i < arr.length) {
          if (arr[i] === value) {
            arr.splice(i, 1);
          } else {
            ++i;
          }
        }
        return arr;
      }
      function makeCoupon(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

    const viewProfile =()=>{
        sendHttpRequest('POST',urlRoute,{
            UserId:id
        }).then(responseData=>{
            console.log(responseData);
            document.getElementById('fname').value=responseData.map(a=>a.FullName);
            document.getElementById('email').value=responseData.map(a=>a.Email);
            document.getElementById('idNumber').value=responseData.map(a=>a.IDNumber);
            document.getElementById('province').value=responseData.map(a=>a.Province);
            document.getElementById('city').value=responseData.map(a=>a.City);
            document.getElementById('streetName').value=responseData.map(a=>a.Street);
            document.getElementById('zip').value=responseData.map(a=>a.ZipCode);
         }).catch(eRRor=>{
             console.log(eRRor);
         });
    };


    window.addEventListener('load',function(){
        viewProfile();
        var firebaseConfig = {
            apiKey: "AIzaSyBks5CrSrR7LcKlTMwae-w_-AbHP1c4qAg",
            authDomain: "profile-pic-57c57.firebaseapp.com",
            databaseURL: "https://profile-pic-57c57.firebaseio.com",
            projectId: "profile-pic-57c57",
            storageBucket: "profile-pic-57c57.appspot.com",
            messagingSenderId: "747666154641",
            appId: "1:747666154641:web:90a7a8a0f7f9e30fbdcb30",
            measurementId: "G-QV0G6EB24D"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
          getImageUrl();
    });

  
  document.getElementById('btnUpdate').addEventListener('click',function(Palesa){
      Palesa.preventDefault();
      sendHttpRequest('POST',route,{
          UserId:id,
          Fullname:String(document.getElementById('fname').value),
          Email:String(document.getElementById('email').value),
          IDNumber:String(document.getElementById('idNumber').value),
          Province:String(document.getElementById('province').value),
          City:String(document.getElementById('city').value),
          Street:String(document.getElementById('streetName').value),
          ZipCode:String(document.getElementById('zip').value)
      }).then(response=>{
          console.log(response);
         if(response.message == 'OK'){
             window.location.href='profile.html';
         } 
      }).catch(eRRor=>{
          console.log(eRRor);
      });
  });