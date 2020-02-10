define({ "api": [
  {
    "type": "post",
    "url": "/auth",
    "title": "Login",
    "group": "Authentication",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>object with login password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"login\": \"admin\",\n    \"password\": \"admin\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNTgxMzI1NzYwfQ.iRLzWvxs2U_go5iKTiDu2gis9p0tbiH8F_aOtl32vxI\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"message\": \"Invalid login or password\",\n    \"user\": false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/AuthController.js",
    "groupTitle": "Authentication",
    "name": "PostAuth"
  },
  {
    "type": "delete",
    "url": "/import-request/:id",
    "title": "deleteImportRequest",
    "group": "ImportRequest",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer JWT</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Invalid token\",\n    \"user\": false\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"errors\": \"CastError: Cast to ObjectId failed for value \\\"1\\\" at path \\\"_id\\\" for model \\\"ImportRequest\\\"\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/ImportRequestsController.js",
    "groupTitle": "ImportRequest",
    "name": "DeleteImportRequestId"
  },
  {
    "type": "get",
    "url": "/import-request",
    "title": "getAllImportRequest",
    "group": "ImportRequest",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "search",
            "description": "<p>search string</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "order",
            "description": "<p>order direction 'asc' or 'desc'</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "orderBy",
            "description": "<p>order by field. email, phone, olxAccountUrl, status, requestedAt</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer JWT</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"success\",\n     \"items\": [\n     {\n         \"_id\": \"5e33f3024b180800249037cd\",\n         \"email\": \"rus@mail.com\",\n         \"olxAccountUrl\": \"https://ruslanif.olx.ua/\",\n         \"phone\": \"+380980900367\",\n         \"status\": \"NEW\",\n         \"requestedAt\": \"2020-01-31T09:27:30.112Z\",\n         \"__v\": 0\n     },\n     {\n         \"_id\": \"5e33f35d4b180800249037ce\",\n         \"email\": \"euro@test.com\",\n         \"olxAccountUrl\": \"https://europedivan.olx.ua/shop/\",\n         \"phone\": \"0969382848\",\n         \"status\": \"DONE\",\n         \"requestedAt\": \"2020-01-31T09:29:01.712Z\",\n         \"__v\": 0\n     },\n     ],\n     \"total\": 10\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Invalid token\",\n    \"user\": false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/ImportRequestsController.js",
    "groupTitle": "ImportRequest",
    "name": "GetImportRequest"
  },
  {
    "type": "get",
    "url": "/import-request/:id",
    "title": "getImportRequest",
    "group": "ImportRequest",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer JWT</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"success\",\n     \"item\": {\n         \"_id\": \"5e33f3024b180800249037cd\",\n         \"email\": \"rus@mail.com\",\n         \"olxAccountUrl\": \"https://ruslanif.olx.ua/\",\n         \"phone\": \"+380980900367\",\n         \"status\": \"NEW\",\n         \"requestedAt\": \"2020-01-31T09:27:30.112Z\",\n         \"__v\": 0\n         }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Invalid token\",\n    \"user\": false\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n     \"status\": 404,\n     \"errors\": \"Not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/ImportRequestsController.js",
    "groupTitle": "ImportRequest",
    "name": "GetImportRequestId"
  },
  {
    "type": "post",
    "url": "/import-request",
    "title": "createImportRequest",
    "group": "ImportRequest",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "olxAccountUrl",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"email\": \"test@test.com\",\n    \"phone\": \"322223322\",\n    \"olxAccountUrl\": \"http://olx.ua/1/2/3/4\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer JWT</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Invalid token\",\n    \"user\": false\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 500,\n    \"errors\": \"Invalid params\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/ImportRequestsController.js",
    "groupTitle": "ImportRequest",
    "name": "PostImportRequest"
  },
  {
    "type": "put",
    "url": "/import-request",
    "title": "updateImportRequest",
    "group": "ImportRequest",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>import request ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "olxAccountUrl",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"_id\": \"5e412380ea93af05d584bb2b\",\n    \"email\": \"test@test.com\",\n    \"phone\": \"322223322\",\n    \"olxAccountUrl\": \"http://olx.ua/1/2/3/4\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer JWT</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Invalid token\",\n    \"user\": false\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 500,\n    \"errors\": \"Invalid params\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"errors\": \"CastError: Cast to ObjectId failed for value \\\"1\\\" at path \\\"_id\\\" for model \\\"ImportRequest\\\"\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/ImportRequestsController.js",
    "groupTitle": "ImportRequest",
    "name": "PutImportRequest"
  },
  {
    "type": "put",
    "url": "/import-request/status",
    "title": "updateImportRequestStatus",
    "group": "ImportRequest",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>import request ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>import request status. Can be one of NEW, PENDING, IN_PROGRESS, DONE, ERROR</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"id\": \"5e412380ea93af05d584bb2b\",\n    \"status\": \"DONE\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer JWT</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Invalid token\",\n    \"user\": false\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 500,\n    \"errors\": \"Invalid params\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"errors\": \"CastError: Cast to ObjectId failed for value \\\"1\\\" at path \\\"_id\\\" for model \\\"ImportRequest\\\"\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/ImportRequestsController.js",
    "groupTitle": "ImportRequest",
    "name": "PutImportRequestStatus"
  }
] });
