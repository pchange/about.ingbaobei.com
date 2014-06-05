module.exports = function(grunt) {

  grunt.initConfig({

    concat: {
      build: {
        src: ['./@/js/jquery.min.js', './@/js/jquery-ui.min.js', './@/js/jquery.fullPage.min.js', './@/js/qing-app.js'],
        dest: './@/js/about.ingbaobei.com.js'
      }
    },
    uglify: {
      build: {
        src: ['./@/js/about.ingbaobei.com.js'],
        dest: './@/js/about.ingbaobei.com.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat', 'uglify']);

};