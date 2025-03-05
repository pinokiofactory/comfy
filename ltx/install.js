module.exports = {
  run: [
    {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/Lightricks/LTX-Video/resolve/main/ltx-video-2b-v0.9.5.safetensors",
        dir: "../app/models/checkpoints"
      }
    },
    {
      when: "{{platform === 'darwin'}}",
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/Comfy-Org/mochi_preview_repackaged/resolve/main/split_files/text_encoders/t5xxl_fp16.safetensors",
        dir: "../app/models/clip",
      }
    },
    {
      when: "{{platform !== 'darwin'}}",
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/Comfy-Org/mochi_preview_repackaged/resolve/main/split_files/text_encoders/t5xxl_fp8_e4m3fn_scaled.safetensors?download=true",
        dir: "../app/models/clip",
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
