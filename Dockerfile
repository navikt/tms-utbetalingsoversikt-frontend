FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim@sha256:8b0b8c0d78166534d392bfb670f96fa6d443cec16169481788aa1ed27dfc4a7d

WORKDIR usr/src/app
COPY ./dist ./dist
COPY ./node_modules ./node_modules

ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["./dist/server/entry.mjs"]

EXPOSE $PORT
