function traerInformacionMensaje(){
    $.ajax({
        url:"http://158.101.116.30:8080/api/Message/all",
        //url:"http://localhost:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            $("#resultado").empty();
            pintarRespuestaMensaje(respuesta);
        }
        });

}


function pintarRespuestaMensaje(items){

    let mytable="<table>";
    mytable+="<td>"+" ID "+"</td>";
    mytable+="<td>"+" MESSAGE TEXT "+"</td>";
    mytable+="<td>"+" Editar"+"</td>";
    mytable+="<td>"+" Eliminar"+"</td>";
    for(i=0;i<items.length;i++){
        mytable+="<tr>";
        mytable+="<td>"+items[i].idMessage+"</td>";
        mytable+="<td>"+items[i].messageText+"</td>";
        mytable+="<td> <button onclick='editarMensaje("+items[i].idMessage+")'>Editar</button></td>";
        mytable+="<td> <button onclick='eliminarMensaje("+items[i].idMessage+")'>Borrar</button></td>";
        mytable+="</tr>";
    }
    mytable+="</table>";
    $("#resultado").append(mytable);

}

function guardarInformacionMensaje(){
    let myData={
        messageText:$("#messageText").val(),
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://158.101.116.30:8080/api/Message/save",
        //url:"http://localhost:8080/api/Message/save",
       
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        
        success:function(respuesta){
            $("#resultado").empty();
            $("#messageText").val("");
            traerInformacionMensaje();
            alert("Se ha guardado el mensaje exitosamente!")
        }
        });
}

function editarMensaje(idElemento){
    let myData={
        idMessage:idElemento,
        messageText:$("#messageText").val(),
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://158.101.116.30:8080/api/Message/update",
        //url:"http://localhost:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#messageText").val("");
            traerInformacionMensaje();
            alert("Se ha actualizado el mensaje exitosamente!")
        }
        });
}

function eliminarMensaje(idElemento){
    let myData={
        id:idElemento
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://158.101.116.30:8080/api/Message/" + idElemento,
        //url:"http://localhost:8080/api/Message/" + idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionMensaje();
            alert("Se ha eliminado el mensaje exitosamente!")
        }
        });
}
