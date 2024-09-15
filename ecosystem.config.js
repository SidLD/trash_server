module.exports = {
    apps: [
      {
        name: 'my-express-app', // Name of the application
        script: './index.ts', // Path to your main file (update accordingly)
        instances: 'max', // Number of instances to run (use 'max' for cluster mode)
        exec_mode: 'cluster', // Use cluster mode to take advantage of multi-core systems
        watch: true, // Watch for file changes and restart the app
        env: {
          NODE_ENV: 'development',
          PORT: 8888,
          // Add other environment variables here
        },
        env_production: {
          NODE_ENV: 'production',
          PORT: 8888,
          // Add other environment variables for production
        },
      },
    ],
  };
  