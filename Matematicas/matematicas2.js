//Ingreso de datos
var eQuis0 = document.getElementsByName('x0');
var eQuis1 = document.getElementsByName('x1');
var eQuis2 = document.getElementsByName('x2');
var fx0 = document.getElementsByName('f0');
var fx1 = document.getElementsByName('f1');
var fx2 = document.getElementsByName('f2');

//Elegir si se aproximará o no
var checado = document.getElementById('posible');

if(checado.checked)
 {
  var eQuisAproximado = prompt("Qué valor tiene de aproximación -ln-?");
  var eQuisAproximado1 = prompt("¿Cuál es su valor en logaritmo?");
  //b0
  console.log("El resultado de b0 es: "+ fx0);
  //b1
  console.log("El resultado de b1 es: " + operacionB1(fx1, fx0, eQuis0, eQuis1));
  //b2
  console.log("El resultado de b2 es: " + operacionB2(fx1, fx2, fx0, eQuis2, eQuis0, eQuis1));
  //aproximación
  console.log("La aproximación es: " + aproximacionTotal(fx0, eQuisAproximado, eQuis0, fx1, eQuis1));
  //error
  console.log("El error relativo es: " + errorRelativo(fx0, eQuisAproximado, eQuis0, fx1, eQuis1, eQuisAproximado1) + "%");
  }

  else if(aproximado.toLowerCase() != 'si')
  {
    //b0
    console.log("El resultado de b0 es: "+ fx0);
    //b1
    console.log("El resultado de b1 es: " + operacionB1(fx1, fx0, eQuis0, eQuis1));
    //b2
    console.log("El resultado de b2 es: " + operacionB2(fx1, fx2, fx0, eQuis2, eQuis0, eQuis1));

  }
  else
  {
    console.log("ola k ase");
  }

  //b1
  function operacionB1(fx1, fx0, eQuis0, eQuis1)
  {
    var parte1B1 = fx1 - fx0;
    var parte2B1 = eQuis1 - eQuis0;
    var formulaB1 = parte1B1 / parte2B1;
    return formulaB1.toFixed(6);
  }

  function operacionB2(fx1, fx2, fx0, eQuis2, eQuis0, eQuis1)
  {
    var parte1B2 = fx2 - fx0;
    var parte2B2 = eQuis2 - eQuis0;
    var formulaB2 = parte1B2 / parte2B2;

    var nuevaFormula = formulaB2 - operacionB1(fx1, fx0, eQuis0, eQuis1);
    var nuevaFormulaDivision = eQuis2 - eQuis1;
    var resultadoB2 = nuevaFormula/nuevaFormulaDivision;

    return resultadoB2.toFixed(6);
  }
  function aproximacionTotal(fx0, eQuisAproximado, eQuis0, fx1, eQuis1)
  {
    var aproximacion1 = fx0 + operacionB1(fx1, fx0, eQuis0, eQuis1);
    var aproximacion2 = eQuisAproximado - eQuis0;
    var aproximacionP1 = aproximacion1 * aproximacion2; //parte 1

    var aproximacion3 = eQuisAproximado - eQuis0;
    var aproximacion4 = eQuisAproximado - eQuis1;
    var aproximacionP2 = aproximacion3 * aproximacion4;
    var aproximacionP2P1 = aproximacionP2 * operacionB2(fx1, fx2, fx0, eQuis2, eQuis0, eQuis1);
    var resultadoFinal = aproximacionP2P1 + aproximacionP1;

    return resultadoFinal.toFixed(6);
  }
  function errorRelativo(fx0, eQuisAproximado, eQuis0, fx1, eQuis1, eQuisAproximado1)
  {
    var errorR = eQuisAproximado1 - aproximacionTotal(fx0, eQuisAproximado, eQuis0, fx1, eQuis1);
    var errorR = errorR / eQuisAproximado1;
    var errorR = errorR * 100;

    return errorR.toFixed(2);
  }
