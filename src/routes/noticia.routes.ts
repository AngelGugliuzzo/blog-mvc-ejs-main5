import express from 'express';
import {
	noticiasIndex,
	crearNoticiaView,
	crearNoticia,
	getNoticiaById,
	editarNoticiaView,
	editarNoticia,
	listadoNoticias,
	borrarNoticia,
	recuperaNoticia,
	
} from '../controllers/noticia.controller';
import { authMiddleware } from '../middlewares/auth.middlewares';

const noticiasRoutes = express.Router();

noticiasRoutes.get('/', noticiasIndex);
noticiasRoutes.get ('/by/:idNoticia', getNoticiaById);  //me saca la pantalla de crear, pone el id como primer campo

//listado noticias
noticiasRoutes.get('/listado',authMiddleware,listadoNoticias);

//crearnoticia
noticiasRoutes.get('/crear',authMiddleware ,crearNoticiaView);
noticiasRoutes.post('/crear',authMiddleware ,crearNoticia);

//editar noticia
noticiasRoutes.get('/editar/:idNoticia',authMiddleware,editarNoticiaView);//
noticiasRoutes.post('/editar/:idNoticia',authMiddleware,editarNoticia);

//delete noticia era get
noticiasRoutes.get('/borrar/:idNoticia',authMiddleware,borrarNoticia);

//recuperar noticia
noticiasRoutes.get('/restore/:idNoticia',authMiddleware, recuperaNoticia);

export default noticiasRoutes;
