## [2023.1.2-dev.1](https://github.com/hmdc/sid2/compare/2023.1.1-dev.1...2023.1.2-dev.1) (2023-01-19)


### Bug Fixes

* **build:** gh [#818](https://github.com/hmdc/sid2/issues/818) Updated OnDemand version to 2.0.29 for Sid Docker image to fix shell app error ([#71](https://github.com/hmdc/sid2/issues/71)) ([9dbd01c](https://github.com/hmdc/sid2/commit/9dbd01c118614ea3d39febca3f6a0421355d8c0d))

## [2023.1.1-dev.1](https://github.com/hmdc/sid2/compare/2022.8.1-dev.1...2023.1.1-dev.1) (2023-01-05)


### Bug Fixes

* **build:** gh [#813](https://github.com/hmdc/sid2/issues/813) updates to Sid OnDemand Docker image to fix latest OOD codebase build process ([#70](https://github.com/hmdc/sid2/issues/70)) ([f6d9ad9](https://github.com/hmdc/sid2/commit/f6d9ad98af1418b2da69ea357add49cea5da2aaf))

## [2022.8.1-dev.1](https://github.com/hmdc/sid2/compare/2022.7.1-dev.1...2022.8.1-dev.1) (2022-08-19)


### Bug Fixes

* **dashboard:** gh [#651](https://github.com/hmdc/sid2/issues/651) Fixed turbovnc version and template for local environment ([#56](https://github.com/hmdc/sid2/issues/56)) ([23c5a77](https://github.com/hmdc/sid2/commit/23c5a77fdde993e35e738aa2d4de148f54fa7230))

## [2022.7.1-dev.1](https://github.com/hmdc/sid2/compare/2022.5.4-dev.1...2022.7.1-dev.1) (2022-07-28)


### Features

* **dashboard:** gh [#775](https://github.com/hmdc/sid2/issues/775) document features in README.md ([#69](https://github.com/hmdc/sid2/issues/69)) ([2d7b3d3](https://github.com/hmdc/sid2/commit/2d7b3d3809cab36b042642d1ace8827d54e404c4)), closes [#698](https://github.com/hmdc/sid2/issues/698) [#698](https://github.com/hmdc/sid2/issues/698)

## [2022.5.4-dev.1](https://github.com/hmdc/sid2/compare/2022.5.3-dev.1...2022.5.4-dev.1) (2022-05-27)


* feat(dashboard) gh #731 send automated test support tickets to an alternate queue (#68) ([a8dfa15](https://github.com/hmdc/sid2/commit/a8dfa1570bf450cf9936cacfa0ac2733b6678121)), closes [#731](https://github.com/hmdc/sid2/issues/731) [#68](https://github.com/hmdc/sid2/issues/68) [#731](https://github.com/hmdc/sid2/issues/731) [#731](https://github.com/hmdc/sid2/issues/731) [#731](https://github.com/hmdc/sid2/issues/731) [#731](https://github.com/hmdc/sid2/issues/731) [#731](https://github.com/hmdc/sid2/issues/731) [#731](https://github.com/hmdc/sid2/issues/731) [#731](https://github.com/hmdc/sid2/issues/731)


### BREAKING CHANGES

* Configuring the RT client through environment variables is no longer supported.

## [2022.5.3-dev.1](https://github.com/hmdc/sid2/compare/2022.5.2-dev.1...2022.5.3-dev.1) (2022-05-24)


### Reverts

* Revert "feat(dashboard): gh #731 support specifying more than one queue in RT client config (#67)" ([c3e3b56](https://github.com/hmdc/sid2/commit/c3e3b56547e5b0556f149747d712f2d8c1475257)), closes [#731](https://github.com/hmdc/sid2/issues/731) [#67](https://github.com/hmdc/sid2/issues/67)

## [2022.5.2-dev.1](https://github.com/hmdc/sid2/compare/2022.5.1-dev.1...2022.5.2-dev.1) (2022-05-24)


### Features

* **dashboard:** gh [#731](https://github.com/hmdc/sid2/issues/731) support specifying more than one queue in RT client config ([#67](https://github.com/hmdc/sid2/issues/67)) ([13b67c2](https://github.com/hmdc/sid2/commit/13b67c2ee8c79d52dea88664a0087e71b3a65c9f))


### BREAKING CHANGES

* **dashboard:** Configuring the RT client through environment variables is no longer supported.

## [2022.5.1-dev.1](https://github.com/hmdc/sid2/compare/2022.4.26-dev.1...2022.5.1-dev.1) (2022-05-06)


### Bug Fixes

* **testing:** gh [#706](https://github.com/hmdc/sid2/issues/706) Run Cypress tests using command line tool ([#65](https://github.com/hmdc/sid2/issues/65)) ([d49b400](https://github.com/hmdc/sid2/commit/d49b400ebe6e689a37514e0dfec83335e25ccf0d))

## [2022.4.26-dev.1](https://github.com/hmdc/sid2/compare/2022.4.25-dev.1...2022.4.26-dev.1) (2022-04-20)


### Features

* **dashboard:** gh [#660](https://github.com/hmdc/sid2/issues/660) Re-add session terminate session feature with race condition fix ([#64](https://github.com/hmdc/sid2/issues/64)) ([264bbb2](https://github.com/hmdc/sid2/commit/264bbb24371da4da1d8d5ce840712dd4599af856))

## [2022.4.25-dev.1](https://github.com/hmdc/sid2/compare/2022.4.24-dev.1...2022.4.25-dev.1) (2022-04-20)


### Reverts

* Revert "feat(dashboard): gh #660 Added terminate session feature (#60)" (#63) ([aa8f4c9](https://github.com/hmdc/sid2/commit/aa8f4c901ff1f8a39b135d8b3dccdf4caf75cecf)), closes [#660](https://github.com/hmdc/sid2/issues/660) [#60](https://github.com/hmdc/sid2/issues/60) [#63](https://github.com/hmdc/sid2/issues/63)

## [2022.4.24-dev.1](https://github.com/hmdc/sid2/compare/2022.4.23-dev.1...2022.4.24-dev.1) (2022-04-19)


### Features

* **dashboard:** gh [#660](https://github.com/hmdc/sid2/issues/660) Added terminate session feature ([#60](https://github.com/hmdc/sid2/issues/60)) ([4bfa1ed](https://github.com/hmdc/sid2/commit/4bfa1ed3ba57645a8b344384e5334a1d4abe77c6))

## [2022.4.23-dev.1](https://github.com/hmdc/sid2/compare/2022.4.22-dev.1...2022.4.23-dev.1) (2022-04-19)


### Bug Fixes

* **build:** gh [#698](https://github.com/hmdc/sid2/issues/698) empty commit for QA ([#61](https://github.com/hmdc/sid2/issues/61)) ([76474f0](https://github.com/hmdc/sid2/commit/76474f085c4adf3e18da1d332e5d118a4302f1d6))

## [2022.4.22-dev.1](https://github.com/hmdc/sid2/compare/2022.4.21-dev.1...2022.4.22-dev.1) (2022-04-11)


### Bug Fixes

* **build:** gh [#669](https://github.com/hmdc/sid2/issues/669) Added check to run automated tests only when previous build succeeds ([d1b3e87](https://github.com/hmdc/sid2/commit/d1b3e874f89ca193a94c91b791d8bd8827a2823e))

## [2022.4.21-dev.1](https://github.com/hmdc/sid2/compare/2022.4.20-dev.1...2022.4.21-dev.1) (2022-04-11)


### Bug Fixes

* **build:** gh [#669](https://github.com/hmdc/sid2/issues/669) empty commit to test ci ([00b0e8d](https://github.com/hmdc/sid2/commit/00b0e8d950d220d5ed636a95a7209260a5038123))

## [2022.4.20-dev.1](https://github.com/hmdc/sid2/compare/2022.4.19-dev.1...2022.4.20-dev.1) (2022-04-11)


### Bug Fixes

* **build:** gh [#669](https://github.com/hmdc/sid2/issues/669) Fixed typo on automated tests GitHub action yaml ([e7524ab](https://github.com/hmdc/sid2/commit/e7524ab5e2f97b7ee9281db4a7e6ead5785c64c9))

## [2022.4.19-dev.1](https://github.com/hmdc/sid2/compare/2022.4.18-dev.1...2022.4.19-dev.1) (2022-04-08)


### Bug Fixes

* **build:** gh [#698](https://github.com/hmdc/sid2/issues/698) manually clean up CHANGELOG-dev.md ([22a12d5](https://github.com/hmdc/sid2/commit/22a12d5d1c9865284563046f655c09f800da2b0e))

## [2022.4.18-dev.1](https://github.com/hmdc/sid2/compare/2022.4.17-dev.1...2022.4.18-dev.1) (2022-04-08)


### Bug Fixes

* **testing:** gh [#669](https://github.com/hmdc/sid2/issues/669) Fixed failing automated tests + Added to github release process ([#58](https://github.com/hmdc/sid2/issues/58)) ([d5c920c](https://github.com/hmdc/sid2/commit/d5c920cfc998e164fc7239a1ec777444224fbd77))

## [2022.4.17-dev.1](https://github.com/hmdc/sid2/compare/2022.4.16-dev.1...2022.4.17-dev.1) (2022-04-07)


### Bug Fixes

* **build:** gh [#698](https://github.com/hmdc/sid2/issues/698) manually clean up CHANGELOG-dev.md ([196fd95](https://github.com/hmdc/sid2/commit/196fd95434b48bd1163237a08859616786e6955b))

## [2022.4.16-dev.1](https://github.com/hmdc/sid2/compare/2022.4.15-dev.1...2022.4.16-dev.1) (2022-04-07)


### Bug Fixes

* **build:** gh [#698](https://github.com/hmdc/sid2/issues/698) use sort -V to sort versions with GNU sort ([9bca79b](https://github.com/hmdc/sid2/commit/9bca79b59a4069803c1c88ae66f1b88aca84722f))

## [2022.4.15-dev.1](https://github.com/hmdc/sid2/compare/2022.4.9-dev.1...2022.4.15-dev.1) (2022-04-07)


### Bug Fixes

* **build:** gh [#698](https://github.com/hmdc/sid2/issues/698) something is still not right with the tag selection ([9c30bca](https://github.com/hmdc/sid2/commit/9c30bca9a13fbe169ba474eb64e5103aac93798f))



## [2022.4.14-dev.1](https://github.com/hmdc/sid2/compare/2022.4.9-dev.1...2022.4.15-dev.1) (2022-04-07)


### Bug Fixes

* **build:** gh [#698](https://github.com/hmdc/sid2/issues/698) manually clean up CHANGELOG-dev.md again ([5998638](https://github.com/hmdc/sid2/commit/599863831b9fb0db4562201d01db3ef1e48dbdd7))
* **build:** gh [#698](https://github.com/hmdc/sid2/issues/698) sort tags properly in release workflow ([08a5f4e](https://github.com/hmdc/sid2/commit/08a5f4ef846b5f31ee2ceaaa271fda63542e9241))



## [2022.4.13-dev.1](https://github.com/hmdc/sid2/compare/2022.4.9-dev.1...2022.4.15-dev.1) (2022-04-07)


### Bug Fixes

* **build:** gh [#698](https://github.com/hmdc/sid2/issues/698) bump canary release version one more time for testing ([a12e998](https://github.com/hmdc/sid2/commit/a12e998e1d01f60aa983551e42cb942e59ae93ed))



## [2022.4.12-dev.1](https://github.com/hmdc/sid2/compare/2022.4.9-dev.1...2022.4.15-dev.1) (2022-04-07)


### Bug Fixes

* **build:** gh [#698](https://github.com/hmdc/sid2/issues/698) bump canary release version again for testing ([b942329](https://github.com/hmdc/sid2/commit/b942329c7f31d1728b7597ca134e6edbf934634e))
* **build:** gh [#698](https://github.com/hmdc/sid2/issues/698) manually clean up CHANGELOG-dev.md ([97d3287](https://github.com/hmdc/sid2/commit/97d3287b02e831b115b11962a0c7fe2f8fe4d74f))



## [2022.4.11-dev.1](https://github.com/hmdc/sid2/compare/2022.4.9-dev.1...2022.4.15-dev.1) (2022-04-07)


### Bug Fixes

* **build:** gh [#698](https://github.com/hmdc/sid2/issues/698) bump canary release version for testing ([f4a04da](https://github.com/hmdc/sid2/commit/f4a04daf0cadb84fa46a03efaf275ef8ef6b61cd))



## [2022.4.10-dev.1](https://github.com/hmdc/sid2/compare/2022.4.9-dev.1...2022.4.15-dev.1) (2022-04-07)


### Bug Fixes

* **build:** gh [#698](https://github.com/hmdc/sid2/issues/698) fix release-it arg quoting in workflow ([2f11445](https://github.com/hmdc/sid2/commit/2f11445dc9e7c70d83ab9ba0b343bf943569b021))

## [2022.4.9-dev.1](https://github.com/hmdc/sid2/compare/2022.4.8-dev.1...2022.4.9-dev.1) (2022-04-07)


### Bug Fixes

* **build:** gh [#698](https://github.com/hmdc/sid2/issues/698) pass skipUnstable to conventional-changelog on stable builds ([d9fddb0](https://github.com/hmdc/sid2/commit/d9fddb01738aa640a1134d3cab5095b0eb9e96b9))

## [2022.4.8-dev.1](https://github.com/hmdc/sid2/compare/2022.4.7-dev.1...2022.4.8-dev.1) (2022-04-07)


### Bug Fixes

* **build:** gh [#698](https://github.com/hmdc/sid2/issues/698) roll back to @release-it/conventional-changelog 4.1.0 since ^4.2.0 breaks changelog headers ([cb36b48](https://github.com/hmdc/sid2/commit/cb36b486240b964386ac5c21f4559f4f0a1c50c9))



## [2022.4.7-dev.1](https://github.com/hmdc/sid2/compare/2022.4.6-dev.1...2022.4.7-dev.1) (2022-04-07)


### Bug Fixes

* **build:** gh [#698](https://github.com/hmdc/sid2/issues/698) bump canary release version again for testing ([45770f4](https://github.com/hmdc/sid2/commit/45770f4646c8d712d82b51d97955613c0a76d343))

## [2022.4.6-dev.1](https://github.com/hmdc/sid2/compare/2022.4.5-dev.1...2022.4.6-dev.1) (2022-04-07)


### Bug Fixes

* **build:** gh [#698](https://github.com/hmdc/sid2/issues/698) bump canary release version for testing ([0281cc6](https://github.com/hmdc/sid2/commit/0281cc6415a433079b021b95cc536c071125cbd4))

## [2022.4.5-dev.1](https://github.com/hmdc/sid2/compare/2022.4.4-dev.1...2022.4.5-dev.1) (2022-04-06)


### Bug Fixes

* **build:** gh [#698](https://github.com/hmdc/sid2/issues/698) also bump versions of release-it and release-it/conventional-changelog ([3e88b7a](https://github.com/hmdc/sid2/commit/3e88b7acc6af7a177475b4d7ddbedd3bbdfd115f))

## [2022.4.4-dev.1](https://github.com/hmdc/sid2/compare/2022.4.3-dev.1...2022.4.4-dev.1) (2022-04-06)


### Bug Fixes

* **build:** gh [#698](https://github.com/hmdc/sid2/issues/698) bump build version ([3e536be](https://github.com/hmdc/sid2/commit/3e536be457678d191a65c9d6a2007d868152e94c))
* **build:** gh [#698](https://github.com/hmdc/sid2/issues/698) update release workflow with release-it config args ([ebdeb03](https://github.com/hmdc/sid2/commit/ebdeb038fc28f3588738652b360623c6150139de))



## [2022.4.3-dev.1](https://github.com/hmdc/sid2/compare/2022.4.2-dev.1...2022.4.3-dev.1) (2022-04-06)


### Bug Fixes

* **build:** gh [#698](https://github.com/hmdc/sid2/issues/698) update workflow to specify plugins.@release-it/conventional-changelog.gitRawCommitsOpts ([57b904c](https://github.com/hmdc/sid2/commit/57b904c53817c4419a473d61158e045a619ffd96))
* **dashboard:** gh [#698](https://github.com/hmdc/sid2/issues/698) remove obsolete dashboard/application/CHANGELOG.md ([62da039](https://github.com/hmdc/sid2/commit/62da0391b54428c08cd141884574392aa3365b87))


## [2022.4.2-dev.1](https://github.com/hmdc/sid2/compare/2022.4.1-dev.1...2022.4.2-dev.1) (2022-04-04)


### Bug Fixes

* **dashboard:** gh [#649](https://github.com/hmdc/sid2/issues/649) improve the cleaning power of make clean ([#57](https://github.com/hmdc/sid2/issues/57)) ([56a439e](https://github.com/hmdc/sid2/commit/56a439e6a2fb733f52be74cd006459cec064b19a))

## [2022.4.1-dev.1](https://github.com/hmdc/sid2/compare/2022.3.13...2022.4.1-dev.1) (2022-04-04)


### Bug Fixes

* **build:** gh [#585](https://github.com/hmdc/sid2/issues/585) Doing QA ([d29d68b](https://github.com/hmdc/sid2/commit/d29d68bf1f6bb93047bb411f5a425d37bda45c0d))

## [2022.3.13-dev.1](https://github.com/hmdc/sid2/compare/2022.3.12-dev.1...2022.3.13-dev.1) (2022-03-30)


### Bug Fixes

* **build:** gh [#585](https://github.com/hmdc/sid2/issues/585) fix typo in Makefile ([91fc09d](https://github.com/hmdc/sid2/commit/91fc09d7007dde79f1d2264ce7095cde47232412))
* **build:** gh [#585](https://github.com/hmdc/sid2/issues/585) switch conditional logic for calver-bump-patch.js so that canary build is the default ([c7c5a89](https://github.com/hmdc/sid2/commit/c7c5a89695fb0e7e1732218f53d5605b886e530e))

## [2022.3.12-dev.1](https://github.com/hmdc/sid2/compare/2022.3.11-dev.1...2022.3.12-dev.1) (2022-03-30)


### Bug Fixes

* **build:** gh [#585](https://github.com/hmdc/sid2/issues/585) fix quotes ([cfab9da](https://github.com/hmdc/sid2/commit/cfab9da0ad2c0d1f644f76e37b20831479c104c5))

## [2022.3.11-dev.1](https://github.com/hmdc/sid2/compare/2022.3.10-dev.1...2022.3.11-dev.1) (2022-03-30)


### Bug Fixes

* **build:** gh [#585](https://github.com/hmdc/sid2/issues/585) use github.event.workflow_run.head_branch in second-level workflow instead of env.GITHUB_REF_SLUG ([47007f9](https://github.com/hmdc/sid2/commit/47007f9a326f816758f2f534ae8f6d73908f7c64))

## [2022.3.10-dev.1](https://github.com/hmdc/sid2/compare/2022.3.9-dev.1...2022.3.10-dev.1) (2022-03-29)


### Bug Fixes

* **build:** gh [#585](https://github.com/hmdc/sid2/issues/585) increase max length of commit message header to 150 characters ([b45c9d6](https://github.com/hmdc/sid2/commit/b45c9d6048c520505937368daeee573259ea8d67))

## [2022.3.9-dev.1](https://github.com/hmdc/sid2/compare/2022.3.8-dev.1...2022.3.9-dev.1) (2022-03-29)


### Bug Fixes

* **build:** gh [#585](https://github.com/hmdc/sid2/issues/585) increment from VERSION-dev when building application/VERSION from non-stable ([8277401](https://github.com/hmdc/sid2/commit/827740171496c40b16f29b9198c1b8c78c1f0685))

## [2022.3.8-dev.1](https://github.com/hmdc/sid2/compare/2022.3.8...2022.3.8-dev.1) (2022-03-25)


### Bug Fixes

* **build:** GH [#585](https://github.com/hmdc/sid2/issues/585) Change release-it arg syntax ([6c5a607](https://github.com/hmdc/sid2/commit/6c5a6073e0278e25c19ee8d57155649ccc14ae21))
* **build:** GH [#585](https://github.com/hmdc/sid2/issues/585) Intialize CHANGELOG-dev.md and VERSION-dev files ([4b5bcd8](https://github.com/hmdc/sid2/commit/4b5bcd8030fa43846e071acd1556c04d3f986a28))


### Features

* **build:** GH [#585](https://github.com/hmdc/sid2/issues/585) Add separate dev (canary) release-it config, CHANGELOG, and VERSION files ([e57ea63](https://github.com/hmdc/sid2/commit/e57ea63d15c4f78799796de5e8987ecc9e6bb678))



## [2022.3.7-dev.1](https://github.com/hmdc/sid2/compare/2022.3.8...2022.3.8-dev.1) (2022-03-23)


### Bug Fixes

* **dashboard:** gh [#650](https://github.com/hmdc/sid2/issues/650) Fixed missing data error on interactive session panels ([#53](https://github.com/hmdc/sid2/issues/53)) ([af91a73](https://github.com/hmdc/sid2/commit/af91a7347ffbc704d1764aa30ee5da457a75848a))



## [2022.3.6-dev.1](https://github.com/hmdc/sid2/compare/2022.3.8...2022.3.8-dev.1) (2022-03-18)


### Bug Fixes

* **dashboard:** gh [#678](https://github.com/hmdc/sid2/issues/678) Created new sid-ood Docker image to fix HTTPs error ([#55](https://github.com/hmdc/sid2/issues/55)) ([249e5a1](https://github.com/hmdc/sid2/commit/249e5a16432f7f5e0788cf7cb2ddcda923afed7a))



## [2022.3.5-dev.1](https://github.com/hmdc/sid2/compare/2022.3.8...2022.3.8-dev.1) (2022-03-17)


### Features

* **dashboard:** gh [#662](https://github.com/hmdc/sid2/issues/662) Upgraded slurm to version 21-08-6-1 ([#54](https://github.com/hmdc/sid2/issues/54)) ([f4f8acb](https://github.com/hmdc/sid2/commit/f4f8acb94355929a4c7d9ba855c1d61ba9f25151))



## [2022.3.4-dev.1](https://github.com/hmdc/sid2/compare/2022.3.8...2022.3.8-dev.1) (2022-03-14)


### Features

* **keycloak:** gh [#609](https://github.com/hmdc/sid2/issues/609) Removed log4j dependency from final SPI jar ([#42](https://github.com/hmdc/sid2/issues/42)) ([374e8cc](https://github.com/hmdc/sid2/commit/374e8cc7030e323f3db9083cb91a77e2c9cb95e4))



## [2022.3.3-dev.1](https://github.com/hmdc/sid2/compare/2022.3.8...2022.3.8-dev.1) (2022-03-14)


### Features

* **dashboard:** gh [#605](https://github.com/hmdc/sid2/issues/605) added HTTPS support + increased Apache timeout ([#40](https://github.com/hmdc/sid2/issues/40)) ([387a2e7](https://github.com/hmdc/sid2/commit/387a2e793419a5d1f68764f18149c0e28f2b39c8))



## [2022.3.2-dev.1](https://github.com/hmdc/sid2/compare/2022.3.8...2022.3.8-dev.1) (2022-03-08)



## [2022.3.1-dev.1](https://github.com/hmdc/sid2/compare/2022.3.8...2022.3.8-dev.1) (2022-03-03)


### Bug Fixes

* **landing-page:** GH [#573](https://github.com/hmdc/sid2/issues/573) Fixes to build command and login URL ([#52](https://github.com/hmdc/sid2/issues/52)) ([be91273](https://github.com/hmdc/sid2/commit/be912739fbace84ea833528e9f91d60eaa42fe9f))



## [2022.2.6-dev.1](https://github.com/hmdc/sid2/compare/2022.3.8...2022.3.8-dev.1) (2022-02-24)


### Features

* **Documentation updates:** gh [#594](https://github.com/hmdc/sid2/issues/594) added documentation on how to update the Slurm and OOD version ([#43](https://github.com/hmdc/sid2/issues/43)) ([f93a44b](https://github.com/hmdc/sid2/commit/f93a44bdd55606e1f2a2cafdd131fd1ab61078a3))



## [2022.2.5-dev.1](https://github.com/hmdc/sid2/compare/2022.3.8...2022.3.8-dev.1) (2022-02-23)


### Bug Fixes

* **dashboard:** gh [#647](https://github.com/hmdc/sid2/issues/647) Fixed FASSE remote desktop configuration ([#49](https://github.com/hmdc/sid2/issues/49)) ([70f0f67](https://github.com/hmdc/sid2/commit/70f0f67368bd63e095fc9ee3c8175e630a12e88d))

## [2022.3.7-dev.1](https://github.com/hmdc/sid2/compare/2022.3.6-dev.1...2022.3.7-dev.1) (2022-03-23)


### Bug Fixes

* **dashboard:** gh [#650](https://github.com/hmdc/sid2/issues/650) Fixed missing data error on interactive session panels ([#53](https://github.com/hmdc/sid2/issues/53)) ([af91a73](https://github.com/hmdc/sid2/commit/af91a7347ffbc704d1764aa30ee5da457a75848a))

## [2022.3.6-dev.1](https://github.com/hmdc/sid2/compare/2022.3.5-dev.1...2022.3.6-dev.1) (2022-03-18)


### Bug Fixes

* **dashboard:** gh [#678](https://github.com/hmdc/sid2/issues/678) Created new sid-ood Docker image to fix HTTPs error ([#55](https://github.com/hmdc/sid2/issues/55)) ([249e5a1](https://github.com/hmdc/sid2/commit/249e5a16432f7f5e0788cf7cb2ddcda923afed7a))

## [2022.3.5-dev.1](https://github.com/hmdc/sid2/compare/2022.3.4-dev.1...2022.3.5-dev.1) (2022-03-17)


### Features

* **dashboard:** gh [#662](https://github.com/hmdc/sid2/issues/662) Upgraded slurm to version 21-08-6-1 ([#54](https://github.com/hmdc/sid2/issues/54)) ([f4f8acb](https://github.com/hmdc/sid2/commit/f4f8acb94355929a4c7d9ba855c1d61ba9f25151))

## [2022.3.4-dev.1](https://github.com/hmdc/sid2/compare/2022.3.3-dev.1...2022.3.4-dev.1) (2022-03-14)


### Features

* **keycloak:** gh [#609](https://github.com/hmdc/sid2/issues/609) Removed log4j dependency from final SPI jar ([#42](https://github.com/hmdc/sid2/issues/42)) ([374e8cc](https://github.com/hmdc/sid2/commit/374e8cc7030e323f3db9083cb91a77e2c9cb95e4))

## [2022.3.3-dev.1](https://github.com/hmdc/sid2/compare/2022.3.2-dev.1...2022.3.3-dev.1) (2022-03-14)


### Features

* **dashboard:** gh [#605](https://github.com/hmdc/sid2/issues/605) added HTTPS support + increased Apache timeout ([#40](https://github.com/hmdc/sid2/issues/40)) ([387a2e7](https://github.com/hmdc/sid2/commit/387a2e793419a5d1f68764f18149c0e28f2b39c8))

## [2022.3.2-dev.1](https://github.com/hmdc/sid2/compare/2022.3.1-dev.1...2022.3.2-dev.1) (2022-03-08)

## [2022.3.1-dev.1](https://github.com/hmdc/sid2/compare/2022.2.6-dev.1...2022.3.1-dev.1) (2022-03-03)


### Bug Fixes

* **landing-page:** GH [#573](https://github.com/hmdc/sid2/issues/573) Fixes to build command and login URL ([#52](https://github.com/hmdc/sid2/issues/52)) ([be91273](https://github.com/hmdc/sid2/commit/be912739fbace84ea833528e9f91d60eaa42fe9f))

## [2022.2.6-dev.1](https://github.com/hmdc/sid2/compare/2022.2.5-dev.1...2022.2.6-dev.1) (2022-02-24)


### Features

* **Documentation updates:** gh [#594](https://github.com/hmdc/sid2/issues/594) added documentation on how to update the Slurm and OOD version ([#43](https://github.com/hmdc/sid2/issues/43)) ([f93a44b](https://github.com/hmdc/sid2/commit/f93a44bdd55606e1f2a2cafdd131fd1ab61078a3))

## [2022.2.5-dev.1](https://github.com/hmdc/sid2/compare/2022.2.4-dev.1...2022.2.5-dev.1) (2022-02-23)


### Bug Fixes

* **dashboard:** gh [#647](https://github.com/hmdc/sid2/issues/647) Fixed FASSE remote desktop configuration ([#49](https://github.com/hmdc/sid2/issues/49)) ([70f0f67](https://github.com/hmdc/sid2/commit/70f0f67368bd63e095fc9ee3c8175e630a12e88d))

## [2022.2.4-dev.1](https://github.com/hmdc/sid2/compare/2022.2.3-dev.1...2022.2.4-dev.1) (2022-02-04)


### Features

* **dashboard:** gh [#492](https://github.com/hmdc/sid2/issues/492) Added visual feedback when launchers are disabled ([#41](https://github.com/hmdc/sid2/issues/41)) ([d023c5e](https://github.com/hmdc/sid2/commit/d023c5e294171f4a5d608190eea3f2667b9861ec))

## [2022.2.3-dev.1](https://github.com/hmdc/sid2/compare/2022.2.2-dev.1...2022.2.3-dev.1) (2022-02-04)


### Bug Fixes

* **test:** GH [#643](https://github.com/hmdc/sid2/issues/643) test changelog message syntax ([#48](https://github.com/hmdc/sid2/issues/48)) ([e67b94a](https://github.com/hmdc/sid2/commit/e67b94aed03b3a032ec8c15b72b59edaebf99483))

## [2022.2.2-dev.1](https://github.com/hmdc/sid2/compare/2022.2.1-dev.1...2022.2.2-dev.1) (2022-02-04)


### Bug Fixes

* **test:** GH [#643](https://github.com/hmdc/sid2/issues/643) [#644](https://github.com/hmdc/sid2/issues/644) test multi-commit PR -- first line of squash merge ([e7fd0e3](https://github.com/hmdc/sid2/commit/e7fd0e39e3dd4894999c34d54974c394de7ba9a6))


### BREAKING CHANGES

* **test:** GH #643 this will require another update to workflow doc

## [2022.2.1-dev.1](https://github.com/hmdc/sid2/compare/2022.1.2-dev.1...2022.2.1-dev.1) (2022-02-04)


### Bug Fixes

* **test:** GH [#643](https://github.com/hmdc/sid2/issues/643) test single-commit PR ([#46](https://github.com/hmdc/sid2/issues/46)) -- first line of squash merge ([7d3891f](https://github.com/hmdc/sid2/commit/7d3891ffef150f89b76a86ab3e5931a221003d9d))


### BREAKING CHANGES

* **test:** GH #643 this will require an update to workflow doc

## [2022.1.2-dev.1](https://github.com/hmdc/sid2/compare/2022.1.1-dev.1...2022.1.2-dev.1) (2022-01-26)

## [2022.1.1-dev.1](https://github.com/hmdc/sid2/compare/2021.11.4-dev.1...2022.1.1-dev.1) (2022-01-10)


### Bug Fixes

* **build:** sync CHANGELOG with stable after merge [skip actions] ([dc1ca05](https://github.com/hmdc/sid2/commit/dc1ca05a226bda548f87c8b4ccc52ec297f1fb88))


### Features

* **dashboard:** gh [#565](https://github.com/hmdc/sid2/issues/565) Added proxy support for RT client ([#38](https://github.com/hmdc/sid2/issues/38)) ([fffeb01](https://github.com/hmdc/sid2/commit/fffeb015361859a21774dde88d10e22c7d9a5d5a))

## [2021.11.4-dev.1](https://github.com/hmdc/sid2/compare/2021.11.3-dev.1...2021.11.4-dev.1) (2021-11-18)


### Features

* **landing-page:** gh [#328](https://github.com/hmdc/sid2/issues/328) Fixed github actions script for test and build ([8002031](https://github.com/hmdc/sid2/commit/80020314ebe3d2d034009fdf77a217edaf111874))

## [2021.11.3-dev.1](https://github.com/hmdc/sid2/compare/2021.11.2-dev.1...2021.11.3-dev.1) (2021-11-18)


### Features

* **landing-page:** gh [#328](https://github.com/hmdc/sid2/issues/328) Added new homepage for sid.harvard.edu site ([#29](https://github.com/hmdc/sid2/issues/29)) ([7c82e6a](https://github.com/hmdc/sid2/commit/7c82e6ac5d0258032118c7811924997b06499748))

## [2021.11.2-dev.1](https://github.com/hmdc/sid2/compare/2021.11.1-dev.1...2021.11.2-dev.1) (2021-11-01)


### Bug Fixes

* **build:** fixed JS syntax to conform with Rails asset minification and obfuscation process ([69ecd8b](https://github.com/hmdc/sid2/commit/69ecd8b117679cf541313e12b186102664686439))

### Features

* **dashboard:** gh [#450](https://github.com/hmdc/sid2/issues/450) Added FASRC cluster status to Sid homepage ([#32](https://github.com/hmdc/sid2/issues/32)) ([f8ea4ab](https://github.com/hmdc/sid2/commit/f8ea4ab11a77aabcd1285cf5e1620a744d8b4142))

## [2021.11.1-dev.1](https://github.com/hmdc/sid2/compare/2021.10.9-dev.1...2021.11.1-dev.1) (2021-11-01)


### Features

* **dashboard:** gh [#568](https://github.com/hmdc/sid2/issues/568) Added OOD and Sid version numbers to sid dashboard footer ([#27](https://github.com/hmdc/sid2/issues/27)) ([48b277c](https://github.com/hmdc/sid2/commit/48b277c4f4cf3c0ff5493f21e03dcbd697317479))

## [2021.10.10](https://github.com/hmdc/sid2/compare/2021.10.8...2021.10.10) (2021-10-28)


## [2021.10.9-dev.1](https://github.com/hmdc/sid2/compare/2021.10.6-dev.1...2021.10.9-dev.1) (2021-10-28)


### Bug Fixes

* **build:** fixed JS syntax to pass Rails FE assessts minification and obfuscation process ([832c56c](https://github.com/hmdc/sid2/commit/832c56cb368872e5210047e441dad169d6eaa4fe))


### Features

* **dashboard:** gh [#525](https://github.com/hmdc/sid2/issues/525), [#528](https://github.com/hmdc/sid2/issues/528), [#438](https://github.com/hmdc/sid2/issues/438) Added enhanced information + new flow to create support ticket ([3a79cd1](https://github.com/hmdc/sid2/commit/3a79cd1e34a542d315a039ef7d1709ae2a33d480))

## [2021.10.8](https://github.com/hmdc/sid2/compare/2021.10.7...2021.10.8) (2021-10-20)


### Bug Fixes

* **build:** gh [#575](https://github.com/hmdc/sid2/issues/575) - QA cleanup ([9374136](https://github.com/hmdc/sid2/commit/9374136171fb5adb83d5bf78073412324a441610))

## [2021.10.7](https://github.com/hmdc/sid2/compare/2021.10.6...2021.10.7) (2021-10-20)


### Bug Fixes

* **build:** QA CHANGELOG ([847756d](https://github.com/hmdc/sid2/commit/847756d5b79e74a091a21a23c1d93d9d7449f256))

## [2021.10.6](https://github.com/hmdc/sid2/compare/2021.10.5...2021.10.6) (2021-10-20)


## [2021.10.6-dev.1](https://github.com/hmdc/sid2/compare/2021.10.4-dev.1...2021.10.6-dev.1) (2021-10-20)


## [2021.10.5](https://github.com/hmdc/sid2/compare/2021.10.3...2021.10.5) (2021-10-20)


### Bug Fixes

* **build:** QA CHANGELOG generation ([3ad40e5](https://github.com/hmdc/sid2/commit/3ad40e5c2aed86b66e923efb6cfafefd035fd019))

## [2021.10.4-dev.1](https://github.com/hmdc/sid2/compare/2021.10.2-dev.1...2021.10.4-dev.1) (2021-10-20)


### Bug Fixes

* **build:** QA CHANGELOG generation ([bea3b4d](https://github.com/hmdc/sid2/commit/bea3b4d5abb3e4e5cc01c9e46df4cf06b2c397d5))

## [2021.10.3](https://github.com/hmdc/sid2/compare/2021.10.2...2021.10.3) (2021-10-19)


### Bug Fixes

* **build:** address changelog generation bug ([43104d2](https://github.com/hmdc/sid2/commit/43104d28d16138fc53dd026f7f06507b3d1c6159))

## [2021.10.2](https://github.com/hmdc/sid2/compare/2021.10.8...2021.10.10) (2021-10-07)


* **build:** fixed JS syntax to conform with Rails asset minification and obfuscation process ([69ecd8b](https://github.com/hmdc/sid2/commit/69ecd8b117679cf541313e12b186102664686439))


### Features

* **dashboard:** gh [#450](https://github.com/hmdc/sid2/issues/450) Added FASRC cluster status to Sid homepage ([#32](https://github.com/hmdc/sid2/issues/32)) ([f8ea4ab](https://github.com/hmdc/sid2/commit/f8ea4ab11a77aabcd1285cf5e1620a744d8b4142))

## [2021.10.2-dev.1](https://github.com/hmdc/sid2/compare/2021.10.1-dev.1...2021.10.2-dev.1) (2021-10-19)


### Bug Fixes

* **build:** changelog should generate properly ([bbe560a](https://github.com/hmdc/sid2/commit/bbe560ae98c7e437e8cc69db7a9533d14b26950a))
* **build:** i forgot fi ([bed1477](https://github.com/hmdc/sid2/commit/bed14778dac99f98fff2382ce132852818572a81))

## [2021.10.1-dev.1](https://github.com/hmdc/sid2/compare/2021.9.15...2021.10.1-dev.1) (2021-10-07)


### Features

* **dashboard:** gh [#572](https://github.com/hmdc/sid2/issues/572) Removed Sid form FASRC navigation ([74ea007](https://github.com/hmdc/sid2/commit/74ea00728a57470eed55c35620a281035c986142))

## [2021.9.15](https://github.com/hmdc/sid2/compare/2021.9.13-dev.1...2021.9.15) (2021-09-30)


### Bug Fixes

* **build:** added automatic installation of husky following npm install ([4c420d5](https://github.com/hmdc/sid2/commit/4c420d54b0102803a5adf9501173626072898974))
* **build:** completing merge by integrating canary branch ([0dd7a23](https://github.com/hmdc/sid2/commit/0dd7a23b37cc6b4feebab18ae2835b00bd69c8a9))
* **build:** properly increment version in stable ([0ceada9](https://github.com/hmdc/sid2/commit/0ceada9c00fdc05dc1619fa662cbd0f8d9f74472))
* **build:** version increment works properly ([0796514](https://github.com/hmdc/sid2/commit/079651496dcf6a2589bf3bac02d74eb9a37ede52))
* **documentation:** change wording ([#25](https://github.com/hmdc/sid2/issues/25)) ([762f0dd](https://github.com/hmdc/sid2/commit/762f0dd475ca0151b04346eff88bbcc5ce06ab41))


### Features

* **build:** added disjointed continuous delivery process via Puppet ([ef9b008](https://github.com/hmdc/sid2/commit/ef9b008fd4945ab20954f9b2fdc9211821520cc1))
* **build:** monorepo build ([ad7c7e8](https://github.com/hmdc/sid2/commit/ad7c7e811c337b67e441d90b2e0194451d56de63))

## [2021.9.13-dev.1](https://github.com/hmdc/sid2/compare/2021.9.12-dev.1...2021.9.13-dev.1) (2021-09-22)


### Bug Fixes

* **documentation:** change wording ([#25](https://github.com/hmdc/sid2/issues/25)) ([93b2414](https://github.com/hmdc/sid2/commit/93b2414fb884216e756bc4495e4fa2bbf1b4d33d))

## [2021.9.12-dev.1](https://github.com/hmdc/sid2/compare/2021.9.11-dev.1...2021.9.12-dev.1) (2021-09-22)


### Bug Fixes

* **build:** version increment works properly in stable but we need carrotization of the entire seq ([04bc854](https://github.com/hmdc/sid2/commit/04bc8546bf9c776c5879c0b938accfec12535af6))

## [2021.9.11-dev.1](https://github.com/hmdc/sid2/compare/2021.9.10-dev.1...2021.9.11-dev.1) (2021-09-21)


### Bug Fixes

* **build:** version increment works properly ([4bdf32c](https://github.com/hmdc/sid2/commit/4bdf32c085dcc8d38ad405ef8dc7f36d11901c13))

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
