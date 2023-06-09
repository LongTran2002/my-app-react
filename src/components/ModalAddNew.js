import { useState } from 'react';
import { Modal, Button} from 'react-bootstrap';
import { postCreateUser } from "../services/UsersService"
import { toast } from 'react-toastify';
import { useStoreUser } from '../services/store-user';

const ModalAddNew = (props) => {
    const listUsers = useStoreUser(store => store.listUsers);
    const setListUsers = useStoreUser(store => store.setListUsers);
    const { handleClose, show } = props;
    const [ name, setName ] = useState("")
    const [ job, setJob ] = useState("") 
    const handleUpdateUser = (user) => {
        setListUsers([user, ...listUsers])}
    const handleSaveUser = async() => {
        let res = await postCreateUser(name, job)
        if (res && res.id){
            handleClose();
            setName("")
            setJob("")
            handleUpdateUser({ first_name: name, id: res.id })
            toast.success("Create successfully")
        }
        else {
            toast.error("Error creating user")
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" 
                                className="form-control"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}>
                                </input>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Job</label>
                                <input type="text" 
                                className="form-control" 
                                value={job}
                                onChange={(e)=>setJob(e.target.value)}>
                                </input>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>handleSaveUser()}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalAddNew
