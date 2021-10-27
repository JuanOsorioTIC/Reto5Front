function traerInformacionCliente(){
    $.ajax({
        url:"http://158.101.116.30:8080/api/Client/all",
        //url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            $("#resultado").empty();
            pintarRespuestaCliente(respuesta);
        }
        });

}


function pintarRespuestaCliente(items){

    let mytable="<table>";
    mytable+="<td>"+" ID "+"</td>";
    mytable+="<td>"+" NAME "+"</td>";
    mytable+="<td>"+" EMAIL"+"</td>";
    mytable+="<td>"+" Password "+"</td>";
    mytable+="<td>"+" AGE "+"</td>";
    mytable+="<td>"+" Editar"+"</td>";
    mytable+="<td>"+" Eliminar"+"</td>";
    for(i=0;i<items.length;i++){
        mytable+="<tr>";
        mytable+="<td>"+items[i].idClient+"</td>";
        mytable+="<td>"+items[i].name+"</td>";
        mytable+="<td>"+items[i].email+"</td>";
        mytable+="<td>"+items[i].password+"</td>";
        mytable+="<td>"+items[i].age+"</td>";
        mytable+="<td> <button onclick='editarCliente("+items[i].idClient+")'>Editar</button></td>";
        mytable+="<td> <button onclick='eliminarCliente("+items[i].idClient+")'>Borrar</button></td>";
        mytable+="</tr>";
    }
    mytable+="</table>";
    $("#resultado").append(mytable);

}

function guardarInformacionCliente(){
    let myData={
        name:$("#name").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        age:$("#age").val()
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://158.101.116.30:8080/api/Client/save",
        //url:"http://localhost:8080/api/Client/save",
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        
        success:function(respuesta){
            console.log(respuesta);
            $("#resultado").empty();
            $("#name").val("");
            $("#email").val("");
            $("#password").val("");
            $("#age").val("");
            traerInformacionCliente();
            alert("Se ha guardado el cliente exitosamente!")
        }
        });
}

function editarCliente(idElemento){
    let myData={
        idClient:idElemento,
        name:$("#name").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        age:$("#age").val()
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://158.101.116.30:8080/api/Client/update",
        //url:"http://localhost:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#name").val("");
            $("#email").val("");
            $("#password").val("");
            $("#age").val("");
            traerInformacionCliente();
            alert("Se ha actualizado el cliente exitosamente!")
        }
    });
}

function eliminarCliente(idElemento){
    let myData={
        idClient:idElemento
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://158.101.116.30:8080/api/Client/" + idElemento,
        //url:"http://localhost:8080/api/Client/"  + idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionCliente();
            alert("Se ha eliminado el cliente exitosamente!")
        }
        });
}
