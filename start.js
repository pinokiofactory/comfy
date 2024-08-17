module.exports = {
  daemon: true,
  run: [
//    {
//      when: "{{platform === 'darwin' && arch === 'arm64'}}",
//      method: "fs.copy",
//      params: {
//        src: "workflows/default/flux_schnell_mac.template",
//        dest: "app/web_custom_versions/Comfy-Org_ComfyUI_frontend/1.2.20/scripts/defaultGraph.js"
//        //"dest": "app/web/scripts/defaultGraph.js"
//      }
//    },
////    {
////      when: "{{platform === 'darwin' && arch === 'x64'}}",
////    },
//    {
//      when: "{{gpu === 'nvidia'}}",
//      method: "fs.copy",
//      params: {
//        src: "workflows/default/flux_schnell.template",
//        //"dest": "app/web/scripts/defaultGraph.js"
//        dest: "app/web_custom_versions/Comfy-Org_ComfyUI_frontend/1.2.20/scripts/defaultGraph.js"
//      }
//    },
////    {
////      when: "{{platform !== 'darwin' && gpu !== 'nvidia'}}",
////    },
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
          "event": "/http:\/\/\\S+/",   

          // "done": true will move to the next step while keeping the shell alive.
          // "kill": true will move to the next step after killing the shell.
          "done": true
        }]
      }
    },
    {
      // This step sets the local variable 'url'.
      // This local variable will be used in pinokio.js to display the "Open WebUI" tab when the value is set.
      method: "local.set",
      params: {
        // the input.event is the regular expression match object from the previous step
        url: "{{input.event[0]}}"
      }
    }
  ]
}
