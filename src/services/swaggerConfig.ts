import swaggerJSDoc from 'swagger-jsdoc';
import OAS3Definition from 'swagger-jsdoc';

const definition: any = {
  openapi: '3.0.3',
  info: {
    title: 'API de controle de horas',
    version: '1.0.0',
  },
  components: {
    schemas: {
      // Grupo
      Grupo: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          nome: {
            type: 'string',
          },
        },
      },
      // Usuario
      Usuario: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          nome: {
            type: 'string',
          },
          grupo_id: {
            type: 'integer',
          },
          email: {
            type: 'string',
            format: 'email',
          },
          senha: {
            type: 'string',
          },
        },
      },
      // ControleHoras
      ControleHoras: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          id_usuario: {
            type: 'integer',
          },
          data: {
            type: 'string',
            format: 'date',
          },
          horaInicial: {
            type: 'string',
            format: 'time',
          },
          horaFinal: {
            type: 'string',
            format: 'time',
          },
        },
      },
    },
  },
  paths: {
    // Grupo
    '/grupo': {
      get: {
        "tags": ["Grupo"],
        summary: 'Listar Grupos',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Grupo',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        "tags": ["Grupo"],
        summary: 'Criar um novo grupo',
        description: 'Cria um novo grupo com os dados fornecidos.',
        requestBody: {
          description: 'Dados do grupo a ser criado',
          required: true,
          content: {
            'application/json': {
              example: {
                grupo: 'Nome do Grupo',
              },
              schema: {
                $ref: '#/components/schemas/Grupo',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Grupo criado com sucesso.',
            content: {
              'application/json': {
                example: {
                  grupo: 'Nome do Grupo',
                },
              },
            },
          },
          400: {
            description: 'Requisição inválida. Verifique os dados enviados.',
            content: {
              'application/json': {
                example: {
                  error: 'Descrição do erro',
                },
              },
            },
          },
          500: {
            description: 'Erro interno do servidor. Entre em contato com o suporte.',
            content: {
              'application/json': {
                example: {
                  error: 'Descrição do erro',
                },
              },
            },
          },
        },
      },
    },
    '/grupo/{id}': {
      delete: {
        "tags": ["Grupo"],
        summary: 'Excluir um grupo',
        description: 'Exclui um grupo com o ID especificado.',
        parameters: [
          {
            name: 'id',
            in: 'path', // Indica que o parâmetro está na URL
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          204: {
            description: 'Grupo excluído com sucesso.',
          },
          404: {
            description: 'Grupo não encontrado.',
          },
        },
      },
      put: {
        "tags": ["Grupo"],
        summary: 'Atualizar um grupo',
        description: 'Atualiza um grupo com o ID especificado com os dados fornecidos.',
        parameters: [
          {
            name: 'id',
            in: 'path', // Indica que o parâmetro está na URL
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        requestBody: {
          description: 'Dados do grupo a ser atualizado',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Grupo',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Grupo atualizado com sucesso.',
            content: {
              'application/json': {
                example: {
                  id: 1, // ID do grupo atualizado
                  nome: 'Nome do Grupo Atualizado',
                  // Outras propriedades do grupo
                },
              },
            },
          },
          404: {
            description: 'Grupo não encontrado.',
          },
          400: {
            description: 'Requisição inválida. Verifique os dados enviados.',
          },
        },
      },
    },
    // Usuario
    '/usuario': {
      get: {
        "tags": ["Usuário"],
        summary: 'Lista todos usuários',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Usuario',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        "tags": ["Usuário"],
        summary: 'Criar um novo usuário',
        description: 'Cria um novo usuário com os dados fornecidos.',
        requestBody: {
          description: 'Dados do usuário a ser criado',
          required: true,
          content: {
            'application/json': {
              example: {
                nome: "Meu nome",
                grupo_id: 1,
                email: "email@bonitao.com",
                senha: "S3Cr3T#",
              },
              schema: {
                $ref: '#/components/schemas/Usuario',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Usuário criado com sucesso.',
            content: {
              'application/json': {
                example: {
                  nome: "Meu nome",
                  grupo_id: 1,
                  email: "email@bonitao.com",
                  senha: "S3Cr3T#",
                },
              },
            },
          },
          400: {
            description: 'Requisição inválida. Verifique os dados enviados.',
            content: {
              'application/json': {
                example: {
                  error: 'Descrição do erro',
                },
              },
            },
          },
          500: {
            description: 'Erro interno do servidor. Entre em contato com o suporte.',
            content: {
              'application/json': {
                example: {
                  error: 'Descrição do erro',
                },
              },
            },
          },
        },
      },
      put: {
        "tags": ["Usuário"],
        summary: 'Atualizar senha de usuário',
        description: 'Atualiza uma senha do usuário.',
        requestBody: {
          description: 'Dados do usuário para atualizar a senha',
          required: true,
          content: {
            'application/json': {
              example: {
                email: "email@bonitao.com",
                senha: "S3Cr3T#",
              },
              schema: {
                $ref: '#/components/schemas/Usuario',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Senha atualizada com sucesso.',
            content: {
              'application/json': {
                example: {
                  email: "email@bonitao.com"
                },
              },
            },
          },
          404: {
            description: 'Usuário não encontrado.',
          },
          400: {
            description: 'Requisição inválida. Verifique os dados enviados.',
          },
        },
      },
    },
    "/login": {
      post: {
        "tags": ["Usuário"],
        summary: 'Faz login',
        description: 'Loga conforme dados fornecidos.',
        requestBody: {
          description: 'Dados do usuário',
          required: true,
          content: {
            'application/json': {
              example: {
                email: "email@bonitao.com",
                senha: 'S3Cr3T#',
              },
              schema: {
                $ref: '#/components/schemas/Usuario',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login com sucesso.',
            content: {
              'application/json': {
                example: {
                  email: "email@bonitao.com",
                  senha: 'S3Cr3T#',
                },
              },
            },
          },
          400: {
            description: 'Login não realizado! verifique senha e email.',
            content: {
              'application/json': {
                example: {
                  error: 'Descrição do erro',
                },
              },
            },
          }
        },
      },
    },
    '/usuario/{id}': {
      delete: {
        "tags": ["Usuário"],
        summary: 'Excluir um usuário',
        description: 'Exclui um usuário com o ID especificado no parâmetro.',
        parameters: [
          {
            name: 'id',
            in: 'path', // Indica que o parâmetro está na URL
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          204: {
            description: 'Usuário excluído com sucesso.',
          },
          404: {
            description: 'Usuário não encontrado.',
          },
        },
      },
    },
    // ControleHoras
    '/apontar': {
      get: {
        "tags": ["Horas"],
        summary: 'Carrega todos os registros de horas',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/ControleHoras',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        "tags": ["Horas"],
        summary: 'Criar um novo registro de horas',
        description: 'Cria um apontamento das horas trabalhadas',
        requestBody: {
          description: 'Dados do apontamento',
          required: true,
          content: {
            'application/json': {
              example: {
                id_usuario: 1,
                data: "2023-09-25",
                horaInicial: "14:30:00.000Z",
                horaFinal: "13:30:00.000Z"
              },
              schema: {
                $ref: '#/components/schemas/ControleHoras',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Apontamento criado com sucesso.',
            example: {
              status: 201,
              mensagem: "Horário cadastrado com Sucesso! - 201 created."
            },
          },
          400: {
            description: 'Não foi possível cadastrar os dados! - 400 bad request.',
            content: {
              'application/json': {
                example: {
                  error: 'Descrição do erro',
                },
              },
            },
          },
        },
      },
    },
    "/apontar/{id_usuario}":{
      get: {
        "tags": ["Horas"],
        summary: 'Carregar registro de horas porusuário',
        description: 'Lista apontamentos do por id de usuário',
        parameters: [
          {
            name: 'id_usuario',
            in: 'path', // Indica que o parâmetro está na URL
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          responses: {
            '200': {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ControleHoras',
                    },
                  },
                },
              },
            },
          },
          404: {
            description: 'Dados não encontrados.',
          },
          400: {
            description: 'Erro ao carregar consulta!',
          },
        },
      },
    },
    '/apontar/{id}': {
      delete: {
        "tags": ["Horas"],
        summary: 'Excluir um registro de horas',
        description: 'Exclui um apontamento pelo id do apontamento.',
        parameters: [
          {
            name: 'id',
            in: 'path', // Indica que o parâmetro está na URL
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          204: {
            description: 'Registro de hora excluído com sucesso!',
          },
          404: {
            description: 'Erro ao deletar!',
          },
        },
      },
    },
  },
  tryOut: true,
};

const apis = ['./src/router.ts'];
const options = {
  customCss: '.swagger-ui .topbar { display: none }'
}

export default swaggerJSDoc({
  definition,
  apis,
  options
});