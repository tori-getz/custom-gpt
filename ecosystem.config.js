module.exports = {
  apps: [
    // docker compose
    {
      name: 'docker-services',
      script: 'docker compose up',
    },

    // shared lib watch
    {
      name: 'shared-lib',
      script: 'yarn workspace @app/shared watch',
    },

    // microservices watch
    {
      name: 'services',
      script: 'lerna run dev --stream',
    },
  ]
}
