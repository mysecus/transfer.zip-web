import { Link, useRevalidator } from "react-router-dom"
import { humanTimeUntil, parseTransferExpiryDate, tryCopyToClipboard } from "../../utils"
import BIcon from "../BIcon"
import { useContext, useMemo } from "react"
import { DashboardContext } from "../../routes/dashboard/Dashboard"
import { deleteTransfer, getTransferAttachmentLink, getTransferDownloadLink, sendTransferByEmail } from "../../Api"
import { ApplicationContext } from "../../providers/ApplicationProvider"
import EmptySpace from "../elements/EmptySpace"

const Entry = ({ transfer }) => {
  const revalidator = useRevalidator()

  const { displayNotification } = useContext(ApplicationContext)
  const { displayedTransferId, setSelectedTransferId, hideSidebar, showSidebar } = useContext(DashboardContext)

  const transferLink = useMemo(() => getTransferDownloadLink(transfer), [transfer])

  const { id, name, files, expiresAt, hasTransferRequest, finishedUploading } = transfer
  const expiryDate = parseTransferExpiryDate(expiresAt)
  const isSelected = id === displayedTransferId

  const disabled = !hasTransferRequest && !finishedUploading

  const handleCopy = async e => {
    if (await tryCopyToClipboard(transferLink)) {
      displayNotification("Copied Link", "The Transfer link was successfully copied to the clipboard!")
    }
  }

  const handleDownloadClicked = async e => {
    e.stopPropagation()
    window.open(getTransferAttachmentLink(transfer) + "/zip", "_blank")
  }

  const handleCopyLinkClicked = async e => {
    e.stopPropagation()
    handleCopy()
  }

  const handleSendByEmailClicked = async e => {
    e.stopPropagation()
    // send by email
    // await sendTransferByEmail(id, )
  }

  const handleDelete = async e => {
    e.stopPropagation()
    await deleteTransfer(id)
    if (setSelectedTransferId == id) hideSidebar()
    revalidator.revalidate()
  }

  const handleClicked = async e => {
    if (disabled) {

    }
    else {
      isSelected ? hideSidebar() : setSelectedTransferId(id)
    }
  }

  return (
    <button onClick={handleClicked} className={`group text-start shadow-sm rounded-xl border border-gray-200 ${isSelected ? "bg-gray-50" : "bg-white"} px-4 py-3 group hover:bg-gray-50`}>
      <div className="">
        <div>
          <h3 className={`text-lg font-bold me-1 text-nowrap ${isSelected ? "text-black" : "text-gray-800"}`}>{name}</h3>
          <div className="text-sm text-gray-600 font-medium group-hover:hidden">
            <span className="">
              {!finishedUploading ?
                (!hasTransferRequest ? <><BIcon name={"file-earmark-arrow-up"} /> Incomplete</> : <><BIcon name={"hourglass-split"} /> Waiting for files...</>)
                :
                <>{!hasTransferRequest ? <>Sent</> : <><BIcon name={"arrow-down"} /> Received</>} {files.length} file{files.length != 1 ? "s" : ""}</>
              }
            </span>
            {transfer.statistics.downloads.length > 1 ?
              <span><BIcon name="dot" /><i className="bi bi-arrow-down-circle-fill me-1"></i>{transfer.statistics.downloads.length} downloads</span>
              :
              transfer.statistics.downloads.length == 1 ?
                <span><BIcon name="dot" /><i className="bi bi-arrow-down-circle me-1"></i>Downloaded</span>
                :
                transfer.statistics.views.length >= 1 ?
                  <span><BIcon name="dot" /><i className="bi bi-eye me-1"></i>Viewed</span>
                  :
                  <span></span>
            }
            {expiryDate && <span>
              <BIcon name="dot" />
              <i className="bi bi-clock me-1"></i>{humanTimeUntil(expiryDate)}
            </span>}
          </div>
          <div className="text-sm text-gray-600 font-medium hidden group-hover:block">
            {transfer.hasTransferRequest ?
              <>
                <Link onClick={handleDownloadClicked} className="underline hover:text-primary">Download Files</Link>
                <BIcon name="dot" />
                <Link onClick={handleDelete} className="underline hover:text-primary">Delete</Link>
              </>
              :
              <>
                <Link className="underline hover:text-primary">Edit</Link>
                <BIcon name="dot" />
                <Link onClick={handleCopyLinkClicked} className="underline hover:text-primary">Copy Link</Link>
                <BIcon name="dot" />
                <Link onClick={handleDelete} className="underline hover:text-primary">Delete</Link>
              </>}
          </div>
        </div>
        {/* <div className="flex items-center gap-2">
          {
            disabled ?
              <Link onClick={handleDelete} className="text-sm text-red-500 bg-white border px-2.5 py-1.5 rounded-lg hover:bg-gray-50 hidden group-hover:inline-block">
                <BIcon name={"trash"} />
              </Link>
              :
              (
                hasTransferRequest && finishedUploading ?
                  <Link onClick={handleDownloadClicked} className={`font-medium text-sm px-2.5 py-1.5 rounded-lg ${transfer.statistics.downloads.length > 0 ? "hover:bg-gray-50 text-primary bg-white border hidden group-hover:inline-block" : "hover:bg-primary-light text-white bg-primary"}`}>
                    Download {transfer.statistics.downloads.length > 0 && "Again"}
                  </Link>
                  :
                  <Link onClick={handleCopyLinkClicked} className="text-sm text-primary bg-white border px-2.5 py-1.5 rounded-lg hover:bg-gray-50 hidden group-hover:inline-block">
                    <BIcon name={"copy"} /> Copy Link
                  </Link>
              )
          }
        </div> */}
      </div>
    </button >
  )
}

export default function TransferList({ transfers }) {
  return (
    <div className="">
      <div className={`grid grid-cols-1 gap-2`}>
        {transfers.map((transfer, index) => <Entry key={transfer.id} transfer={transfer} />)}
      </div>
      {transfers.length == 0 && (
        <EmptySpace title={"Your transfers will appear here"} subtitle={"You can see views and download statistics, edit, send or delete them."} />
        // <div className="text-center py-16 rounded-xl border-dashed border-2">
        //   <h3 className="font-semibold text-2xl mb-1">Your transfers will appear here</h3>
        //   <p className="text-gray-600">
        //     You can see views and download statistics, edit, send or delete them.
        //   </p>
        // </div>
      )}
    </div>
  )
}