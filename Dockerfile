FROM node:22 as nodebuild
WORKDIR /build
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend/ .
RUN npm run build

FROM debian:stable
RUN apt-get update && apt-get install -y default-jdk
WORKDIR /app
COPY ./backend .
COPY --from=nodebuild build/dist ./src/main/resources/static
RUN ./mvnw clean install
EXPOSE 8080
CMD [ "./mvnw", "spring-boot:run" ]