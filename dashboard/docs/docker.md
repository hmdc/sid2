# Development Environment - Docker Images

Docker images are used to create the local development environment. We use three images:
- Slurm - `slurm-docker-cluster` - https://hub.docker.com/r/hmdc/slurm-docker-cluster/tags
  - The `slurm-docker-cluster` Docker image contains a Slurm installation with Sid specific features.
- Sid Slurm - `sid-slurm` - https://hub.docker.com/r/hmdc/sid-slurm/tags
  - The `sid-slurm` Docker image contains a Slurm installation with Sid specific features.
- Sid OnDemand - `sid-ood` - https://hub.docker.com/r/hmdc/sid-ood/tags
  - The `sid-ood` Docker image contains an Open OnDemand installation with Slurm and Sid specific features.

## Component versions

Building new images is only necessary when we want to update the version of `Slurm` or `Open OnDemand`. The versions for the images are configured as variables in the [Makefile](../Makefile)

### Slurm version
Set the Slurm version in the Make variable `SLURM_TAG` in the [Makefile](../Makefile).

This version number refers to the version tag of the `slurm-docker-cluster` Docker image. These container images are here: [https://hub.docker.com/r/hmdc/slurm-docker-cluster/tags](https://hub.docker.com/r/hmdc/slurm-docker-cluster/tags)

If an appropriate version of the `slurm-docker-cluster` image does not already exist, you will need to build one.

After building a new version of the `slurm-docker-cluster` image and updating the Makefile, you also need to build new versions of the `sid-slurm` and `sid-ood` Docker images.

### Open OnDemand version
Set the Open OnDemand version in the Make variable `OOD_TAG` in the [Makefile](../Makefile).

This version number refers the the OnDemand version RPM from the OSC repo: https://yum.osc.edu/ondemand/2.0/web/el7/x86_64/
Only the files for the OnDemand RPM are of interest to us. Those are the ones with the pattern: ondemand-2*

From the list of OnDemand versions, select the one you are interested in and update the Makefile. The version string is taken from the RPM file name and removing the trailing characters: `.x86_64.rpm`.
eg: `ondemand-2.0.18-1.el7.x86_64.rpm` file is version: `ondemand-2.0.18-1.el7`

With the new version configured, you need to build the `sid-ood` Docker image.

## Building the Docker images

### Building a new slurm-docker-cluster image (to update the Slurm version)
This image is built from the GitHub repo https://github.com/hmdc/slurm-docker-cluster

The images are built automatically using GitHub actions when a commit is pushed into the repo.
Set the Slurm version in the [GitHub Actions configuration](https://github.com/hmdc/slurm-docker-cluster/blob/master/.github/workflows/on-push.yml) variable `jobs.build-and-test-slurm-containers.strategy.matrix.slurm-tag`, as an array of strings. Each string must be a valid tag in the Slurm git repo https://github.com/SchedMD/slurm , and each string will result in the build of a separate container image.

Update the versions that you want to build and commit the changes. The images will be built automatically by GitHub.
Verify the new images are in the Docker Hub: https://hub.docker.com/r/hmdc/slurm-docker-cluster/tags

If you need to build the images locally, follow the instructions from that repo's [README](https://github.com/hmdc/slurm-docker-cluster/blob/master/README.md). Here is a summary for the Sid2 use case:
```
# Select a Slurm version: https://github.com/SchedMD/slurm/tags
# Use the Slurm version to build the new slurm-docker-cluster
# Build the Docker image locally
make build -s SLURM_TAG="slurm-21-08-2-1"
```

### Building sid-slurm and sid-ood (after a Slurm update)
To create the new container images and upload them to the Docker Hub:
```
# Checkout Sid2 project
cd dashboard
# Update Slurm version in Makefile
# Build the sid images locally
make docker-build
# Push the new images to Docker Hub. This target requires to be logged in, credentials for the HMDC Docker organization are needed
# To login into Docker, execute: docker login
make docker-push
```
### Building sid-ood (after an Open OnDemand update)
To create the new container images and upload them to the Docker Hub:
```
# Checkout Sid2 project
cd dashboard
# Update OnDemand version in Makefile
# Build the sid-ood image locally
make docker-build-ood
# Push the new image to Docker Hub. This target requires to be logged in, credentials for the HMDC Docker organization are needed
# To login into Docker, execute: docker login
make docker-push-ood
```
