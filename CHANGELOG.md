## [2021.9.10-dev.1](https://github.com/hmdc/sid2/compare/2021.9.9-dev.1...2021.9.10-dev.1) (2021-09-14)


### Features

* **build:** rebuild staging server ([41a786c](https://github.com/hmdc/sid2/commit/41a786cd45d5e92471db3536fa9ed7db5042837a))

## [2021.9.9-dev.1](https://github.com/hmdc/sid2/compare/2021.9.8-dev.1...2021.9.9-dev.1) (2021-09-13)


### Bug Fixes

* **build:** fix versioning so canary is always ahead. stable action only strips dev appendix ([d851df2](https://github.com/hmdc/sid2/commit/d851df2d91ea7908afbcc94e86ffd3aee99920c4))

## [2021.9.8-dev.1](https://github.com/hmdc/sid2/compare/2021.9.7-dev.1...2021.9.8-dev.1) (2021-09-08)

## [2021.9.7-dev.1](https://github.com/hmdc/sid2/compare/2021.9.6-dev.1...2021.9.7-dev.1) (2021-09-07)

## [2021.9.6-dev.1](https://github.com/hmdc/sid2/compare/2021.9.5-dev.1...2021.9.6-dev.1) (2021-09-07)


### Features

* **sid-dashboard:** GH [#467](https://github.com/hmdc/sid2/issues/467) Updated navigation links for Sid documentation ([27069a6](https://github.com/hmdc/sid2/commit/27069a6523aca8a6615bc176f6ddd690aa0cf246))
* **sid-dashboard:** GH [#514](https://github.com/hmdc/sid2/issues/514) Updated RStudio version + added location for RStudio libraries for quick launchers ([c30d584](https://github.com/hmdc/sid2/commit/c30d5844ece5abf43b1cd0b662e87b1b121a71ba))

## [2021.9.5-dev.1](https://github.com/hmdc/sid2/compare/2021.9.4-dev.1...2021.9.5-dev.1) (2021-09-03)


### Bug Fixes

* **build:** not sure what happened to README.md but its back ([4819960](https://github.com/hmdc/sid2/commit/4819960c5beda387dba7b20e56f00b974501cb51))

## [2021.9.4-dev.1](https://github.com/hmdc/sid2/compare/2021.9.3-dev.1...2021.9.4-dev.1) (2021-09-03)


### Bug Fixes

* **build:** truncate CHANGELOG and fix versioning ([47497aa](https://github.com/hmdc/sid2/commit/47497aaedc310a1ee4659cc58099e05678706f69))

## [2021.9.2](https://github.com/hmdc/sid2/compare/2021.9.0-dev.2...2021.9.2) (2021-09-03)


### Bug Fixes

* **build:** versioning now makes more sense given that I have fixed the calver plugin ([bb045f6](https://github.com/hmdc/sid2/commit/bb045f6648c002c8d7b8b28909b7b228df3329f5))

# [2021.9.0-dev.2](https://github.com/hmdc/sid2/compare/2021.9.1-dev.2...2021.9.0-dev.2) (2021-09-02)


### Bug Fixes

* **build:** ensure that multileveled version increments work by stepping-over bug in node-calver ([f3c897e](https://github.com/hmdc/sid2/commit/f3c897e61644cdbfc5d60d0541965aa78472bbc4))

## [2021.9.1-dev.2](https://github.com/hmdc/sid2/compare/2021.9.1-dev.1...2021.9.1-dev.2) (2021-09-02)


### Bug Fixes

* **build:** do not change package.json version, set back to 0.0.0 ([e0ec65e](https://github.com/hmdc/sid2/commit/e0ec65e42d2fd8f24a080ed28d9c1ee03616b982))

## [2021.9.1-dev.1](https://github.com/hmdc/sid2/compare/v2021.9.0...2021.9.1-dev.1) (2021-09-02)


### Bug Fixes

* **build:** fix calver with a patch ([5d2b104](https://github.com/hmdc/sid2/commit/5d2b104adfebf42c4773959cc34def61ab3dffc0))

# [2021.9.0](https://github.com/hmdc/sid2/compare/v2021.8.2...v2021.9.0) (2021-09-02)


### Bug Fixes

* **build:** added automatic installation of husky following npm install ([c52c26b](https://github.com/hmdc/sid2/commit/c52c26b0f6a3026637e109680429e0dfdbd01a11))
* **build:** disable husky for stable ([fec3836](https://github.com/hmdc/sid2/commit/fec3836709a0991accfa36f93305843c30d384d5))
* **build:** set preRelease to true for releases in stable ([65f4a4b](https://github.com/hmdc/sid2/commit/65f4a4bf236c82f9d157cd85e8f43999f2a359b4))
* **build:** workflow puts ref under with ([44ace09](https://github.com/hmdc/sid2/commit/44ace09dc376fe4150f62a256740dfd427b776c1))
* **build:** workflow_run loses the ref. thanks Aday for pointing that out. i can find the original ref using the paren. sub. for workflow original triggering git sha ([a144873](https://github.com/hmdc/sid2/commit/a144873522983589f34df8fe0344082ddd7c72ce))
* **husky:** Add husky ([d899db0](https://github.com/hmdc/sid2/commit/d899db077405ace215a42664d71241868d3c2096))
* **sid-dashboard:** GH[#487](https://github.com/hmdc/sid2/issues/487) Fixed Makefile after merge from canary ([a8ef121](https://github.com/hmdc/sid2/commit/a8ef12175108aa6ece2abbdb81272982923f6b59))


### Features

* **build:** build canary releases and migrate version file ([0aa71c9](https://github.com/hmdc/sid2/commit/0aa71c980e7065a1cf6c689fd6a48ca5d317fc9b))
* **sid-dashboard:** GH [#514](https://github.com/hmdc/sid2/issues/514) Updated Matlab version to match FASRC codebase ([d446a08](https://github.com/hmdc/sid2/commit/d446a089dd393d89c065a0d2cea595e3cc85d72e))

## [2021.8.2](https://github.com/hmdc/sid2/compare/v0.9.0...v2021.8.2) (2021-08-12)


### Bug Fixes

* **build:** fix name of dashboard release artifact upload bucket to dashboard ([b0bbda2](https://github.com/hmdc/sid2/commit/b0bbda249d558b2eecfd470bacb9df5fc6ce3325))
* **build:** forgot conventional changelog module ([c75c57b](https://github.com/hmdc/sid2/commit/c75c57b37b5dd9f3bffe9dfc11c3a47e01b6f09e))
* **build:** forgot to add release npm script ([0f4d039](https://github.com/hmdc/sid2/commit/0f4d039f581896543f94c2e2dae38b8513db3006))
* **build:** no need to test twice, remove build notice evident from title ([456de1e](https://github.com/hmdc/sid2/commit/456de1efe11e8f9076514616893931251fd2313c))
* **build:** stable workflow fix wrt. yaml formatting and paths ([42c2664](https://github.com/hmdc/sid2/commit/42c26646145ec72ad06d089f54a8589dd5f4984a))
* **build:** use tabs not spaces in makefile ([916b2e1](https://github.com/hmdc/sid2/commit/916b2e184947f3964d460577bf0536f38271d07d))


### Features

* **build:** implement build and release modifications ([3a2af4e](https://github.com/hmdc/sid2/commit/3a2af4e9b85998355c629709acbace8b8fd5d4aa))
* **ci:** add initial CI code, no automated release, yet, but on the next merge ([f6c9625](https://github.com/hmdc/sid2/commit/f6c9625eda789f43aa865897c6128520f12a6d27))



# [0.9.0](https://github.com/hmdc/sid2/compare/v0.9.0...v2021.8.2) (2021-05-12)

