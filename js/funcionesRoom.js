function traerInformacionCuarto(){
    $.ajax({
        //url:"http://158.101.116.30:8080/api/Room/all",
        url:"http://localhost:8080/api/Room/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            $("#resultado").empty();
            pintarRespuestaCuarto(respuesta);
        }
        });

}


function pintarRespuestaCuarto(items){

    let mytable="<table>";
    mytable+="<td>"+" ID "+"</td>";
    mytable+="<td>"+" NAME "+"</td>";
    mytable+="<td>"+" HOTEL "+"</td>";
    mytable+="<td>"+" STARS"+"</td>";
    mytable+="<td>"+" Description "+"</td>";
    mytable+="<td>"+" Editar"+"</td>";
    mytable+="<td>"+" Eliminar"+"</td>";
    for(i=0;i<items.length;i++){
        mytable+="<tr>";
        mytable+="<td>"+items[i].id+"</td>";
        mytable+="<td>"+items[i].name+"</td>";
        mytable+="<td>"+items[i].hotel+"</td>";
        mytable+="<td>"+items[i].stars+"</td>";
        mytable+="<td>"+items[i].description+"</td>";
        mytable+="<td> <button onclick='editarCuarto("+items[i].id+")'>Editar</button></td>";
        mytable+="<td> <button onclick='eliminarCuarto("+items[i].id+")'>Borrar</button></td>";
        mytable+="</tr>";
    }
    mytable+="</table>";
    $("#resultado").append(mytable);

}

function guardarInformacionCuarto(){
    let myData={
        name:$("#name").val(),
        hotel:$("#hotel").val(),
        stars:$("#stars").val(),
        description:$("#description").val()
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        //url:"http://158.101.116.30:8080/api/Room/save",
        url:"http://localhost:8080/api/Room/save",    
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        
        success:function(respuesta){
            $("#resultado").empty();
            $("#name").val("");
            $("#hotel").val("");
            $("#stars").val("");
            $("#description").val("");
            traerInformacionCuarto();
            alert("Se ha guardado el cuarto exitosamente!")
        }
        });
}

function editarCuarto(idElemento){
    let myData={
        id:idElemento,
        name:$("#name").val(),
        hotel:$("#hotel").val(),
        stars:$("#stars").val(),
        description:$("#description").val()
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        //url:"http://158.101.116.30:8080/api/Room/update",
        url:"http://localhost:8080/api/Room/update", 
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#hotel").val("");
            $("#stars").val("");
            $("#description").val("");
            traerInformacionCuarto();
            alert("Se ha actualizado el cuarto exitosamente!")
        }
        });
}

function eliminarCuarto(idElemento){
    let myData={
        id:idElemento
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        //url:"http://158.101.116.30:8080/api/Room/ + idElemento",
        url:"http://localhost:8080/api/Room/" + idElemento, 
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionCuarto();
            alert("Se ha eliminado el cuarto exitosamente!")
        }
        });
}
