import { useState, useEffect } from 'react';
import { Modal, Button} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useStoreUser } from '../services/store-user';
import { putUpdateUser } from '../services/UsersService';
import _ from "lodash"

const ModalEditUser = (props) => {
    const listUsers = useStoreUser(store => store.listUsers);
    const setListUsers = useStoreUser(store => store.setListUsers);
    const { handleClose, show } = props;
    const [ name, setName ] = useState("")
    const [ job, setJob ] = useState("") 
    const dataUserEdit = useStoreUser(store => store.dataUserEdit);
    const handleEditUser = async() => { 
        let cloneListUsers = _.cloneDeep(listUsers)
        let res = await putUpdateUser(name, job)

        if(res && res.updatedAt){
            let index = listUsers.findIndex(item=> item.id === dataUserEdit.id)
            cloneListUsers[index].first_name = res.name
            setListUsers(cloneListUsers)
        }
        handleClose()

    }
    useEffect(() => {
        if (show){ 
            setName(dataUserEdit.first_name)
        }
    },[dataUserEdit])
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit</Modal.Title>
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
                <Button variant="primary" onClick={()=>handleEditUser()}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalEditUser
