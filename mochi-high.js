{
  "run": [{
    "method": "script.start",
    "params": {
      "uri": "hf.json",
      "params": {
        "repo": "Comfy-Org/mochi_preview_repackaged",
        "files": "split_files/diffusion_models/mochi_preview_bf16.safetensors"
        "path": "app/models/diffusion_model"
      }
    }
  }, {
    "method": "script.start",
    "params": {
      "uri": "hf.json",
      "params": {
        "repo": "Comfy-Org/mochi_preview_repackaged",
        "files": "split_files/text_encoders/t5xxl_fp16.safetensors",
        "path": "app/models/clip"
      }
    }
  }, {
    "method": "script.start",
    "params": {
      "uri": "hf.json",
      "params": {
        "repo": "Comfy-Org/mochi_preview_repackaged",
        "files": "split_files/vae/mochi_vae.safetensors",
        "path": "app/models/vae"
      }
    }
  }]
}
