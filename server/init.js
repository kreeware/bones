import Boom from 'boom';

export default function bonesInit(server) {
  let idCounter = 0;
  const tasks = new Map();

  server.route({
    path: '/api/bones/{id?}',
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    handler: (req, reply) => {
      switch (req.method) {
      case 'post':
        {
          const id = idCounter++;
          const { name } = req.payload || {};
          const task = { id, name };
          tasks.set(`${id}`, task);
          reply(task).created(201);
        }
        break;

      case 'put':
        {
          const { id } = req.params;
          const { name } = req.payload || {};
          if (!tasks.has(id)) {
            reply(Boom.notFound());
          } else {
            const task = tasks.get(id);
            task.name = name;
            reply(task).code(200);
          }
        }
        break;

      case 'delete':
        {
          const { id } = req.params;
          if (!tasks.has(id)) {
            reply(Boom.notFound());
          } else {
            tasks.delete(id);
            reply('delete').code(200);
          }
        }
        break;

      case 'get':
      default:
        {
          const { id = null } = req.params;
          if (id === null) {
            reply([...tasks.values()]);
          } else if (tasks.has(id)) {
            reply(tasks.get(id));
          } else {
            reply(Boom.notFound());
          }
        }
        break;

      }
    },
  });
}
