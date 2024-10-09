import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, message } from 'antd';
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice';
import axios from 'axios';
function AdminProject() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { projects } = portfolioData;
    const [showAddEditModal, setShowAddEditModal] = React.useState(false);
    const [selectedItemFormEdit, setSelectedItemFormEdit] = React.useState(null);
    const [type, setType] = React.useState('add');
    const onFinish = async (values) => {
        try {
            const tempTechnologies = values?.technologies?.split(",") || [];
            values.technologies = tempTechnologies;
            dispatch(ShowLoading());
            let response;

            if (selectedItemFormEdit) {
                response = await axios.post("/api/portfolio/update-project",
                    { ...values, _id: selectedItemFormEdit._id });
            } else {
                response = await axios.post("/api/portfolio/add-project",
                    values);
            }
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                setShowAddEditModal(false);
                setSelectedItemFormEdit(null);
                dispatch(HideLoading());
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const onDelete = async (item) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/portfolio/delete-project", { _id: item._id });
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                dispatch(HideLoading());
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };
    return (
        <div>
            <div className='flex justify-end'>
                <button className='text-white px-5 py-2  bg-primary' onClick={() => {
                    setSelectedItemFormEdit(null);
                    setShowAddEditModal(true);
                }}>
                    Add Project
                </button>
            </div>
            <div className='grid grid-cols-3 gap-5 mt-5 sm:grid-cols-1'>
                {projects.map((project) => (
                    <div className='shadow border-2 p-5 border-gray-400 flex flex-col gap-5'>
                        <h1 className='text-primary text-xl font-bold'>{project.title}</h1>
                        <hr />
                        <img src={project.image} alt="" className='h-60 w-80' />
                        <h1>Role : {project.title}</h1>
                        <h1>Description : {project.description}</h1>
                        <div className='flex justify-end gap-5 mt-5 '>
                            <button className='text-white px-5 py-2  bg-red-500' onClick={
                                () => {
                                    onDelete(project);
                                }
                            }>Delete</button>
                            <button className='text-white px-5 py-2  bg-primary' onClick={
                                () => {
                                    setSelectedItemFormEdit(project);
                                    setShowAddEditModal(true);
                                    setType('edit');
                                }
                            }>Edit</button>
                        </div>
                    </div>

                ))}
            </div>
            {
                (type === 'add' || selectedItemFormEdit) && (<Modal visible={showAddEditModal} title={selectedItemFormEdit ? "Edit Project" : "Add Project"} footer={null} onCancel={() => {
                    setShowAddEditModal(false);
                    setSelectedItemFormEdit(null);
                }
                }>
                    <Form layout='vertical' onFinish={onFinish} initialValues={{ ...selectedItemFormEdit, technologies: selectedItemFormEdit?.technologies.join(" , ") } || {}}>
                        <Form.Item name="title" label='Title'>
                            <input placeholder='Title' />
                        </Form.Item>
                        <Form.Item name="image" label='Image URL'>
                            <input placeholder='Image ' />
                        </Form.Item>
                        <Form.Item name="description" label='Description'>
                            <textarea placeholder='description' />
                        </Form.Item>
                        <Form.Item name="technologies" label='Technologies'>
                            <input placeholder='Technologies' />
                        </Form.Item>
                        <Form.Item name="link" label='Link'>
                            <input placeholder='Link' />
                        </Form.Item>
                        <div className='flex justify-end'>
                            <button className='border-primary text-primary px-5 py-2' onClick={() => {

                                setShowAddEditModal(false);
                                setSelectedItemFormEdit(null);

                            }}>Cancel</button>
                            <button className='bg-primary text-white px-5 py-2'>{selectedItemFormEdit ? "Update" : "Add"}</button>
                        </div>
                    </Form>
                </Modal>)
            }
        </div >
    );
};

export default AdminProject;