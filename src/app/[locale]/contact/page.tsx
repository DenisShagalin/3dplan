"use client";

import { useTranslations } from "next-intl";
import { useCallback, useId, useMemo, useState } from "react";
import { Input, Button } from "antd";
import { useRouter } from "@/i18n/navigation";
import { sendEmail } from "@/app/utils/email";
import { allowConfirmation } from "@/app/utils/confirmation";
import "./contact.css";

export default function Mail() {
  const t = useTranslations();
  const router = useRouter();
  const id = useId();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [submitLabel, setSubmitLabel] = useState(t("control.submit"));
  const [isLoading, setLoading] = useState(false);

  const isActive = useMemo(
    () => email.trim() && message.trim() && firstName.trim() && lastName.trim(),
    [email, message, firstName, lastName],
  );

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);
      await sendEmail({
        message,
        subject: `Message from ${email}: ${firstName} ${lastName}`,
      });
      setLoading(false);
      setSubmitLabel(t("control.wasSended"));
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
      allowConfirmation("contact");
      router.push("/confirmation");
    } catch (e) {
      setLoading(false);
      setSubmitLabel(t("control.error"));
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
      setTimeout(() => {
        setSubmitLabel(t("control.submit"));
      }, 5000);
    }
  }, [email, firstName, lastName, message]);

  return (
    <div className="contact_page ui_page">
      <div className="contact_head">
        <h1 className="contact_h1">
          {t.rich("mailForm.title", {
            br: () => <br />,
          })}
        </h1>
        <p className="contact_lead">
          {t.rich("mailForm.description", {
            br: () => <br />,
          })}
        </p>
      </div>

      <section className="contact_card ui_card">
        <div className="ui_grid">
          <div className="ui_field">
            <label htmlFor={`${id}-first`} className="ui_label">
              {t("mailForm.name")}
              <span className="ui_req"> *</span>
            </label>
            <Input
              id={`${id}-first`}
              className="ui_input"
              placeholder={t("mailForm.firstName")}
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </div>

          <div className="ui_field">
            <label htmlFor={`${id}-last`} className="ui_label">
              {t("mailForm.lastName")}
              <span className="ui_req"> *</span>
            </label>
            <Input
              id={`${id}-last`}
              className="ui_input"
              placeholder={t("mailForm.lastName")}
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </div>

          <div className="ui_field ui_field_wide">
            <label htmlFor={`${id}-email`} className="ui_label">
              {t("mailForm.email")}
              <span className="ui_req"> *</span>
            </label>
            <Input
              id={`${id}-email`}
              className="ui_input"
              placeholder={t("mailForm.email")}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="ui_field ui_field_wide">
            <label htmlFor={`${id}-message`} className="ui_label">
              {t("mailForm.message")}
              <span className="ui_req"> *</span>
            </label>
            <Input.TextArea
              id={`${id}-message`}
              className="ui_input ui_textarea"
              autoSize={{ minRows: 5, maxRows: 10 }}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
          </div>
        </div>

        <div className="contact_submit_row">
          <Button
            onClick={onSubmit}
            disabled={!isActive}
            loading={isLoading}
            className="contact_submit ui_btn"
          >
            {submitLabel}
          </Button>
        </div>
      </section>
    </div>
  );
}
