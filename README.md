# Course Catalog Service
Course catalog service is a part of course app API backend services to handle catalog functionality.

## TechStack

Course Catalog uses a number of open source projects to work properly:
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]
- [Sequelize] - modern TypeScript and Node.js ORM for database
- [Mocha] - JavaScript test framework running on Node.js and in the browser
- [aws-ssm] - environment management service with parameter store from AWS

And of course, Course Catalog it self is open source with a [public repository][dill] on GitHub.

## API Endpoint
You can check the API endpoint documentation at [here]

## Installation and setup
### Environment


### Run the server
Course Catalog requires [Node.js](https://nodejs.org/) v16+ to run.
Install the dependencies and start the server.

```sh
cd course-catalog
npm install
npm run start
```

### Docker

Course catalog is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8000 for production and port 9000 for testing, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.

```sh
cd course-catalog
docker build -t <name_tag> .
```

> Note: You can change `<name_tag>` with image name whatever you want or you can change with your docker registry repository for example

```sh
docker build dkr.ecr.us-east-1.amazonaws.com/course-catalog:latest .
```
Once done, you can run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8080 of the host to port 8000 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8080:8000 --restart=always --name=course-catalog-container <name_tag>
```

Verify the API by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:8080
```

## License

MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [dill]: <https://github.com/betuah/lks-course-catalog>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [node.js]: <http://nodejs.org>
   [sequelize]: <https://sequelize.org>
   [express]: <http://expressjs.com>
   [Mocha]: <https://mochajs.org/>
   [AWS-SDK]: <https://aws.amazon.com/id/sdk-for-javascript/#:~:text=The%20AWS%20SDK%20for%20JavaScript%20simpli%EF%AC%81es%20use%20of%20AWS%20Services,marshaling%2C%20serialization%2C%20and%20deserialization.>
   [aws-ssm]: <https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html>
   [here]: <https://documenter.getpostman.com/view/2061573/2s83zcRS5z>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
