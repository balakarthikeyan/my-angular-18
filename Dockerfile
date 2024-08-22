FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli
COPY . .
# RUN npm run build --prod
# RUN ng build --configuration=production
# FROM nginx:latest
# COPY --from=build /app/dist/my_angular_app /usr/share/nginx/html
# EXPOSE 80
CMD ["ng", "serve", "--host", "0.0.0.0"]