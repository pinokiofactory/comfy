module.exports = {
  run: [{
    method: "shell.run",
    params: {
      message: "git pull"
    }
  }, {
    method: "shell.run",
    params: {
      path: "app",
      message: "git pull"
    }
  }, {
    method: "shell.run",
    params: {
      message: [
        "git clone https://github.com/comfyanonymous/ComfyUI_examples"
      ],
      path: "app/user/default/workflows"
    }
  }, {
    method: "shell.run",
    params: {
      message: [
        "git pull"
      ],
      path: "app/user/default/workflows/ComfyUI_examples"
    }
  }, {
    method: "shell.run",
    params: {
      message: [
        "git clone https://github.com/cocktailpeanut/comfy_json_workflow"
      ],
      path: "app/user/default/workflows"
    }
  }, {
    method: "shell.run",
    params: {
      message: [
        "git pull"
      ],
      path: "app/user/default/workflows/comfy_json_workflow"
    }
  }]
}
