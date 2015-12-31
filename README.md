# s3_signed_upload — A lightweight AngularJS POC for file uploads to S3 with Signed URL's.

Contains a sample AngularJS application and is preconfigured to install the Angular
framework and a bunch of development and testing tools.

The app works off some configs and just shows how to wire two controllers and views together to run a file upload from the client to S3. Uses a a node service to get Signed URL's for a upload and another to View the file uploaded.


## Getting Started

To get you started you can simply clone the s3_signed_upload repository and install the dependencies:

### Prerequisites

You need git to clone the angular-seed repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test angular-seed. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone s3_signed_upload

Clone the angular-seed repository using [git][git]:

```
git clone https://github.com/krisiye/s3_signed_upload.git
cd s3_signed_upload
```


### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
angular-seed changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

We have preconfigured the project with a simple development web server.  

To configure your Amazon S3 properties , simply edit `config/aws.json` and supply `accessKeyId`, `secretAccessKey` and `bucket`. Optionally you may need to configure `region` but not required in most cases.

The simplest way to start this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app`.