const branchName = require("current-git-branch");
const CalverPlugin = require("@csmith/release-it-calver-plugin");
const calver = require('calver');

// This overloaded class is necessary because of a bug in @csmith/release-it-calver-plugin

class VersionAppendModifier extends CalverPlugin {

  getIncrementedVersion({ latestVersion }) {
    calver.init(this.getFormat());

    if (branchName() === "canary") return calver.inc(this.getFormat(), latestVersion, 'dev');

    try {
      return calver.inc(this.getFormat(), latestVersion, 'calendar');
    } catch (e) {
      return calver.inc(this.getFormat(), latestVersion, 'micro');
    }
  }


}

module.exports = VersionAppendModifier;