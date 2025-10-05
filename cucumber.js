module.exports = {
  default: {
    require: [
      'features/support/world.js',
      'features/support/hooks.js',
      'features/step_definitions/**/*.js'
    ],
    publishQuiet: true,
    // Do not hardcode paths; allow CLI args to select features
  }
};
