
let definitions = {
  profile: {
    name: { update: null },
    description: { update: null },
    url: { update: null },
    location: { update: null }
  },
  user: {
    request: null,
    success: null,
    error: null
  }
};

function assignValue(tree, stack) {
  if (tree == null) {
    stack.pop();
    return stack.reduce((x, y) => x + '.' + y, stack);
  }
  else {
    for (let key in tree) {
      stack.push(key);
      tree[key] = assignValue(tree[key], stack);
    }
    stack.pop();
    return tree;
  }
}

const instance = assignValue(definitions, []);
export default instance;
