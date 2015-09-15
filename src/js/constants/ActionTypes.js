import keyMirror from 'keymirror';

let definitions = {
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
    for (let key of tree) {
      tree[key] = assignValue(tree[key], stack.push(key));
    }
    stack.pop();
    return tree;
  }
}

export default keyMirror({
  REQUEST_USER: null,
  REQUEST_USER_SUCCESS: null,
  REQUEST_USER_ERROR: null,

  REQUEST_REPO: null,
  REQUEST_REPO_SUCCESS: null,
  REQUEST_REPO_ERROR: null,

  REQUEST_STARRED_REPOS_PAGE: null,
  REQUEST_STARRED_REPOS_PAGE_SUCCESS: null,
  REQUEST_STARRED_REPOS_PAGE_ERROR: null,

  REQUEST_STARGAZER_PAGE: null,
  REQUEST_STARGAZER_PAGE_SUCCESS: null,
  REQUEST_STARGAZER_PAGE_ERROR: null
});
