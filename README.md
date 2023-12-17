# NYCCal!
A mobile-first events registration and discovery website with a focus on New York City. Developed by Nick Melkadze and Brajan Halili for CSCI 499 at Hunter College.

## Want to use NYCCal!?
Check out our hosted version of the app on [Glitch](nyccal.glitch.me)! 

## Want to build NYCCal!?
Check out our guide below:

### Prerequisite:
Node 16.14.2

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
When running, NYCCal! will report the port it is open on within the terminal in which you run it (which you may change in the .env file). In order to access NYCCal! when run locally, you can navigate to the following URL on your web browser of choice:
> localhost:<port number>
Using the default port number of 3000, you can access NYCCal! at:
> localhost:3000
