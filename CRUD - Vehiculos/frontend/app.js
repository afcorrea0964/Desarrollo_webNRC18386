document.addEventListener('DOMContentLoaded', () => {
    loadCarList();
});

async function loadCarList() {
    try {
        const response = await fetch('http://localhost:9000/api/cars');
        const cars = await response.json();

        const carTableBody = document.querySelector('#carTable tbody');
        carTableBody.innerHTML = '';

        cars.forEach(car => {
            const row = carTableBody.insertRow();
            row.innerHTML = `
                <td>${car.placa}</td>
                <td>${car.marca}</td>
                <td>${car.modelo}</td>
                <td>${car.ano}</td>
                <td>${car.color}</td>
                <td>
                    <button onclick="editCar('${car._id}')">Editar</button>
                    <button onclick="deleteCar('${car._id}')">Eliminar</button>
                </td>
            `;
        });
    } catch (error) {
        console.error('Error al cargar la lista de carros:', error);
    }
}

// Función para agregar un carro

async function saveCar() {
    const placa = document.getElementById('placa').value;
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const ano = document.getElementById('ano').value;
    const color = document.getElementById('color').value;

    const carData = { placa, marca, modelo, ano, color };
    const selectedCarId = document.getElementById('selectedCarId').value;

    try {
        let response;

        if (selectedCarId) {
           
            response = await fetch(`http://localhost:9000/api/cars/${selectedCarId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(carData)
            });
        } else {
            
            response = await fetch('http://localhost:9000/api/cars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(carData)
            });
        }

        if (response.ok) {
            clearForm();
            loadCarList();
        } else {
            console.error('Error al guardar el carro:', response.status, response.statusText);
            alert('Error al guardar el carro.');
        }
    } catch (error) {
        console.error('Error al guardar el carro:', error);
        alert('Error al guardar el carro.');
    }
}
// Función para editar un carro
async function editCar(carId) {
    try {
        const response = await fetch(`http://localhost:9000/api/cars/${carId}`);
        const car = await response.json();

        document.getElementById('placa').value = car.placa;
        document.getElementById('marca').value = car.marca;
        document.getElementById('modelo').value = car.modelo;
        document.getElementById('ano').value = car.ano;
        document.getElementById('color').value = car.color;

        document.getElementById('selectedCarId').value = car._id;
    } catch (error) {
        console.error('Error al cargar datos del carro para editar:', error);
    }
}
// Función para eliminar un carro
async function deleteCar(carId) {
    try {
        const confirmDelete = confirm('¿Estás seguro de eliminar este carro?');

        if (confirmDelete) {
            const response = await fetch(`http://localhost:9000/api/cars/${carId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                loadCarList();
                
                location.reload();
            } else {
                console.error('Error al eliminar el carro:', response.status, response.statusText);
                alert('Error al eliminar el carro.');
            }
        }
    } catch (error) {
        console.error('Error al eliminar el carro.', error);
        alert('Error al eliminar el carro.');
    }
}

// Función para limpiar el formulario
function clearForm() {
    document.getElementById('carForm').reset();
    document.getElementById('selectedCarId').value = '';
}

