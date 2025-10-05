module.exports = {
  default: {
    require: [
      'features/support/world.js',
      'features/support/hooks.js',
      'features/step_definitions/**/*.js'
    ],
    publishQuiet: true,
    paths: ['features/**/*.feature']
  }
};
