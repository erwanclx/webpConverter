async function fileConvert() {
  const result = await window.dialog.showDialog()
  console.log(result);
  const pathimg = result.filePaths[0]
  return pathimg
}

async function folderConvert() {
  const folder = await window.dialog.showDialogFolder()
  const folderPath = folder.filePaths[0]
  let folderRetrieve = await window.path.FilePath(folderPath)
  for (const file in folderRetrieve) {
    let imgPath = folderRetrieve[file]
    await window.webp.convertImg(imgPath)
  }
}

document.getElementById('FileConvert').addEventListener('click', async () => {
    window.webp.convertImg(await fileConvert())
})

document.getElementById('FolderConvert').addEventListener('click', async () => {
  await folderConvert()
})
