import React, { FC, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';
import { TaskCardPropType, UpdateProjectBoardTask } from '../utils/FollowUp.util';
import { Button, Form, Input } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { OpenNotification } from '../../../../common/Notification/Notification.component';
import { Message, NotificationType } from '../../../../../constants/Constants';
import { ErrorHandler } from '../../../../../utilities/utilities';

const TaskInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 15px;
  min-height: 106px;
  border-radius: 5px;
  max-width: 311px;
  background: white;
  margin-top: 15px;

  .secondary-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 12px;
    font-weight: 400px;
    color: #7d7d7d;
  }
  /* .priority{ */
  /* margin-right: 12px; */
  /* align-self: center;
    svg{
      width: 12px !important;
      height: 12px !important;
      margin-right: 12px; */
  /* margin-top: 2px; */
  /* } */
  /* } */
`;


const TaskCard: FC<TaskCardPropType> = ({ title, id, updatedAt, index, fetchStatusBoardAll, category_id}) => {

  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState<string|null>(null);
  
  const onSave = async () => {
    setLoading(true);
    if(inputValue)
    await UpdateProjectBoardTask({
      id,
      title: inputValue,
      priority: 1,      
    }, id)
      .then(() => {
        setTimeout(() => {
          OpenNotification(
            NotificationType.SUCCESS,
            "Board-Task Update successfully!",
            ""
          );
          setLoading(false);
          fetchStatusBoardAll({
            category_id
          });

        }, 1000);
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.BOARD_PROJECT_REGISTERED_FAIL,
            e.message
          )
        );
      });
    setLoading(false);
  }

  return (
    <div style={{}}>
      <Draggable key={id} draggableId={id.toString()} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <TaskInformation>
              <p style={{width: '100%', paddingTop: '10px'}}>
                <Form initialValues={{
                  title: title
                }}>
                <Form.Item name={'title'} initialValue={title}>
                  <Input disabled={false} name='title' style={{width: '100%'}} onChange={(event)=> {
                    setInputValue(event.target.value)
                  }}/>
                </Form.Item>
                </Form>
              </p>
              <div className="secondary-details">
                <p>
                  <span>
                    {new Date(updatedAt).toLocaleDateString('en-us', {
                      month: 'short',
                      day: '2-digit',
                    })}
                  </span>
                </p>
                <Button loading={loading} style={{marginRight: '0px',marginBottom: '15px', border: 0}}
                  onClick={()=> onSave()}>
                  <SaveOutlined  color='blue' style={{}} onClickCapture={()=> console.log('save clicked')}/>
                </Button>
                </div>
            </TaskInformation>
          </div>
        )}
      </Draggable>
    </div>    
  );
};

export default TaskCard;

// <span className="priority">
// {item.Priority === 'High' ? (<RedArrow />) : item.Priority === 'Medium' ? (<YellowArrow />) : (<BlueArrow />)}
// </span>
// <div><CustomAvatar name={item.Assignee} isTable={false} size={16} /></div>
