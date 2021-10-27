function traerInformacionReservation(){
    $.ajax({
        //url:"http://158.101.116.30:8080/api/Reservation/all",
        url:"http://localhost:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            $("#resultado").empty();
            pintarRespuestaReservation(respuesta);
        }
        });

}


function pintarRespuestaReservation(items){

    let mytable="<table>";
    mytable+="<td>"+" ID "+"</td>";
    mytable+="<td>"+" Start Date "+"</td>";
    mytable+="<td>"+" Devolution Date "+"</td>";
    mytable+="<td>"+" STATUS"+"</td>";
    mytable+="<td>"+" Editar"+"</td>";
    mytable+="<td>"+" Eliminar"+"</td>";
    for(i=0;i<items.length;i++){
        mytable+="<tr>";
        mytable+="<td>"+items[i].idReservation+"</td>";
        mytable+="<td>"+items[i].startDate+"</td>";
        mytable+="<td>"+items[i].devolutionDate+"</td>";
        mytable+="<td>"+items[i].status+"</td>";
        mytable+="<td> <button onclick='editarReservation("+items[i]+")'>Editar</button></td>";
        mytable+="<td> <button onclick='eliminarReservation("+items[i].idReservation+")'>Borrar</button></td>";
        mytable+="</tr>";
    }
    mytable+="</table>";
    $("#resultado").append(mytable);

}

function guardarInformacionReservation(){
    let myData={
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val()
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        //url:"http://158.101.116.30:8080/api/Reservation/save",
        url:"http://localhost:8080/api/Reservation/save", 
        
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        
        success:function(respuesta){
            console.log(respuesta);
            $("#resultado").empty();
            $("#devolutionDate").val("");
            traerInformacionReservation();
            alert("Se ha guardado la reservacion exitosamente!")
        }
        });
}

function editarReservation(reservacion){
    let myData={
        idReservation:reservacion.idReservation,
        startDate:reservacion.startDate,
        devolutionDate:$("#devolutionDate").val()
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        //url:"http://158.101.116.30:8080/api/Reservation/update",
        url:"http://localhost:8080/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#devolutionDate").val("");
            traerInformacionReservation();
            alert("Se ha actualizado la reservacion exitosamente!")
        }
        });
}

function eliminarReservation(idElemento){
    let myData={
        id:idElemento
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
         //url:"http://158.101.116.30:8080/api/Reservation/delete",
         url:"http://localhost:8080/api/Reservation/" + idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionReservation();
            alert("Se ha eliminado la reservacion exitosamente!")
        }
        });
}
