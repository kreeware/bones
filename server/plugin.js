export default ({ Plugin }) => new Plugin({
  require: [ 'kibana', 'elasticsearch' ],
  init: require('./init.js'),
  uiExports: {
    app: {
      title: 'Bones',
      description: 'Just a pile o\' bones',
      icon: 'plugins/bones/images/bones.svg',
      main: 'plugins/bones/bones',
      injectVars(server) {
        const config = server.config();
        return {
          kbnIndex: config.get('kibana.index'),
          esShardTimeout: config.get('elasticsearch.shardTimeout'),
          esApiVersion: config.get('elasticsearch.apiVersion'),
        };
      },
    },
  },
});
