import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/common/Header";
import Expenses from "./Accounts/Expenses";
import Invoices from "./Accounts/Invoices";
import Payments from "./Accounts/Payments";
import HrDashboard from "./Dashboard/HrDashboard";
import ProjectDashboard from "./Dashboard/ProjectDashboard";
import Attendance from "./Employee/Attendance";
import AttendanceEmployees from "./Employee/AttendanceEmployees";
import Departments from "./Employee/Departments";
import EmployeeProfile from "./Employee/EmployeeProfile";
import Holidays from "./Employee/Holidays";
import LeaveRequest from "./Employee/LeaveRequest";
import Members from "./Employee/Members";
import ClientProfile from "./Our Clients/ClientProfile";
import Clients from "./Our Clients/Clients";
import Salaryslip from "./Payroll/Salaryslip";
import Leaders from "./Projects/Leaders";
import Projects from "./Projects/Projects";
import Tasks from "./Projects/Tasks";
import Timesheet from "./Projects/Timesheet";
import TicketsDetail from "./Tickets/TicketsDetail";
import TicketsView from "./Tickets/TicketsView";
import Alerts from "./UIComponents/Alerts";
import Calendar from "./App/Calendar";
import ChatApp from "./App/ChatApp";
import ApexCharts from "./OtherPages/ApexCharts";
import FormsExample from "./OtherPages/FormsExample";
import TablesExample from "./OtherPages/TablesExample";
import ReviewsPage from "./OtherPages/ReviewsPage";
import Icons from "./OtherPages/Icons";
import Widgets from "./OtherPages/Widgets";
import Badges from "./UIComponents/Badges";
import Breadcrumb from "./UIComponents/Breadcrumb";
import Buttons from "./UIComponents/Buttons";
import Cards from "./UIComponents/Cards";
import Carousel from "./UIComponents/Carousel";
import Collapse from "./UIComponents/Collapse";
import Dropdowns from "./UIComponents/Dropdowns";
import ListGroup from "./UIComponents/ListGroup";
import ModalUI from "./UIComponents/ModalUI";
import NavsUI from "./UIComponents/NavsUI";
import NavbarUI from "./UIComponents/NavbarUI";
import PaginationUI from "./UIComponents/PaginationUI";
import PopoversUI from "./UIComponents/PopoversUI";
import ProgressUI from "./UIComponents/ProgressUI";
import Scrollspy from "./UIComponents/Scrollspy";
import SpinnersUI from "./UIComponents/SpinnersUI";
import ToastsUI from "./UIComponents/ToastsUI";
import StaterPage from "./Stater/StaterPage";
import PageHeader1 from "../components/common/PageHeader1";
import Documentation from "./Documentation/Documentation";
import Changelog from "./Changelog/Changelog";
import Help from "./Dashboard/Help";
import ManageUser from "./UserManagement/ManageUser";
import ManageRole from "./UserManagement/ManageRole";
import { UserAuthFinal } from "../features/providers/userAuthProvider";
import auth from "../features/auth/auth";

function MainIndex (props)
{

    const { activekey } = props;

    const { currentUser } = UserAuthFinal();


    const routesData = [
        {
            path: "/",
            component: <HrDashboard />
        },
        {
            path: "/hr-dashboard",
            component: <HrDashboard />
        },
        {
            path: "/project-dashboard",
            component: <ProjectDashboard />
        },
        {
            path: "/projects",
            component: <Projects />,
            permissions:["project-r","project-rw"]
        },
        {
            path: "/tasks",
            component: <Tasks />,
            permissions:["task-r","task-rw"]
        },
        {
            path: "/timesheet",
            component: <Timesheet />,
            permissions:["timeSheet-r","timeSheet-rw"]
        },
        {
            path: "/leaders",
            component: <Leaders />,
            permissions:["leaders-r","leaders-rw"]
        },
        {
            path: "/tickets-view",
            component: <TicketsView />,
            permissions:["ticketview-r","ticketview-rw"]
        },
        {
            path: "/tickets-detail",
            component: <TicketsDetail />,
            permissions:['ticketdetails-r',"ticketdetails-rw"]
        },
        {
            path: "/clients",
            component: <Clients />,
            permissions:["clients-r","clients-rw"]
        },
        {
            path: "/manage/users",
            component: <ManageUser />
        },
        {
            path: "/manage/roles",
            component: <ManageRole />
        },
        {
            path: "/members",
            component: <Members />,
            permissions:["members-r","members-rw"]
        },
        {
            path: "/members-profile",
            component: <EmployeeProfile />,
            permissions:["membersprofile-r","membersprofile-rw"]
        },
        {
            path: "/holidays",
            component: <Holidays />,
            permissions:["holidays-r","holidays-rw"]
        },
        {
            path: "/attendance-employees",
            component: <AttendanceEmployees />,
            permissions:["employeeattendance-r","employeeattendance-rw"]
        },
        {
            path: "/attendance",
            component: <Attendance />,
            permissions:["attendance-r","attendance-rw"]
        },
        {
            path: "/leave-request",
            component: <LeaveRequest />,
            permissions:["leaverequest-r","leaverequest-rw"]
        },
        {
            path: "/department",
            component: <Departments />,
            permissions:["department-r","department-rw"]
        },
        {
            path: "/invoices",
            component: <Invoices />,
            permissions:["invoices-r","invoices-rw"]
        },
        {
            path: "/payments",
            component: <Payments />,
            permissions:["payments-r","payments-rw"]
        },
        {
            path: "/expenses",
            component: <Expenses />,
            permissions:["expenses-r","expenses-rw"]
        },
        {
            path: "/employee-salary",
            component: <Salaryslip />,
            permissions:["employeesalary-r","employeesalary-rw"]
        },
        {
            path: "/calander",
            component: <Calendar />
        },
        {
            path: "/chat-app",
            component: <ChatApp />
        },
        {
            path: "/apex-charts",
            component: <ApexCharts />
        },
        {
            path: "/forms-example",
            component: <FormsExample />
        },
        {
            path: "/table-example",
            component: <TablesExample />
        },
        {
            path: "/reviews-page",
            component: <ReviewsPage />
        },
        {
            path: "/icons",
            component: <Icons />
        },
        {
            path: "/widgets",
            component: <Widgets />
        },
        {
            path: "/ui-alerts",
            component: <Alerts />
        },
        {
            path: "/ui-badge",
            component: <Badges />
        },
        {
            path: "/ui-breadcrumb",
            component: <Breadcrumb />
        },
        {
            path: "/ui-buttons",
            component: <Buttons />
        },
        {
            path: "/ui-card",
            component: <Cards />
        },
        {
            path: "/ui-carousel",
            component: <Carousel />
        },
        {
            path: "/ui-collapse",
            component: <Collapse />
        },
        {
            path: "/ui-dropdowns",
            component: <Dropdowns />
        },
        {
            path: "/ui-listgroup",
            component: <ListGroup />
        },
        {
            path: "/ui-modalui",
            component: <ModalUI />
        },
        {
            path: "/ui-navsui",
            component: <NavsUI />
        },
        {
            path: "/ui-navbarui",
            component: <NavbarUI />
        },
        {
            path: "/ui-paginationui",
            component: <PaginationUI />
        },
        {
            path: "/ui-popoversui",
            component: <PopoversUI />
        },
        {
            path: "/ui-progressui",
            component: <ProgressUI />
        },
        {
            path: "/ui-Scrollspyui",
            component: <Scrollspy />
        },
        {
            path: "/ui-spinnersui",
            component: <SpinnersUI />
        },
        {
            path: "/ui-toastsui",
            component: <ToastsUI />
        },
        {
            path: "/stater-page",
            component: <StaterPage />
        },
        {
            path: "/documentation",
            component: <Documentation />
        },
        {
            path: "/changelog",
            component: <Changelog />
        },
        {
            path: "/help",
            component: <Help />
        },
        {
            path: "/client-profile",
            component: <ClientProfile />,
            permissions: ["clientsProfile-r","clientsProfile-rw"]
        }
    ];

    return (
        <div className="main px-lg-4 px-md-4">
            { activekey !== "/chat-app" ? activekey === "/documentation" ? <PageHeader1 /> : <Header /> : "" }
            <div className="body d-flex py-lg-3 py-md-2">
                {
                    routesData?.map((routeItem, i) =>
                    {
                        return (
                            <Route key={ i + "routes" } exact path={ `${process.env.REACT_APP_PUBLIC_URL}${routeItem?.path}` } >
                                {
                                    !routeItem?.permissions?.length > 0 ? routeItem?.component :
                                        <AuthorizedRoute roles={ auth.getRoles() } permission_check={ routeItem?.permissions }>
                                            { routeItem?.component }

                                        </AuthorizedRoute>
                                }

                            </Route>
                        )
                    })
                }
                {/* <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/`} component={HrDashboard} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/hr-dashboard`} component={HrDashboard} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/project-dashboard`} component={ProjectDashboard} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/projects`} component={Projects} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/tasks`} component={Tasks} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/timesheet`} component={Timesheet} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/leaders`} component={Leaders} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/tickets-view`} component={TicketsView} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/tickets-detail`} component={TicketsDetail} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/clients`} component={Clients} />
                <Route exact path={ `${process.env.REACT_APP_PUBLIC_URL}/manage/users` } component={ManageUser} />
                <Route exact path={ `${process.env.REACT_APP_PUBLIC_URL}/manage/roles` } component={ ManageRole } />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/members`} component={Members} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/members-profile`} component={EmployeeProfile} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/holidays`} component={Holidays} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/attendance-employees`} component={AttendanceEmployees} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/attendance`} component={Attendance} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/leave-request`} component={LeaveRequest} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/department`} component={Departments} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/invoices`} component={Invoices} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/payments`} component={Payments} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/expenses`} component={Expenses} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/employee-salary`} component={Salaryslip} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/calander`} component={Calendar} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/chat-app`} component={ChatApp} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/apex-charts`} component={ApexCharts} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/forms-example`} component={FormsExample} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/table-example`} component={TablesExample} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/reviews-page`} component={ReviewsPage} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/icons`} component={Icons} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/widgets`} component={Widgets} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/ui-alerts`} component={Alerts} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/ui-badge`} component={Badges} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/ui-breadcrumb`} component={Breadcrumb} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/ui-buttons`} component={Buttons} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/ui-card`} component={Cards} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/ui-carousel`} component={Carousel} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/ui-collapse`} component={Collapse} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/ui-dropdowns`} component={Dropdowns} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/ui-listgroup`} component={ListGroup} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/ui-modalui`} component={ModalUI} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/ui-navsui`} component={NavsUI} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/ui-navbarui`} component={NavbarUI} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/ui-paginationui`} component={PaginationUI} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/ui-popoversui`} component={PopoversUI} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/ui-progressui`} component={ProgressUI} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/ui-Scrollspyui`} component={Scrollspy} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/ui-spinnersui`} component={SpinnersUI} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/ui-toastsui`} component={ToastsUI} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/stater-page`} component={StaterPage} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/documentation`} component={Documentation} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/changelog`} component={Changelog} />
                <Route exact path={`${process.env.REACT_APP_PUBLIC_URL}/help`} component={Help} /> */}
            </div>
        </div>
    )
}



export default MainIndex;

export const AuthorizedRoute = ({ children, roles, permission_check }) =>
{


   

    for (let i = 0; i < permission_check?.length; i++)
    {
        for (let j = 0; j < roles?.length; j++)
        {
            if(roles[j]?.permissions?.includes("complete_access")){
                return <>{ children }</>
            }

            if (roles[j]?.permissions?.includes(permission_check[i]))
            {
                return <>{ children }</>
            }
        }
    }

    
    // roles?.find((item) =>
    // {
    //     return item?.permissions?.includes('complete_access') || item?.permissions?.includes(permission_check)
    // })


    return <Redirect to="/" />




}