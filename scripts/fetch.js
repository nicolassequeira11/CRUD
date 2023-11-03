const url = "https://65451bf45a0b4b04436da4a6.mockapi.io/users";
const results = document.getElementById("results");

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      results.innerHTML += `
    <div class="text-white ms-4 my-3">
      <p class="m-auto">ID: ${element.id}<p>
      <p class="m-auto">NAME: ${element.name}<p>
      <p class="m-auto">LASTNAME: ${element.lastname}<p>
    </div>
    `;
    });
  });

// METODO GET
document.getElementById("btnGet1").addEventListener("click", () => {
  const inputGet1Id = document.getElementById("inputGet1Id");
  let idExists = false;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        if (inputGet1Id.value === element.id) {
          results.innerHTML = `
          <div class="text-white ms-4 my-3 mx-auto">
            <p class="m-auto">ID: ${element.id}<p>
            <p class="m-auto">NAME: ${element.name}<p>
            <p class="m-auto">LASTNAME: ${element.lastname}<p>
          </div>
          `;
          idExists = true;
          location.reload();

        // Si no se ingresa ningún valor
        } else if (inputGet1Id.value.trim() === "") {
          location.reload();
        
        // Si el id ingresado no existe
        } else if (!idExists) {
          document.getElementById("alert-error").classList.add("show");
        }
      });
    });
});


// METODO POST
document.getElementById("btnPost").addEventListener("click", () => {
  const inputPostNombre = document.getElementById("inputPostNombre");
  const inputPostApellido = document.getElementById("inputPostApellido");

  const datos = {
    name: inputPostNombre.value,
    lastname: inputPostApellido.value,
  };

  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  };

  fetch(url, opciones)
    .then((response) => response.json())
    .then((data) => {
      location.reload();
    });
});


// METODO PUT

// Agregar nombre y apellido del elemento seleccionado en los input del modal
document.getElementById("btnPut").addEventListener("click", () => {
  const inputPutId = document.getElementById("inputPutId");
  const inputPutNombre = document.getElementById("inputPutNombre");
  const inputPutApellido = document.getElementById("inputPutApellido");

  fetch(`${url}/${inputPutId.value}`)
    .then((response) => response.json())
    .then((data) => {
      inputPutNombre.value = data.name;
      inputPutApellido.value = data.lastname;
    });
});

// Modificar valores del elemento al guardar en el modal
document.getElementById("btnSendChanges").addEventListener("click", () => {
  const inputPutId = document.getElementById("inputPutId");
  const inputPutNombre = document.getElementById("inputPutNombre");
  const inputPutApellido = document.getElementById("inputPutApellido");

  const datos = {
    name: inputPutNombre.value,
    lastname: inputPutApellido.value,
  };

  const opciones = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  };

  fetch(`${url}/${inputPutId.value}`, opciones)
    .then((response) => response.json())
    .then((data) => {
      data.name = inputPutNombre.value;
      data.lastname = inputPutApellido.value;
      location.reload();
    });
});


// METODO DELETE
document.getElementById("btnDelete").addEventListener("click", () => {
  const inputDelete = document.getElementById("inputDelete");

  const opciones = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(`${url}/${inputDelete.value}`, opciones)
    .then((response) => response.json())
    .then((data) => {
      location.reload();
    });
});
