module.exports = {
  run: [
    {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/Kijai/HunyuanVideo_comfy/resolve/main/hunyuan_video_720_cfgdistill_fp8_e4m3fn.safetensors?download=true",
        dir: "app/models/diffusion_models"
      }
    },
    {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/Kijai/HunyuanVideo_comfy/resolve/main/hunyuan_video_vae_bf16.safetensors?download=true",
        dir: "app/models/vae"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app/models/LLM",
        message: "huggingface-cli download Kijai/llava-llama-3-8b-text-encoder-tokenizer --local-dir llava-llama-3-8b-text-encoder-tokenizer"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app/models/clip",
        message: "huggingface-cli download openai/clip-vit-large-patch14 --local-dir clip-vit-large-patch14"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app/custom_nodes",
        message: [
          "git clone https://github.com/kijai/ComfyUI-HunyuanVideoWrapper"
        ],
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "../../env",
        path: "app/custom_nodes/ComfyUI-HunyuanVideoWrapper",
        message: [ "pip install -r requirements.txt", ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "https://github.com/pinokiofactory/comfy.git/app/custom_nodes",
        message: [ "git clone https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite" ],
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "../../env",
        path: "app/custom_nodes/ComfyUI-VideoHelperSuite",
        message: [ "pip install -r requirements.txt", ]
      }
    },
    {
      "method": "shell.run",
      "params": {
        "message": [
          "git clone https://github.com/cocktailpeanut/comfy_json_workflow"
        ],
        "path": "app/user/default/workflows"
      }
    },
    {
      "method": "shell.run",
      "params": {
        "message": [
          "git pull"
        ],
        "path": "app/user/default/workflows/comfy_json_workflow"
      }
    }
  ]
}
