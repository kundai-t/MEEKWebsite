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

    const addnew = ()=>{
        const summary = String(document.getElementById('sumarry').value);
        const business = String(document.getElementById('business').value);
        const market = String(document.getElementById('market').value);
        const progress = String(document.getElementById('progress').value);
        const objective = String(document.getElementById('objective').value);
        const url = String(document.getElementById('url').value);

        sendHttpRequest('POST',"https://localhost:44343/API/Application/AddPitch",{
            PitchID:summary,
            name:""
        }).then(responseData=>{
            if(responseData.status == 200){
                window.location.href='index.html';
            }
        }).catch(err=>{
console.log(err)
        });
    }

    const getStuff