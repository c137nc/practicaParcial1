const express = require('express');
const _ = require('lodash');
const cursos = require('./cursos.json');
//const cursos = require('./data/cursos.json');
const app = express();
const PORT = 3001;
//esto es importante para que la app entienda solicitudes que contengan formato .json
app.use(express.json());

app.get('/cursos', (req, res) => {
    res.status(200).json(cursos);
})

app.get('/cursos/:cursoId' , (req, res) => {
    const idCurso = req.params.cursoId;
    const cursoBuscado = cursos.find(c => c.id == idCurso)
    if (cursoBuscado) {
        res.status(200).json(cursoBuscado)
    }else {
        res.status(404).json({
            message: `El curso ${idCurso} no existe aun`
        })
    }
});

app.post('/cursos', (req, res) => {
    const datosCurso = req.body;
    const arregloIds = cursos.map(c => c.id);
    const idMaximo = _.max(arregloIds) + 1;
    const cursoNuevo = {id: idMaximo, ...datosCurso, habilitado: true};
    cursos.push(cursoNuevo);
    res.status(201).json(cursoNuevo);
})

app.delete('/cursos/:cursoId', (req,res) => {
    const idBuscado = req.params.cursoId;
    const cursoBuscado = cursos.findIndex(c => c.id == idBuscado); //almaceno la posicion del que busco
    if (cursoBuscado >= 0) {
        cursos.splice(cursoBuscado,1)
        res.status(200).json({
            message:`El curso ${idBuscado} , se elimino correctamente`
        })
    }
    else {
        res.status(404).json({
             message: `El curso requerido: ${idBuscado}, no se encontró`

        }) 
    }
})



app.listen(PORT, () => {
    console.log(`La aplicacion inicio en el puerto ${PORT}`);
})

