module.exports = {
    swcMinify: true,
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            buffer: false,
        };
        return config;
    },
    staticPageGenerationTimeout: 1000, // Aumenta el tiempo de espera a 120 segundos
};
