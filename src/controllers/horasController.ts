import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class HorasController {
    async salvar(req: Request, res: Response) {
        const horas = req.body;
        const dataAjustada = horas.data ? new Date(horas.data).toISOString() : new Date().toISOString();
        const horaAjustadaInicial = horas.horaInicial ? `1970-01-01T${horas.horaInicial}:00.000Z` : `1970-01-01T${new Date().getHours()}:${new Date().getMinutes()}:00.000Z`;
        const horaAjustadaFinal = horas.horaFinal ? `1970-01-01T${horas.horaFinal}:00.000Z` : `1970-01-01T${new Date().getHours()}:${new Date().getMinutes()}:00.000Z`;

        try {
            const salvarHora = await prismaClient.controleHoras.create({
                data: {
                    id_usuario: horas.id_usuario,
                    data: dataAjustada,
                    horaInicial: horaAjustadaInicial,
                    horaFinal: horaAjustadaFinal,
                },
            });

            return res.json({ status: 201, mensagem: "Horário cadastrado com Sucesso! - 201 created." });
        } catch (error) {
            return res.json({ status: 400, mensagem: "Não foi possível cadastrar os dados! - 400 bad request.", error });
        }
    }

    async carregar(req: Request, res: Response) {
        try {
            const listarTodos = await prismaClient.controleHoras.findMany();
            return res.json(listarTodos);
        } catch (error) {
            return res.status(400).send("Erro ao carregar consulta!\n" + error);
        }
    }

    async carregarPorUsuario(req: Request, res: Response) {
        const usuario = parseInt(req.params.id_usuario);
        try {
            const listarTodos = await prismaClient.$queryRaw`SELECT id, id_usuario, data, "horaInicial", "horaFinal" FROM controle_horas WHERE id_usuario = ${usuario}`;
            return res.json(listarTodos);
        } catch (error) {
            return res.status(400).send("Erro ao carregar consulta!\n" + error);
        }
    }

    async apagar(req: Request, res: Response) {
        const registro = parseInt(req.params.id);
        try {
            const apagarRegistro = await prismaClient.controleHoras.delete({
                where : {
                    id: registro
                }
            })
            return res.json({
                status: 200,
                mensagem: "Registro de hora excluído com sucesso!"});
        } catch (error) {
            return res.status(400).send("Erro ao deletar!\n" + error);
        }
    }
}