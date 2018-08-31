const fs = require('fs');

let listadoPorHacer = [];

const cargarDB = () => {
    try {
        listadoPorHacer = require('../DB/data.json');

    } catch (error) {
        listadoPorHacer = [];
    }
}

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('./DB/data.json', data, (err) => {
        if (err) throw new Error('No se pudo guardar', err);
    });
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const getListado = (completado) => {
    cargarDB();
    if (!completado) {
        return listadoPorHacer;
    }

    return listadoPorHacer.filter((tarea) => {
        return tarea.completado == true;
    });
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex((tarea) => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();

    let index = listadoPorHacer.findIndex((tarea) => {
        return tarea.descripcion === descripcion;
    });

    listadoPorHacer.splice(index, 1);

    guardarDB();

    if (index >= 0) {
        return true;
    } else {
        return false;
    }

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}