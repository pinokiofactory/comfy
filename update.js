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
    when: "{{!exists('app/user/default/workflows/ComfyUI_examples')}}",
    method: "shell.run",
    params: {
      message: [
        "git clone https://github.com/comfyanonymous/ComfyUI_examples"
      ],
      path: "app/user/default/workflows"
    }
  }, {
    when: "{{!exists('app/user/default/workflows/comfy_json_workflow')}}",
    method: "shell.run",
    params: {
      message: [
        "git clone https://github.com/cocktailpeanut/comfy_json_workflow"
      ],
      path: "app/user/default/workflows"
    }
  }, {
    when: "{{!exists('app/custom_nodes/ComfyUI-Manager')}}",
    method: "shell.run",
    params: {
      message: "git clone https://github.com/ltdrdata/ComfyUI-Manager",
      path: "app/custom_nodes"
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
        "git pull"
      ],
      path: "app/user/default/workflows/comfy_json_workflow"
    }
  }, {
    method: "shell.run",
    params: {
      path: "app/custom_nodes/ComfyUI-Manager",
      message: "git pull"
    }
  }, {
    method: "shell.run",
    params: {
      path: "app",
      venv: "env",
      message: [
        "uv pip install -r requirements.txt"
      ],
    }
  }]
}
