import { createHashRouter } from 'react-router-dom'
import Login from '../pages/login/login'
import Home from '../pages/home/home'
import Entry from '../pages/entry'
import Regist from '../pages/regist/regist'
import Phome from '../pages/p-home/p_home'
import AHome from '../pages/Ahome/Ahome'
import Dinfo from '../pages/dinfo/dinfo'
import HospitalizationA from '../pages/hospitalizationA/hospitalizationA'
import DepartmentA from '../pages/departmentA/departmentA'
import DrugsA from '../pages/drugsA/drugsA'
import DHome from '../pages/Dhome/Dhome'
import RegistrationD from '../pages/registrationD/registrationD'
import PrescriptionD from '../pages/prescriptionD/prescriptionD'
import ScheduleD from '../pages/secdule/secduleD'
import PersonP from '../pages/personP/personP'
import MzP from '../pages/mz/mzP'

// import AddDoctor from '../pages/addDoctor/addDoctor'
// 全局路由
export const globalRouters = createHashRouter([
    {
        // 全部进入到entry路由
        path: '/',
        element: <Entry />,
        // 定义entry二级路由
        children: [
            {
                // 精确匹配"/login"，跳转Login页面
                path: 'login',
                element: <Login />,
            },
            {
                // 精确匹配"/regist"，跳转Regist页面
                path: 'regist',
                element: <Regist />,
            },
            // {
            //     path:'test',
            //     element:<Bldtails/>
            // },
            {
                // 精确匹配"/dhome"，跳转Dhome页面
                path: 'dhome',
                element: <DHome />,
                children: [
                    {
                        path: 'RegistrationD',
                        element: <RegistrationD />
                    },
                    {
                        path: 'PrescriptionD',
                        element: <PrescriptionD />
                    },
                    {
                        path: 'ScheduleD',
                        element: <ScheduleD />
                    }
                ]
            },
            {
                // 精确匹配"/phome"，跳转pHome页面
                path: 'phome',
                element: <Home />,
                children: [
                    {
                        path: 'Phome',
                        element: <Phome />
                    },
                    {
                        path:'PersonP',
                        element:<PersonP/>
                    },
                    {
                        path: 'MzP',
                        element: <MzP />
                    },
                    {
                        path: '*',
                        element: <Phome />
                    }
                ]
            },
            {
                //管理员页面
                path: 'ahome',
                element: <AHome />,
                children: [
                    {
                        path: 'Dinfo',
                        element: <Dinfo />
                    },
                    {
                        path: 'HospitalizationA',
                        element: <HospitalizationA />
                    },
                    {
                        path: 'DepartmentA',
                        element: <DepartmentA />
                    },
                    {
                        path: 'DrugsA',
                        element: <DrugsA />
                    }
                ]
            },
            {
                // 未匹配，跳转Login页面
                path: '*',
                element: <Login />,
            },
        ],
    },

])
