import { SiteDiary } from "../../../../../../../redux/SiteDiary/SiteDiary.type";

export type PrintSiteDiaryPrintPropType = {
  project: any;
  dataAction: [any, React.Dispatch<React.SetStateAction<any>>];
  visibilityAction: [any, React.Dispatch<React.SetStateAction<any>>];
};

export const parseData = (site_diary: SiteDiary) => {
  let is_done = false;
  let pe,
    activity,
    nonWorking,
    delay,
    materialOnSite,
    meetingAndSignificance,
    constructionChangeDirective,
    givenInstruction,
    requestToContractors;

  if (site_diary) {
    if (
      site_diary?.personnel_equipment &&
      site_diary?.personnel_equipment !== ""
    ) {
      pe = site_diary?.personnel_equipment
        .split("---")
        .map((form: any) => JSON.parse(form));
    }
    if (site_diary?.work_description !== "") {
      activity = site_diary?.work_description
        .split("---")
        .map((form: any) => JSON.parse(form));
    }
    if (site_diary?.non_working_hrs !== "") {
      nonWorking = site_diary?.non_working_hrs
        .split("---")
        .map((form: any) => JSON.parse(form));
    }

    if (site_diary?.services !== "") {
      delay = site_diary?.services
        .split("---")
        .map((form: any) => JSON.parse(form));
    }
    // if (site_diary?.material !== "") {
    //   materialOnSite = site_diary?.material
    //     .split("---")
    //     .map((form: any) => JSON.parse(form));
    // }
    if (site_diary?.meeting !== "") {
      meetingAndSignificance = site_diary?.meeting
        .split("---")
        .map((form: any) => JSON.parse(form));
    }
    if (site_diary?.construction_change !== "") {
      constructionChangeDirective = site_diary?.construction_change
        .split("---")
        .map((form: any) => JSON.parse(form));
    }
    if (site_diary?.given_instruction !== "") {
      givenInstruction = site_diary?.given_instruction
        .split("---")
        .map((form: any) => JSON.parse(form));
    }
    if (site_diary?.request_to_contractors !== "") {
      requestToContractors = site_diary?.request_to_contractors
        .split("---")
        .map((form: any) => JSON.parse(form));
    }
    is_done = true;
  }

  return {
    pe,
    activity,
    nonWorking,
    delay,
    materialOnSite,
    meetingAndSignificance,
    constructionChangeDirective,
    givenInstruction,
    requestToContractors,
    is_done,
  };
};
