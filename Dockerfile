FROM node:20-alpine AS frontend-build
WORKDIR /app/TODO/todo_frontend

COPY TODO/todo_frontend/package*.json ./
RUN npm install

COPY TODO/todo_frontend/ ./
RUN npm run build


FROM node:20-alpine AS backend-build
WORKDIR /app/TODO/todo_backend

COPY TODO/todo_backend/package*.json ./
RUN npm install --omit=dev

COPY TODO/todo_backend/ ./


FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

COPY --from=backend-build /app/TODO/todo_backend ./TODO/todo_backend
RUN mkdir -p /app/TODO/todo_backend/static
COPY --from=frontend-build /app/TODO/todo_frontend/build ./TODO/todo_backend/static/build

EXPOSE 5000

CMD ["node", "TODO/todo_backend/server.js"]