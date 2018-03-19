const getPlugins = (packageJson) => {
  if (!packageJson) {
    return [];
  }
  const deps = Object.keys(packageJson.devDependencies);
  if (!deps) {
    return [];
  }

  return deps.filter(dep => dep.startsWith("webdash-"));
}

module.exports = getPlugins;