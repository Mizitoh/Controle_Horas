import { Router } from "express";
import { GrupoController } from "./controllers/grupoController";
import { UsuarioController } from "./controllers/usuarioController";
import { HorasController } from "./controllers/horasController";
import { UsuarioGrupoController } from "./controllers/usuarioGrupoController";

const router = Router();

const grupoController = new GrupoController();

router.get("/grupo", grupoController.carregar)
    .post("/grupo", grupoController.salvar)
    .put("/grupo/:id", grupoController.atualizar)
    .delete("/grupo/:id", grupoController.apagar);

const usuarioController = new UsuarioController();

    router.get("/usuario", usuarioController.carregar)
    .get("/usuario/:id", usuarioController.carregarPOrId)
    .post("/usuario", usuarioController.salvar)
    .put("/usuario", usuarioController.atualizar)
    .delete("/usuario/:id", usuarioController.apagar)
    .post("/login", usuarioController.login);

const horasController = new HorasController();

    router.get("/apontar", horasController.carregar)
    .post("/apontar", horasController.salvar)
    .get("/apontar/:id_usuario", horasController.carregarPorUsuario)
    .get("/usuariogrupo/horas", horasController.carregarPorUsuarioGrupo)
    .delete("/apontar/:id", horasController.apagar);

const usuarioGrupoController = new UsuarioGrupoController();

    router.get("/usuariogrupo", usuarioGrupoController.carregar)
    .post("/usuariogrupo", usuarioGrupoController.salvar)
    .delete("/usuariogrupo", usuarioGrupoController.apagar);

export { router };