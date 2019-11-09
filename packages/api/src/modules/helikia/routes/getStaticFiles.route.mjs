import path from 'path';

export default {
  method: 'GET',
  path: '/{path*}',
  handler(request, reply) {
    reply.file('../../../../../../public/index.html');
  },
};
