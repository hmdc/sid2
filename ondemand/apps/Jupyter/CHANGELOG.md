# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

This log refers to the FAS-RC version of the app, which was originally forked from https://github.com/OSC/bc_example_jupyter.git

## [Current Unreleased] - up to 2021-04-30
### Changed
- notebook and jupyterlab together in the same app. The default option is jupyterlab.
- No longer using a container. After we have moved the software installations to the new storage platform accessing the software is fast enough that using a container will not have any performance benefits.
- jupyterlmod extension (already available in notebook from old version) is available in jupyterlab as well.
- mamba_gator, to control Conda environments from the jupyter interface, is installed. This extension seems to not function as intended in the notebook. Its lab extension @mamba-org/gator-lab works fine on the jupyterlab interface. This is an alternative to nb_conda.
- nb_conda_kernels extensions (already available in notebook from old version) is available in jupyterlab as well.
- added box for users to provide a list of modules to be loaded before starting jupyter.

## Removed
- removed nb_conda, which in previous versions was working correctly in notebook but not in jupyterlab. This was replaced by mamba_gator, which works well in jupyterlab, since we are making jupyterlab the default interface. 

## [Previous FAS-RC unreleased] - up to 2021-04-28
### Changed
- run a containerized version to mitigate high latency of software central installation
- jupyterlmod to allow loading Lmod software modules
- nb_conda_kernel allows to detect kernels in users' defined conda environments
- nb_conda allows to modify conda environments from a GUI integrated with the notebook interface

## [Last unreleased version from OSC at time of fork]
### Changed
- Increased verbosity of output to make debugging easier.
- Does not launch template script as login shell anymore to speed up load time.

### Fixed
- Fix job not ending if forked processes still running.

### Removed
- Removed support for Anaconda Notebook extensions.

## [1.0.1] - 2018-01-03
### Changed
- Updated date in `LICENSE.txt`.

### Fixed
- Remove ERB from YAML comments to avoid possible crash.
  [#4](https://github.com/OSC/bc_example_jupyter/issues/4)

## 1.0.0 - 2017-11-15
### Added
- Initial release!

[Unreleased]: https://github.com/OSC/bc_example_jupyter/compare/v1.0.1...HEAD
[1.0.1]: https://github.com/OSC/bc_example_jupyter/compare/v1.0.0...v1.0.1

