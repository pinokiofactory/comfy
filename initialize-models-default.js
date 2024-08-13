module.exports = {
  "run": [
    {
      "method": "script.start",
      "params": {
        "uri": "hf.json",
        "params": {
          "repo": "stabilityai/stable-diffusion-xl-base-1.0",
          "files": "sd_xl_base_1.0.safetensors",
          "path": "app/models/checkpoints"
        }
      }
    }
  ]
}
