function traerInformacionAdmin(){
    $.ajax({
        //url:"http://158.101.116.30:8080/api/Admin/all",
        url:"http://localhost:8080/api/Admin/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            $("#resultado").empty();
            pintarRespuestaAdmin(respuesta);
        }
        });

}


function pintarRespuestaAdmin(items){

    let mytable="<table>";
    mytable+="<td>"+" ID "+"</td>";
    mytable+="<td>"+" NAME "+"</td>";
    mytable+="<td>"+" EMAIL"+"</td>";
    mytable+="<td>"+" password"+"</td>";
    mytable+="<td>"+" Editar"+"</td>";
    mytable+="<td>"+" Eliminar"+"</td>";
    for(i=0;i<items.length;i++){
        mytable+="<tr>";
        mytable+="<td>"+items[i].id+"</td>";
        mytable+="<td>"+items[i].name+"</td>";
        mytable+="<td>"+items[i].email+"</td>";
        mytable+="<td>"+items[i].password+"</td>";
        mytable+="<td> <button onclick='editarAdmin("+items[i].id+")'>Editar</button></td>";
        mytable+="<td> <button onclick='eliminarAdmin("+items[i].id+")'>Borrar</button></td>";
        mytable+="</tr>";
    }
    mytable+="</table>";
    $("#resultado").append(mytable);

}

function guardarInformacionAdmin(){
    let myData={
        name:$("#name").val(),
        email:$("#email").val(),
        password:$("#password").val()
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        //url:"http://158.101.116.30:8080/api/Admin/save",
        url:"http://localhost:8080/api/Admin/save",
        type:"POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        success:function(respuesta){
            $("#resultado").empty();
            $("#name").val("");
            $("#email").val("");
            $("#password").val("");
            traerInformacionAdmin();
            alert("Se ha guardado el administrador exitosamente!")
        }
        });
}

function editarAdmin(idElemento){
    let myData={
        id:idElemento,
        name:$("#name").val(),
        email:$("#email").val(),
        password:$("#password").val(),
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        //url:"http://158.101.116.30:8080/api/Admin/update",
        url:"http://localhost:8080/api/Admin/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        data: JSON.stringify(myData),
        success:function(respuesta){
            $("#resultado").empty();
            $("#name").val("");
            $("#email").val("");
            $("#password").val("");
            traerInformacionAdmin();
            alert("Se ha actualizado el administrador exitosamente!")
        }
        });
}

function eliminarAdmin(idElemento){
    let myData={
        id:idElemento
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        //url:"http://158.101.116.30:8080/api/Admin/" + idElemento,
        url:"http://localhost:8080/api/Admin/" + idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionAdmin();
            alert("Se ha eliminado el administrador exitosamente!")
        }
        });
}
