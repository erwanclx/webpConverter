const { contextBridge, ipcRenderer } = require('electron')
const webp = require('webp-converter')
const path = require('path')
const fs = require('fs')

contextBridge.exposeInMainWorld('dialog' ,{
  showDialog: async () => await ipcRenderer.invoke('dialog:open'),
  showDialogFolder: async () => await ipcRenderer.invoke('dialogFolder:open'),
})


contextBridge.exposeInMainWorld('webp' ,{
    convertImg: async (imgPath) => await webp.cwebp(imgPath, imgPath.split('.')[0] + '.webp', "-q 80",logging="-v")
  })

  contextBridge.exposeInMainWorld('path' ,{
    FilePath: async (folderPath) => await getFilesOfFolder(folderPath)
  })

  function getFilesOfFolder(folderPath) {
    let list = []
    fs.readdirSync(folderPath).forEach(file => {
      file = path.join(folderPath, file)
      list.push(file)
    })
    return list
  }