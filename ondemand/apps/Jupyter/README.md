# Jupyter Notebook for OOD Deployment at FAS-RC

This app has been derived by the template kindly provided by the OSC OpenOnDemand
Team. [OSC](https://github.com/OSC/bc_example_jupyter)

It launches a Jupyter Notebook server within a batch job.

## Prerequisites
This Batch Connect app requires the following software be available on **compute nodes** :

- [Jupyter Notebook](http://jupyter.readthedocs.io/en/latest/) This is installed in the central location as part of Anaconda installation,

## Install

The master branch of this repo is automatically deployed by puppet to /var/www/ood/apps/sys/ on the ondemand nodes.

If you want to deploy that in your user development environment to make modifications, follow these instructions. 

```sh
# create the development folder if you still not have one
mkdir -pv ~/fasrc/dev/
cd ~/fasrc/dev/

# clone the repository in a subfolder for your version of the app
git clone git@gitlab-int.rc.fas.harvard.edu:openondemand/jupyter-app.git my_jupyter

# Change the working directory to this new directory
cd my_jupyter
```
You can now make your preferred modifications and run your version of the app from the sandbox control panel under the
*dev* menu on the ondemand dashboard

## Contributing

If you intend deploy your modified version as system wide app, you should commit your changes to a branch first.
Please remember that any modification to the master branch goes live **immediately**. 
