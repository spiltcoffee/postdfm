function gatherObjects(object) {
  return [].concat(object, object.children.map(child => gatherObjects(child)));
}

function gatherProperties(object) {
  const objects = gatherObjects(object);

  return objects.reduce((properties, object) => {
    return [].concat(properties, object.properties);
  }, []);
}

function visitProperties(object, callback) {
  gatherProperties(object).forEach(property => callback(property));
}

module.exports = ast => {
  visitProperties(ast.child, property => {
    property.name = property.name
      .split("")
      .reverse()
      .join("");
  });

  return ast;
};
