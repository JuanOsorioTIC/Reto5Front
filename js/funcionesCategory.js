function traerInformacionCategory(){
    $.ajax({
        url:"http://158.101.116.30:8080/api/Category/all",
        //url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            $("#resultado").empty();
            pintarRespuestaCategory(respuesta);
        }
        });

}


function pintarRespuestaCategory(items){

    let mytable="<table>";
    mytable+="<td>"+" ID "+"</td>";
    mytable+="<td>"+" NAME "+"</td>";
    mytable+="<td>"+" Description "+"</td>";
    mytable+="<td>"+" Editar"+"</td>";
    mytable+="<td>"+" Eliminar"+"</td>";
    for(i=0;i<items.length;i++){
        mytable+="<tr>";
        mytable+="<td>"+items[i].id+"</td>";
        mytable+="<td>"+items[i].name+"</td>";
        mytable+="<td>"+items[i].description+"</td>";
        mytable+="<td> <button onclick='editarCategory("+items[i].id+")'>Editar</button></td>";
        mytable+="<td> <button onclick='eliminarCategory("+items[i].id+")'>Borrar</button></td>";
        mytable+="</tr>";
    }
    mytable+="</table>";
    $("#resultado").append(mytable);

}

function guardarInformacionCategory(){
    let myData={
        name:$("#name").val(),
        description:$("#description").val()
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
            url:"http://158.101.116.30:8080/api/Category/save",
            //url:"http://localhost:8080/api/Category/save",
            
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(myData),
            
            success:function(respuesta){
                console.log(respuesta);
                $("#resultado").empty();
                $("#name").val("");
                $("#description").val("");
                traerInformacionCategory();
                alert("Se ha guardado la categoria exitosamente!")
        }
        });
}

function editarCategory(idElemento){
    let myData={
        id:idElemento,
        name:$("#name").val(),
        description:$("#description").val()
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://158.101.116.30:8080/api/Category/update",
        //url:"http://localhost:8080/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#name").val("");
            $("#description").val("");
            traerInformacionCategory();
            alert("Se ha actualizado la categoria exitosamente!")
        }
        });
}

function eliminarCategory(idElemento){
    let myData={
        id:idElemento
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://158.101.116.30:8080/api/Category/" + idElemento,
        //url:"http://localhost:8080/api/Category/"  + idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        data: JSON.stringify(myData),
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionCategory();
            alert("Se ha eliminado la categoria exitosamente!")
        }
        });
}
