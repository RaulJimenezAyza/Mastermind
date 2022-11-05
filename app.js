// JavaScript source code
$(document).ready(function () {
    var colorActual = "white";
    var celdasTableroActuales = ["tablero40", "tablero41", "tablero42", "tablero43"];
    var celdasSolcionActual = ["soluciones40", "soluciones41", "soluciones42", "soluciones43"];
    var filaActual = 11;
    var coloresPossibles = ["blue", "green", "red", "yellow", "orange", "pink"];
    var hasWon = false;

    var celda1Color, celda2Color, celda3Color, celda4Color;

    var colores = {
        "rgb(0, 128, 0)": "green",
        "rgb(255, 255, 0)": "yellow",
        "rgb(255, 0, 0)": "red",
        "rgb(0, 0, 255)": "blue",
        "rgb(255, 192, 203)": "pink",
        "rgb(255, 165, 0)": "orange",
    }

    var codigo = [
        coloresPossibles[Math.floor(Math.random() * 6)],
        coloresPossibles[Math.floor(Math.random() * 6)],
        coloresPossibles[Math.floor(Math.random() * 6)],
        coloresPossibles[Math.floor(Math.random() * 6)]
    ];
    console.log(codigo);

    for (let i = 0; i < 44; i++) {
        let cell = "<div class=\"celdaTablero\" id=tablero" + i + "></div>";
        $(".tablero").append(cell);
    }
    for (let i = 0; i < 44; i++) {
        let cell = "<div class=\"solucionTablero\" id=soluciones" + i + "></div>";
        $(".soluciones").append(cell);
    }

    $(".tablero").css("grid-template-rows", "repeat(11,77.20px)");
    $(".tablero").css("grid-template-columns", "repeat(4,77.20px)")
    $(".celdaTablero").css("border", "1px solid black");
    $(".celdaTablero").css("border-radius", "50%");
    $(".celdaTablero").css("background-color", "white");

    $(".soluciones").css("grid-template-rows", "repeat(22,36p.59x)");
    $(".soluciones").css("grid-template-columns", "repeat(2,36.59px)")
    $(".solucionTablero").css("border", "1px solid black");
    $(".solucionTablero").css("border-radius", "50%");
    $(".solucionTablero").css("background-color", "grey");

    $(".color").each(function () {
        let color = $(this).attr("id");
        $(this).css("background-color", color);
    });

    $(".color").click(function () {
        let color = $(this).attr("id");
        colorActual = color;
        $(".colorSeleccionado").css("background-color", color);
    });

    $(".celdaTablero").click(function (){
        var id = $(this).attr("id");

        if (isValid(id)) {
            $(this).css("background-color", colorActual);
        }
    });

    $(".entrar").click(function () {
        actualizarSolucion();
        checkWin();
        cambiarFilaActual();
    });

    function cambiarFilaActual() {
        filaActual -= 1;
        var mult = 4;

        celdasTableroActuales = [
            "tablero" + (filaActual * mult - 4),
            "tablero" + (filaActual * mult - 3),
            "tablero" + (filaActual * mult - 2),
            "tablero" + (filaActual * mult - 1)
        ];

        celdasSolcionActual = [
            "soluciones" + (filaActual * mult - 4),
            "soluciones" + (filaActual * mult - 3),
            "soluciones" + (filaActual * mult - 2),
            "soluciones" + (filaActual * mult - 1)
        ];
    };

    function isValid(id) {
        if (celdasTableroActuales.includes(id) && hasWon === false) {
            return true;
        }
        return false;
    }

    function checkWin() {
        if (codigo[0] === celda1Color &&
            codigo[1] === celda2Color &&
            codigo[2] === celda3Color &&
            codigo[3] === celda4Color) {
            hasWon = true;
            alert("Buenaaa, ¡Has ganado!\nEl codigo final saldra a continuación.");
            $("#colorSecreto1").css("background-color", codigo[0]);
            $("#colorSecreto2").css("background-color", codigo[1]);
            $("#colorSecreto3").css("background-color", codigo[2]);
            $("#colorSecreto4").css("background-color", codigo[3]);
        }

        return hasWon;
    }

    function actualizarSolucion() {
        let cell1 = $("#" + celdasTableroActuales[0]);
        let cell2 = $("#" + celdasTableroActuales[1]);
        let cell3 = $("#" + celdasTableroActuales[2]);
        let cell4 = $("#" + celdasTableroActuales[3]);

        celda1Color = colores[cell1.css("background-color")];
        celda2Color = colores[cell2.css("background-color")];
        celda3Color = colores[cell3.css("background-color")];
        celda4Color = colores[cell4.css("background-color")];

        let solucion1 = $("#" + celdasSolcionActual[0]);
        let solucion2 = $("#" + celdasSolcionActual[1]);
        let solucion3 = $("#" + celdasSolcionActual[2]);
        let solucion4 = $("#" + celdasSolcionActual[3]);

        let soluciones = [solucion1, solucion2, solucion3, solucion4];

        let filledPegs = [];
        let chosenCells = [];
        let codeCopy = [...codigo];

        if (codigo[0] === celda1Color) {
            let num = randomNum14(filledPegs);
            filledPegs.push(num);
            let index = codeCopy.indexOf(celda1Color);
            if (index > -1) {
                codeCopy.splice(index, 1);
            }
            chosenCells.push(1);
            soluciones[num - 1].css("background-color", "red");
        }
        if (codigo[1] === celda2Color) {
            let num = randomNum14(filledPegs);
            filledPegs.push(num);

            let index = codeCopy.indexOf(celda2Color);
            if (index > -1) {
                codeCopy.splice(index, 1);
            }

            chosenCells.push(2);

            soluciones[num - 1].css("background-color", "red");
        }
        if (codigo[2] === celda3Color) {
            let num = randomNum14(filledPegs);
            filledPegs.push(num);

            let index = codeCopy.indexOf(celda3Color);
            if (index > -1) {
                codeCopy.splice(index, 1);
            }

            chosenCells.push(3);

            soluciones[num - 1].css("background-color", "red");
        }
        if (codigo[3] === celda4Color) {
            let num = randomNum14(filledPegs);
            filledPegs.push(num);

            let index = codeCopy.indexOf(celda4Color);
            if (index > -1) {
                codeCopy.splice(index, 1);
            }

            chosenCells.push(4);

            soluciones[num - 1].css("background-color", "red");
        }

        if (codeCopy.includes(celda1Color) && !chosenCells.includes(1)) {
            let num = randomNum14(filledPegs);
            filledPegs.push(num);
            soluciones[num - 1].css("background-color", "white");
        }
        if (codeCopy.includes(celda2Color) && !chosenCells.includes(2)) {
            let num = randomNum14(filledPegs);
            filledPegs.push(num);
            soluciones[num - 1].css("background-color", "white");
        }
        if (codeCopy.includes(celda3Color) && !chosenCells.includes(3)) {
            let num = randomNum14(filledPegs);
            filledPegs.push(num);
            soluciones[num - 1].css("background-color", "white");
        }
        if (codeCopy.includes(celda4Color) && !chosenCells.includes(4)) {
            let num = randomNum14(filledPegs);
            filledPegs.push(num);

            soluciones[num - 1].css("background-color", "white");
        }
    }

    function randomNum14(nums) {
        let num = Math.floor(Math.random() * 4) + 1;
        while (nums.includes(num)) {
            num = Math.floor(Math.random() * 4) + 1;
        }
        return num;
    }
});