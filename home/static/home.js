let current_user;
let nom = 0;
let current_user_id;
let imlist;


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
    
      getprofile(data)
    })
};


function getprofile(cur_user){
     fetch('http://127.0.0.1:8000/mid/album/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(
              {
                idd: cur_user.id,

                
            }) ,
          })
          .then((response)=>response.json())
          .then(data => {
            let img = document.getElementById('profimage');
            let profname = document.getElementById('profname');

            img.src = data.image
            profname.textContent = data.gc_name

          })
  
          .catch(error => console.log(error))
            
  };

function insertmagazinepages(data){
  let inimage = document.getElementById('slidimage');
  inimage.classList.add('magimage')
  inimage.src = data[parseInt(nom)].image

 

}

function getimageformagazinepages(){
  let imgone = document.getElementById('imgone');
  let imgtwo = document.getElementById('imgtwo');

  imgone.src = imlist[parseInt(0)].image
  imgtwo.src = imlist[parseInt(3)].image
}


function margrightleftinsertion(){
  let imgleft = document.getElementById('magleft');
  let imgright = document.getElementById('magright');

  imgleft.src = imlist[parseInt(nom)].image
  imgright.src = imlist[parseInt(nom+1)].image
}

document.getElementById('slidbtntwo').addEventListener('click',()=>{
  if(imlist[parseInt(nom+1)]){
    nom += 1
    margrightleftinsertion()

  }
  
  insertmagazinepages(imlist)
})

document.getElementById('slidbtnone').addEventListener('click',()=>{
  if(imlist[parseInt(nom-1)]){
    nom -= 1
    margrightleftinsertion()

  }
  
  insertmagazinepages(imlist)
})

function getmagazinepages(){
  fetch('http://127.0.0.1:8000/images/')
  .then(res=>res.json())
  .then(data=>{
    console.log(data[parseInt(0)])
    imlist = data
    insertmagazinepages(imlist)
    getimageformagazinepages()
    margrightleftinsertion()
  
    
  })
}

function homebtn(){
  let navimageone = document.getElementById('navimageone');
  let navimagetwo = document.getElementById('navimagetwo');

  let partone = document.getElementById('secone');
  let parttwo = document.getElementById('sectwo');
  let darkwhite = document.getElementById('darkwhite');

  navimagetwo.classList.remove('hover')
  navimageone.classList.add('hover')
  parttwo.classList.add('none')
  partone.classList.remove('none')
  darkwhite.classList.remove('none')

}

function magpagebtn(){
  let navimagetwo = document.getElementById('navimagetwo');
  let navimageone = document.getElementById('navimageone');
  let partone = document.getElementById('secone');
  let parttwo = document.getElementById('sectwo');
  let darkwhite = document.getElementById('darkwhite');
  navimagetwo.classList.add('hover')
  navimageone.classList.remove('hover')
  parttwo.classList.remove('none')
  partone.classList.add('none')
  darkwhite.classList.add('none')
}

document.getElementById('navimageone').addEventListener('click',()=>{
   homebtn()
})

document.getElementById('navimagetwo').addEventListener('click',()=>{
  magpagebtn()
})



document.getElementById('open_button').addEventListener(('click'),()=>{
 magpagebtn()

}

)
  
  
getcurrentuser();
getmagazinepages();


