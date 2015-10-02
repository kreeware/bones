import chrome from 'ui/chrome';
import 'angular-resource';
import bonesLogoUrl from 'plugins/bones/images/bones-icon-text.png';
import uiModules from 'ui/modules';

import './boneCollector';

// inject $ngResource into kibana's main module
uiModules.get('kibana', ['ngResource']);

chrome
.setBrand({
  'logo': 'url(' + bonesLogoUrl + ') left no-repeat',
  'smallLogo': 'url(' + bonesLogoUrl + ') left no-repeat',
})
.setRootTemplate(require('./bones.html'))
.setRootController('bones', function BonesController($http, $resource, $q) {
  const Bone = $resource('/api/bones/:id', { id: '@id' });

  this.createForm = {};
  this.each = Bone.query();

  this.create = () => {
    const { name } = this.createForm;
    this.createForm = {};

    const bone = new Bone({ name });
    this.each.push(bone);
    bone.$save();
  };
});
