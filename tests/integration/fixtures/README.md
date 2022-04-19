
# Assignment 2

Please make sure that all of [Assignment 1](../assignment-01/README.md), plus all of the following items have been successfully completed, based on the [Fragments Microservice Specification](../README.md).

## API Server Checklist

- [ ] `Dockerfile` and `.dockerignore` added to `fragments` GitHub repo
- [ ] `Dockerfile` employs [Docker best practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) for creating Docker Images
- [ ] Multi-stage Docker Build produces the smallest possible production Docker Image of your `fragments` node server
- [ ] `fragments` Docker image is hosted as a public repository at [Docker Hub](https://hub.docker.com/) under your account
- [ ] [Docker Hub](https://hub.docker.com/) account secrets properly stored in GitHub repo
- [ ] `fragments` Docker image automatically built and pushed to [Docker Hub](https://hub.docker.com/) on every new commit to the `main` branch via GitHub Actions CI workflow
- [ ] `POST /fragments` can now create any `text/*` or `application/json` fragments (i.e., you don't need to support images until [Assignment 3](../assignment-03/README.md)), with unit tests. See 4.3.
- [ ] `GET /fragments?expand=1` now returns expanded fragment metadata for an authenticated user. See 4.4.1.
- [ ] `GET /fragments/:id` returns an existing fragment's data with the expected `Content-Type`, with unit tests. See 4.5.
- [ ] `GET /fragments/:id/info` returns an existing fragment's metadata, with unit tests. See 4.7.
- [ ] `GET /fragments/:id.ext` returns an existing fragment's data converted to a supported type. Initial, you only need to support Markdown fragments (`.md`) converted to HTML (`.html`) using [markdown-it](https://github.com/markdown-it/markdown-it) (i.e., you don't have to do other conversions until [Assignment 3](../assignment-03/README.md))
- [ ] Unit test coverage should be at 80% or above, targeting all expected source files
- [ ] `fragments` Docker container is running manually on EC2 using pre-built [Docker Hub](https://hub.docker.com/) image (i.e., without building manually on EC2)

## Front-End Web Testing UI Checklist

NOTE: your web UI does not need to be polished or pretty, but must be functional, even if only in a very basic way. Remember, this is only for manual testing.

- [ ] `Dockerfile` and `.dockerignore` added to `fragments-ui` GitHub repo
- [ ] `Dockerfile` employs [Docker best practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) for creating Docker Images
- [ ] Multi-stage Docker Build produces the smallest possible production Docker Image
- [ ] Final layer uses `nginx` to serve the final static web site vs. node.js
- [ ] `fragments-ui` Docker image hosted as a public repository at [Docker Hub](https://hub.docker.com/) under your account.  NOTE: you don't need to automate this, pushing it manually is fine (you're obviously welcome to automate it if you want to).
- [ ] Basic support for users to create a new fragment, specifying the type of the fragment (e.g., drop-down or textbox). Any text (`text/*`) or JSON `application/json` fragment type should work. You could have the user type the fragment's content into a simple textbox, or support [drag-and-drop](https://www.npmjs.com/package/drag-drop), or use some of the many [browser file APIs](https://patrickbrosset.com/articles/2021-10-22-handling-files-on-the-web/). It's up to you, but there needs to be some way to accomplish this.  NOTE: this doesn't need to be fancy or highly polished; this is only for manual testing.
- [ ] Ability to get a list of the authenticated user's existing fragments with all metadata after successful login (e.g., you could print it to the `console` or dynamically generate UI elements like a table or list). It's up to you what you do, but there needs to be some way to accomplish this.

## Submission

Please submit the following to Blackboard for Assignment 2.  You are welcome to create a document (e.g., Word, PDF) with all of this info, or submit separate files:

- Links to both Private GitHub Repos with all necessary files included in git
- Links to both your public Docker Hub repositories with your built Docker Images
- Link to a successful GitHub Actions CI workflow running your unit tests
- Screenshots of your `fragments` API server running as a container on EC2 based on your Docker Hub image (i.e., shows health check JSON response in the browser or via `curl`)
- Screenshots of your `fragments-ui` web app running on localhost and connecting to your Docker Container running on EC2 and your Amazon Cognito User Pool, doing the following:
  - User authenticating with Cognito Hosted UI and showing the metadata for all of their existing fragments
  - User creating a new JSON fragment
  - User creating a new Markdown fragment
- Screenshot of running `npm run coverage` to show that you've been able to properly cover the majority of your files and lines of code. Make sure your coverage rate is high enough to reflect proper testing for all units of code.
