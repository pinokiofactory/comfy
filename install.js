const arm64 = require('./initialize-models-mac-arm64')
const nvidia = require('./initialize-models-nvidia')
const d = require('./initialize-models-default')
const flux = require('./download-flux-schnell-fp8.json')
const flux_merged = require('./download-flux-merged-fp8.json')
module.exports = async (kernel, info) => {
  let run = [
    {
      method: "shell.run",
      params: {
        message: "git clone https://github.com/comfyanonymous/ComfyUI app"
      }
    },
    {
      method: "shell.run",
      params: {
        message: "git clone https://github.com/comfyanonymous/ComfyUI_examples",
        path: "workflows"
      }
    },
    {
      method: "shell.run",
      params: {
        message: "git clone https://github.com/ltdrdata/ComfyUI-Manager",
        path: "app/custom_nodes"
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install -r requirements.txt",
          "uv pip install -U bitsandbytes"
        ]
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app",
          // xformers: true
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
    {
      "when": "{{['true', '1'].includes(String(env.FLUX_AUTODOWNLOAD).toLowerCase())}}",      
      "method": "script.start",
      "params": {
        "uri": "hf.json",
        "params": {
          "repo": "Comfy-Org/flux1-schnell",
          "files": "flux1-schnell-fp8.safetensors",
          "path": "app/models/checkpoints"
        }
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        env: {
          PYTORCH_ENABLE_MPS_FALLBACK: "1",
          TOKENIZERS_PARALLELISM: "false"
        },
        path: "app",
        message: [
          "{{platform === 'win32' && gpu === 'amd' ? 'python main.py --directml' : 'python main.py'}}"
        ],
        on: [{
          "event": "/http:\/\/[a-zA-Z0-9.]+:[0-9]+/",
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
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/comfyanonymous/ComfyUI_examples"
        ],
        path: "app/user/default/workflows"
      }
    },
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/cocktailpeanut/comfy_json_workflow"
        ],
        path: "app/user/default/workflows"
      }
    }
  ]
  return {
    run,
    requires: {
      bundle: "ai",
    }
  }
}
