import React from "react";
import { Col, Form, message, Modal, Row } from "antd";
import { axiosInstance } from "../helpers/axiosInstance";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import moment from "moment";


function BusIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="7" width="20" height="12" rx="3" fill="white" fillOpacity="0.9" />
      <circle cx="7" cy="19" r="2.5" fill="white" />
      <circle cx="17" cy="19" r="2.5" fill="white" />
      <rect x="5" y="4" width="14" height="5" rx="1.5" fill="white" fillOpacity="0.5" />
      <rect x="5" y="10" width="4" height="3" rx="1" fill="rgba(14,165,233,0.8)" />
      <rect x="10" y="10" width="4" height="3" rx="1" fill="rgba(14,165,233,0.6)" />
      <rect x="15" y="10" width="4" height="3" rx="1" fill="rgba(14,165,233,0.5)" />
    </svg>
  );
}

function SaveIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 21v-8H7v8M7 3v5h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Reusable field label ───────────────────────────────────────────────────

function FieldLabel({ children }) {
  return (
    <label className="block text-[0.65rem] font-medium tracking-[0.14em] uppercase mb-2 text-sky-400/75 font-sora">
      {children}
    </label>
  );
}

// ── Glass input ────────────────────────────────────────────────────────────

function GlassInput({ type = "text", placeholder, ...rest }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      {...rest}
      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200
                 bg-white/[0.06] border border-white/10 text-sky-100 placeholder-sky-900/60
                 focus:bg-white/[0.09] focus:border-sky-400/55 focus:ring-2 focus:ring-sky-400/10
                 font-sora"
    />
  );
}

// ── Glass select ───────────────────────────────────────────────────────────

function GlassSelect({ children, ...rest }) {
  return (
    <select
      {...rest}
      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200
                 bg-[#071d30] border border-white/10 text-sky-100
                 focus:border-sky-400/55 focus:ring-2 focus:ring-sky-400/10
                 font-sora appearance-none cursor-pointer"
    >
      {children}
    </select>
  );
}

// ── Section divider ────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 col-span-full mb-1">
      <hr className="flex-1 border-0 border-t border-white/[0.07] m-0" />
      <span className="text-[0.6rem] tracking-[0.16em] uppercase text-sky-400/45 whitespace-nowrap font-sora">
        {children}
      </span>
      <hr className="flex-1 border-0 border-t border-white/[0.07] m-0" />
    </div>
  );
}

// ── BusForm ────────────────────────────────────────────────────────────────

function BusForm({
  showBusForm,
  setShowBusForm,
  type = "add",
  getData,
  selectedBus,
  setSelectedBus,
}) {
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());

      // ✅ FIX 1: ensure correct date format
      if (values.journeyDate) {
        values.journeyDate = moment(values.journeyDate).format("YYYY-MM-DD");
      }

      let response = null;

      if (type === "add") {
        response = await axiosInstance.post("/api/buses/add-bus", values);
      } else {
        response = await axiosInstance.post("/api/buses/update-bus", {
          ...values,
          _id: selectedBus._id,
        });
      }

      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }

      getData();
      setShowBusForm(false);
      setSelectedBus(null);
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.response?.data?.message || error.message); // ✅ FIX 2
    }
  };

  return (
    <Modal
      width={780}
      title={null}
      open={showBusForm}
      onCancel={() => {
        setSelectedBus(null);
        setShowBusForm(false);
      }}
      footer={null}
      className="bus-form-modal"
      styles={{
        content: {
          background: "#071525",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "20px",
          padding: 0,
          overflow: "hidden",
        },
        mask: { backdropFilter: "blur(4px)" },
      }}
    >
      {/* ── Custom modal header ── */}
      <div className="flex items-center gap-3 px-8 py-6 border-b border-white/[0.07]">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                        bg-gradient-to-br from-sky-500 to-teal-400
                        shadow-[0_4px_16px_rgba(14,165,233,0.4)]">
          <BusIcon size={16} />
        </div>
        <div>
          <p className="text-[0.6rem] tracking-[0.16em] uppercase text-sky-400/60 font-medium m-0 font-sora">
            {type === "add" ? "New Entry" : "Editing"}
          </p>
          <h2 className="text-xl font-light text-white m-0 leading-tight font-serif">
            {type === "add" ? "Add Bus" : "Update Bus"}
          </h2>
        </div>
      </div>

      {/* ── Form body ── */}
      <div className="px-8 py-6">
        <Form layout="vertical" onFinish={onFinish} initialValues={selectedBus}>

          {/* Section: Identity */}
          <div className="mb-1">
            <SectionLabel>Identity</SectionLabel>
          </div>
          <Row gutter={[14, 4]}>
            <Col lg={24} xs={24}>
              <Form.Item
                name="name"
                label={<FieldLabel>Bus Name</FieldLabel>}
                className="[&_.ant-form-item-label]:p-0 [&_.ant-form-item-label>label]:h-auto mb-4"
              >
                <GlassInput type="text" placeholder="e.g. Volvo Express" />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item
                name="number"
                label={<FieldLabel>Bus Number</FieldLabel>}
                className="[&_.ant-form-item-label]:p-0 [&_.ant-form-item-label>label]:h-auto mb-4"
              >
                <GlassInput type="number" placeholder="e.g. PB-01-1234" />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item
                name="capacity"
                label={<FieldLabel>Capacity</FieldLabel>}
                className="[&_.ant-form-item-label]:p-0 [&_.ant-form-item-label>label]:h-auto mb-4"
              >
                <GlassInput type="number" placeholder="e.g. 40" />
              </Form.Item>
            </Col>
          </Row>

          {/* Section: Route */}
          <div className="mb-1 mt-2">
            <SectionLabel>Route</SectionLabel>
          </div>
          <Row gutter={[14, 4]}>
            <Col lg={12} xs={24}>
              <Form.Item
                name="from"
                rules={[{ required: true, message: "Required" }]}
                className="[&_.ant-form-item-label]:p-0 [&_.ant-form-item-label>label]:h-auto mb-4"
              >
                <GlassInput type="text" placeholder="Departure city" />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item
                name="to"
                rules={[{ required: true, message: "Required" }]}
                className="[&_.ant-form-item-label]:p-0 [&_.ant-form-item-label>label]:h-auto mb-4"
              >
                <GlassInput type="text" placeholder="Destination city" />
              </Form.Item>
            </Col>
          </Row>

          {/* Section: Schedule */}
          <div className="mb-1 mt-2">
            <SectionLabel>Schedule</SectionLabel>
          </div>
          <Row gutter={[14, 4]}>
            <Col lg={8} xs={24}>
              <Form.Item
                name="journeyDate"
                rules={[{ required: true, message: "Required" }]}
                className="[&_.ant-form-item-label]:p-0 [&_.ant-form-item-label>label]:h-auto mb-4"
              >
                <GlassInput type="date" />
              </Form.Item>
            </Col>
            <Col lg={8} xs={24}>
              <Form.Item
                name="departure"
                rules={[{ required: true, message: "Required" }]}
                className="[&_.ant-form-item-label]:p-0 [&_.ant-form-item-label>label]:h-auto mb-4"
              >
                <GlassInput type="time" />
              </Form.Item>
            </Col>
            <Col lg={8} xs={24}>
              <Form.Item
                name="arrival"
                rules={[{ required: true, message: "Required" }]}
                className="[&_.ant-form-item-label]:p-0 [&_.ant-form-item-label>label]:h-auto mb-4"
              >
                <GlassInput type="time" />
              </Form.Item>
            </Col>
          </Row>

          {/* Section: Pricing & Status */}
          <div className="mb-1 mt-2">
            <SectionLabel>Pricing &amp; Status</SectionLabel>
          </div>
          <Row gutter={[14, 4]}>
            <Col lg={8} xs={24}>
              <Form.Item
                name="type"
                rules={[{ required: true, message: "Type" }]}
                className="[&_.ant-form-item-label]:p-0 [&_.ant-form-item-label>label]:h-auto mb-4"
              >
                <GlassSelect>
                  <option value="AC">AC</option>
                  <option value="Non-AC">Non-AC</option>
                </GlassSelect>
              </Form.Item>
            </Col>
            <Col lg={8} xs={24}>
              <Form.Item
                name="fare"
                rules={[{ required: true, message: "Fare" }]}
                className="[&_.ant-form-item-label]:p-0 [&_.ant-form-item-label>label]:h-auto mb-4"
              >
                <GlassInput type="number" placeholder="e.g. 500" />
              </Form.Item>
            </Col>
            <Col lg={8} xs={24}>
              <Form.Item
                name="status"
                rules={[{ required: true, message: "Status" }]}
                className="[&_.ant-form-item-label]:p-0 [&_.ant-form-item-label>label]:h-auto mb-4"
              >
                <GlassSelect>
                  <option value="Yet To Start">Yet To Start</option>
                  <option value="Running">Running</option>
                  <option value="Completed">Completed</option>
                </GlassSelect>
              </Form.Item>
            </Col>
          </Row>

          {/* ── Footer actions ── */}
          <div className="flex items-center justify-end gap-3 pt-4 mt-2 border-t border-white/[0.07]">
            <button
              type="button"
              onClick={() => { setSelectedBus(null); setShowBusForm(false); }}
              className="px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200
                         text-sky-400/90 bg-sky-400/[0.05] border border-sky-400/25
                         hover:bg-sky-400/10 hover:border-sky-400/45 font-sora"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl border-0 text-sm font-semibold text-white
                         cursor-pointer tracking-wide transition-all duration-200 hover:-translate-y-px active:scale-[0.98]
                         bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-400
                         shadow-[0_4px_14px_rgba(14,165,233,0.3),inset_0_1px_0_rgba(255,255,255,0.15)]
                         font-sora"
            >
              <SaveIcon size={14} />
              {type === "add" ? "Add Bus" : "Save Changes"}
            </button>
          </div>

        </Form>
      </div>
    </Modal>
  );
}

export default BusForm;