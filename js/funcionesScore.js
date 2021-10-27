function traerInformacionScore(){
    $.ajax({
        //url:"http://158.101.116.30:8080/api/Score/all",
        url:"http://localhost:8080/api/Score/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            $("#resultado").empty();
            pintarRespuestaScore(respuesta);
        }
        });

}


function pintarRespuestaScore(items){

    let mytable="<table>";
    mytable+="<td>"+" ID "+"</td>"
    mytable+="<td>"+" MESSAGE TEXT "+"</td>"
    mytable+="<td>"+" STARS "+"</td>"
    mytable+="<td>"+" Editar"+"</td>";
    mytable+="<td>"+" Eliminar"+"</td>";
    for(i=0;i<items.length;i++){
        mytable+="<tr>";
        mytable+="<td>"+items[i].idScore+"</td>";
        mytable+="<td>"+items[i].messageText+"</td>";
        mytable+="<td>"+items[i].stars+"</td>";
        mytable+="<td> <button onclick='editarScore("+items[i].idScore+")'>Editar</button></td>";
        mytable+="<td> <button onclick='eliminarScore("+items[i].idScore+")'>Borrar</button></td>";
        mytable+="</tr>";
    }
    mytable+="</table>";
    $("#resultado").append(mytable);

}

function guardarInformacionScore(){
    let myData={
        idScore:$("#idScore").val(),
        messageText:$("#messageText").val(),
        stars:$("#stars").val()
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        //url:"http://158.101.116.30:8080/api/Score/save",
        url:"http://localhost:8080/api/Score/save",   
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        
        success:function(respuesta){
            $("#resultado").empty();
            $("#messageText").val("");
            $("#stars").val("");
            traerInformacionScore();
            alert("Se ha guardado el score exitosamente!")
        }
        });
}

function editarScore(idElemento){
    let myData={
        idScore:idElemento,
        messageText:$("#messageText").val(),
        stars:$("#stars").val()
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        //url:"http://158.101.116.30:8080/api/Score/update",
        url:"http://localhost:8080/api/Score/update",  
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#messageText").val("");
            $("#stars").val("");
            traerInformacionScore();
            alert("Se ha actualizado el score exitosamente!")
        }
        });
}

function eliminarScore(idElemento){
    let myData={
        id:idElemento
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        //url:"http://158.101.116.30:8080/api/Score/" + idElemento,
        url:"http://localhost:8080/api/Score/"+ idElemento,  
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionScore();
            alert("Se ha eliminado el score exitosamente!")
        }
        });
}
