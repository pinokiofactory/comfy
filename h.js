module.exports = {
  run: [
    // Edit this step with your custom install commands
    {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/Kijai/HunyuanVideo_comfy/resolve/main/hunyuan_video_720_cfgdistill_fp8_e4m3fn.safetensors?download=true",
        dir: "https://github.com/pinokiofactory/comfy.git/app/models/diffusion_models"
      }
    },
    {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/Kijai/HunyuanVideo_comfy/resolve/main/hunyuan_video_vae_bf16.safetensors?download=true",
        dir: "https://github.com/pinokiofactory/comfy.git/app/models/vae"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "https://github.com/pinokiofactory/comfy.git/app/models/LLM",
        message: "huggingface-cli download Kijai/llava-llama-3-8b-text-encoder-tokenizer --local-dir llava-llama-3-8b-text-encoder-tokenizer"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "https://github.com/pinokiofactory/comfy.git/app/models/clip",
        message: "huggingface-cli download openai/clip-vit-large-patch14 --local-dir clip-vit-large-patch14"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "https://github.com/pinokiofactory/comfy.git/app/custom_nodes",
        message: [
          "git clone https://github.com/kijai/ComfyUI-HunyuanVideoWrapper"
        ],
      }
    },
    {
      method: "fs.copy",
      params: {
        src: "https://github.com/pinokiofactory/comfy.git/app/custom_nodes/ComfyUI-HunyuanVideoWrapper/examples/hyvideo_t2v_example_01.json",
        dest: "https://github.com/pinokiofactory/comfy.git/app/user/default/workflows/hunyuanvideo/hyvideo_t2v_example_01.json",
      }
    },
    {
      method: "fs.copy",
      params: {
        src: "https://github.com/pinokiofactory/comfy.git/app/custom_nodes/ComfyUI-HunyuanVideoWrapper/examples/hyvideo_v2v_example_01.json",
        dest: "https://github.com/pinokiofactory/comfy.git/app/user/default/workflows/hunyuanvideo/hyvideo_v2v_example_01.json"
      }
    }
    //{
    //  method: "fs.link",
    //  params: {
    //    venv: "env"
    //  }
    //}
  ]
}
