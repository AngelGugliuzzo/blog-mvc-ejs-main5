import express from 'express';
import {
	usuarioIndex,
	crearUsuarioView,
	crearUsuario,
	getUsuarioById,
	editarUsuario,
	borrarUsuario,
	listadousuarios,
	editarUsuarioView,
	recuperaUsuario,
} from '../controllers/usuario.controller';
import { authMiddleware } from '../middlewares/auth.middlewares';

const usuarioRoutes = express.Router(); //aca esta el usuarioroutes, que falla en el server

//usuarioRoutes.get('/', usuarioIndex); 
//usuarioRoutes.get ('/by/:idUsuario', getUsuarioById); //graba el primer registro que es el id aleatorio

//listar usuarios
usuarioRoutes.get('/listado',authMiddleware,listadousuarios);

//cargar vista y crear usuarios
usuarioRoutes.get('/crear',authMiddleware, crearUsuarioView);
usuarioRoutes.post('/crear',authMiddleware ,crearUsuario);

//cargar y editar usuarios
usuarioRoutes.get('/editar/:idUsuario',authMiddleware,editarUsuarioView);
usuarioRoutes.post('/editar/:idUsuario',authMiddleware,editarUsuario);

//eliminar usuario 
usuarioRoutes.get('/borrar/:idUsuario',authMiddleware,borrarUsuario);

//recuperar usuario
usuarioRoutes.get('/restore/:idUsuario',authMiddleware, recuperaUsuario);

export default usuarioRoutes;