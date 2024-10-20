import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class UsuarioGrupoController {
  async salvar(req: Request, res: Response) {
    const usuarioGrupo = req.body;

    try {
      await prismaClient.usuario_grupo.create({
        data: {
          usuario_id: usuarioGrupo.usuario_id,
          grupo_id: usuarioGrupo.grupo_id
        },
      });

      return res.json({status: 201, mensagem: "Grupo cadastrado com Sucesso! - 201 created."});
    } catch (error) {
      return res.json({status: 400, mensagem: "Não foi possível cadastrar-se nesse grupo! - 400 bad request.", error});
    }
  }

  async carregar(req: Request, res: Response) {
    try {
      const carregarGrupo = await prismaClient.usuario_grupo.findMany();

      return res.json(carregarGrupo);
    } catch (error) {
      return res.status(400).send("Erro ao carregar consulta!\n" + error);
    }
  }

  async apagar(req: Request, res: Response) {
    try {
      const usuarioGrupo = req.body;
      await prismaClient.$queryRaw
      `DELETE FROM usuario_grupo WHERE usuario_id = ${usuarioGrupo.usuario_id} AND grupo_id = ${usuarioGrupo.grupo_id}`;

      return res.json({
        status: 200,
        mensagem: "Excluído do grupo com sucesso!"});
    } catch (error) {
      return res.json({
        status: 400,
        mensagem: "Erro ao tentar sair do grupo - 400 bad request",
        error,
      });
    }
  }
}