import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, message } from 'antd';
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice';
import axios from 'axios';
function AdminExprience() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { exprience } = portfolioData;
    const [showAddEditModal, setShowAddEditModal] = React.useState(false);
    const [selectedItemFormEdit, setSelectedItemFormEdit] = React.useState(null);
    const [type, setType] = React.useState('add');
    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            let response;

            if (selectedItemFormEdit) {
                response = await axios.post("/api/portfolio/update-exprience",
                    { ...values, _id: selectedItemFormEdit._id });
            } else {
                response = await axios.post("/api/portfolio/add-exprience",
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
            const response = await axios.post("/api/portfolio/delete-exprience", { _id: item._id });
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
                    Add Exprience
                </button>
            </div>
            <div className='grid grid-cols-4 gap-5 mt-5  sm:grid-cols-1'>
                {exprience.map((exprience) => (
                    <div className='shadow border-2 p-5 border-gray-400 flex flex-col '>
                        <h1 className='text-primary text-xl font-bold'>{exprience.period}</h1>
                        <hr />
                        <h1>Company : {exprience.company}</h1>
                        <h1>Role : {exprience.title}</h1>
                        <h1>Description : {exprience.description}</h1>
                        <div className='flex justify-end gap-5 mt-5 '>
                            <button className='text-white px-5 py-2  bg-red-500' onClick={
                                () => {
                                    onDelete(exprience);
                                }
                            }>Delete</button>
                            <button className='text-white px-5 py-2  bg-primary' onClick={
                                () => {
                                    setSelectedItemFormEdit(exprience);
                                    setShowAddEditModal(true);
                                    setType('edit');
                                }
                            }>Edit</button>
                        </div>
                    </div>

                ))}
            </div>
            {
                (type === 'add' || selectedItemFormEdit) && (<Modal visible={showAddEditModal} title={selectedItemFormEdit ? "Edit Exprience" : "Add Exprience"} footer={null} onCancel={() => {
                    setShowAddEditModal(false);
                    setSelectedItemFormEdit(null);
                }
                }>
                    <Form layout='vertical' onFinish={onFinish} initialValues={selectedItemFormEdit || {}}>
                        <Form.Item name="period" label='Period'>
                            <input placeholder='Period' />
                        </Form.Item>
                        <Form.Item name="company" label='Company'>
                            <input placeholder='Company' />
                        </Form.Item>
                        <Form.Item name="title" label='Role'>
                            <input placeholder='Role' />
                        </Form.Item>
                        <Form.Item name="description" label='Description'>
                            <input placeholder='Descriptions' />
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

export default AdminExprience;