# NgNx18

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.14 and @nx/angular

# Get started
Install
```
docker run --rm -it -v $PWD:/app -w /app node:alpine npm i
```

Serve
```
docker run --rm -it -p 4200:4200 -v $PWD:/app -w /app node:alpine npx nx serve project-name -- --host=0.0.0.0
```

Update package
```
docker run --rm -it -v $PWD:/app -w /app node:alpine npx nx migrate @angular/cli@19
docker run --rm -it -v $PWD:/app -w /app node:alpine npm i
docker run --rm -it -v $PWD:/app -w /app node:alpine npx nx migrate --run-migrations
```
Do the same steps for other packages

Update Nx
```
docker run --rm -it -v $PWD:/app -w /app node:alpine npx nx migrate latest 
docker run --rm -it -v $PWD:/app -w /app node:alpine npm i
```
