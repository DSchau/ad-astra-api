FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install --production

COPY index.ts .
COPY api api
COPY lib lib
COPY tsconfig.json .
# COPY public public

ENV NODE_ENV production
CMD ["bun", "start"]

EXPOSE 3000 8080
