import React, { useEffect, useState } from 'react'
import { addNewRoleByAdmin, deleteRoleByIDAdmin, getAllRolesByAdmin, updateRoleByIDAdmin } from '../../features/api/roleApi';
import auth from '../../features/auth/auth';
import { Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { MultiSelect } from 'react-multi-select-component'
import { UserAuthFinal } from '../../features/providers/userAuthProvider';
import { roleAndPermissionData, valueToLabelRole } from '../../components/Data/AppData';

const ManageRole = () =>
{

    const [roleDetails, setRoleDetails] = useState([]);

    const {refreshUserData} = UserAuthFinal();

    const [roleAddInput, setRoleAddInput] = useState({ name: "", selected: [] })
    const [roleEditInput, setRoleEditInput] = useState({ roleId: "", name: "", selected: [] })

    const [addRoleBoxShow, setAddRoleBoxShow] = useState(false);

    const [editRoleBoxShow, setEditRoleBoxShow] = useState(false);
    const [permissionBox, setPermissionBox] = useState({ show: false, data: [] });

    useEffect(() =>
    {

        getAllRolesByAdmin({ token: auth?.isAuthenticated() }).then((res) =>
        {
            if (res.status == false)
            {
                setRoleDetails(res?.data)
            }
        })

    }, [])

    const handleRoleDelete = async (id) =>
    {

        let flag = window.confirm("Are you sure you want to delete the role");

        if (flag)
        {
            let res = await deleteRoleByIDAdmin(id);

            if (res.status == false)
            {
                alert(res.info);
                getAllRolesByAdmin({ token: auth?.isAuthenticated() }).then((res) =>
                {
                    if (res.status == false)
                    {
                        setRoleDetails(res?.data)
                    }
                })

            }
        }
    }

    const RoleColumnData = {
        columns: [

            {
                name: "Title",
                selector: role => <p >{ role?.name }</p>,

            },
            {
                name: "Permissions",
                selector: role => <div style={ { display: 'flex', columnGap: 8, alignItems: 'center', height: 60 } }>
                    {/* {
                        role?.permissions?.map((item,i)=>{
                            return <p>{item}</p>
                        })
                    } */}
                    {/* <select style={{padding:3,outline:'none',border:'0'}} >
                        {
                            role?.permissions?.map((item,i)=>{
                                return <option style={{padding:3,height:5}} key={i}>{item}</option>
                            })
                        }
                    </select> */}
                    <p style={ { marginTop: 12 } }>{ role?.permissions?.length } Permissions</p>
                    <div onClick={ () =>
                    {

                        let newArr = Object.keys(valueToLabelRole)?.map((item) =>
                        {
                            return {
                                label: valueToLabelRole[item],
                                value: item,
                                flag: role?.permissions?.includes(item) ? true : false
                            }
                        })

                        setPermissionBox({ ...permissionBox, show: true, data: newArr })

                    } }><i title='View Permissions' style={ { cursor: "pointer", fontSize: 'large' } } className="icofont-eye-open"></i></div>
                </div>,

            },
            {
                name: "Created ON",
                selector: role => < p > { role?.created }</p>,

            },
            {
                name: "",
                selector: (role) => { },
                cell: (role) =>
                {
                    let editSelectValues = role?.permissions?.map((data) =>
                    {
                        return {
                            label: valueToLabelRole[data],
                            value: data
                        }
                    })
                    return (
                        <div className="btn-group" role="group" aria-label="Basic outlined example">

                            <button title="Edit" onClick={ () => { setRoleEditInput({ roleId: role?._id, name: role?.name, selected: editSelectValues }); setEditRoleBoxShow(true); } } type="button" className="btn btn-outline-secondary"><i className="icofont-edit text-success"></i></button>
                            <button onClick={ () => handleRoleDelete(role?._id) } title="Delete Role" type="button" className="btn btn-outline-secondary deleterow"><i className="icofont-ui-delete text-danger"></i></button>
                        </div>
                    )
                }
            }
        ]
    }

   

    

    const handleAddRoleSubmit = async () =>
    {

        let permissionValues = roleAddInput?.selected?.map((item) =>
        {
            return item?.value
        })

        let res = await addNewRoleByAdmin({ name: roleAddInput?.name, permissions: permissionValues });

        if (res?.status == false)
        {
            getAllRolesByAdmin({ token: auth?.isAuthenticated() }).then((res) =>
            {
                if (res.status == false)
                {
                    setRoleDetails(res?.data)
                }
            })
        }

        setRoleAddInput({ name: "", selected: [] })
        setAddRoleBoxShow(false);
    }

    const handleEditRoleSubmit = async () =>
    {

        let permissionValues = roleEditInput?.selected?.map((item) =>
        {
            return item?.value
        })

        let res = await updateRoleByIDAdmin({ name: roleEditInput?.name, permissions: permissionValues }, roleEditInput?.roleId)

        if (res?.status == false)
        {
            getAllRolesByAdmin({ token: auth?.isAuthenticated() }).then((res) =>
            {
                if (res.status == false)
                {
                    setRoleDetails(res?.data);
                    refreshUserData()
                }
            })
        }

        setRoleEditInput({ roleId: "", name: "", selected: [] })
        setEditRoleBoxShow(false);
        
    }

    return (
        <section>
            <div className="" style={ { padding: 5, display: 'flex', justifyContent: "space-between" } }>
                <p style={ { fontSize: 'large' } }>Manage Roles</p>
                <button type="button" className="btn btn-dark ms-1" onClick={ () => { setAddRoleBoxShow(true); } }><i className="icofont-plus-circle me-2 fs-6"></i>Add Role</button>
            </div>
            <div className="row clearfix g-3">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <DataTable
                                title={ "Role Details" }
                                columns={ RoleColumnData.columns }
                                data={ roleDetails }
                                defaultSortField="title"
                                pagination
                                selectableRows={ false }
                                className="table myDataTable table-hover align-middle mb-0 d-row nowrap dataTable no-footer dtr-inline"
                                highlightOnHover={ true }
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={ addRoleBoxShow } centered onHide={ () => { setAddRoleBoxShow(false) } }>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">Add New Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label">Name</label>
                        <input autoComplete={ "off" } type="text" value={ roleAddInput.name } onChange={ (e) => { setRoleAddInput({ ...roleAddInput, name: e.target.value }) } } className="form-control" id="exampleFormControlInput1" placeholder="Enter Role Title" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Permission</label>
                        {/* <input autoComplete={ "off" } type="text" name="name" className="form-control" id="exampleFormControlInput1"  /> */ }
                        <MultiSelect
                            options={ roleAndPermissionData }
                            value={ roleAddInput?.selected }
                            hasSelectAll={ false }
                            onChange={ (value) => {  setRoleAddInput({ ...roleAddInput, selected: value }) } }
                            labelledBy="Select"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <button type="button" onClick={ () => { handleAddRoleSubmit() } } className="btn btn-primary">Add</button>
                </Modal.Footer>
            </Modal>

            <Modal show={ editRoleBoxShow } centered onHide={ () => { setEditRoleBoxShow(false) } }>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">Add New Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                        <input autoComplete={ "off" } type="text" value={ roleEditInput.name } onChange={ (e) => { setRoleEditInput({ ...roleEditInput, name: e.target.value }) } } className="form-control" id="exampleFormControlInput1" placeholder="Enter Role Title" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Permission</label>
                        {/* <input autoComplete={ "off" } type="text" name="name" className="form-control" id="exampleFormControlInput1"  /> */ }
                        <MultiSelect
                            options={ roleAndPermissionData }
                            value={ roleEditInput?.selected }
                            hasSelectAll={ false }
                            onChange={ (value) => { setRoleEditInput({ ...roleEditInput, selected: value }) } }
                            labelledBy="Select"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <button type="button" onClick={ () => { handleEditRoleSubmit() } } className="btn btn-primary">Save</button>
                </Modal.Footer>
            </Modal>

            <Modal show={ permissionBox.show } centered onHide={ () => { setPermissionBox({ ...permissionBox, show: false }) } }>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">Permissions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={ { display: 'flex' } } className=''>
                        <div style={ { width: '60%', fontWeight: 600 } }>
                            Title
                        </div>
                        <div style={ { width: '40%', textAlign: 'center', fontWeight: 600 } }>
                            Permission
                        </div>


                    </div>
                    <div style={ { paddingTop: 20, paddingBottom: 20, overflow: 'auto', height: 400, rowGap: 10, display: 'flex', flexDirection: 'column' } }>
                        {
                            permissionBox?.data?.map((item, i) =>
                            {
                                return (
                                    <div key={ "permissionBox" + i } style={ { display: 'flex' } } className=''>
                                        <div style={ { width: '60%' } }>
                                            { item?.label }
                                        </div>
                                        <div style={ { width: '40%', textAlign: 'center' } }>
                                            <i style={ { color: item?.flag == true ? 'lightgreen' : '', fontSize: 'large' } } className="icofont-tick-boxed"></i>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>
                </Modal.Body>

            </Modal>
        </section>
    )
}

export default ManageRole

