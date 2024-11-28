module.exports = {
    swcMinify: true,
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            buffer: false,
        };
        return config;
    },
    staticPageGenerationTimeout: 300, // Aumenta el tiempo de espera a 120 segundos
};
