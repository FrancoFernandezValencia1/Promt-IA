module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Minifica CSS en producción
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
};
