const arm64 = require('./initialize-models-mac-arm64')
const nvidia = require('./initialize-models-nvidia')
const d = require('./initialize-models-default')
//const flux_full = require('./download-flux-schnell.json')
const flux = require('./download-flux-schnell-fp8.json')
const flux_merged = require('./download-flux-merged-fp8.json')
module.exports = async (kernel, info) => {
  let run = [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/comfyanonymous/ComfyUI app",
          "conda install -y conda-forge::huggingface_hub",
        ]
      }
    },
//    {
//      // not working on macs so need to rever back to the version where it worked
//      when: "{{platform === 'darwin'}}",
//      method: "shell.run",
//      params: {
//        path: "app",
//        message: [
//          "git checkout 1c08bf35b49879115dedd8ec6bc92d9e8d8fd871"
//        ]
//      }
//    },
//    {
//      "method": "shell.run",
//      "params": {
//        "message": [
//          "git clone https://github.com/comfyanonymous/ComfyUI_examples"
//        ],
//        "path": "app/custom_nodes"
//      }
//    },
    {
      "method": "shell.run",
      "params": {
        "message": [
          "git clone https://github.com/comfyanonymous/ComfyUI_examples"
        ],
        "path": "workflows"
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
//    {
//      "method": "shell.run",
//      "params": {
//        "message": [
//          "git clone https://github.com/city96/ComfyUI-GGUF"
//        ],
//        "path": "app/custom_nodes"
//      }
//    },
//    {
//      "method": "shell.run",
//      "params": {
//        "venv": "../../env",
//        "path": "app/custom_nodes/ComfyUI-GGUF",
//        "message": [
//          "pip install -r requirements.txt"
//        ],
//      }
//    },
//    {
//      "when": "{{gpu === 'nvidia'}}",
//      "method": "shell.run",
//      "params": {
//        "message": [
//          "git clone https://github.com/comfyanonymous/ComfyUI_bitsandbytes_NF4.git"
//        ],
//        "path": "app/custom_nodes"
//      }
//    },
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
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "pip install -r requirements.txt",
          "pip install -U bitsandbytes"
        ]
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
          "https://github.com/pinokiofactory/comfy.git",
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
  ]
  //if (kernel.platform === "darwin") {
  //  run = run.concat(flux.run)
  //} else {
  //  run = run.concat(flux_merged.run)
  //}
  run = run.concat(flux.run)
//  if (kernel.platform === 'darwin' && kernel.arch === "arm64") {
//    run = run.concat(arm64.run)
//  } else if (kernel.platform === 'darwin' && kernel.arch === "x64") {
//    run = run.concat(arm64.run)
//    //run = run.concat(d.run)
//  } else if (kernel.gpu === 'nvidia') {
//    run = run.concat(nvidia.run)
//  } else {
//    run = run.concat(d.run)
//  }

//  run = run.concat([
//    {
//      method: "shell.run",
//      params: {
//        venv: "env",                // Edit this to customize the venv folder path
//        env: { },                   // Edit this to customize environment variables (see documentation)
//        path: "app",                // Edit this to customize the path to start the shell from
//        message: [
//          "{{platform === 'win32' && gpu === 'amd' ? 'python main.py --directml --front-end-version Comfy-Org/ComfyUI_frontend@1.2.20' : 'python main.py --front-end-version Comfy-Org/ComfyUI_frontend@1.2.20'}}"
//        ],
//        on: [{
//          // The regular expression pattern to monitor.
//          // When this pattern occurs in the shell terminal, the shell will return,
//          // and the script will go onto the next step.
//          "event": "/http:\/\/\\S+/",   
//
//          // "done": true will move to the next step while keeping the shell alive.
//          // "kill": true will move to the next step after killing the shell.
//          "done": true
//        }]
//      }
//    },
//  ])
  return { run }
}
