const path = require('path')
module.exports = {
  version: "2.0",
  title: "Comfyui",
  description: "The most powerful and modular diffusion model GUI, api and backend with a graph/nodes interface. https://github.com/comfyanonymous/ComfyUI",
  icon: "icon.jpeg",
  menu: async (kernel, info) => {
    let installed = info.exists("app/env")
    let running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      update: info.running("update.js"),
      reset: info.running("reset.js")
    }
    let downloading = [
      "download-flux-dev-gguf-q4-0.json",
      "download-flux-schnell-gguf-q4-0.json",
      "download-flux-dev-fp8.json",
      "download-flux-dev-nf4.json",
      "download-flux-dev.json",
      "download-flux-merged-fp8.json",
      "download-flux-schnell-fp8.json",
      "download-flux-schnell-nf4.json",
      "download-flux-schnell.json",
      "download-sdxl.json",
      "download-turbo.json",
      "download-svd-xt-1.1.json",
      "download-svd-xt.json",
      "download-svd.json",
      "download-lcm-lora.json",
      "download-sd15.json",
      "download-sd21.json",
      "mochi.json",
      "mochi-lite.json",
      "mochi-high.json",
      "download.json"
    ]
    let is_downloading = null
    for(let item of downloading) {
      let d = info.running(item)
      if (d === true) {
        is_downloading = item
        break;
      }
    }
    if (running.install) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
      if (running.start) {
        let local = info.local("start.js")
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url,
          }, {
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }]
        } else {
          return [{
            default: true,
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }]
        }
      } else if (is_downloading) {
        return [{
          default: true,
          icon: 'fa-solid fa-terminal',
          text: "Downloading",
          href: is_downloading,
        }]
      } else if (running.update) {
        return [{
          default: true,
          icon: 'fa-solid fa-terminal',
          text: "Updating",
          href: "update.js",
        }]
      } else if (running.reset) {
        return [{
          default: true,
          icon: 'fa-solid fa-terminal',
          text: "Resetting",
          href: "reset.js",
        }]
      } else {
        return [{
          default: true,
          icon: "fa-solid fa-power-off",
          text: "Start",
          href: "start.js",
        }, {
          icon: "fa-solid fa-bolt",
          text: "Quick Installers",
          menu: [{
            text: "mochi",
            href: "mochi.json"
          }, {
            text: "mochi low VRAM",
            href: "mochi-lite.json"
          }, {
            text: "mochi high VRAM",
            href: "mochi-high.json"
          }]
        }, {
          icon: "fa-solid fa-download",
          text: "Download Models",
          menu: [
            { text: "Download by URL", icon: "fa-solid fa-download", href: "download.html?raw=true" },
            { text: "Flux1 Dev gguf q4_0", icon: "fa-solid fa-download", href: "download-flux-dev-gguf-q4-0.json", mode: "refresh" },
            { text: "Flux1 Schnell gguf q4_0", icon: "fa-solid fa-download", href: "download-flux-schnell-gguf-q4-0.json", mode: "refresh" },
            { text: "Flux 1 Dev nf4", icon: "fa-solid fa-download", href: "download-flux-dev-nf4.json", mode: "refresh" },
            { text: "Flux 1 Schnell nf4", icon: "fa-solid fa-download", href: "download-flux-schnell-nf4.json", mode: "refresh" },
            { text: "Flux 1 Dev fp8", icon: "fa-solid fa-download", href: "download-flux-dev-fp8.json", mode: "refresh" },
            { text: "Flux 1 Schnell fp8", icon: "fa-solid fa-download", href: "download-flux-schnell-fp8.json", mode: "refresh" },
            { text: "Flux 1 Dev", icon: "fa-solid fa-download", href: "download-flux-dev.json", mode: "refresh" },
            { text: "Flux 1 Schnell", icon: "fa-solid fa-download", href: "download-flux-schnell.json", mode: "refresh" },
            { text: "SDXL", icon: "fa-solid fa-download", href: "download-sdxl.json", mode: "refresh" },
            { text: "SDXL Turbo", icon: "fa-solid fa-download", href: "download-turbo.json", mode: "refresh" },
            { text: "Stable Video XT 1.1", icon: "fa-solid fa-download", href: "download-svd-xt-1.1.json", mode: "refresh" },
            { text: "LCM LoRA", icon: "fa-solid fa-download", href: "download-lcm-lora.json", mode: "refresh" },
            { text: "SD 1.5", icon: "fa-solid fa-download", href: "download-sd15.json", mode: "refresh" },
            { text: "SD 2.1", icon: "fa-solid fa-download", href: "download-sd21.json", mode: "refresh" },
          ]
        }, {
          icon: "fa-solid fa-plug",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }, {
          icon: "fa-regular fa-circle-xmark",
          text: "Reset",
          href: "reset.js",
        }]
      }
    } else {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }]
    }
  }
}
