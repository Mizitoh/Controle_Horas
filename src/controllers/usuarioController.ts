import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken";

export class UsuarioController {
    async salvar(req: Request, res: Response) {
        const usuario = req.body;
        const senha = await bcrypt.hash(req.body.senha, 10);

        /**
         * Verificação de usuario já existente na base
         */
        try {
            const verificaUsuarioExistente = await prismaClient.usuario.findMany({
                where: {
                    email: usuario.email,
                },
            });

            if (verificaUsuarioExistente.length > 0) {
                return res.json({ status: 400, mensagem: "Usuário já xistente! - 400 bad request." });
            }
        } catch (error) {
            return res.json({ status: 400, mensagem: "Não foi possível cadastrar o usuário, provável erro nos dados enviados", error });
        }

        /**
         * Caso a condição acima for falsa irá cadastrar o usuário
         */
        try {
            const salvarUsuario = await prismaClient.usuario.create({
                data: {
                    nome: usuario.nome,
                    grupo_id: usuario.grupo_id,
                    email: usuario.email,
                    senha: senha,
                },
            });

            return res.json({ status: 201, mensagem: "Usuário Cadastrado com Sucesso! - 201 created.", email: usuario.nome });
        } catch (error) {
            return res.json({ status: 400, mensagem: "Não fois possível cadastrar esse usuário! - 400 bad request.", error });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const { senha, email } = req.body;
            const senhaCriptografada = await bcrypt.hash(senha, 10);
            const id = parseInt(req.params.id);

            const atualizarUsuario = await prismaClient.usuario.updateMany({
                where: {
                    id: id,
                },
                data: {
                    email,
                    senha: senhaCriptografada,
                },
            });

            return res.status(200).send({ status: 200, mensagem: "Senha atualizada com sucesso!", email: email });
        } catch (error) {
            return res.status(400).send({ status: 400, mensagem: "Erro ao Atualizar registro - 400 bad request", error });
        }
    }

    async carregar(req: Request, res: Response) {
        try {
            const carregarUsuarios = await prismaClient.usuario.findMany();

            return res.json(carregarUsuarios);
        } catch (error) {
            return res.status(400).send("Erro ao carregar consulta!\n" + error);
        }
    }

    async carregarPOrId(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            const usuario = await prismaClient.usuario.findFirst({
                where: {
                    id: id,
                }
            });

            return res.status(200).json({
                email: usuario?.email,
                nome: usuario?.nome
            })
        } catch (error) {
            return res.status(400).send({ status: 400, mensagem: "Erro ao carregar registro - 400 bad request", error });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { senha, email } = req.body;

            /**
             * Verificação de usuario já existente na base
             */
            const verificaUsuarioExistente: any =
                await prismaClient.usuario.findFirst({
                    where: {
                        email: email,
                    },
                });
            //const segredo: string = process.env.JWT_ACCESS_SECRET as string;
            //const token = jwt.sign({ email: email }, segredo, {
            //    expiresIn: 18000, //5 horas em segundos
            //});
            if (await bcrypt.compare(senha, verificaUsuarioExistente.senha)) {
                return res.status(200).json({
                    status: 200,
                    mensagem: "Login realizado com sucesso!",
                    email: verificaUsuarioExistente.email,
                    id_usuario: verificaUsuarioExistente.id
                    //token: token,
                });
            } else {
                return res.status(400).json({
                    status: 400,
                    mensagem: "Login não realizado! verifique senha e email.",
                });
                // }
            }
        } catch (error) {
            return res.json({
                status: 500,
                mensagem: "houve um erro inesperado, confira e-mail e senha, caso esteja tudo certo, fale com o administrador - 500 Internal Server Error",
                error
            });
        }
    }

    async apagar(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            const apagarUsuarios = await prismaClient.usuario.delete({
                where: {
                    id: id,
                },
            });

            return res.json({
                status: 200,
                mensagem: "Usuário Excluido Com Sucesso!"
            });
        } catch (error) {
            return res.json({
                status: 400,
                mensagem: "Erro ao tentar deletar - 400 bad request ",
                error,
            });
        }
    }
}