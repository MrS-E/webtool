# Web-Toolbox
# Setup
## Docker
Just run `docker-compose up` and you should be good to go.
The Frontend should be under localhost:90 and the Backend under localhost:
A local MongoDB with replica set is also included in the docker-compose file and running at localhost:227017.
## Local
The Frontend is a React Application with vite a an be started with `ǹpx vite` or `npm run dev`. If the port or the domain of the backend is not set at localhost:3000 a local variable at src/variables.ts must be set.
<br>
The Backend is a NestJS Application and can be started with `npm run start:dev`. 
Before executing the backend, a local MongoDB must be running at localhost:27017 and have a replica set for prisma to function properly.
To setup the backend a .env file must be created at the root of the backend folder with the following content:
```
DATABASE_URL=""
JWT_SECRET=""
```
You can use the .env.demo file as an example.
Maybe it is necessary to run `npm run prisma:generate` before starting the backend. Which would be included in the `npm run setup` script.
## Step by Step
1. Clone the repository
2. Run `npm run setup` in the root folder of the backend.
3. Create a .env file in the root folder of the backend. (like .env.demo)
4. Have a MongoDB running with a replica set. (MongoDB Atlas is recommended)
5. Run `npm run start:dev` in the root folder of the backend.
6. Run `npm install` in the root folder of the frontend.
7. If the backend is not running at localhost:3000, change the domain and port in src/variables.ts
8. Run `npm run dev` in the root folder of the frontend.
9. Open localhost:5173 in your browser.

# Explanation of jointed parts
Technically the frontend (build by vite) should be served by the backend, so no complex setup is required. 
But while the building process I ran into some problems with the vite build.
After the Build the frontend didn't display any content. I tried to fix it but couldn't find a solution.
Similar problems can be found at stackoverflow and the vite github page.
So the frontend and the backend are running on different ports and domains or can be combined into one docker compose.