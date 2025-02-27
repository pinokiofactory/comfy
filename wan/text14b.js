module.exports = {
  run: [
    {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/Comfy-Org/Wan_2.1_ComfyUI_repackaged/resolve/main/split_files/diffusion_models/wan2.1_t2v_14B_bf16.safetensors",
        dir: "../app/models/diffusion_models"
      }
    },
    {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/Comfy-Org/Wan_2.1_ComfyUI_repackaged/resolve/main/split_files/text_encoders/umt5_xxl_fp8_e4m3fn_scaled.safetensors?download=true",
        dir: "../app/models/text_encoders",
      }
    },
    {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/Comfy-Org/Wan_2.1_ComfyUI_repackaged/resolve/main/split_files/clip_vision/clip_vision_h.safetensors?download=true",
        dir: "../app/models/clip_vision",
      }
    },
    {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/Comfy-Org/Wan_2.1_ComfyUI_repackaged/resolve/main/split_files/vae/wan_2.1_vae.safetensors?download=true",
        dir: "../app/models/vae"
      }
    },
    {
      "method": "shell.run",
      "params": {
        "message": [
          "git clone https://github.com/cocktailpeanut/comfy_json_workflow"
        ],
        "path": "../app/user/default/workflows"
      }
    },
    {
      "method": "shell.run",
      "params": {
        "message": [
          "git pull"
        ],
        "path": "../app/user/default/workflows/comfy_json_workflow"
      }
    }
  ]
}
