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
    "filename": "./src/controllers/AuthController.js",
    "groupTitle": "Authentication",
    "name": "PostAuth"
  },
  {
    "type": "post",
    "url": "/export/yandex-market",
    "title": "exportAsYandexMarket",
    "group": "Export",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "importRequestId",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "offersIds",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     \"importRequestId\":\"5e3d5113669ecc3dcd489823\",\n     \"offersIds\":[\n         \"5e3e931423e2900e0422a96e\",\n         \"5e3e931423e2900e0422a96f\"\n     ]\n}",
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
          "content": "HTTP/1.1 200 OK\n<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n    <yml_catalog date=\"2020-02-10 11:55\">\n        <shop>\n            <name>7@test.com</name>\n            <company>0678106485</company>\n            <url>https://www.olx.ua/list/user/5rd2K/</url>\n            <currencies>\n                <currency id=\"USD\" rate=\"СВ\"/>\n                <currency id=\"UAH\" rate=\"1\"/>\n                <currency id=\"EUR\" rate=\"СВ\"/>\n                </currencies>\n                <delivery-options/>\n                <categories>\n                    <category id=\"1\">Объявление Узин</category>\n                    <category id=\"2\" parentId=\"1\">Электроника Узин</category>\n                    <category id=\"3\" parentId=\"2\">Аудиотехника Узин</category>\n                    <category id=\"4\" parentId=\"3\">Акустические системы Узин</category>\n                    <category id=\"5\" parentId=\"3\">Магнитолы Узин</category>\n                </categories>\n                <offers>\n                    <offer id=\"5e3e931423e2900e0422\" available=\"true\">\n                         <url>https://www.olx.ua/obyavlenie/akustika-rft-IDGYNeE.html?sd=1#dcfb000ef3</url>\n                         <price>2800</price>\n                         <currencyId>UAH</currencyId>\n                         <categoryId>4</categoryId>\n                         <name>Aкустика RFT</name>\n                         <description>\n                             <![CDATA[Акустика RFT. Полностью рабочая. В очень хорошем состоянии. Позже добавлю описание.]]>\n                         </description>\n                         <param name=\"Объявление от\">Бизнес</param>\n                         <param name=\"Вид аудиотехники\">Акустические системы</param>\n                         <param name=\"Состояние\">Б/у</param>\n                         <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/akustika-rft-IDGYNeE/0.jpg</picture>\n                         <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/akustika-rft-IDGYNeE/1.jpg</picture>\n                         <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/akustika-rft-IDGYNeE/2.jpg</picture>\n                         <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/akustika-rft-IDGYNeE/3.jpg</picture>\n                         <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/akustika-rft-IDGYNeE/4.jpg</picture>\n                         <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/akustika-rft-IDGYNeE/5.jpg</picture>\n                         <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/akustika-rft-IDGYNeE/6.jpg</picture>\n                  </offer>\n                  <offer id=\"5e3e931423e2900e0422\" available=\"true\">\n                      <url>https://www.olx.ua/obyavlenie/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs.html#dcfb000ef3;promoted</url>\n                      <price>3900</price>\n                      <currencyId>USD</currencyId>\n                      <categoryId>5</categoryId>\n                      <name>Бобинный магнитофон Dokorder 1140 (19, 38 скорость)</name>\n                      <description>\n                          <![CDATA[Топовая модель от фирмы Denki  Onkyo. Состояние головок как новые. Полностью рабочий аппарат в идеальном состоянии. В Гугле очень много информации о данной модели. По записи и воспроизведении многим моделям с более высоким ценником даст фору.]]>\n                      </description>\n                      <param name=\"Объявление от\">Бизнес</param>\n                      <param name=\"Вид аудиотехники\">Магнитолы</param>\n                      <param name=\"Состояние\">Б/у</param>\n                      <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/0.jpg</picture>\n                      <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/1.jpg</picture>\n                      <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/2.jpg</picture>\n                      <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/3.jpg</picture>\n                      <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/4.jpg</picture>\n                      <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/5.jpg</picture>\n                      <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/6.jpg</picture>\n                      <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/7.jpg</picture>\n                  </offer>\n              </offers>\n          </shop>\n</yml_catalog>",
          "type": "xml"
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
    "filename": "./src/controllers/ExportController.js",
    "groupTitle": "Export",
    "name": "PostExportYandexMarket"
  },
  {
    "type": "delete",
    "url": "/headings/:id",
    "title": "deleteHeading",
    "group": "Headings",
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
        }
      ]
    },
    "filename": "./src/controllers/HeadingController.js",
    "groupTitle": "Headings",
    "name": "DeleteHeadingsId"
  },
  {
    "type": "get",
    "url": "/headings",
    "title": "getAllHeadings",
    "group": "Headings",
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
            "description": "<p>order by field. id, name, createdAt</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"success\",\n     \"items\": [\n     {\n         \"_id\": 0,\n         \"heading\": \"test/test1/test333\",\n         \"createdAt\": \"2020-02-13T09:55:20.541Z\",\n         \"__v\": 0\n     },\n     {\n         \"_id\": 1,\n         \"heading\": \"test/test1/test22343\",\n         \"createdAt\": \"2020-02-13T09:55:56.949Z\",\n         \"__v\": 0\n     }\n     ],\n     \"total\": 2\n}",
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
    "filename": "./src/controllers/HeadingController.js",
    "groupTitle": "Headings",
    "name": "GetHeadings"
  },
  {
    "type": "get",
    "url": "/headings/:id",
    "title": "getHeading",
    "group": "Headings",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"success\",\n     \"item\": {\n         \"_id\": 1,\n         \"heading\": \"test/test1/test22343\",\n         \"createdAt\": \"2020-02-13T09:55:56.949Z\",\n         \"__v\": 0\n     }\n}",
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
    "filename": "./src/controllers/HeadingController.js",
    "groupTitle": "Headings",
    "name": "GetHeadingsId"
  },
  {
    "type": "post",
    "url": "/headings",
    "title": "createHeading",
    "group": "Headings",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "heading",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     \"heading\": \"test/test1/test3\"\n}",
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
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 400,\n    \"errors\": \"Invalid params\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 400,\n    \"errors\": \"Heading already exists!!!\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/controllers/HeadingController.js",
    "groupTitle": "Headings",
    "name": "PostHeadings"
  },
  {
    "type": "post",
    "url": "/headings/:id",
    "title": "updateHeading",
    "group": "Headings",
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
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "heading",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     \"heading\": \"test/test1/test322\"\n}",
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
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 400,\n    \"errors\": \"Invalid params\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 400,\n    \"errors\": \"Heading already exists!!!\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/controllers/HeadingController.js",
    "groupTitle": "Headings",
    "name": "PostHeadingsId"
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
    "filename": "./src/controllers/ImportRequestsController.js",
    "groupTitle": "ImportRequest",
    "name": "DeleteImportRequestId"
  },
  {
    "type": "delete",
    "url": "/import-request/:id/offers",
    "title": "deleteImportRequestOffers",
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
    "filename": "./src/controllers/ImportRequestsController.js",
    "groupTitle": "ImportRequest",
    "name": "DeleteImportRequestIdOffers"
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
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "filter",
            "description": "<p>filtering by import or processed dates. 'all', 'hour_requested', 'day_requested', 'month_requested', 'hour_processed', 'day_processed', 'month_processed'</p>"
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
    "filename": "./src/controllers/ImportRequestsController.js",
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
    "filename": "./src/controllers/ImportRequestsController.js",
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
            "description": "<p>Format XXXXXXXXXX (0933222332)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "olxAccountUrl",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"email\": \"test@test.com\",\n    \"phone\": \"322223322\",\n    \"olxAccountUrl\": \"http://olx.ua/1/2/3/4\",\n    \"userId\": \"22\"\n}",
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
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 400,\n    \"errors\": \"Invalid params\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/controllers/ImportRequestsController.js",
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
            "description": "<p>Format XXXXXXXXXX (0933222332)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "olxAccountUrl",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"_id\": \"5e412380ea93af05d584bb2b\",\n    \"email\": \"test@test.com\",\n    \"phone\": \"322223322\",\n    \"olxAccountUrl\": \"http://olx.ua/1/2/3/4\",\n    \"userId\": \"22\"\n}",
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
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 400,\n    \"errors\": \"Invalid params\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"errors\": \"CastError: Cast to ObjectId failed for value \\\"1\\\" at path \\\"_id\\\" for model \\\"ImportRequest\\\"\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/controllers/ImportRequestsController.js",
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
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "errorMessage",
            "description": ""
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
    "filename": "./src/controllers/ImportRequestsController.js",
    "groupTitle": "ImportRequest",
    "name": "PutImportRequestStatus"
  },
  {
    "type": "delete",
    "url": "/offers/offer/:id",
    "title": "deleteOffer",
    "group": "Offers",
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
    "filename": "./src/controllers/OffersController.js",
    "groupTitle": "Offers",
    "name": "DeleteOffersOfferId"
  },
  {
    "type": "get",
    "url": "/offers/:importRequestId",
    "title": "getAllOffers",
    "group": "Offers",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "importRequestId",
            "description": ""
          },
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
            "description": "<p>order by field. description, phone, title, url, createdAt, importRequestId</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"items\": [\n{\n     \"heading\": [\n         \"Объявление Любомль\",\n         \"Запчасти для транспорта Любомль\",\n         \"Автозапчасти и аксессуары Любомль\",\n         \"Автозапчасти Любомль\"\n     ],\n     \"details\": [\n         {\n             \"measure\": \"Объявление от\",\n             \"value\": \"Частного лица\"\n         },\n         {\n             \"measure\": \"Тип запчасти / аксессуара\",\n             \"value\": \"Автозапчасти\"\n         },\n         {\n             \"measure\": \"Состояние\",\n             \"value\": \"Б/у\"\n         },\n         {\n             \"measure\": \"Вид запчасти\",\n             \"value\": \"Кузовные детали\"\n         }\n     ],\n     \"images\": [\n         \"http://192.168.2.50/qweqdqdqe134234123/134234-23423-rdsd-w-rfwerr/1.jpg\",\n         \"http://192.168.2.50/qweqdqdqe134234123/134234-23423-rdsd-w-rfwerr/1.jpg\",\n         \"http://192.168.2.50/qweqdqdqe134234123/134234-23423-rdsd-w-rfwerr/1.jpg\",\n         \"http://192.168.2.50/qweqdqdqe134234123/134234-23423-rdsd-w-rfwerr/1.jpg\",\n         \"http://192.168.2.50/qweqdqdqe134234123/134234-23423-rdsd-w-rfwerr/1.jpg\"\n     ],\n     \"srcImages\": [\n         \"https://apollo-ireland.akamaized.net:443/v1/files/knvcp49p86y42-UA/image;s=644x461\",\n         \"https://apollo-ireland.akamaized.net:443/v1/files/xxk3kdbfi9rg2-UA/image;s=644x461\",\n         \"https://apollo-ireland.akamaized.net:443/v1/files/s7hfrs49firi2-UA/image;s=644x461\",\n         \"https://apollo-ireland.akamaized.net:443/v1/files/mh5100g3hc0b2-UA/image;s=644x461\",\n         \"https://apollo-ireland.akamaized.net:443/v1/files/7nnjq46xde3y-UA/image;s=644x461\"\n     ],\n     \"_id\": \"5e33e43c53ee0c235830424a\",\n     \"description\": \"В наличиї есть все запчастини по Audi Q7.\\nДетальна информация по тел.  688 - Показать номер -\",\n     \"phone\": \"380 688 282085\",\n     \"price\": {\n         \"amount\": \"15 000\",\n         \"volume\": \"грн.\"\n     },\n     \"title\": \"Морда, фары, капот, дверіAudi Q7 запчасти\",\n     \"url\": \"https://www.olx.ua/obyavlenie/morda-fary-kapot-dveraudi-q7-zapchasti-IDFCo4r.html?sd=1#e644acc915\",\n     \"importRequestId\": \"5e33f3fc4b180800249037d0\",\n     \"createdAt\": \"2020-01-31T08:24:28.246Z\",\n     \"__v\": 0\n},\n.....\n],\n\"total\": 15\n}",
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
          "content": "HTTP/1.1 404 Not Found\n{\n     \"status\": 404,\n     \"errors\": \"Resource not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/controllers/OffersController.js",
    "groupTitle": "Offers",
    "name": "GetOffersImportrequestid"
  },
  {
    "type": "get",
    "url": "/offers/offer/:id",
    "title": "getOffer",
    "group": "Offers",
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
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"item\":\n{\n     \"heading\": [\n         \"Объявление Любомль\",\n         \"Запчасти для транспорта Любомль\",\n         \"Автозапчасти и аксессуары Любомль\",\n         \"Автозапчасти Любомль\"\n     ],\n     \"details\": [\n         {\n             \"measure\": \"Объявление от\",\n             \"value\": \"Частного лица\"\n         },\n         {\n             \"measure\": \"Тип запчасти / аксессуара\",\n             \"value\": \"Автозапчасти\"\n         },\n         {\n             \"measure\": \"Состояние\",\n             \"value\": \"Б/у\"\n         },\n         {\n             \"measure\": \"Вид запчасти\",\n             \"value\": \"Кузовные детали\"\n         }\n     ],\n     \"images\": [\n         \"http://192.168.2.50/qweqdqdqe134234123/134234-23423-rdsd-w-rfwerr/1.jpg\",\n         \"http://192.168.2.50/qweqdqdqe134234123/134234-23423-rdsd-w-rfwerr/1.jpg\",\n         \"http://192.168.2.50/qweqdqdqe134234123/134234-23423-rdsd-w-rfwerr/1.jpg\",\n         \"http://192.168.2.50/qweqdqdqe134234123/134234-23423-rdsd-w-rfwerr/1.jpg\",\n         \"http://192.168.2.50/qweqdqdqe134234123/134234-23423-rdsd-w-rfwerr/1.jpg\"\n     ],\n     \"srcImages\": [\n         \"https://apollo-ireland.akamaized.net:443/v1/files/knvcp49p86y42-UA/image;s=644x461\",\n         \"https://apollo-ireland.akamaized.net:443/v1/files/xxk3kdbfi9rg2-UA/image;s=644x461\",\n         \"https://apollo-ireland.akamaized.net:443/v1/files/s7hfrs49firi2-UA/image;s=644x461\",\n         \"https://apollo-ireland.akamaized.net:443/v1/files/mh5100g3hc0b2-UA/image;s=644x461\",\n         \"https://apollo-ireland.akamaized.net:443/v1/files/7nnjq46xde3y-UA/image;s=644x461\"\n     ],\n     \"_id\": \"5e33e43c53ee0c235830424a\",\n     \"description\": \"В наличиї есть все запчастини по Audi Q7.\\nДетальна информация по тел.  688 - Показать номер -\",\n     \"phone\": \"380 688 282085\",\n     \"price\": {\n         \"amount\": \"15 000\",\n         \"volume\": \"грн.\"\n     },\n     \"title\": \"Морда, фары, капот, дверіAudi Q7 запчасти\",\n     \"url\": \"https://www.olx.ua/obyavlenie/morda-fary-kapot-dveraudi-q7-zapchasti-IDFCo4r.html?sd=1#e644acc915\",\n     \"importRequestId\": \"5e33f3fc4b180800249037d0\",\n     \"createdAt\": \"2020-01-31T08:24:28.246Z\",\n     \"__v\": 0\n}\n}",
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
          "content": "HTTP/1.1 404 Not Found\n{\n     \"status\": 404,\n     \"errors\": \"Resource not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/controllers/OffersController.js",
    "groupTitle": "Offers",
    "name": "GetOffersOfferId"
  },
  {
    "type": "post",
    "url": "/offers",
    "title": "createOffer",
    "group": "Offers",
    "version": "1.0.0",
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
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     \"heading\":[\n         \"Объявление Узин\",\n         \"Электроника Узин\",\n         \"Аудиотехника Узин\",\n         \"Магнитолы Узин\"\n     ],\n     \"url\":\"https://www.olx.ua/obyavlenie/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs.html#dcfb000ef3;promoted\",\n     \"title\":\"Бобинный магнитофон Dokorder 1140 (19, 38 скорость)\",\n     \"price\":{\n         \"amount\":\"3900\",\n         \"volume\":\"$\"\n     },\n     \"description\":\"Топовая модель от фирмы Denki  Onkyo. Состояние головок как новые. Полностью рабочий аппарат в идеальном состоянии.\n             В Гугле очень много информации о данной модели. По записи и воспроизведении многим моделям с более высоким ценником даст фору.\",\n     \"importRequestId\":\"5e3d5113669ecc3dcd489823\",\n     \"images\":[\n         \"http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/0.jpg\",\n         \"http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/1.jpg\",\n         \"http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/2.jpg\",\n         \"http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/3.jpg\",\n         \"http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/4.jpg\",\n         \"http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/5.jpg\",\n         \"http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/6.jpg\",\n          \"http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/7.jpg\"\n     ],\n     \"srcImages\": [\n         \"https://apollo-ireland.akamaized.net:443/v1/files/5hk0vi4qdstv-UA/image;s=644x461\",\n         \"https://apollo-ireland.akamaized.net:443/v1/files/w6m0hm7qlb0o1-UA/image;s=644x461\",\n         \"https://apollo-ireland.akamaized.net:443/v1/files/rm8jemxtpfzd-UA/image;s=644x461\",\n         \"https://apollo-ireland.akamaized.net:443/v1/files/40pacxt1q4gl3-UA/image;s=644x461\",\n         \"https://apollo-ireland.akamaized.net:443/v1/files/2b2gnzyekowc3-UA/image;s=644x461\",\n         \"https://apollo-ireland.akamaized.net:443/v1/files/26hxjiwna67v1-UA/image;s=644x461\",\n         \"https://apollo-ireland.akamaized.net:443/v1/files/cbb6thpmrk8i1-UA/image;s=644x461\",\n         \"https://apollo-ireland.akamaized.net:443/v1/files/e6hwy3g6ujje3-UA/image;s=644x461\"\n     ],\n     \"details\":[\n         {\n             \"measure\":\"Объявление от\",\n             \"value\":\"Бизнес\"\n         },\n         {\n             \"measure\":\"Вид аудиотехники\",\n             \"value\":\"Магнитолы\"\n         },\n         {\n             \"measure\":\"Состояние\",\n             \"value\":\"Б/у\"\n         }\n     ],\n     \"createdAt\":\"2020-02-08T10:53:08.606Z\",\n     \"_id\":\"5e3e931423e2900e0422a96f\"\n}",
          "type": "json"
        }
      ]
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
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 400,\n    \"errors\": \"Invalid params\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"errors\": \"CastError: Cast to ObjectId failed for value \\\"1\\\" at path \\\"_id\\\" for model \\\"OFFERS\\\"\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/controllers/OffersController.js",
    "groupTitle": "Offers",
    "name": "PostOffers"
  },
  {
    "type": "put",
    "url": "/offers/heading",
    "title": "setOffersHeading",
    "group": "Offers",
    "version": "1.0.0",
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
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     offers: [\n         '5e47189561d5c706ea214d21',\n         '5e47189561d5c706ea214d22'\n     ],\n     heading: {\n         value: 13,\n         option: 'Запчасти для транспорта/Шины, диски и колёса/Колеса в сборе'\n     }\n}",
          "type": "json"
        }
      ]
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
    "filename": "./src/controllers/OffersController.js",
    "groupTitle": "Offers",
    "name": "PutOffersHeading"
  },
  {
    "type": "put",
    "url": "/offers/offer",
    "title": "updateOffer",
    "group": "Offers",
    "version": "1.0.0",
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
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     _id: \"234234aqrlk309e00err\",\n     \"heading\":[\n         \"Объявление Узин\",\n         \"Электроника Узин\",\n         \"Аудиотехника Узин\",\n         \"Магнитолы Узин\"\n     ],\n     \"url\":\"https://www.olx.ua/obyavlenie/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs.html#dcfb000ef3;promoted\",\n     \"title\":\"Бобинный магнитофон Dokorder 1140 (19, 38 скорость)\",\n     \"price\":{\n         \"amount\":\"3900\",\n         \"volume\":\"$\"\n     },\n     \"description\":\"Топовая модель от фирмы Denki  Onkyo. Состояние головок как новые. Полностью рабочий аппарат в идеальном состоянии.\n             В Гугле очень много информации о данной модели. По записи и воспроизведении многим моделям с более высоким ценником даст фору.\",\n     \"importRequestId\":\"5e3d5113669ecc3dcd489823\",\n     \"images\":[\n         \"http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/0.jpg\",\n         \"http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/1.jpg\",\n         \"http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/2.jpg\",\n         \"http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/3.jpg\",\n         \"http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/4.jpg\",\n         \"http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/5.jpg\",\n         \"http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/6.jpg\",\n          \"http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/7.jpg\"\n     ],\n     \"srcImages\": [\n         \"https://apollo-ireland.akamaized.net:443/v1/files/5hk0vi4qdstv-UA/image;s=644x461\",\n         \"https://apollo-ireland.akamaized.net:443/v1/files/w6m0hm7qlb0o1-UA/image;s=644x461\",\n         \"https://apollo-ireland.akamaized.net:443/v1/files/rm8jemxtpfzd-UA/image;s=644x461\",\n         \"https://apollo-ireland.akamaized.net:443/v1/files/40pacxt1q4gl3-UA/image;s=644x461\",\n         \"https://apollo-ireland.akamaized.net:443/v1/files/2b2gnzyekowc3-UA/image;s=644x461\",\n         \"https://apollo-ireland.akamaized.net:443/v1/files/26hxjiwna67v1-UA/image;s=644x461\",\n         \"https://apollo-ireland.akamaized.net:443/v1/files/cbb6thpmrk8i1-UA/image;s=644x461\",\n         \"https://apollo-ireland.akamaized.net:443/v1/files/e6hwy3g6ujje3-UA/image;s=644x461\"\n     ],\n     \"details\":[\n         {\n             \"measure\":\"Объявление от\",\n             \"value\":\"Бизнес\"\n         },\n         {\n             \"measure\":\"Вид аудиотехники\",\n             \"value\":\"Магнитолы\"\n         },\n         {\n             \"measure\":\"Состояние\",\n             \"value\":\"Б/у\"\n         }\n     ],\n     \"createdAt\":\"2020-02-08T10:53:08.606Z\",\n     \"_id\":\"5e3e931423e2900e0422a96f\"\n}",
          "type": "json"
        }
      ]
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
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"errors\": \"CastError: Cast to ObjectId failed for value \\\"1\\\" at path \\\"_id\\\" for model \\\"OFFERS\\\"\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/controllers/OffersController.js",
    "groupTitle": "Offers",
    "name": "PutOffersOffer"
  }
] });
