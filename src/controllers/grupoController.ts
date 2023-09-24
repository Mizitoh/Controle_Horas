import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class GrupoController {
  async salvar(req: Request, res: Response) {
    const grupo = req.body.grupo;

    try {
      const salvarGrupo = await prismaClient.grupo.create({
        data: {
          nome: grupo
        },
      });

      return res.json({status: 201, mensagem: "Grupo cadastrado com Sucesso! - 201 created.", nome: grupo});
    } catch (error) {
      return res.json({status: 400, mensagem: "Não foi possível cadastrar esse grupo! - 400 bad request.", error});
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const grupo = req.body;
      const id = parseInt(req.params.id);

      const atualizarGrupo = await prismaClient.grupo.updateMany({
        where: {
          id: id,
        },
        data: {
          nome: grupo.nome,
        },
      });

      return res.status(200).send({status: 200, mensagem: "Atualizado com sucesso!", nome: grupo.nome});
    } catch (error) {
      return res.status(400).send({status: 400, mensagem: "Erro ao Atualizar registro - 400 bad request", error});
    }
  }

  async carregar(req: Request, res: Response) {
    try {
      const carregarGrupo = await prismaClient.grupo.findMany();

      return res.json(carregarGrupo);
    } catch (error) {
      return res.status(400).send("Erro ao carregar consulta!\n" + error);
    }
  }

  async apagar(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const apagarGrupo = await prismaClient.grupo.delete({
        where: {
          id: id,
        },
      });

      return res.json({
        status: 200,
        mensagem: "Grupo excluído com sucesso!"});
    } catch (error) {
      return res.json({
        status: 400,
        mensagem: "Erro ao tentar deletar - 400 bad request ",
        error,
      });
    }
  }
}