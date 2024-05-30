fetch('http://192.168.227.128:3000/')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    const responseHTTPSERVER = document.getElementById('response-HTTPSERVER');
    responseHTTPSERVER.value = data.vars["address-groups"].HTTP_SERVERS;

    const responseSQLSERVER= document.getElementById('response-SQLSERVER');
    responseSQLSERVER.value = data.vars["address-groups"].SQL_SERVERS;

    const responseDNSSERVER= document.getElementById('response-DNSSERVER');
    responseDNSSERVER.value = data.vars["address-groups"].DNS_SERVERS;

    const responseAIMSERVER= document.getElementById('response-AIMSERVER');
    responseAIMSERVER.value = data.vars["address-groups"].AIM_SERVERS;

    const responseDNP3SERVERS= document.getElementById('response-DNP3SERVER');
    responseDNP3SERVERS.value = data.vars["address-groups"].DNP3_SERVER;

    const responseDNP3CLIENT= document.getElementById('response-DNP3CLIENT');
    responseDNP3CLIENT.value = data.vars["address-groups"].DNP3_CLIENT;

    const responseENIPCLIENT= document.getElementById('response-ENIPCLIENT');
    responseENIPCLIENT.value = data.vars["address-groups"].ENIP_CLIENT;

    const responseENIPSERVER= document.getElementById('response-ENIPSERVER');
    responseENIPSERVER.value = data.vars["address-groups"].ENIP_SERVER;

  })
  .catch(error => {
    console.error('Error:', error);
  });

  function guardarCambios(){
    const httpServerValue = document.getElementById('response-HTTPSERVER').value;
    const sqlServerValue = document.getElementById('response-SQLSERVER').value;
    const dnsServerValue = document.getElementById('response-DNSSERVER').value;
    const responseAIMSERVER= document.getElementById('response-AIMSERVER').value;
    const responseDNP3SERVERS= document.getElementById('response-DNP3SERVER').value;
    const responseDNP3CLIENT= document.getElementById('response-DNP3CLIENT').value;
    const responseENIPCLIENT= document.getElementById('response-ENIPCLIENT').value;
    const responseENIPSERVER= document.getElementById('response-ENIPSERVER').value;



    if(!validarValor(httpServerValue)){
      alert('El valor ' + httpServerValue + ' introducido en el campo HTTP_SERVERS no es válido');
      return;
    }
    if(!validarValor(sqlServerValue)){
      alert('El valor ' + sqlServerValue + ' introducido en el campo SQLSERVER no es válido');
      return;
    }
    if(!validarValor(dnsServerValue)){
      alert('El valor ' + dnsServerValue + ' introducido en el campo DNSSERVER no es válido');
      return;
    }
    if(!validarValor(responseAIMSERVER)){
      alert('El valor ' + responseAIMSERVER + ' introducido en el campo AIMSERVER no es válido');
      return;
    }
    if(!validarValor(responseDNP3SERVERS)){
      alert('El valor ' + responseDNP3SERVERS + ' introducido en el campo DNP3SERVER no es válido');
      return;
    }
    if(!validarValor(responseDNP3CLIENT)){
      alert('El valor ' + responseDNP3CLIENT + ' introducido en el campo DNP3CLIENT no es válido');
      return;
    }
    if(!validarValor(responseENIPCLIENT)){
      alert('El valor ' + responseENIPCLIENT + ' introducido en el campo ENIPCLIENT no es válido');
      return;
    }
    if(!validarValor(responseENIPSERVER)){
      alert('El valor ' + responseENIPSERVER + ' introducido en el campo ENIPSERVER no es válido');
      return;
    }
    
    const nuevosValores = {
      httpServer: httpServerValue,
      sqlServer: sqlServerValue,
      dnsServer: dnsServerValue,
      aimServer: responseAIMSERVER,
      dnp3Server: responseDNP3SERVERS,
      dnp3Client: responseDNP3CLIENT,
      enipClient: responseENIPCLIENT,
      enipServer: responseENIPSERVER
    }

    fetch('http://192.168.227.128:3000/guardar-cambios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevosValores)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Hubo un problema al guardar los cambios.');
      }
      console.log('Cambios guardados exitosamente.');
      // Aquí puedes realizar acciones adicionales si la solicitud se completó correctamente
    })
    .catch(error => {
      console.error('Error al guardar los cambios:', error);
      // Aquí puedes manejar errores, como mostrar un mensaje al usuario
    });
  }

  function validarValor(valor) {
    const ipRegex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    if(valor == "$HOME_NET" || valor == "$EXTERNAL_NET") return true;
    const direcciones = valor.split(',');
    for(let direccion of direcciones){
      direccion = direccion.trim();
      if (!ipRegex.test(direccion)){
        return false;
      }
    }
    return true; // Por ejemplo, aquí se verifica si el valor no está vacío
}
  document.getElementById('guardarCambios').addEventListener("click", guardarCambios);
