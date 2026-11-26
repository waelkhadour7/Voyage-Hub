import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Modal from "./Modal";
import Logo from "./Logo";
import FormSection from "./FormSection";
import Field from "./Field";
import countries from "../data/countries";

export default function AgentModal({ open, onClose }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formEl = e.target;
    const rawData = Object.fromEntries(new FormData(formEl));

    // Construct FormData for maximum compatibility with FormSubmit
    const formData = new FormData();
    formData.append("_subject", `New Agent Sign Up: ${rawData.agentName || rawData.affiliateName}`);
    formData.append("_captcha", "false");
    formData.append("_template", "table");
    formData.append("_replyto", rawData.email || "");

    formData.append("Agent Name", rawData.agentName || "");
    formData.append("Affiliate Name", rawData.affiliateName || "");
    formData.append("Email Address", rawData.email || "");
    formData.append("Mobile Number", rawData.mobile || "");
    formData.append("Company Address", rawData.companyAddress || "");
    formData.append("Personal Address", rawData.address || "");
    formData.append("Website", rawData.website || "N/A");
    formData.append("Country", rawData.country || "N/A");
    formData.append("City", rawData.city || "N/A");
    formData.append("Zip Code", rawData.zip || "N/A");
    formData.append("Telephone Number", rawData.telephone || "N/A");
    formData.append("WhatsApp Number", rawData.whatsapp || "N/A");
    formData.append("Skype ID", rawData.skype || "N/A");
    formData.append("Designation", rawData.designation || "N/A");
    formData.append("Preferred Currency", rawData.currency || "N/A");

    try {
      const res = await fetch("https://formsubmit.co/ajax/waelkhadour94@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const resData = await res.json();
      if (res.ok || resData.success === "true") {
        setSent(true);
      } else {
        setSent(true);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  const close = () => {
    setSent(false);
    setError(null);
    onClose();
  };

  return (
    <Modal open={open} onClose={close}>
      <aside className="modal-side">
        <span className="pill"><b /> VOYAGE AGENT PORTAL</span>
        <h3>Grow Your Travel Business With Us</h3>
        <p>Join Voyage as a travel partner and access global travel solutions, competitive rates and reliable support for your customers.</p>
        <div className="side-foot">
          <Logo />
          <small>Your trusted partner for worldwide travel solutions.</small>
        </div>
      </aside>

      <div className="modal-main">
        <header className="modal-head">
          <small>AGENT ENQUIRY</small>
          <h2>Become a Travel Partner</h2>
          <p>Fill in your details below, and our team will get in touch with you.</p>
        </header>

        {sent ? (
          <div className="sent">
            <h3>Thank you!</h3>
            <p>Your details have been submitted successfully. Our team will review your application and contact you shortly.</p>
            <button className="submit" onClick={close}>Close</button>
          </div>
        ) : (
          <form className="form-body" onSubmit={handleSubmit}>
            {error && <div className="error-banner" style={{ color: "#e53e3e", fontSize: "12px", padding: "8px", background: "#fff5f5", borderRadius: "4px" }}>{error}</div>}

            <FormSection number="01" title="Company Details" subtitle="Enter your company information">
              <Field label="Affiliate Name" name="affiliateName" required />
              <Field label="Address" name="companyAddress" required placeholder="Enter company address" />
              <Field label="Website" name="website" placeholder="www.example.com" />
              <Field label="Country" name="country" options={countries} />
              <Field label="City" name="city" />
              <Field label="Zip Code" name="zip" required />
            </FormSection>

            <FormSection number="02" title="Profile Details" subtitle="Provide your personal and contact information">
              <Field label="Agent Name" name="agentName" required />
              <Field label="Address" name="address" required />
              <Field label="Mobile" name="mobile" type="tel" required placeholder="Enter mobile number" />
              <Field label="Email Address" name="email" type="email" required />
              <Field label="Telephone Number" name="telephone" type="tel" />
              <Field label="Preferred Currency" name="currency" />
              <Field label="WhatsApp Number" name="whatsapp" type="tel" />
              <Field label="Skype ID" name="skype" />
              <Field label="Designation" name="designation" />
            </FormSection>

            <button className="submit" type="submit" disabled={loading}>
              {loading ? "Sending Details..." : <>Submit Details <ArrowRight size={14} /></>}
            </button>
            <p className="terms">By submitting this form, you agree to our terms and conditions and confirm that the information provided is accurate.</p>
          </form>
        )}
      </div>
    </Modal>
  );
}
