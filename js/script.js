/*Variables donde se almacenan los datos a escribir*/
$(function () {

    var num1 = '0';
    var num2 = '0';
    var operador = '';
    var resultado = '';
    var mensaje = '';

    /*Almacenar los numeros en la pantalla superior y la pantalla inferior */
    var pantallaSuperior = $('.pantallaArriba');
    var pantallaInferior = $('.pantallaAbajo');

    pantalla();

    /*Evento a los botones */
    $('.teclado').on('click', function (e) {
        switch (e.target.id) {
            case 'eliminar-Digito':
                eliminarUno();
                break;

            case 'ce':
                eliminarDigitoPantalla();
                break;

            case 'c':
                eliminarTodo();
                break;

            case '1':
                agregarDigito('1');
                break;

            case '2':
                agregarDigito('2');

                break;

            case '3':
                agregarDigito('3');
                break;

            case '4':
                agregarDigito('4');
                break;

            case '5':
                agregarDigito('5');
                break;

            case '6':
                agregarDigito('6');
                break;

            case '7':
                agregarDigito('7');
                break;

            case '8':
                agregarDigito('8');
                break;

            case '9':
                agregarDigito('9');
                break;

            case '0':
                agregarDigito('0');
                break;

            case 'division':
                agregarOperador('/');
                break;

            case 'multiplicar':
                agregarOperador('*');
                break;

            case 'resta':
                agregarOperador('-');
                break;

            case 'suma':
                agregarOperador('+');
                break;


            case 'punto':
                agregarPunto();
                break;

            case 'igual':
                calcular();

        }
        pantalla();
    });

    /*Funcion para mostrar el contenido dentro de la pantalla*/
    function pantalla() {
        if (mensaje !== '') {
            pantallaInferior.val(mensaje);
            mensaje = '';
        } else if (resultado !== '') {
            pantallaInferior.val(resultado);
        } else if (operador === '') {
            pantallaSuperior.val('');
            pantallaInferior.val(num1)
        } else {
            pantallaSuperior.val(num1 + ' ' + operador);
            pantallaInferior.val(num2);
        }

    }

    /*Funcion para borrar un digito */
    function eliminarUno() {
        if (operador === '') {
            num1 = eliminarDigito(num1);

        } else {
            num2 = eliminarDigito(num2);
        }
    }

    function eliminarDigito(numeros) {
        if (numeros.length > 1) {
            return numeros.substring(0, numeros.length - 1);
        }
        return '0';
    }

    function eliminarDigitoPantalla() {
        if (resultado !== '') {
            resultado = '';
        }

        if (operador === '') {
            num1 = '0';
        } else {
            num2 = '0';
        }
    }

    function eliminarTodo() {
        num1 = '0';
        num2 = '0';
        operador = '';
        resultado = '';
    }

    function agregarDigito(digito) {
        if (resultado !== '') {
            resultado = '';
        }
        if (operador === '') {
            num1 = obtenerNuevoNumero(num1, digito);
        } else {
            num2 = obtenerNuevoNumero(num2, digito);
        }
    }

    function obtenerNuevoNumero(numero, digito) {
        if (numero === '0') {
            return digito;
        }
        return numero + digito;
    }

    function agregarOperador(ope) {
        if (resultado !== '') {
            num1 = resultado;
            resultado = '';
        }
        if (operador === '') {
            operador = ope;
        } else if (parseFloat(num2) === 0) {
            operador = ope;
        } else {
            calcular();
            agregarOperador(ope);
        }
    }

    function agregarPunto() {
        if (operador === '') {
            num1 = obtenerNumeroPunto(num1);
        } else {
            num2 = obtenerNumeroPunto(num2);
        }
    }

    /*Funcion para obtener el punto al escribir un número */
    function obtenerNumeroPunto(numero) {
        if (numero.indexOf('.') === -1) {
            return numero + '.';

        }
        return numero;
    }

    /*Funcion pra mandar a llamar el calculo que se hace al realizar la operacion*/
    function calcular() {
        if (num1 === '' || num2 === '' || operador === '') {
            return;
        }
        if (operador === '/') {
            dividir();
        } else {
            mostrarResultado(eval(num1 + operador + num2)); //eval ejecuta codigo js que se representa en cadena ej num1 y num2
        }
    }

    function dividir() {
        if (parseFloat(num2) === 0) { //SI el numero es 0, se borra todo lo tecleado.
            eliminarTodo();
            mensaje = 'Syntax Error'; //Tira como error por detectar un valor con cero
            return;
        }
        mostrarResultado(eval(num1 + operador + num2));
    }

    function mostrarResultado(res) {
        eliminarTodo();
        resultado = res;
    }
});