var http = new XMLHttpRequest();
http.open("GET", "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0", true);
http.send();

var listaPokemones;
var historialPokemon = [];
var pokeActual1;
var pokeActual2;

http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        listaPokemones = JSON.parse(this.responseText);
        console.log(listaPokemones);
        var resultados = listaPokemones.results;
        resultados.forEach(function(poke, index) {
            $("#pokemon1").append(new Option(poke.name, poke.url));
            $("#pokemon2").append(new Option(poke.name, poke.url));
            //console.log("indice:"+index+" nombre:"+ele.name);
        });
    }
}


$("#btnSelectPokemon1").click(function() {
    var httpPoke = new XMLHttpRequest();
    httpPoke.open("GET", $("#pokemon1").val(), true);
    pokeActual1 = $("#pokemon1 option:selected").text();
    httpPoke.send();
    var pokemon;
    httpPoke.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            pokemon = JSON.parse(this.responseText);
            console.log(pokemon);
            $("#imgPokemon1").attr("src", pokemon.sprites.front_default);

            $("#special-attack").html(pokemon.stats[3].base_stat);
            $("#attack").html(pokemon.stats[1].base_stat);
            $("#defense").html(pokemon.stats[2].base_stat);
            var movimiento1 = Math.floor(Math.random() * pokemon.moves.length);
            var movimiento2 = Math.floor(Math.random() * pokemon.moves.length);
            $("#pMovimiento1").html(pokemon.moves[movimiento1].move.name);
            $("#pMovimiento2").html(pokemon.moves[movimiento2].move.name);
        }
    }

});

$("#btnSelectPokemon2").click(function() {
    var httpPoke2 = new XMLHttpRequest();
    httpPoke2.open("GET", $("#pokemon2").val(), true);
    pokeActual2 = $("#pokemon2 option:selected").text();
    httpPoke2.send();
    var pokemon2;
    httpPoke2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            pokemon2 = JSON.parse(this.responseText);
            console.log(pokemon2);
            $("#imgPokemon2").attr("src", pokemon2.sprites.front_default);

            $("#special-attack2").html(pokemon2.stats[3].base_stat);
            $("#attack2").html(pokemon2.stats[1].base_stat);
            $("#defense2").html(pokemon2.stats[2].base_stat);
            var movimiento3 = Math.floor(Math.random() * pokemon2.moves.length);
            var movimiento4 = Math.floor(Math.random() * pokemon2.moves.length);
            $("#pMovimiento3").html(pokemon2.moves[movimiento3].move.name);
            $("#pMovimiento4").html(pokemon2.moves[movimiento4].move.name);
        }
    }

});

$("#btnPelea").click(function() {
    console.log(pokeActual1);
    if (pokeActual1 != $("#pokemon1 option:selected").text()) {
        return alert("Debe seleccionar el pokemon 1");
    } else {
        $.ajax({
            url: $("#pokemon1").val(),
            success: function(poke1) {
                var habilidad1 = poke1.abilities[0].ability.name;

                if (poke1.abilities[1] != undefined) {
                    habilidad2 = poke1.abilities[1].ability.name;
                } else {
                    habilidad2 = "No tiene una segunda habilidad";
                }

                historialPokemon.push({
                    pokemon: poke1.name,
                    habilidad1: habilidad1,
                    habilidad2: habilidad2
                });
                $("#histPoke").append("<tr>");
                $("#histPoke").append("<td>" + poke1.name + "</td>");
                $("#histPoke").append("<td>" + habilidad1 + "</td>");
                $("#histPoke").append("<td>" + habilidad2 + "</td>");
            }
        });
    }
    if (pokeActual2 != $("#pokemon2 option:selected").text()) {
        return alert("Debe seleccionar el pokemon 2");
    } else {
        $.ajax({
            url: $("#pokemon2").val(),
            success: function(poke2) {
                var habilidad1 = poke2.abilities[0].ability.name;

                if (poke2.abilities[1] != undefined) {
                    habilidad2 = poke2.abilities[1].ability.name;
                } else {
                    habilidad2 = "No tiene una segunda habilidad";
                }

                historialPokemon.push({
                    pokemon: poke2.name,
                    habilidad1: habilidad1,
                    habilidad2: habilidad2
                });
                $("#histPoke").append("<td>" + poke2.name + "</td>");
                $("#histPoke").append("<td>" + habilidad1 + "</td>");
                $("#histPoke").append("<td>" + habilidad2 + "</td>");
                $("#histPoke").append("</tr>");
            }
        });
    }

    var pokemon1 = $("#pokemon1 option:selected").text();
    var pokemon2 = $("#pokemon2 option:selected").text();
    pelea = [];
    pelea.push(pokemon1);
    pelea.push(pokemon2);
    var pokemonGanador = pelea[Math.floor(Math.random() * 2)];
    alert("GANO EL POKEMON:" + pokemonGanador);
    //console.log(historialPokemon);
});