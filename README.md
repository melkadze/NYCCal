# NYCCal!
A mobile-first events registration and discovery website with a focus on New York City. Developed by Nick Melkadze and Brajan Halili for CSCI 499 at Hunter College.

## Documentation
Below, we provide some information on how to build and run NYCCal! for yourself. If you would like to learn more about this project itself, please view its [comprehensive documentation](https://github.com/melkadze/NYCCal/blob/main/Final%20Documentation%20—%20NYCCal!.pdf)!

## Technologies and Packages
We used many technologies in NYCCal!, listed below. The first two are downloaded directly on to the system, while the others are npm packages installed via `npm i`.
 - Node 16.14.2: Backend framework for entire project
 - Python 3.7.10: For external debug script
 - Express 4.18.2: Simplifies Node by abstracting network
 - MongoDB 6.2.0: Connects to MongoDB servers
 - Mongoose 7.6.3: Native support for MongoDB read/writes and models
 - Passport 0.5.3: Facilitates log in and log out
 - Passport-Google_oAuth20 2.0.0: Allows us to use Google oAuth 2.0 with Passport
 - Cookie-Session 2.0.0: Enables us to keep a cookie for the current login token
 - EJS 3.1.9: Extends HTML by adding dynamic JavaScript when needed
 - DotENV 16.3.1: Use a .env file instead of hardcoding credentials and secrets
 - Path 0.12.7: Better path management (to have a clean folder structure)

## Want to use NYCCal!?
Check out our hosted version of the app on [Glitch](https://nyccal.glitch.me)!

We deployed on Glitch because it allows us to import this GitHub repo, and runs the `npm start` command on it (which launches our server). In order for Google to allow authentication from its URL, we also updated our oAuth token. 

## Want to build NYCCal!?
Check out our guide below:

### Prerequisites
Node 16.14.2

Python 3.7.10

### Downloading dependencies
Once you clone this repo, you must run the following command to install all dependencies:
> npm i


### Setting up the .env file
For the purposes of demoing the application, we have included the .env file in the repo. However, if it is later removed, or if you would like to use your own MongoDB database and Google oAuth ID, then fill in the .env file (located in the root of the project) as follows:

```
mongooseString=<your MongoDB connection string>

oAuthID=<your Google oAuth ID>
oAuthSecret=<your Google oAuth secret>

cookieKey=<encryption password for login cookies>

PORT=<port for the server, default is 3000>
```

### Running NYCCal!
Once you have installed all prerequisites and dependencies, and have set up the .env file, you may start the server by running the following command:
> npm start

### Accessing NYCCal!
When running, NYCCal! will report the port it is open on within the terminal in which you run it (which you may change in the .env file). In order to access NYCCal! when run locally when using the default port number of 3000, you can navigate to the following URL on your web browser of choice:
> localhost:3000
