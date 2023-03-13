let sub = document.getElementById('btn');
let text_one = document.getElementById("text_one").value;
let text_two = document.getElementById("text_two").value;
let user_pre = false


function getCookie(name) {

  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');


function transit(data){
  let prof = document.getElementById('prof');
  let first = document.getElementById('first');
  let profimage = document.getElementById('profimage');
  let profname = document.getElementById('profname');
  let user_id = document.getElementById('user_id')
  let name = document.getElementById('name')
  console.log(data)
  if (data.user != null){

    let password2 = document.getElementById('passtwo');
    password2.classList.add('none')
    document.getElementById('btntwo').addEventListener('click',onlylogin)
  }else{
    document.getElementById('btntwo').addEventListener('click',createuser)
    
  }



  prof.classList.remove('none');
  prof.classList.add('form')
  first.classList.remove('form')
  first.classList.add('none');

  profimage.src = data.image;
  profname.textContent = data.gc_name;
  user_id.value = data.gc_id;
  name.value = data.gc_name

  }

  


function submit(){
 
  let text_one = document.getElementById("text_one").value;
  let text_two = document.getElementById("text_two").value;

   fetch('http://127.0.0.1:8000/mid/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
          },
          body: JSON.stringify(
            {
              user_id: text_two,
              user_name:text_one,
              
          }) ,
        })
        .then((response)=>response.json())
        .then(data => transit(data))

        .catch(error => console.log(error))
          
};

function password_check(){
  let user_id = document.getElementById('user_id')
  let name = document.getElementById('name');
  let password1 = document.getElementById('passone');
  let password2 = document.getElementById('passtwo');

  data_topost = {
    username:name.value,
    password:password1.value,
    school_id:user_id.value,
  }

  if(password1.value == password2.value){
    return data_topost
  }else{
    return;
  }
};

function login(data){
  fetch('http://127.0.0.1:8000/auth/jwt/create/',{
    method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
          },
          body: JSON.stringify(
            {
              username: data.username,
              password:data.password,
              
          }) ,
  })
  .then(res=>res.json())
  .then(dta =>{
    window.localStorage.clear()
    window.localStorage.setItem("auth",JSON.stringify(dta))
    window.location.replace('http://127.0.0.1:8000/home/album')
    
  })
};


function createuser(){

  let data_topost = password_check();
  
  fetch('http://127.0.0.1:8000/auth/users/',{
    method:'POST',
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json',
      'X-CSRFToken': csrftoken
    },
    body:JSON.stringify(data_topost)

  })
  .then(res =>res.json())
  .then(data =>{
    login(data_topost)
    console.log(data)
  })
};


function onlylogin(){
  let name = document.getElementById('name');
  let password1 = document.getElementById('passone');

  credential_forpost = {
    username:name.value,
    password:password1.value,

  }

  login(credential_forpost)

}




function getcurrentuser(){
  fetch('http://127.0.0.1:8000/auth/users/me/',{
    method: 'GET',
          headers: {
            'Authorization': `JWT ${JSON.parse(localStorage.getItem('auth')).access}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
          },
         
  })
  .then(res => res.json())
  .then(data => {
    console.log('alDdsjf')
    console.log(data)})
}



// document.getElementById('test').addEventListener('click',getcurrentuser)