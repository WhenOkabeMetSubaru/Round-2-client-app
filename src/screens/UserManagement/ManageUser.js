import React, { useEffect, useState } from 'react'
import { addNewRoleByAdmin, addNewRoleToUser, deleteRoleByIDAdmin, deleteUserRole, getAllRolesByAdmin, updateRoleByIDAdmin } from '../../features/api/roleApi';
import auth from '../../features/auth/auth';
import { Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { MultiSelect } from 'react-multi-select-component'
import { deleteUserByID, getAllUsersByAdmin, updateUserByID, userSignup } from '../../features/api/userApi';
import { UserAuthFinal } from '../../features/providers/userAuthProvider';

const ManageUser = () =>
{

  const [roleDetails, setRoleDetails] = useState([]);
 

  const [userDetails, setUserDetails] = useState([]);

  const { refreshUserData,currentUser } = UserAuthFinal()

  const [userEditInput, setUserEditInput] = useState({ roleId: "", name: "", selected: [] })
  const [userRoleAssignBox, setUserRoleAssignBox] = useState({ show: false, userData: [], roleData: [] });
  const [addUserBoxShow, setAddUserBoxShow] = useState(false);


  const [loader, setLoader] = useState(true);
  const [editUserBoxShow, setEditUserBoxShow] = useState(false);
  const [permissionBox, setPermissionBox] = useState({ show: false, data: [] });

  const [userAddData, setUserAddData] = useState({ first_name: "", last_name: "", mobile: "", email: "", password: "" });
  const [userEditData, setUserEditData] = useState({_id:"", first_name: "", last_name: "", mobile: "", email: "", password: "" })

  useEffect(() =>
  {


    getAllRolesByAdmin({ token: auth?.isAuthenticated() }).then((res) =>
    {
      if (res.status == false)
      {
        setRoleDetails(res?.data)
      }
    })

    getAllUsersByAdmin({ token: auth?.isAuthenticated() }).then((res) =>
    {

      if (res.status == false)
      {

        setUserDetails(res?.data)

      }
      setLoader(false);
    })


  }, [])





  const UserColumnData = {
    columns: [

      {
        name: "First Name",
        selector: user => <p >{ user?.first_name }</p>,

      },
      {
        name: "Last Name",
        selector: user => <p >{ user?.last_name }</p>,

      },
      {
        name: "Email",
        selector: user => < p > { user?.email }</p>,

      },
      {
        name: "Roles",
        selector: user => < p > { user?.roles?.length }</p>,

      },
      {
        name: "",
        selector: (user) => { },
        cell: (user) =>
        {

          return (
            <div className="btn-group" role="group" aria-label="Basic outlined example">

               <button title="Edit User" onClick={ () => { setUserEditData(user); setEditUserBoxShow(true)} } type="button" className="btn btn-outline-secondary"><i className="icofont-edit text-success"></i></button> 
               {(currentUser?._id !== user?._id) && <button title={"Delete User"} onClick={ () => {
                  let flag = window.confirm("Do you want to delete the user");
                  if(flag){
                    deleteUserByID(user?._id).then((res)=>{
                      if(res.status==false){
                        getAllUsersByAdmin({ token: auth?.isAuthenticated() }).then((res) =>
                        {

                          if (res.status == false)
                          {

                            alert(res?.info)
                          }

                          setLoader(false);
                        })
                      }
                    })
                  }
               } }  type="button" className="btn btn-outline-secondary deleterow"><i className="icofont-ui-delete text-danger"></i></button> 
              }
              <button title="Update Role" onClick={ () => { setUserRoleAssignBox({ ...userRoleAssignBox, show: true, userData: user }) } } type="button" className="btn btn-outline-secondary "><i className="icofont-users-alt-2 text-danger"></i></button>
            </div>
          )
        }
      }
    ]
  }



  const checkIfRoleAlreadyExists = (userRoles, role) =>
  {

    let isExists = userRoles?.find((item) =>
    {
      return item?._id === role
    })

    return isExists ? true : false;
  }

  const handleEditRoleSubmit = async () =>
  {

    let permissionValues = userEditInput?.selected?.map((item) =>
    {
      return item?.value
    })

    let res = await updateRoleByIDAdmin({ name: userEditInput?.name, permissions: permissionValues }, userEditInput?.roleId)

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

    setUserEditInput({ roleId: "", name: "", selected: [] })
    setEditUserBoxShow(false);
  }

  const handleUserCreateSubmit = async () =>
  {
    if (!userAddData?.first_name || !userAddData?.last_name || !userAddData?.email || !userAddData?.mobile)
    {
      return alert("Missing Fields")
    }

    if (userAddData?.password?.length < 4)
    {
      return alert("Password must be atleast 4 digits")
    }

    let response = await userSignup(userAddData);

    if (response.status == false)
    {
      getAllUsersByAdmin({ token: auth?.isAuthenticated() }).then((res) =>
      {

        if (res.status == false)
        {

          setUserDetails(res?.data)
          setUserAddData({ first_name: "", last_name: "", mobile: "", email: "", password: "" })
          setAddUserBoxShow(false);
        }

        setLoader(false);
      })
    }

    alert(response?.info)
  }

  const handleUserEditSubmit = async () =>
  {
    if (!userEditData?.first_name || !userEditData?.last_name || !userEditData?.email || !userEditData?.mobile)
    {
      return alert("Missing Fields")
    }

    // if (userEditData?.password?.length < 4)
    // {
    //   return alert("Password must be atleast 4 digits")
    // }


    let response = await updateUserByID(userEditData,userEditData._id)

    if (response.status == false)
    {
      getAllUsersByAdmin({ token: auth?.isAuthenticated() }).then((res) =>
      {

        if (res.status == false)
        {

          setUserDetails(res?.data)
          setUserEditData({_id:"", first_name: "", last_name: "", mobile: "", email: "", password: "" })
          setEditUserBoxShow(false);
        }

        setLoader(false);
      })
    }

    alert(response?.info)
  }

  return (
    <section>
      <div className="" style={ { padding: 5, display: 'flex', justifyContent: "space-between" } }>
        <p style={ { fontSize: 'large' } }>Manage Users</p>
        <button type="button" className="btn btn-dark ms-1" onClick={ () => { setAddUserBoxShow(true) } }><i className="icofont-plus-circle me-2 fs-6"></i>Add User</button>
      </div>

      <div className="row clearfix g-3">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <DataTable
                title={ "Role Details" }
                columns={ UserColumnData.columns }
                data={ userDetails }
                defaultSortField="title"
                pagination
                progressPending={ loader }
                selectableRows={ false }
                className="table myDataTable table-hover align-middle mb-0 d-row nowrap dataTable no-footer dtr-inline"
                highlightOnHover={ true }
              />
            </div>
          </div>
        </div>
      </div>


      <Modal show={ userRoleAssignBox.show } centered onHide={ () => { setUserRoleAssignBox({ ...userRoleAssignBox, show: false }) } }>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Assign Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div style={ { minHeight: 100, display: 'flex', gap: 10, flexWrap: 'wrap', border: '1px solid lightgray', padding: 5, borderRadius: '2px' } }>
              {
                userRoleAssignBox?.userData?.roles?.map((role, i) =>
                {
                  return (
                    <div key={ i + "roleUser" } style={ { padding: "0px 20px 0px 20px", border: '1px solid gray', cursor: 'pointer', height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px' } }>
                      { role?.name }
                    </div>
                  )
                })
              }
            </div>
            <div style={ { height: 300, overflow: "hidden", display: 'flex', flexDirection: 'column', rowGap: 10, marginTop: 20, padding: 2 } }>
              {
                roleDetails?.map((item) =>
                {
                  return (
                    <RoleAssignComponent cb={ () =>
                    {
                      getAllUsersByAdmin({ token: auth?.isAuthenticated() }).then((res) =>
                      {

                        if (res.status == false)
                        {
                          let userId = userRoleAssignBox?.userData?._id;
                          let tempData = res?.data?.find((item) =>
                          {
                            return item?._id == userId
                          })

                          setUserRoleAssignBox({ ...userRoleAssignBox, userData: tempData })
                          setUserDetails(res?.data)
                          refreshUserData()
                        }

                      })
                    } } key={ item?._id } item={ item } checkIfRoleAlreadyExists={ checkIfRoleAlreadyExists } userRoleAssignBox={ userRoleAssignBox } />
                  )
                })
              }
            </div>
          </div>
        </Modal.Body>

      </Modal>

      <Modal show={ addUserBoxShow } centered onHide={ () => { setAddUserBoxShow(false) } }>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={ { padding: 2, display: 'flex', flexDirection: 'column', rowGap: 20 } }>
            <div style={ { display: 'flex', columnGap: 5 } }>
              <input required autoComplete={ "off" } type="text" value={ userAddData?.first_name } onChange={ (e) => { setUserAddData({ ...userAddData, first_name: e.target.value }) } } className="form-control" id="exampleFormControlInput1" placeholder="Enter First Name" />
              <input autoComplete={ "off" } type="text" value={ userAddData?.last_name } onChange={ (e) => { setUserAddData({ ...userAddData, last_name: e.target.value }) } } className="form-control" id="exampleFormControlInput1" placeholder="Enter Last Name" />
            </div>
            <input maxLength={ 10 } autoComplete={ "off" } type="text" value={ userAddData?.mobile } onChange={ (e) => { setUserAddData({ ...userAddData, mobile: e.target.value }) } } prefix={ "+91" } className="form-control" id="exampleFormControlInput1" placeholder="Enter Mobile" />

            <input autoComplete={ "off" } type={ "email" } value={ userAddData?.email } onChange={ (e) => { setUserAddData({ ...userAddData, email: e.target.value }) } } className="form-control" id="exampleFormControlInput1" placeholder="Enter Email" />

            <input autoComplete={ "off" } type={ "password" } value={ userAddData?.password } onChange={ (e) => { setUserAddData({ ...userAddData, password: e.target.value }) } } className="form-control" id="exampleFormControlInput1" placeholder="********" />
          </div>
        </Modal.Body>
        <Modal.Footer>

          <button type="button" onClick={ () => { handleUserCreateSubmit() } } className="btn btn-primary">Add</button>
        </Modal.Footer>
      </Modal>

      <Modal show={ editUserBoxShow } centered onHide={ () => { setEditUserBoxShow(false) } }>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={ { padding: 2, display: 'flex', flexDirection: 'column', rowGap: 20 } }>
            <div style={ { display: 'flex', columnGap: 5 } }>
              <input required autoComplete={ "off" } type="text" value={ userEditData?.first_name } onChange={ (e) => { setUserEditData({ ...userEditData, first_name: e.target.value }) } } className="form-control" id="exampleFormControlInput1" placeholder="Enter First Name" />
              <input autoComplete={ "off" } type="text" value={ userEditData?.last_name } onChange={ (e) => { setUserEditData({ ...userEditData, last_name: e.target.value }) } } className="form-control" id="exampleFormControlInput1" placeholder="Enter Last Name" />
            </div>
            <input maxLength={ 10 } autoComplete={ "off" } type="text" value={ userEditData?.mobile } onChange={ (e) => { setUserEditData({ ...userEditData, mobile: e.target.value }) } } prefix={ "+91" } className="form-control" id="exampleFormControlInput1" placeholder="Enter Mobile" />

            <input autoComplete={ "off" } type={ "email" } value={ userEditData?.email } onChange={ (e) => { setUserEditData({ ...userEditData, email: e.target.value }) } } className="form-control" id="exampleFormControlInput1" placeholder="Enter Email" />

            <input autoComplete={ "off" } type={ "password" } value={ userEditData?.password } onChange={ (e) => { setUserEditData({ ...userEditData, password: e.target.value }) } } className="form-control" id="exampleFormControlInput1" placeholder="********" />
          </div>
        </Modal.Body>
        <Modal.Footer>

          <button type="button" onClick={ () => { handleUserEditSubmit() } } className="btn btn-primary">Save</button>
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

export default ManageUser

export const RoleAssignComponent = ({ item, userRoleAssignBox, checkIfRoleAlreadyExists, cb }) =>
{

  const [assignState, SetAssignState] = useState(checkIfRoleAlreadyExists(userRoleAssignBox?.userData?.roles, item?._id) || false);

  useEffect(() =>
  {

    let flag = checkIfRoleAlreadyExists(userRoleAssignBox?.userData?.roles, item?._id);
    SetAssignState(flag);
    console.log(flag)

  }, [checkIfRoleAlreadyExists(userRoleAssignBox?.userData?.roles, item?._id)])

  const handleAddRoleAssign = async () =>
  {


    let res = await addNewRoleToUser(item?._id, userRoleAssignBox?.userData?._id);

    if (res?.status == false)
    {
      SetAssignState(true)
      cb()
    }


  }

  const handleUpdateRoleAssign = async () =>
  {

    let res = await deleteUserRole(item?._id, userRoleAssignBox?.userData?._id);

    if (res?.status == false)
    {
      SetAssignState(!assignState);
      cb()
    }
  }



  return (
    <div key={ item?._id } onClick={ () => { assignState == true ? handleUpdateRoleAssign() : handleAddRoleAssign() } } style={ { display: 'flex', padding: '0px 10px 0px 10px', cursor: 'pointer', borderRadius: '5px', border: '1px solid lightgray', height: 40, justifyContent: 'space-between', alignItems: 'center' } }>
      <div style={ { fontWeight: 'bold' } }>
        { item?.name }
      </div>
      <div>
        {
          assignState == true ? <div style={ { display: 'flex', columnGap: 5, alignItems: 'center' } }>
            {/* <span style={ { fontSize: 'small' } }>Assigned</span> */ }
            <i style={ { fontSize: 'x-large', color: "red", fontWeight: 'bold' } } className="icofont-ui-delete"></i>
          </div> : <div style={ { display: 'flex', columnGap: 5, alignItems: 'center' } }>
            {/* <span style={ { fontSize: 'small' } }>Not Assigned</span> */ }
            <i style={ { fontSize: 'large', color: 'lightseagreen', fontWeight: 'bold' } } className="icofont-plus"></i>
          </div>
        }
      </div>
    </div>
  )
}