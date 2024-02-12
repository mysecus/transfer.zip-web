import { useContext } from "react"
import { ApplicationContext } from "../providers/ApplicationProvider"

export default function ContactsList() {
    const { contactsList, createContact, removeContact } = useContext(ApplicationContext)

    return (
        <div className="ContactsList flex-grow-1">
            <div className="d-flex flex-column">
                {
                    contactsList.map(contact => {
                        return (
                            <div className="p-2 px-3 w-100 bg-body-tertiary btn border mb-2">
                                <div className="d-flex flex-row">
                                    <div className="d-flex flex-column align-items-start">
                                        <span><i className="bi bi-person-fill me-2"></i>{contact.name}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            
        </div>
    )
}