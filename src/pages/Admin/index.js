import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import Header from '../../components/Header';
import AdminIntro from './AdminIntro';
import AdminAbout from './AdminAbout';
import AdminExprience from "./AdminExprience";
import { useSelector } from 'react-redux';
import AdminProject from './AdminProject';
import AdminContact from './AdminContact';
import SectionTitle from '../../components/SectionTitle';
const { TabPane } = Tabs;
function Admin() {
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/admin-login';
        }
    }, []);
    const { portfolioData } = useSelector(state => state.root);
    return (
        <div>
            <Header />
            <div className='flex gap-10 items-center px-5 py-2 justify-between'>
                <div className='flex gap-10 items-center'>
                    <h1 className='text-3xl text-primary'>Protfolio Admin</h1>
                    <div className='w-60 h-[1px] bg-gray-500'></div>
                </div>
                <h1 className='underline text-primary cursor-pointer' onClick={() => {
                    localStorage.removeItem('token');
                    window.localStorage.href = '/admin-login';
                }}>Logout</h1>
            </div>

            <hr />
            {portfolioData && <div className='mt-5 px-5 pb-10 '>
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="Intro" key="1">
                        <AdminIntro />
                    </TabPane>
                    <TabPane tab="About" key="2">
                        <AdminAbout />
                    </TabPane>
                    <TabPane tab="Exprience" key="3">
                        <AdminExprience />
                    </TabPane>
                    <TabPane tab="Project" key="4">
                        <AdminProject />
                    </TabPane>
                    <TabPane tab="Contact" key="5">
                        <AdminContact />
                    </TabPane>


                </Tabs>
            </div>}
        </div>
    );
}

export default Admin;