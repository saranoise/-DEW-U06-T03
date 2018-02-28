var objetoJSON;
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    var jsonResponse = xmlhttp.responseText;
    objetoJSON = JSON.parse(jsonResponse);
};
xmlhttp.open('GET', 'Datos/BD.json', true);
xmlhttp.send();

var valorModalidad;
var cajaCiclos = document.getElementById('resultadosCiclos');
var cajaPais = document.getElementById('resultadosPais');
document.getElementById('botonModalidad').addEventListener('click', function() {
  var caja = document.getElementById('toggle');
  eliminarContenido(caja);
  var h1 = document.createElement('h1');
  var toggle = document.createElement('label');
  toggle.setAttribute('class', 'switch');
  var input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.checked = true;
  var span = document.createElement('span');
  span.setAttribute('class', 'slider round');
  span.setAttribute('id', 'filtro');
  toggle.appendChild(input);
  toggle.appendChild(span);
  h1.innerHTML = 'Ciclos';
  h1.appendChild(toggle);
  h1.innerHTML += 'País';
  caja.appendChild(h1);
  valorModalidad = document.getElementById('modalidad').value;

  eliminarContenido(document.getElementById('listaPaises'));
  eliminarContenido(document.getElementById('paises'));
  eliminarContenido(document.getElementById('botones'));
  eliminarContenido(document.getElementById('filtros'));
  var paises = [];
  for (var contador = 0; contador < objetoJSON.movilidad.length; contador++)
  {
        paises[contador] = objetoJSON.movilidad[contador].pais;
  }
  paises = paises.filter((elem, index, self) => index === self.indexOf(elem));
  for (var contador = 0; contador < paises.length; contador++)
  {
    var li = document.createElement('li');
    var inputPais = document.createElement('input');
    inputPais.setAttribute('type', 'checkbox');
    var texto = document.createTextNode(paises[contador]);
    li.appendChild(inputPais);
    li.appendChild(texto);
    document.getElementById('listaPaises').appendChild(li);
  }
  var div = document.getElementById('botones');
  var boton = document.createElement('a');
  var texto = document.createTextNode('Seleccionar Todos');
  boton.setAttribute('class', 'btn btn-default');
  boton.addEventListener('click', seleccionarTodo);
  boton.appendChild(texto);
  div.appendChild(boton);
  var boton = document.createElement('a');
  var texto = document.createTextNode('Deseleccionar Todos');
  boton.setAttribute('class', 'btn btn-default');
  boton.addEventListener('click', deseleccionarTodo);
  boton.appendChild(texto);
  div.appendChild(boton);
  var boton = document.createElement('a');
  var texto = document.createTextNode('Enviar');
  boton.setAttribute('class', 'btn btn-default');
  boton.addEventListener('click', enviarCheckbox);
  boton.appendChild(texto);
  div.appendChild(boton);

  var formulario2 = document.createElement('formulario');
  var selectPais = document.createElement('select');
  selectPais.setAttribute('id', 'pais');
  var paisesMovilidad = [];
  for (var contador = 0; contador < objetoJSON.movilidad.length; contador++)
  {
      if (valorModalidad == 'Todos')
      {
        paisesMovilidad[contador] = objetoJSON.movilidad[contador].pais;
      }
      else {
        if (objetoJSON.movilidad[contador].tipo == valorModalidad)
        {
          paisesMovilidad[contador] = objetoJSON.movilidad[contador].pais;
        }
      }
  }

  paisesMovilidad = paisesMovilidad.filter((elem, index, self) => index === self.indexOf(elem));

  for (var contador = 0; contador < paisesMovilidad.length; contador++)
  {
    var opcion = document.createElement('option');
    var texto = document.createTextNode(paisesMovilidad[contador]);
    opcion.appendChild(texto);
    selectPais.appendChild(opcion);
  }
  formulario2.appendChild(selectPais);
  var boton = document.createElement('a');
  var texto = document.createTextNode('Buscar');
  boton.setAttribute('class', 'btn btn-default');
  boton.addEventListener('click', buscarPorPais);
  boton.appendChild(texto);
  var br = document.createElement('br');
  formulario2.appendChild(br);
  formulario2.appendChild(boton);
  document.getElementById('paises').appendChild(formulario2);
  cajaCiclos.style.display = 'block';
  cajaPais.style.display = 'none';
  document.getElementById('filtro').addEventListener('click', filtrar);
});

function filtrar()
{
  if (cajaCiclos.style.display == 'none')
  {
    cajaCiclos.style.display = 'block';
    cajaPais.style.display = 'none';
  }
  else {
    cajaCiclos.style.display = 'none';
    cajaPais.style.display = 'block';
  }
}

function eliminarContenido(valor)
{
  while (valor.hasChildNodes()) {
    valor.removeChild(valor.firstChild);
  }
}

function seleccionarTodo()
{
  var checkeados = document.getElementById("listaPaises").getElementsByTagName("input");
  for (var contador = 0; contador < checkeados.length; contador++)
  {
      checkeados[contador].checked = true;
  }
}

function deseleccionarTodo()
{
  var checkeados = document.getElementById("listaPaises").getElementsByTagName("input");
  for (var contador = 0; contador < checkeados.length; contador++)
  {
      checkeados[contador].checked = false;
  }
}

function buscarPorPais()
{
  eliminarContenido(document.getElementById('filtros'));
   var valor = document.getElementById('pais').value;
   var ciclos = [];
   for (var contador = 0; contador < objetoJSON.movilidad.length; contador++)
   {
       if (valorModalidad == 'Todos')
       {
         if (objetoJSON.movilidad[contador].pais == valor)
         {
           ciclos[contador] = objetoJSON.movilidad[contador].ciclo;
         }
       }
       else {
         if ((objetoJSON.movilidad[contador].tipo == valorModalidad) && (objetoJSON.movilidad[contador].pais == valor))
         {
            ciclos[contador] = objetoJSON.movilidad[contador].ciclo;
         }
       }
   }

   ciclos = ciclos.filter((elem, index, self) => index === self.indexOf(elem));

   var selectCiclos = document.createElement('select');
   selectCiclos.setAttribute('id', 'ciclos');
   for (var contador = 0; contador < ciclos.length; contador++)
   {
     var opcion = document.createElement('option');
     var texto = document.createTextNode(ciclos[contador]);
     opcion.appendChild(texto);
     selectCiclos.appendChild(opcion);
   }
   document.getElementById('filtros').appendChild(selectCiclos);
   var boton = document.createElement('a');
   var texto = document.createTextNode('Enviar');
   boton.setAttribute('class', 'btn btn-default');
   boton.addEventListener('click', enviar);
   boton.appendChild(texto);
   var br = document.createElement('br');
   document.getElementById('filtros').appendChild(br);
   document.getElementById('filtros').appendChild(boton);
}

function enviar()
{
  var datos = [];
  var valorPais = document.getElementById('pais').value;
  var valorCiclo = document.getElementById('ciclos').value;
    for (var contador = 0; contador < objetoJSON.movilidad.length; contador++)
    {
        if (valorModalidad == 'Todos')
        {
          if ((objetoJSON.movilidad[contador].pais == valorPais) && (objetoJSON.movilidad[contador].ciclo == valorCiclo))
          {
            datos.push(objetoJSON.movilidad[contador].ubicacion);
          }
        }
        else {
          if ((objetoJSON.movilidad[contador].tipo == valorModalidad) && (objetoJSON.movilidad[contador].pais == valorPais) && (objetoJSON.movilidad[contador].ciclo == valorCiclo))
          {
             datos.push(objetoJSON.movilidad[contador].ubicacion);
          }
        }
    }

  datos = datos.filter((elem, index, self) => index === self.indexOf(elem));
  miMapa(datos);
}

function enviarCheckbox()
{
  var checkeados = document.getElementById('listaPaises').getElementsByTagName('input');
  var lista = document.getElementById('listaPaises').childNodes;
  var elementos = [];
  for (var contador = 0; contador < checkeados.length; contador++)
  {
    if (checkeados[contador].checked == true)
    {
      elementos.push(lista[contador].textContent);
    }
  }
  var datos = [];

  for (var contador1 = 0; contador1 < elementos.length; contador1++)
  {
    for (var contador = 0; contador < objetoJSON.movilidad.length; contador++)
    {
        if (valorModalidad == 'Todos')
        {
          if (objetoJSON.movilidad[contador].pais == elementos[contador1])
          {
            datos.push(objetoJSON.movilidad[contador].ubicacion);
          }
        }
        else {
          if ((objetoJSON.movilidad[contador].tipo == valorModalidad) && (objetoJSON.movilidad[contador].pais == elementos[contador1]))
          {
             datos.push(objetoJSON.movilidad[contador].ubicacion);
          }
        }
    }
  }
  datos = datos.filter((elem, index, self) => index === self.indexOf(elem));
  miMapa(datos);

}

function miMapa(datos)
{
  var mapCanvas = document.getElementById("mapa");
  var myCenter = new google.maps.LatLng(49.956171, 15.055237);
  var mapOptions = {center: myCenter, zoom: 4};
  var map = new google.maps.Map(mapCanvas,mapOptions);

  if (screen.width <= 450)
  {
    map.setZoom(2);
  }
  else {
    if (screen.width <= 1025)
    {
      map.setZoom(3);
    }
    else {
      map.setZoom(4);
    }
  }
  for (var contador = 0; contador < datos.length; contador++)
  {
    var coordenadas = datos[contador];
    var coordenadas2 = coordenadas.split(",");
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(parseInt(coordenadas2[0]), parseInt(coordenadas2[1])),
      animation: google.maps.Animation.BOUNCE
    });
    marker.setMap(map);    
  }
}
