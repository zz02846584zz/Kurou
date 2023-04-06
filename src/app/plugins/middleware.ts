import FastifyCompress from '@fastify/compress'
import FastifyFormbody from '@fastify/formbody'
import FastifyHelmet from '@fastify/helmet'
import FastifyMultipart from '@fastify/multipart'
import FastifyRateLimit from '@fastify/rate-limit'
import fastifySensible from '@fastify/sensible'
import FastifyStatic from '@fastify/static'
import FastifyPlugin from 'fastify-plugin'

const LIMIT =  {
  REQUEST: {
    NUMBER: 1000,
    TIME_RANGE: '1 second'
  },
  UPLOAD: {
    SIZE: 102400000
  }
}

async function loadMiddleWares (fastify, opts) {
  fastify.register(FastifyFormbody)
  fastify.register(FastifyHelmet, { contentSecurityPolicy: false })
  fastify.register(FastifyMultipart, { limits: { fileSize: LIMIT.UPLOAD.SIZE } })
  fastify.register(FastifyCompress, { threshold: 1024 })
  fastify.register(FastifyRateLimit, { max: LIMIT.REQUEST.NUMBER, timeWindow: LIMIT.REQUEST.TIME_RANGE })
  fastify.register(FastifyStatic, { limits: {}})
  fastify.register(fastifySensible);
}

module.exports = FastifyPlugin(loadMiddleWares)
