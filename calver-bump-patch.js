const branchName = require("current-git-branch");
const CalverPlugin = require("@csmith/release-it-calver-plugin");
const calver = require('calver');

// This overloaded class is necessary because of a bug in @csmith/release-it-calver-plugin

class VersionAppendModifier extends CalverPlugin {

  getIncrementedVersion({ latestVersion }) {
    const { branches } = this.getContext();
    const format = this.getFormat();
    const globalIncFormat = branches?.["*"]?.split(">");
    const incFormat = branches?.[`${branchName()}`]?.split(">") || globalIncFormat;
    var version = latestVersion;

    calver.init(format);

    if (incFormat) {
      var version;
      for (const f of incFormat) {
        try {
          version = calver.inc(format, version, f)
        } catch { }
      }
      return version;
    }

    return calver.inc(format, latestVersion, 'micro');
  }


}

module.exports = VersionAppendModifier;