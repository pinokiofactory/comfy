const d = require('./initialize-models-default')
module.exports = async (kernel, info) => {
  let run = [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/comfyanonymous/ComfyUI app",
        ]
      }
    },
    {
      "method": "shell.run",
      "params": {
        "message": [
          "git clone https://github.com/ltdrdata/ComfyUI-Manager",
        ],
        "path": "app/custom_nodes"
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "uv pip install -r requirements.txt",
          "uv pip install -U bitsandbytes"
        ]
      }
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",                // Edit this to customize the venv folder path
          path: "app",                // Edit this to customize the path to start the shell from
          // xformers: true   // uncomment this line if your project requires xformers
        }
      }
    },
    {
      "method": "fs.link",
      "params": {
        "drive": {
          "checkpoints": "app/models/checkpoints",
          "clip": "app/models/clip",
          "clip_vision": "app/models/clip_vision",
          "configs": "app/models/configs",
          "controlnet": "app/models/controlnet",
          "embeddings": "app/models/embeddings",
          "loras": "app/models/loras",
          "upscale_models": "app/models/upscale_models",
          "vae": "app/models/vae",
          "vae_approx": "app/models/VAE-approx",
          "diffusers": "app/models/diffusers",
          "unet": "app/models/unet",
          "hypernetworks": "app/models/hypernetworks",
          "gligen": "app/models/gligen",
          "style_models": "app/models/style_models",
          "photomaker": "app/models/photomaker"
        },
        "peers": [
          "https://github.com/cocktailpeanut/fluxgym.git",
          "https://github.com/cocktailpeanutlabs/automatic1111.git",
          "https://github.com/cocktailpeanutlabs/fooocus.git",
          "https://github.com/cocktailpeanutlabs/comfyui.git",
          "https://github.com/pinokiofactory/stable-diffusion-webui-forge.git"
        ]
      }
    },
    {
      "method": "fs.link",
      "params": {
        "drive": {
          "output": "app/output"
        }
      }
    },
//    {
//      "method": "fs.link",
//      "params": {
//        "venv": "app/env"
//      }
//    },
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        env: {
          PYTORCH_ENABLE_MPS_FALLBACK: "1",
          TOKENIZERS_PARALLELISM: "false"
        },                   // Edit this to customize environment variables (see documentation)
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          //"{{platform === 'win32' && gpu === 'amd' ? 'python main.py --directml --front-end-version Comfy-Org/ComfyUI_frontend@1.2.20' : 'python main.py --front-end-version Comfy-Org/ComfyUI_frontend@1.2.20'}}"
          "{{platform === 'win32' && gpu === 'amd' ? 'python main.py --directml' : 'python main.py'}}"
        ],
        on: [{
          // The regular expression pattern to monitor.
          // When this pattern occurs in the shell terminal, the shell will return,
          // and the script will go onto the next step.
          "event": "/http:\/\/[a-zA-Z0-9.]+:[0-9]+/",   

          // "done": true will move to the next step while keeping the shell alive.
          // "kill": true will move to the next step after killing the shell.
          "kill": true
        }, {
          "event": "/errno/i",
          "break": false
        }, {
          "event": "/error:/i",
          "break": false
        }]
      }
    },
  ]
  return { run }
}
