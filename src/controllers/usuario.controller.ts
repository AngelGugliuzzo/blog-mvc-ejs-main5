import { Request, Response } from 'express';
import logger from '../helpers/logger';

import { 
	Iusuario_create,
    Iusuario_update,
       } from '../interfaces/usuarios/usuarios.interface';

import { IsNull } from 'typeorm';
import { dbcontext } from '../db/dbcontext';
import { Usuarios } from '../models/usuarios.entity';


export const usuarioIndex = async (req: Request, res: Response) => {
	
	const usuariosRepository = dbcontext.getRepository(Usuarios);

	const usuarios = await usuariosRepository.find({
		order: { create_at: 'DESC' },
		take: 10,//toma 10
	});
	//res.set('Content-Type', 'text/plain');
	res.render('home/index_view_usuarios', { usuarios });
	
};


export const crearUsuarioView = (req: Request, res: Response) => {
	const usuario = req.body.usuario;
	res.render('usuarios/crear',usuario); //es la vista de la carpeta src/views
};


export const crearUsuario = async (req: Request, res: Response) => {
	const data: Iusuario_create = req.body;

	try {
		const usuarioRepository = dbcontext.getRepository(Usuarios);

		const  usuarios = await usuarioRepository.findOne({
			where: {email: req.params.email },
		});
		
		const usuariosRepository = dbcontext.getRepository(Usuarios);
		const usuario = usuariosRepository.create({
			...data
		});

		const result = await usuariosRepository.save(usuario);
		res.status(200).redirect('/usuarios');
	} catch (error) {
		console.error(error);
		res.status(500).render('shared/errorDupli');
	}
};

export const getUsuarioById = async (req: Request, res: Response) => {
	console.log(req.params);
	const usuariosRepository = dbcontext.getRepository(Usuarios);
	const usuario = await usuariosRepository.findOneBy({
		id: req.params.idUsuario, //aca pasa la clave primaria o id de usuarios
	});
	//res.set('Content-Type', 'text/plain');
	res.set( 'Content-Type', 'application/json'); 
	res.send({ usuario });
};



//--------------------------------------------------------------------------------
export const editarUsuario = async (req: Request, res: Response) => {
	try {
		const usuariosRepository = dbcontext.getRepository(Usuarios);
		const usuario = await usuariosRepository.exist({
			where: { id: req.params.idUsuario },
		});
		if (!usuario) {
			res.render('shared/error');
		}
		const editUsuario: Iusuario_create = {
			email:req.body.email,
			pass: req.body.pass,
			nombre: req.body.nombre,
			apellido: req.body.apellido,
		};
		await usuariosRepository.update(req.params.idUsuario, editUsuario);
		res.redirect('/usuarios/listar')
		//res.redirect('/usuarios');
	} catch (error) {
		res.render('shared/error');
	}
};


export const editarUsuarioView = async (req: Request, res: Response) => {
	try {
		const usuariosRepository = dbcontext.getRepository(Usuarios);

		const usuario = await usuariosRepository.findOne({
			where: { id: req.params.idUsuario },
		});
		if (!usuario) {
			res.render('shared/error');
		}

		res.render('usuarios/editar', { usuario });
	} catch (error) {
		res.render('shared/error');
	}
};



export const listadousuarios= async (req: Request, res:Response) => {
	//try{
		const usuarioLista = dbcontext.getRepository(Usuarios);
        const usuario=req.body.usuario;
		const usuarios = await usuarioLista.find({
			order: { create_at: 'DESC' },
			withDeleted	: true,
			
	    });
	 if (usuarios.length > 0) {
		res.render('usuarios/listado', { usuarios,usuario })
	 }
		res.render('shared/error');
	}; //catch (error) {console.error(error);
	//	res.render('shared/error', { msgError: 'Error en el listdo de usuarios' });
//};


export const borrarUsuario = async (req:Request, res: Response) =>{
	const usuariosRepository = dbcontext.getRepository(Usuarios);
	const  usuario = await usuariosRepository.findOne({
		where: {id: req.params.idUsuario },
	});
	if (!usuario){
		res.render('shared/error');
	}
	await usuariosRepository.softDelete(req.params.idUsuario);
	res.redirect('usuarios/listado');
};

export const recuperaUsuario= async (req: Request, res: Response) => {
	const usuarioRepository = dbcontext.getRepository(Usuarios);
	const usuario = await usuarioRepository.findOne({
		where: { id: req.params.id },
		withDeleted:true
	});
	if (!usuario) {
		res.render('shared/error');
	}
	await usuarioRepository.restore(req.params.id);
	res.redirect('/usuarios/listado');
};