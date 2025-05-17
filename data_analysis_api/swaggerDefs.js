export const swaggerDefination = {
  openapi: '3.0.0',
  info: {
    title: 'Authentication and AI Prompt API',
    version: '1.0.0',
    description: 'API for user authentication, AI prompts, and dashboard analytics'
  },
  tags: [
    {
      name: 'Auth',
      description: 'Authentication operations'
    },
    
  ],
  paths: {
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'User login',
        description: 'Authenticate a user and return a JWT token.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginRequest'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Successful login',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AuthResponse'
                }
              }
            }
          },
          400: {
            description: 'Invalid credentials or missing parameters',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        }
      }
    },
    '/auth/signup': {
      post: {
        tags: ['Auth'],
        summary: 'User signup',
        description: 'Register a new user and return a JWT token.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SignupRequest'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'User registered successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AuthResponse'
                }
              }
            }
          },
          400: {
            description: 'User already exists or missing parameters',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        }
      }
    },
    '/prompt/subjective': {
      post: {
        tags: ['Prompt'],
        summary: 'Get subjective prompt response',
        description: 'Processes a subjective AI prompt   and returns a response.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PromptRequestSubjective'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Successful AI response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PromptResponse'
                }
              }
            }
          },
          404: {
            description: 'Conversation not found or error occurred',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        }
      }
    },
    '/prompt/objective': {
      post: {
        tags: ['Prompt'],
        summary: 'Get objective prompt response',
        description: 'Processes a objective AI prompt and returns a response.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PromptRequestObjective'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Successful AI response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PromptResponse'
                }
              }
            }
          },
          404: {
            description: 'Conversation not found or error occurred',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        }
      }
    },
    '/dashboard/query-data': {
      get: {
        tags: ['Dashboard'],
        summary: 'Get query statistics',
        description:
          'Retrieves the total count of queries and their status breakdown (pending, in_progress, resolved).',
        responses: {
          200: {
            description: 'Query statistics retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/QueryStatisticsResponse'
                }
              }
            }
          },
          500: {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        }
      }
    },
    '/dashboard/queries': {
      get: {
        tags: ['Dashboard'],
        summary: 'Get paginated queries',
        description: 'Fetches a paginated list of queries.',
        parameters: [
          {
            name: 'page',
            in: 'query',
            required: false,
            schema: {
              type: 'integer',
              default: 1,
              minimum: 1
            },
            description: 'Page number for pagination'
          },
          {
            name: 'limit',
            in: 'query',
            required: false,
            schema: {
              type: 'integer',
              default: 10,
              minimum: 1,
              maximum: 100
            },
            description: 'Number of items per page'
          },
          {
            name: 'status',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
              enum: ['pending', 'in_progress', 'resolved', 'all'],
              default: 'all'
            },
            description: 'Filter queries by status'
          },
          {
            name: 'sortBy',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
              enum: ['created_at', 'updated_at', 'status'],
              default: 'created_at'
            },
            description: 'Field to sort by'
          },
          {
            name: 'sortOrder',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
              enum: ['asc', 'desc'],
              default: 'desc'
            },
            description: 'Sort order'
          }
        ],
        responses: {
          200: {
            description: 'Paginated queries retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PaginatedQueriesResponse'
                }
              }
            }
          },
          500: {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        }
      }
    },
    '/query': {
      post: {
        tags: ['Query'],
        summary: 'Save a new query',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  prompt: { type: 'string', example: 'Where is my order?' },
                  user_id: { type: 'string', example: '60d5e3b0e39c521fa8e03618' }
                },
                required: ['prompt', 'user_id']
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Query saved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PaginatedQueriesResponse'
                }
              }
            }
          },
          500: {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },
    '/query/priority': {
      patch: {
        tags: ['Query'],
        summary: 'Set priority for a query',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  query_id: { type: 'string', example: '60d5e3b0e39c521fa8e03620' },
                  priority: { type: 'string', enum: ['low', 'medium', 'high'], example: 'high' }
                },
                required: ['query_id', 'priority']
              }
            }
          }
        },
        responses: {
          200: { description: 'Priority updated successfully' },
          400: { description: 'Invalid request' }
        }
      }
    },
    '/query/status': {
      patch: {
        tags: ['Query'],
        summary: 'Set status for a query',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  query_id: { type: 'string', example: '60d5e3b0e39c521fa8e03620' },
                  status: {
                    type: 'string',
                    enum: ['pending', 'in_progress', 'resolved'],
                    example: 'resolved'
                  }
                },
                required: ['query_id', 'status']
              }
            }
          }
        },
        responses: {
          200: { description: 'Status updated successfully' },
          400: { description: 'Invalid request' }
        }
      }
    },
    '/query/{query_id}': {
      get: {
        tags: ['Query'],
        summary: 'Get query by ID',
        parameters: [
          {
            name: 'query_id',
            in: 'path',
            required: true,
            schema: {
              type: 'string'
            },
            description: 'ID of the query'
          }
        ],
        responses: {
          200: {
            description: 'Query retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PaginatedQueriesResponse'
                }
              }
            }
          },
          404: {
            description: 'Query not found'
          }
        }
      }
    },
    '/conversation/{conversation_id}': {
      get: {
        tags: ['Conversation'],
        summary: 'Get messages by conversation ID',
        parameters: [
          {
            name: 'conversation_id',
            in: 'path',
            required: true,
            schema: {
              type: 'string'
            },
            description: 'ID of the conversation'
          }
        ],
        responses: {
          200: {
            description: 'Messages retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'boolean', example: true },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          sender: { type: 'string', example: 'user' },
                          message: { type: 'string', example: 'Hi there!' },
                          timestamp: { type: 'string', format: 'date-time' }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          404: {
            description: 'Conversation not found'
          }
        }
      }
    }
  },
  components: {
    schemas: {
      LoginRequest: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            format: 'email',
            example: 'user@example.com',
            description: 'User email address'
          },
          password: {
            type: 'string',
            format: 'password',
            example: 'password123',
            description: 'User password'
          }
        },
        required: ['email', 'password']
      },
      SignupRequest: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            format: 'email',
            example: 'user@example.com',
            description: 'User email address'
          },
          password: {
            type: 'string',
            format: 'password',
            example: 'password123',
            description: 'User password'
          },
          name: {
            type: 'string',
            example: 'John Doe',
            description: 'User full name'
          }
        },
        required: ['email', 'password']
      },
      AuthResponse: {
        type: 'object',
        properties: {
          status: {
            type: 'boolean',
            example: true,
            description: 'Operation status'
          },
          message: {
            type: 'string',
            example: 'Login successful',
            description: 'Operation message'
          },
          data: {
            type: 'object',
            properties: {
              user: {
                type: 'object',
                properties: {
                  id: { type: 'string', example: '60d5e3b0e39c521fa8e03618' },
                  email: { type: 'string', example: 'user@example.com' },
                  name: { type: 'string', example: 'John Doe' },
                  createdAt: { type: 'string', format: 'date-time' }
                }
              },
              token: {
                type: 'string',
                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                description: 'JWT access token'
              },
              refreshToken: {
                type: 'string',
                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                description: 'JWT refresh token'
              }
            }
          }
        }
      },
      PromptRequestSubjective: {
        type: 'object',
        properties: {
          prompt: {
            type: 'string',
            example: 'What is the capital of France?',
            description: 'User prompt text'
          },
          conversation_id: {
            type: 'string',
            nullable: true,
            example: '60d5e3b0e39c521fa8e03619',
            description: 'Conversation ID for continuing existing conversations'
          },
          options: {
            type: 'object',
            properties: {
              temperature: {
                type: 'number',
                minimum: 0,
                maximum: 1,
                default: 0.7,
                description: 'Control randomness of responses'
              },
              max_tokens: {
                type: 'integer',
                minimum: 1,
                maximum: 4000,
                default: 1000,
                description: 'Maximum tokens in response'
              }
            }
          }
        },
        required: ['prompt']
      },
      PromptRequestObjective: {
        type: 'object',
        properties: {
          prompt: {
            type: 'string',
            example: 'Where is my shipment with id TSU123456?',
            description: 'User prompt text'
          },
          conversation_id: {
            type: 'string',
            nullable: true,
            example: '60d5e3b0e39c521fa8e03619',
            description: 'Conversation ID for continuing existing conversations'
          },
          options: {
            type: 'object',
            properties: {
              temperature: {
                type: 'number',
                minimum: 0,
                maximum: 1,
                default: 0.7,
                description: 'Control randomness of responses'
              },
              max_tokens: {
                type: 'integer',
                minimum: 1,
                maximum: 4000,
                default: 1000,
                description: 'Maximum tokens in response'
              }
            }
          }
        },
        required: ['prompt']
      },
      PromptResponse: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          data: {
            type: 'object',
            properties: {
              response: {
                type: 'string',
                example: 'The capital of France is Paris.'
              },
              conversation_id: {
                type: 'string',
                example: '60d5e3b0e39c521fa8e03619'
              },
              usage: {
                type: 'object',
                properties: {
                  prompt_tokens: { type: 'integer', example: 10 },
                  completion_tokens: { type: 'integer', example: 8 },
                  total_tokens: { type: 'integer', example: 18 }
                }
              }
            }
          }
        }
      },
      QueryStatisticsResponse: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          data: {
            type: 'object',
            properties: {
              total: { type: 'integer', example: 125 },
              pending: { type: 'integer', example: 15 },
              inProgress: { type: 'integer', example: 30 },
              resolved: { type: 'integer', example: 80 },
              timeDistribution: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    date: { type: 'string', format: 'date' },
                    count: { type: 'integer' }
                  }
                }
              }
            }
          }
        }
      },
      PaginatedQueriesResponse: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          data: {
            type: 'object',
            properties: {
              queries: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', example: '60d5e3b0e39c521fa8e03620' },
                    user_id: { type: 'string', example: '60d5e3b0e39c521fa8e03618' },
                    prompt: { type: 'string' },
                    response: { type: 'string' },
                    status: {
                      type: 'string',
                      enum: ['pending', 'in_progress', 'resolved'],
                      example: 'resolved'
                    },
                    created_at: { type: 'string', format: 'date-time' },
                    updated_at: { type: 'string', format: 'date-time' }
                  }
                }
              },
              pagination: {
                type: 'object',
                properties: {
                  total: { type: 'integer', example: 125 },
                  page: { type: 'integer', example: 1 },
                  limit: { type: 'integer', example: 10 },
                  pages: { type: 'integer', example: 13 }
                }
              }
            }
          }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          status: {
            type: 'boolean',
            example: false,
            description: 'Operation status'
          },
          message: {
            type: 'string',
            example: 'Invalid credentials',
            description: 'Error message'
          },
          error: {
            type: 'object',
            properties: {
              code: { type: 'string', example: 'AUTH_FAILED' },
              details: { type: 'string', nullable: true }
            },
            description: 'Error details object'
          }
        }
      }
    }
  }
};