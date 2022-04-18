# node-architecture <img src="https://www.vectorlogo.zone/logos/nodejs/nodejs-horizontal.svg">

Base Architecture for projects in Node JS based in Clean Architecture using Express and Inversify

### Folder structure

```
└ application                   → Application services layer
    └ services                  → Application business rules
└ domain                        → Enterprise core business layer such as domain model objects (Aggregates, Entities, Value Objects) and repository interfaces
└ infrastructure                → Frameworks, drivers and tools such as Database, the Web Framework, mailing/logging/glue code etc.
    └ config                    → Application configuration files, modules and services
        └ container.js          → Module that manage service implementations by environment
    └ database                  → Database ORMs middleware
        └ schemas               → Mongoose schemas
    └ repositories              → Implementation of domain repository interfaces
    └ webserver                 → Restify Web server configuration (server, routes, plugins, etc.)
        └ server.js             → Restify server definition
└ ports/http                    → Adapters and formatters for use cases and entities to external agency such as Database or the Web
    └ UserController.js         → Restify route handlers
    └ routes.js                 → Restify route definitions
    └ errors.js                 → Standard errors for the whole application
 └ index.js                     → Main application entry point
```

### The Dependency Rule
.prettierrc → Para que los editores y otras herramientas sepan que se está usando Prettier.
.prettierignore  → Para que la CLI de Prettier y los editores sepan qué archivos no formatear.