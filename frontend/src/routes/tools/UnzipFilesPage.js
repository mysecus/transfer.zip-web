import { Link } from "react-router-dom";
import FileUpload from "../../components/elements/FileUpload";
import GenericToolPage from "../../components/GenericToolPage";
import TestimonialCloud from "../../components/TestimonialCloud";
import FileBrowser from "../../components/elements/FileBrowser";
import { useState } from "react";
import * as zip from "@zip.js/zip.js";
import { Transition } from "@headlessui/react";
import streamSaver from "../../lib/StreamSaver"
import EmptySpace from "../../components/elements/EmptySpace";

const unzip = async (zipFile) => {
  const _files = []

  const onEntry = (entry) => {
    const split = entry.filename.split("/")

    if (!entry.directory) _files.push({ info: { name: split[split.length - 1], size: entry.uncompressedSize, relativePath: entry.filename, type: "application/octet-stream" }, entry })
  }

  if (window.streamSaverUseFallback) {
    const entries = await (new zip.ZipReader(new zip.BlobReader(zipFile))).getEntries()
    for (const entry of entries) {
      onEntry(entry)
    }
  }
  else {
    const fileStream = zipFile.stream()
    for await (const entry of (fileStream.pipeThrough(new zip.ZipReaderStream()))) {
      onEntry(entry)
    }
  }

  return _files
}

export default function UnzipFilesPage({ }) {
  const [richFiles, setRichFiles] = useState(null)
  const [zipFile, setZipFile] = useState(null)

  const handleFiles = async files => {
    if (files.length == 0) return
    const file = files[0]

    setZipFile(file)
    // TODO: Maybe validate file is zip file
    setRichFiles(await unzip(file))
  }

  const handleAction = async (action, richFile) => {
    console.log("action", action, richFile)
    if (action == "click") {
      console.log("createWriteStream", richFile.info.name)
      const fileStream = streamSaver.createWriteStream(richFile.info.name)
      // const tee = richFile.entry.readable.tee()
      // richFile.entry.readable = tee[0]
      richFile.entry.readable.pipeTo(fileStream)
    }
  }

  return (
    <div>
      <GenericToolPage
        title={"Unzip Files Online"}
        display={<span><span className="text-primary">Easily</span> open your zip file online.</span>}
        subtitle={"Decompress and view even the largest zip files with this online tool. We can not read your files, as everything is handled locally in your browser."}
        description={"Effortlessly decompress and view even the largest zip files with our online tool. Simply upload a zip file from your computer, and it will be unpacked instantly, allowing you to view its contents. You can also choose to download or share individual files for free if needed."}
        question={"How to unzip zip file"}
        steps={[
          { step: 1, icon: "bi-file-earmark-plus-fill", text: "Pick your zip file" },
          { step: 2, icon: "bi-hourglass-split", text: "Unzip and wait" },
          { step: 3, icon: "bi-cloud-arrow-down-fill", text: <span>View, download or <Link to={"/"}>share files</Link></span> },
        ]}
        related={[
          { to: "/tools/zip-files-online", title: "Zip Files Online" },
          // { to: "/tools/send-zip-file", title: "Send Zip File" }
        ]}>

        <div className="mx-auto max-w-sm">
          <FileUpload onFiles={handleFiles} buttonText={"Unzip"} singleFile={true} />
        </div>
      </GenericToolPage>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
        <Transition show={!!richFiles}>
          <div>
            <h3 className="text-2xl font-bold mb-2">{zipFile?.name}</h3>
            <FileBrowser richFiles={richFiles} onAction={handleAction} />
          </div>
        </Transition>
        {!richFiles && <EmptySpace title={`Select a ZIP file to get started`} subtitle={`Your files will be displayed here, allowing you to browse the archive.`} />}
      </div>
    </div >
  )
}