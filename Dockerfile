FROM gcr.io/distroless/nodejs20-debian12

WORKDIR usr/src/app
COPY . .

ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["./dist/server/entry.mjs"]

EXPOSE $PORT
