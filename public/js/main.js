
const socket = io();
const btnEnviar = document.getElementById('btnEnviar');
const show = document.getElementById('showResult');
const email = document.getElementById('email');
const message = document.getElementById('message');
const showMessage = document.getElementById('showMessage');
const errorEmail = document.getElementById('errorEmail');
const errorMessage = document.getElementById('errorMessage');

const showProducts=(data)=>{
  if(data.length===0){   //mostrar mansaje no hay productos cuanto esta vacio el array
    show.innerHTML=`
      <div class="container mt-4">
        <h4>No hay productos en la lista</h3>
      </div>
    `;
  }
  else{   //mostrar productos en tabla
    show.innerHTML=`
      <div class="row mt-5">
        <div class="col-md-6 offset-md-3">
          <table class="table table-container">
            <thead class="table-head">
              <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Imágen</th>
              </tr>
            </thead>
            <tbody id="product"></tbody>
          </table>
        </div>
      </div>  
    `
    const product = document.getElementById('product');
    product.innerHTML = data.map((product)=>{   //actualizar los productos en cada cliente
      return(        
        `      
          <tr>
            <td class="table-description">
            ${product.title}
            </td>
            <td class="table-description">
            ${product.price}
            </td>
            <td class="table-description"><img src='./public/image/${product.thumbnail}'
            alt="imagen producto"class="table-image" width="60"height="50">
            </td>
          </tr>     
        `
      )
    }).join(' ')
  };
};

socket.on('resultData',(data)=>{   // Escuchar evento cuando se agrega un nuevo producto
  fetch('http://localhost:8080/') //obtener datos del servidor GET
    .then((response)=>showProducts(data))
    .catch((error)=>console.log('Error de conexión',error))
});

// centro de mensajes

btnEnviar.addEventListener('click',()=>{
  const date= new Date();
  const day = date.getDate();
  const month = date.getMonth()+1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes= date.getMinutes();
  const second = date.getSeconds();
  const dateTime= `${day}/${month}/${year} ${hour}:${minutes}:${second}`;

  // Comprobar ingreso de email
  if(email.value.trim()===''){  //error si no se ingresa email
    email.classList.add('is-invalid');
    errorEmail.innerText='Ingrese un email'
    return false
  }
  else if(!email.value.includes('@') || !email.value.includes('.')){ //error si se escribe un email inválido
    email.classList.add('is-invalid');
    errorEmail.innerText='Email inválido'
    return false
  }
  else{  //email correcto
    email.classList.remove('is-invalid');
    email.classList.add('is-valid');
    errorEmail.innerText=''
  }

  if (message.value.trim()===''){
    message.classList.add('is-invalid');
    errorMessage.innerText = 'Ingrese un mensaje';
    return false
  }
  else{
    message.classList.remove('is-invalid');
    errorMessage.innerText = '';
  }
  //objeto con los datos del mensaje
    const addMessage = {   
      email:email.value,
      message:message.value,
      dateTime:dateTime
  };
  socket.emit('newMessage',addMessage);  //enviar mensajes al servidor
  message.value='';
});

socket.on('messages',(message)=>{ //recibir mensajes del servidor
  if(message.length===0){  // si no hay mensajes mostrar texto "no hay mensajes"
    showMessage.innerHTML='<h6>No hay mensajes</h6>'
  }
  else{  // si hay mensjaes, mostrarlos 
    showMessage.innerHTML = message.map((user)=>{
      return(
        `<p>
          <b class="message-email">${user.email}</b>
          <span class="message-dateTime">[${user.dateTime}]</span>: 
          <i class="message">${user.message}</i>
        </p>`
      )
    }).join('');
  }
});

socket.on('addMessage',(message)=>{   //recibir nuevos mensajes
  showMessage.innerHTML = message.map((user)=>{
    return(  //mostrar mensajes en el centro de mensajes 
      `<p>
        <b class="message-email">${user.email}</b>
        <span class="message-dateTime">[${user.dateTime}]</span>: 
        <i class="message">${user.message}</i>
      </p>`
    )
  }).join('');
});


