import { Button, Card, Form, Steps } from "antd";
import { FC, useEffect, useState } from "react";
import ClientComponent from "./components/Client/Client.component";
import GeneralComponent from "./components/General/General.component";
import PaymentComponent from "./components/Payment/Payment.component";
import {
  ProjectRegistrationPropType,
  sendData,
  sendFile,
} from "./ProjectRegistration.util";
import {
  ErrorHandler,
  getProjectRegistrationData,
  RawBoQType,
} from "../../../utilities/utilities";
import { OpenNotification } from "../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
  ProjectTypes,
  TypeOfProject,
} from "../../../constants/Constants";
import { useNavigate } from "react-router-dom";
import { RouteConstants } from "../../../router/Constants";
const ProjectRegistration: FC<ProjectRegistrationPropType> = ({
  project_type,
}) => {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);

  const [general_form] = Form.useForm();
  const [client_form] = Form.useForm();
  const [payment_form] = Form.useForm();
  const [project_information, setProjectInformation] = useState<any>({
    type: ProjectTypes.BUILDING,
    floor_size: 5,
    basement_size: 1,
    project_payment: {
      project_id: null,
      advance_payment: 0,
      rebate: 0,
      retention: 0,
      material_in_site: 0,
      penalty: 0,
      advance_percent: 0,
      price_escalation: 0,
      price_adjustment: 0,
      retention_date: new Date(),
    },
  });

  const [boq_data, setBoq] = useState<RawBoQType[]>(
    getProjectRegistrationData(project_information.type)
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBoq(getProjectRegistrationData(project_information.type));
  }, [project_information.type]);

  const next = () => {
    console.log();
    if (current < 3) setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const submit = () => {
    setLoading(true);
    const file = project_information.file;
    const validity = checkValidity();
    const is_attached = false;

    if (project_type === TypeOfProject.PRE_CONTRACT || validity.is_valid)
      sendData({
        ...project_information,
        commencement_date: project_information.date
          ? project_information.date[0].format("YYYY-MM-DD")
          : null,
        completion_date: project_information.date
          ? project_information.date[1].format("YYYY-MM-DD")
          : null,
        // boqs: is_attached ? [] : parseRawBoQ(boq_data),
        boqs: [],
        project_type,
        file: null,
      })
        .then((result: any) => {
          if (is_attached) {
            const formData = new FormData();

            formData.append("project_id", result.data.project_id);
            formData.append("file", file);
            formData.append(
              "sheet_names",
              project_information.sheet_names.join("||")
            );
            sendFile(formData)
              .then(() => {
                setLoading(false);
                OpenNotification(
                  NotificationType.SUCCESS,
                  Message.PROJECT_REGISTRATION_SUCCESS,
                  ""
                );
                project_type === TypeOfProject.PRE_CONTRACT
                  ? navigate(RouteConstants.PRE_CONTRACT)
                  : navigate(RouteConstants.PROJECTS);
              })
              .catch((error: any) => {
                setLoading(false);

                ErrorHandler(error).map((e: any) =>
                  OpenNotification(
                    NotificationType.ERROR,
                    Message.PROJECT_REGISTRATION_FAILED,
                    e.message
                  )
                );
              });
          } else {
            setLoading(false);
            OpenNotification(
              NotificationType.SUCCESS,
              Message.PROJECT_REGISTRATION_SUCCESS,
              ""
            );
            project_type === TypeOfProject.PRE_CONTRACT
              ? navigate(RouteConstants.PRE_CONTRACT)
              : navigate(RouteConstants.PROJECTS);
          }
        })
        .catch((error) => {
          setLoading(false);

          ErrorHandler(error).map((e: any) =>
            OpenNotification(
              NotificationType.ERROR,
              Message.PROJECT_REGISTRATION_FAILED,
              e.message
            )
          );
        });
    else {
      OpenNotification(
        NotificationType.ERROR,
        Message.PROJECT_REGISTRATION_FAILED,
        validity.error
      );
      setLoading(false);
    }
  };

  const pre_contract_steps = [
    {
      title: "General Information",
      content: (
        <GeneralComponent
          form={general_form}
          next={next}
          data={project_information}
          setData={setProjectInformation}
          type={project_type}
        />
      ),
    },
    // {
    //   title: "BoQ",
    //   content: (
    //     <BoQComponent
    //       type={project_type}
    //       next={submit}
    //       data={boq_data}
    //       setData={setBoq}
    //       setProjectInformation={setProjectInformation}
    //       project_information={project_information}
    //     />
    //   ),
    // },
  ];

  const post_contract_steps = [
    {
      title: "General Information",
      content: (
        <GeneralComponent
          form={general_form}
          next={next}
          data={project_information}
          setData={setProjectInformation}
          type={project_type}
        />
      ),
    },
    {
      title: "Client Information",
      content: (
        <ClientComponent
          form={client_form}
          next={next}
          data={project_information}
          setData={setProjectInformation}
        />
      ),
    },
    {
      title: "Payment Information",
      content: (
        <PaymentComponent
          form={payment_form}
          next={submit}
          data={project_information}
          setData={setProjectInformation}
        />
      ),
    },
    // {
    //   title: "BoQ",
    //   content: (
    //     <BoQComponent
    //       type={project_type}
    //       next={submit}
    //       data={boq_data}
    //       setData={setBoq}
    //       project_information={project_information}
    //       setProjectInformation={setProjectInformation}
    //     />
    //   ),
    // },
  ];

  const onNext = () => {
    if (current === 0) {
      general_form.submit();
    } else if (current === 1) {
      if (project_type === TypeOfProject.PRE_CONTRACT) submit();
      else client_form.submit();
    } else if (current === 2) {
      payment_form.submit();
    } else if (current === 3) {
      submit();
    }
  };

  const checkValidity = () => {
    let is_valid = true;
    let error = "";

    if (project_information.budget < project_information.advance_payment) {
      is_valid = false;
      error = Message.ADVANCE_BUDGET;
    }

    return { is_valid, error };
  };

  return (
    <>
      <Steps
        current={current}
        style={{ width: "100%" }}
        className="mx-auto"
        progressDot={false}
      >
        {(project_type === TypeOfProject.PRE_CONTRACT
          ? pre_contract_steps
          : post_contract_steps
        ).map((item) => (
          <Steps.Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="">
        <Card>
          {
            (project_type === TypeOfProject.PRE_CONTRACT
              ? pre_contract_steps
              : post_contract_steps)[current].content
          }
        </Card>
      </div>
      <div className="">
        {current > 0 && (
          <Button
            className="btn-outline"
            style={{ margin: "0 8px" }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}

        <Button type="primary" onClick={onNext} loading={loading}>
          {current ===
          (project_type === TypeOfProject.PRE_CONTRACT
            ? pre_contract_steps
            : post_contract_steps
          ).length -
            1
            ? "Done"
            : "Next"}
        </Button>
      </div>
    </>
  );
};
export default ProjectRegistration;
