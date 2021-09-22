# sid monorepo

# setup

Before building/modifying any of the projects contained within, please run the following

* Install the version of node contained in `.node_version`, see [installing node](#installing-node)

* Run `npm install` from the checkout. This will install **monorepo** build dependencies and initialize our Git commit hooks which enforce conventional committs and changelog. See [Sid2 development workflow](https://wiki.harvard.edu/confluence/display/HMDC/Sid2+Development+Workflow#Sid2DevelopmentWorkflow-Branches)

* Read/follow the  `README.md` file within the sub-project you're working on, for example, [keycloak-radious-spi/README.md](https://github.com/hmdc/sid2/blob/canary/keycloak-radius-spi/README.md)

## installing node

The following tools all track the `.node-version` file within the repository

### os x

#### n

* Install brew.

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
* Run `brew install n`
* From the checkout directory, run `n install`

#### installing node (a better way!)

ASDF is a tool version manager for Node, Python, etc

* Install asdf
```
brew install asdf
```
* Install asdf node plugin
```
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git 
echo 'legacy_version_file = yes' >> ~/.asdfrc
```
* cd to checkout directory and run `asdf install`

#### linux
I would suggest [installing asdf](http://asdf-vm.com/guide/getting-started.html#_3-install-asdf) but you can also use [n](https://github.com/tj/n)
