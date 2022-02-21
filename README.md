# cats

## Vscode extensions

- editorconfig
- prettier
- eslint
- openapi

## Starting the application

First we need to create an external network with Docker. This is necessary for your service to see and be seen by other services.
Because of that it is important that your services have unique hostnames across the project.

```bash
docker network create services
```

Then you can copy the `.env.example` file to `.env` and fill the appropriate values.

The deployment is exactly the same as a nodejs deployment except you MUST run all commands through the node docker-compose container.
For example to install dependencies you run:

```bash
docker-compose run --rm node npm i
```

To start the project, install the dependencies and run

```bash
docker-compose up
```

### Windows errors

If when starting the database, the objects are not created and in the database logs you see `bad interpreter: /bin/bash`, switch the end of line character
from CRLF to LF. After that, run a `docker-compose down -v` followed by another `docker-compose up`

After that check the knex cli commands section to run the migrations. Note that you must run the migrations individually for each service by passing the correct knexfile.

## Knex cli commands

We provide the following knex commands.

```bash
docker-compose run --rm node npm run ts-knex # for typescript

docker-compose run --rm node npm run knex # for plain javascript
```

These commands accept the same options as knex commands, for example:

```bash
    docker-compose run --rm node npm run ts-knex -- --knexfile=my-knexfile.ts migrate:make -x ts migration-name # Create a migration in typescript

    docker-compose run --rm node npm run ts-knex -- --knexfile=my-knexfile.ts seed:make -x ts seed-name # Create a seed in typescript

    docker-compose run --rm node npm run ts-knex -- --knexfile=src/database/knexfile.ts migrate:latest # Run all migrations in typescript

    docker-compose run --rm node npm run ts-knex -- --knexfile=src/database/knexfile.ts migrate:rollback # Rollback a single migration in typescript

    docker-compose run --rm node npm run ts-knex -- --knexfile=src/database/knexfile.ts seed:run # Run all seeds in typescript

    docker-compose run --rm node npm run knex -- --knexfile=my-knexfile.js migrate:latest # Run all migrations in javascript

    docker-compose run --rm node npm run knex -- --knexfile=my-knexfile.js migrate:rollback # Rollback a single migration in javascript

    docker-compose run --rm node npm run knex -- --knexfile=my-knexfile.js seed:run # Run all seeds in javascript
```

It is important to not mix typescript and javascript commands. Always use typescript for development to avoid corrupt directory errors and so you can seed an run migrations in your tests.

## Running eslint

The command bellow will autofix every eslint/prettier problem in src files

```bash
docker-compose run --rm node npm run lint
```

## Commit

The project relies on commitlint to standardize its commit messages

To check if your commit follows the project rules, run `npx husky install` before commiting

## Openapi

Openapi docs are available at the openapi folder. You can see the docs by starting the containers using:

```bash
docker-compose -f docker-compose.swagger.yml up
```

After that go to `http://localhost:8081/swagger` and type `/swagger/api.yaml` in the explore input to see your docs. Changes to the docs are made in real-time.

### Validate docs

```bash
docker-compose -f docker-compose.swagger.yml run --rm swagger-tools swagger-cli validate api.yaml
```

### Generate bundle for production

```bash
docker-compose -f docker-compose.swagger.yml run --rm swagger-tools swagger-cli bundle -t yaml -o bundle.yaml api.yaml
```

## Versioning

This project uses standard-version to automate changelog and semver generations.

## Variables

### Standard Version

Thease are variables used to release standard version. They are used on the
release commit.

- `GIT_USER_NAME`: Name of the git user
- `GIT_USER_EMAIL`: Email of the git user

### Azure API Management (APIM)

These are variables to configure API Management deploy using an openapi spec and can
be removed in case your service is not an edge service.

If you enable the openapi release in the pipeline's release stage, you must fill these
variables.

- `APIM_API_DISPLAY_NAME`: Display name of the API on APIM. This follows the naming conventions.
- `APIM_API_ID`: Id of the API on APIM.
- `APIM_ID`: Id of the APIM instance
- `APIM_PATH`: Path of the API on APIM, must follow naming conventions.
- `APIM_RESOURCE_GROUP`: Resource group of the APIM instance.
- `APIM_SERVICE_URL`: URL of the ingres of your service, can be found in the helm chart.
- `APIM_SUBSCRIPTION_KEY_HEADER_NAME`: For subscription required APIs, sets API key header name. Use rdn-api-key.
- `APIM_SUBSCRIPTION_KEY_QUERY_PARAM_NAME`: For subscription required APIs, sets API key query param name. Use rdn-api-key.
- `APIM_SUBSCRIPTION_REQUIRED`: Set this to true if your API must be protected by an API key.
- `AZ_CLIENT_ID`: App registration id. This app must have contributor permission on APIM.
- `AZ_CLIENT_SECRET`: App registration password.
- `AZ_CLIENT_SECRET`: App registration password.
- `AZ_TENANT`: Tenant of the APIM instance.
- `OPENAPI_FILE_PATH`: Location of the main openapi file.

### Container Registry

`DOCKER_FILE_PATH`: Path of the dockerfile to build.
`DOCKER_IMAGE_REPO`: Name of the repository on the registry.
`DOCKER_REGISTRY`: Name of the registry.
`DOCKER_REGISTRY_SERVICE_CONNECTION`: Service connection to connect to the Azure.

### Azure Kubernetes Services (AKS)

- `HELM_CHART_NAME`: Name of the helm chart.
- `HELM_VALUES_FILE`: Values files to use.
- `TARGET_AKS_ENVIRONMENT`: Name of the AKS cluster to deploy.
- `TARGET_AKS_NAMESPACE`: Namespace of the AKS cluster to deploy.
- `TARGET_AKS_SERVICE_CONNECTION`: Service connection
- `DOCKER_IMAGE_PULLSECRET`: Image pull secret, to pull from the registry on AKS
