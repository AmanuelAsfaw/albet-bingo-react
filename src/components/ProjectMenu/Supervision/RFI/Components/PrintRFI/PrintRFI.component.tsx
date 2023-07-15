import { FC } from "react";
import { Company } from "../../../../../../constants/Constants";
import { PrintRFIPropType } from "../../util/RFI.util";
import SignatureComponent from "../../../../../common/Signature/Signature.component";
const PrintRFIComponent: FC<PrintRFIPropType> = ({ selected }) => {
  return (
    <div className="col-lg-12 visible-print">
      <div className="mb-2 text-left">
        <h5>
          <b>{Company.NAME_ENGLISH}</b>
        </h5>
        <h6>Request for information</h6>
      </div>
      <div className="" style={{ borderTop: "1px solid gray" }}>
        <div className="row mt-4">
          <div className="col-md-1">
            <b>Project - </b>
          </div>
          <div className="col-md-1">{selected?.project?.name}</div>
          <div className="col-md-7"></div>
          <div className="col-md-2">
            <b>RFI Number - </b>
          </div>
          <div className="col-md-1">{selected?.rfi_number}</div>
        </div>
        <div className="row mt-1">
          <div className="col-md-1">
            <b>To - </b>
          </div>
          <div className="col-md-1">
            {selected?.rfi_responder_by?.full_name}
          </div>
          <div className="col-md-7"></div>
          <div className="col-md-2">
            <b>From - </b>
          </div>
          <div className="col-md-1">{selected?.rfi_prepared_by?.full_name}</div>
        </div>
        <div className="row mt-1">
          <div className="col-md-1">
            <b>Date - </b>
          </div>
          <div className="col-md-1">"site_diary?.date"</div>
          <div className="col-md-7"></div>
          <div className="col-md-2">
            <b>Project Number - </b>
          </div>
          <div className="col-md-1">{`00${selected?.id}`}</div>
        </div>
      </div>

      <div className="pt-4">
        <div
          style={{
            textAlign: "center",
            borderTop: "1px solid gray",
            borderBottom: "1px solid gray",
          }}
        >
          <h5 className="m-1">{selected?.title}</h5>
        </div>
      </div>

      <div style={{ borderBottom: "1px solid gray" }}>
        <div className="row m-4">
          <div className="col-md-2">Specification Section:</div>
          <div className="col-md-9">{selected?.specification_section}</div>
        </div>
        <div className="row m-4">
          <div className="col-md-2">Paragraph:</div>
          <div className="col-md-9">{selected?.paragraph}</div>
        </div>
        <div className="row m-4">
          <div className="col-md-2">Drawing Reference:</div>
          <div className="col-md-9">{selected?.drawing_reference}</div>
        </div>
        <div className="row m-4">
          <div className="col-md-2">Detail:</div>
          <div className="col-md-9">{selected?.detail}</div>
        </div>
      </div>

      <div>
        <div className="pt-3 pb-3" style={{ borderBottom: "1px solid gray" }}>
          <b>{selected?.under_review}</b>
        </div>
        <div
          className="pt-3 pb-3 pl-5"
          style={{ borderBottom: "1px solid gray" }}
        >
          {selected?.under_review_description
            .split("---")
            .map((item: string) => (
              <div>{item}</div>
            ))}
        </div>
      </div>

      <div>
        <div className="pt-3 pb-3" style={{ borderBottom: "1px solid gray" }}>
          <b>Attachements/Approvals/Test Results, if any:</b>
        </div>
        <div
          className="pt-3 pb-3 pl-5"
          style={{ borderBottom: "1px solid gray" }}
        >
          {selected?.attachements.split("---").map((item: string) => (
            <div>{item}</div>
          ))}
        </div>
      </div>

      <div style={{ borderBottom: "1px solid gray" }}>
        <div className="row mt-4">
          <div className="col-md-2">Requested By:</div>
          <div className="col-md-8">{selected?.rfi_prepared_by?.full_name}</div>
        </div>
        <div className="row mt-4">
          <div className="col-md-2">Responsibility:</div>
          <div className="col-md-8">{selected?.rfi_prepared_by?.role}</div>
        </div>
        <div className="row mt-4">
          <div className="col-md-2">Date:</div>
          <div className="col-md-8">{selected?.rfi_date}</div>
        </div>
        <div className="row mt-4 mb-4">
          <div className="col-md-2">Signature:</div>
          <div className="col-md-8">
            <SignatureComponent user={selected?.rfi_prepared_by} />
          </div>
        </div>
      </div>

      <div>
        <div className="pt-3 pb-3" style={{ borderBottom: "1px solid gray" }}>
          <b>Response:</b>
        </div>
        <div
          className="pt-3 pb-3 pl-5"
          style={{ borderBottom: "1px solid gray" }}
        >
          {selected?.rfiResponse
            ? selected?.rfiResponse?.description
                .split("---")
                .map((item: string) => <div>{item}</div>)
            : null}
        </div>
      </div>

      <div style={{ borderBottom: "1px solid gray" }}>
        <div className="row mt-4">
          <div className="col-md-2">Response By:</div>
          <div className="col-md-8">
            {selected?.rfi_responder_by?.full_name}
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-2">Responsibility:</div>
          <div className="col-md-8">{selected?.rfi_responder_by?.role}</div>
        </div>
        <div className="row mt-4">
          <div className="col-md-2">Date:</div>
          <div className="col-md-8">{selected?.rfi_date}</div>
        </div>
        <div className="row mt-4 mb-4">
          <div className="col-md-2">Signature:</div>
          <div className="col-md-8">
            <SignatureComponent user={selected?.rfi_responder_by} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintRFIComponent;
