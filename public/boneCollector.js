import uiModules from 'ui/modules';

uiModules
.get('plugin/bones')
.directive('boneCollector', function () {
  return {
    restrict: 'E',
    link: function () {
      console.log('collecting');
    },
  };
});
