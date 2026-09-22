"use client";

import { useTranslations } from "next-intl";
import { useCallback, useId, useMemo, useRef, useState } from "react";
import { Input, Button } from "antd";
import { Select } from "antd";
import { sendEmail } from "../utils/email";
import { allowConfirmation } from "../utils/confirmation";
import "./order.css";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useRouter } from "@/i18n/navigation";
import Image from "next/image";

export type OrderType =
  | "2D floor plan with dimensions"
  | "2D floor plan with furniture"
  | "3D floor plan with furniture"
  | "";

// The order form lives on its own page now; the service is picked through a
// short slug in the query string: "/order?type=3d-furniture".
export const ORDER_PAGE_PATHNAME = "/order";

const ORDER_TYPE_SLUGS: Record<Exclude<OrderType, "">, string> = {
  "2D floor plan with dimensions": "2d-dimension",
  "2D floor plan with furniture": "2d-furniture",
  "3D floor plan with furniture": "3d-furniture",
};

export const getOrderHref = (orderType: OrderType) =>
  orderType
    ? {
        pathname: ORDER_PAGE_PATHNAME,
        query: { type: ORDER_TYPE_SLUGS[orderType] },
      }
    : ORDER_PAGE_PATHNAME;

/** Unknown or missing slugs open the form with nothing preselected. */
export const getOrderTypeFromSlug = (slug?: string | null): OrderType =>
  (Object.entries(ORDER_TYPE_SLUGS).find(([, value]) => value === slug)?.[0] as
    | OrderType
    | undefined) ?? "";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const roomCovering = [
  "/covering/room/1 Light oak.png",
  "/covering/room/2 Natural oak.png",
  "/covering/room/3 Herringbone parquet.png",
  "/covering/room/4 Ornamental parquet.png",
  "/covering/room/5 Dark oak.png",
  "/covering/room/6 Rustic oak.png",
  "/covering/room/7 Weathered oak.png",
  "/covering/room/8 Light grey tile.png",
  "/covering/room/9 Grey tile.png",
  "/covering/room/10 Dark grey tile.png",
  "/covering/room/11 Beige tile.png",
  "/covering/room/12 Terracotta tile.png",
  "/covering/room/13 Brown tile.png",
  "/covering/room/14 Green tile.png",
  "/covering/room/15 Blue tile.png",
  "/covering/room/16 Beige mosaic tile.png",
  "/covering/room/17 White marble tile.png",
  "/covering/room/18 Black marble tile.png",
  "/covering/room/19 Black and white tile.png",
  "/covering/room/20 Concrete.png",
];

const bathCovering = [
  "/covering/bath/1 Light grey tile.png",
  "/covering/bath/2 Grey tile.png",
  "/covering/bath/3 Dark grey tile.png",
  "/covering/bath/4 Beige tile.png",
  "/covering/bath/5 Terracotta tile.png",
  "/covering/bath/6 Brown tile.png",
  "/covering/bath/7 Green tile.png",
  "/covering/bath/8 Blue tile.png",
  "/covering/bath/9 Beige mosaic tile.png",
  "/covering/bath/10 White marble tile.png",
  "/covering/bath/11 Black marble tile.png",
  "/covering/bath/12 Black and white tile.png",
];

const kitchenCovering = [
  "/covering/kitchen/1 Light oak.png",
  "/covering/kitchen/2 Natural oak.png",
  "/covering/kitchen/3 Herringbone parquet.png",
  "/covering/kitchen/4 Ornamental parquet.png",
  "/covering/kitchen/5 Dark oak.png",
  "/covering/kitchen/6 Rustic oak.png",
  "/covering/kitchen/7 Weathered oak.png",
  "/covering/kitchen/8 Light grey tile.png",
  "/covering/kitchen/9 Grey tile.png",
  "/covering/kitchen/10 Dark grey tile.png",
  "/covering/kitchen/11 Beige tile.png",
  "/covering/kitchen/12 Terracotta tile.png",
  "/covering/kitchen/13 Brown tile.png",
  "/covering/kitchen/14 Green tile.png",
  "/covering/kitchen/15 Blue tile.png",
  "/covering/kitchen/16 Beige mosaic tile.png",
  "/covering/kitchen/17 White marble tile.png",
  "/covering/kitchen/18 Black marble tile.png",
  "/covering/kitchen/19 Black and white tile.png",
  "/covering/kitchen/20 Concrete.png",
];

const terraceCovering = [
  "/covering/terrace/1 Small grey tile.png",
  "/covering/terrace/2 Grey tile.png",
  "/covering/terrace/3 Beige tile.png",
  "/covering/terrace/4 Terracotta tile.png",
  "/covering/terrace/5 Beige mosaic tile.png",
  "/covering/terrace/7 Dark decking board.png",
  "/covering/terrace/8 Concrete.png",
  "/covering/terrace/9 Grey paving stone.png",
  "/covering/terrace/10 Brown paving stone.png",
];

const outdoorCovering = [
  "/covering/outdoor/1 Grass.png",
  "/covering/outdoor/2 Grey tile.png",
  "/covering/outdoor/2 Parking surface.png",
  "/covering/outdoor/3 Beige tile.png",
  "/covering/outdoor/4 Terracotta tile.png",
  "/covering/outdoor/5 Stones.png",
  "/covering/outdoor/6 Light decking board.png",
  "/covering/outdoor/7 Dark decking board.png",
  "/covering/outdoor/8 Concrete.png",
  "/covering/outdoor/9 Grey paving stone.png",
  "/covering/outdoor/10 Brown paving stone.png",
];

const doorCovering = [
  "/covering/door/Dark wood.png",
  "/covering/door/Light wood.png",
  "/covering/door/White.png",
];

const ORDER_TYPES = {
  dimensions: "2D floor plan with dimensions",
  furniture2d: "2D floor plan with furniture",
  furniture3d: "3D floor plan with furniture",
} as const;

const BUSINESS_CLIENT = "businessClient";
const PRIVATE_CLIENT = "privateClient";

type ValidationKey =
  | "required"
  | "email"
  | "types"
  | "files"
  | "fileSize"
  | "terms"
  | "withdrawal"
  | "summary";

type ValidationMessages = Record<ValidationKey, string>;

/** Reads the "validation.*" namespace of the active locale. */
const useValidationMessages = (): ValidationMessages => {
  const t = useTranslations("validation");
  return useMemo(
    () => ({
      required: t("required"),
      email: t("email"),
      types: t("types"),
      files: t("files"),
      fileSize: t("fileSize"),
      terms: t("terms"),
      withdrawal: t("withdrawal"),
      summary: t("summary"),
    }),
    [t],
  );
};

type OrderValues = {
  types: string[];
  files: File[];
  clientType: string;
  firstName: string;
  lastName: string;
  org: string;
  iuid: string;
  country: string;
  city: string;
  idx: string;
  address: string;
  email: string;
  isAgreed: boolean;
  termRequest: string;
};

type FieldKey = keyof OrderValues;

type FormErrors = Partial<Record<FieldKey, string>>;

const validateOrder = (
  values: OrderValues,
  messages: ValidationMessages,
): FormErrors => {
  const errors: FormErrors = {};

  const requireText = (key: FieldKey, value: string) => {
    if (!value.trim()) {
      errors[key] = messages.required;
    }
  };

  if (!values.types.length) {
    errors.types = messages.types;
  }

  if (!values.files.length) {
    errors.files = messages.files;
  }

  requireText("clientType", values.clientType);
  requireText("firstName", values.firstName);
  requireText("lastName", values.lastName);
  requireText("country", values.country);
  requireText("city", values.city);
  requireText("idx", values.idx);
  requireText("address", values.address);

  // Company details are only asked of business clients, the withdrawal waiver
  // only of private ones — the inputs of the other branch stay disabled.
  if (values.clientType === BUSINESS_CLIENT) {
    requireText("org", values.org);
    requireText("iuid", values.iuid);
  }

  if (values.clientType === PRIVATE_CLIENT && !values.termRequest) {
    errors.termRequest = messages.withdrawal;
  }

  if (!values.email.trim()) {
    errors.email = messages.required;
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = messages.email;
  }

  if (!values.isAgreed) {
    errors.isAgreed = messages.terms;
  }

  return errors;
};

const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <span role="alert" className="order_error ui_error">
      {message}
    </span>
  ) : null;

const StepTitle = ({ step, title }: { step: number; title: string }) => (
  <div className="order_step">
    <span className="order_step_num">{step}</span>
    <h2 className="order_step_title">{title}</h2>
  </div>
);

const TextField = ({
  label,
  value,
  onChange,
  error,
  disabled,
  required = true,
  wide,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  wide?: boolean;
}) => {
  const id = useId();
  return (
    <div
      className={`order_field ui_field${wide ? " order_field_wide ui_field_wide" : ""}`}
      data-error={error ? "true" : undefined}
    >
      <label
        htmlFor={id}
        className={`order_label ui_label${disabled ? " is-disabled" : ""}`}
      >
        {label}
        {required ? <span className="order_req ui_req"> *</span> : null}
      </label>
      <Input
        id={id}
        className="order_input ui_input"
        placeholder={label}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        status={error ? "error" : undefined}
      />
      <FieldError message={error} />
    </div>
  );
};

const SelectField = ({
  label,
  value,
  onChange,
  options,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  error?: string;
}) => {
  const id = useId();
  return (
    <div
      className="order_field ui_field"
      data-error={error ? "true" : undefined}
    >
      <label htmlFor={id} className="order_label ui_label">
        {label}
      </label>
      <Select
        id={id}
        className="order_select"
        value={value || undefined}
        onChange={onChange}
        options={options}
        status={error ? "error" : undefined}
      />
      <FieldError message={error} />
    </div>
  );
};

const ServiceOption = ({
  content,
  onChange,
  isChecked,
}: {
  content: string;
  onChange: () => void;
  isChecked: boolean;
}) => (
  <label className={`order_option${isChecked ? " is-active" : ""}`}>
    <input type="checkbox" checked={isChecked} onChange={onChange} />
    <span className="order_option_name">{content}</span>
  </label>
);

const CheckRow = ({
  content,
  onChange,
  isChecked,
  disabled,
}: {
  content: string;
  onChange: () => void;
  isChecked: boolean;
  disabled?: boolean;
}) => (
  <label className="order_check">
    <input
      type="checkbox"
      checked={isChecked}
      disabled={disabled}
      onChange={onChange}
    />
    <span>{content}</span>
  </label>
);

const MaterialsChooser = ({
  title,
  coverings,
  onChange,
  current,
}: {
  title: string;
  coverings: string[];
  onChange: (type: string) => void;
  current: string[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`order_materials${isOpen ? " is-open" : ""}`}>
      <button
        type="button"
        className="order_materials_head"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="order_materials_title">{title}</span>
        {current.length > 0 ? (
          <span className="order_materials_count">{current.length}</span>
        ) : null}
        {isOpen ? <UpOutlined /> : <DownOutlined />}
      </button>

      <div className="order_swatches" hidden={!isOpen}>
        {coverings.map((src) => {
          const name = src
            .split("/")
            .pop()
            ?.replace(/\.[^.]+$/, "")
            ?.replace(/\d/, "");
          const isChecked = current.includes(src);
          return (
            <label
              key={src}
              title={name}
              className={`order_swatch${isChecked ? " is-active" : ""}`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onChange(src)}
              />
              <Image
                src={src}
                alt={name ?? src}
                width={0}
                height={0}
                sizes="120px"
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};

export function OrderForm({ defaultValue = "" }: { defaultValue?: OrderType }) {
  const router = useRouter();

  const [type, setType] = useState("");
  const [clientType, setClientType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [iuid, setIuid] = useState("");
  const [country, setCountry] = useState("");

  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [city, setCity] = useState("");
  const [idx, setIdx] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const [types, setTypes] = useState<string[]>(
    defaultValue ? [defaultValue] : [],
  );
  const [files, setFiles] = useState<File[]>([]);
  const [fileSizeError, setFileSizeError] = useState("");
  const [coverings, setCoverings] = useState<Record<string, string[]>>({});
  const [isExpressDelivery, setExpressDelivery] = useState(false);
  const [isExteriorAreas, setExteriorAreas] = useState(false);

  const [termRequest, setTermsRequest] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const t = useTranslations();
  const validationMessages = useValidationMessages();

  const formRef = useRef<HTMLDivElement>(null);

  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  // Errors are always up to date, but only surfaced once the visitor has tried
  // to submit — so the form does not shout at anyone who has just opened it.
  const [showErrors, setShowErrors] = useState(false);

  const errors = useMemo(
    () =>
      validateOrder(
        {
          types,
          files,
          clientType,
          firstName,
          lastName,
          org,
          iuid,
          country,
          city,
          idx,
          address,
          email,
          isAgreed,
          termRequest,
        },
        validationMessages,
      ),
    [
      types,
      files,
      clientType,
      firstName,
      lastName,
      org,
      iuid,
      country,
      city,
      idx,
      address,
      email,
      isAgreed,
      termRequest,
      validationMessages,
    ],
  );

  const visibleErrors: FormErrors = showErrors ? errors : {};

  const submitLabel =
    status === "sent"
      ? t("control.wasSended")
      : status === "error"
        ? t("control.error")
        : t("order.orderButton");

  const clear = useCallback(() => {
    setFirstName("");
    setLastName("");
    setIuid("");
    setCountry("");
    setEmail("");
    setMessage("");
    setType("");
    setOrg("");
    setCity("");
    setIdx("");
    setAddress("");
    setTypes([]);
    setFiles([]);
    setFileSizeError("");
    setCoverings({});
    setExpressDelivery(false);
    setExteriorAreas(false);
    setTermsRequest("");
    setIsAgreed(false);
    setClientType("");
    setShowErrors(false);
  }, []);

  const scrollToFirstError = useCallback(() => {
    // The errors are painted on the next render, so wait for it before looking.
    requestAnimationFrame(() => {
      formRef.current
        ?.querySelector('[data-error="true"]')
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, []);

  const onSubmit = useCallback(async () => {
    if (Object.keys(errors).length > 0) {
      setShowErrors(true);
      setStatus("idle");
      scrollToFirstError();
      return;
    }

    const coveringEntries = Object.entries(coverings)
      .filter(([, values]) => values.length > 0)
      .map(
        ([key, values]) =>
          `  ${key}: ${values
            .map(
              (v) =>
                v
                  .split("/")
                  .pop()
                  ?.replace(/\.[^.]+$/, "") ?? v,
            )
            .join(", ")}`,
      )
      .join("\n");

    try {
      setLoading(true);
      const response = await sendEmail({
        message: `
Order Types: ${types.join(", ")}
Express Delivery: ${isExpressDelivery ? "Yes" : "No"}
Exterior Areas: ${isExteriorAreas ? "Yes" : "No"}

--- Coverings ---
${coveringEntries || "None selected"}

--- Recipient ---
Salutation: ${type}
Name: ${firstName} ${lastName}
Email: ${email}
Organization: ${org}
UID: ${iuid}
Country: ${country}
City: ${city}
Postal Code: ${idx}
Address: ${address}
Client Type: ${clientType}

--- Terms ---
Agreed to Terms: ${isAgreed ? "Yes" : "No"}
Requested Terms Copy: ${termRequest}

--- Comment ---
${message || "—"}
        `,
        subject: `Order from ${email}: ${firstName} ${lastName}`,
        files,
      });

      // fetch only rejects on a network failure, so a 4xx/5xx would otherwise
      // pass for a delivered order and send the visitor to the thank-you page.
      if (!response.ok) {
        throw new Error(`Order request failed with status ${response.status}`);
      }

      setLoading(false);
      setStatus("sent");
      clear();
      allowConfirmation("order");
      router.push("/confirmation");
    } catch (e) {
      setLoading(false);
      setStatus("error");
      // The input is deliberately kept so the visitor can simply retry.
      setTimeout(() => setStatus("idle"), 5000);
    }
  }, [
    errors,
    scrollToFirstError,
    email,
    message,
    firstName,
    lastName,
    org,
    iuid,
    country,
    idx,
    city,
    address,
    type,
    types,
    isExpressDelivery,
    isExteriorAreas,
    coverings,
    isAgreed,
    termRequest,
    files,
    clientType,
    clear,
    router,
  ]);

  const onTypeChange = useCallback(
    (orderType: string) => () => {
      setTypes((current) =>
        current.includes(orderType)
          ? current.filter((item) => item !== orderType)
          : [...current, orderType],
      );
    },
    [],
  );

  const onClientTypeChange = useCallback((value: string) => {
    setClientType(value);
    // Drop whatever belongs to the other branch, otherwise a value typed before
    // the switch stays in the state and is mailed out from a disabled input.
    if (value === PRIVATE_CLIENT) {
      setOrg("");
      setIuid("");
    } else {
      setTermsRequest("");
    }
  }, []);

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = Array.from(e.target.files || []);
      const overallSize = selected.reduce((acc, file) => acc + file.size, 0);

      if (overallSize > MAX_FILE_SIZE_BYTES) {
        // Keep the previous selection and say why the new one was rejected —
        // before, oversized files were dropped without a word.
        setFileSizeError(validationMessages.fileSize);
        e.target.value = "";
        return;
      }

      setFileSizeError("");
      setFiles(selected);
    },
    [validationMessages],
  );

  const onCoveringChange = useCallback(
    (field: string) => (covering: string) => {
      setCoverings((current) => {
        const selected = current[field] || [];
        return {
          ...current,
          [field]: selected.includes(covering)
            ? selected.filter((item) => item !== covering)
            : [...selected, covering],
        };
      });
    },
    [],
  );

  const isBusinessClient = clientType === BUSINESS_CLIENT;
  const isPrivateClient = clientType === PRIVATE_CLIENT;
  const fileError = fileSizeError || visibleErrors.files;

  const orderTypeOptions = [
    { value: ORDER_TYPES.dimensions, label: t("order.type1") },
    { value: ORDER_TYPES.furniture2d, label: t("order.type2") },
    { value: ORDER_TYPES.furniture3d, label: t("order.type3") },
  ];

  const summaryRows = [
    ...orderTypeOptions
      .filter((option) => types.includes(option.value))
      .map((option) => option.label),
    ...(isExpressDelivery ? [t("order.expressDelivery")] : []),
    ...(isExteriorAreas ? [t("order.exteriorAreas")] : []),
  ];

  return (
    <div ref={formRef} className="order_page ui_page">
      <div className="order_crumbs">
        {t("toolbar.services")} / {t("control.order")}
      </div>
      <h1 className="order_h1">{t("control.order")}</h1>

      <div className="order_layout">
        <div className="order_main">
          {/* STEP 1: services and surcharges */}
          <section className="order_card ui_card">
            <StepTitle step={1} title={t("order.title")} />

            <div data-error={visibleErrors.types ? "true" : undefined}>
              {orderTypeOptions.map((option) => (
                <ServiceOption
                  key={option.value}
                  content={option.label}
                  isChecked={types.includes(option.value)}
                  onChange={onTypeChange(option.value)}
                />
              ))}
              <FieldError message={visibleErrors.types} />
            </div>

            <div className="order_group">
              <div className="order_surcharge">
                <CheckRow
                  content={t("order.expressDelivery")}
                  isChecked={isExpressDelivery}
                  onChange={() => setExpressDelivery(!isExpressDelivery)}
                />
                <CheckRow
                  content={t("order.exteriorAreas")}
                  isChecked={isExteriorAreas}
                  onChange={() => setExteriorAreas(!isExteriorAreas)}
                />
              </div>
            </div>
          </section>

          {/* STEP 2: plan upload, materials and comment */}
          <section className="order_card ui_card">
            <StepTitle step={2} title={t("order.materialsTitle")} />

            <div data-error={fileError ? "true" : undefined}>
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/*, application/pdf"
                onChange={onFileChange}
              />
              <label
                htmlFor="file-upload"
                className={`order_upload${files.length > 0 ? " has-files" : ""}`}
                style={
                  fileError ? { borderColor: "var(--order-error)" } : undefined
                }
              >
                <span className="order_upload_btn">
                  {t("order.fileInputButton")}
                </span>
                <span id="file-name-display">
                  {files.length > 0
                    ? files.map((file) => file.name).join(", ")
                    : t("order.fileInputLabel")}
                  <span className="order_req ui_req"> *</span>
                </span>
              </label>
              <FieldError message={fileError} />
            </div>

            <div className="order_group">
              <MaterialsChooser
                title={t("order.roomCoveringTitle")}
                coverings={roomCovering}
                onChange={onCoveringChange("roomCovering")}
                current={coverings["roomCovering"] || []}
              />
              <MaterialsChooser
                title={t("order.bathroomsCoveringTitle")}
                coverings={bathCovering}
                onChange={onCoveringChange("bathCovering")}
                current={coverings["bathCovering"] || []}
              />
              <MaterialsChooser
                title={t("order.kitchecnCoveringTitle")}
                coverings={kitchenCovering}
                onChange={onCoveringChange("kitchenCovering")}
                current={coverings["kitchenCovering"] || []}
              />
              <MaterialsChooser
                title={t("order.terraceCoveringTitle")}
                coverings={terraceCovering}
                onChange={onCoveringChange("terraceCovering")}
                current={coverings["terraceCovering"] || []}
              />
              <MaterialsChooser
                title={t("order.outdoorCoveringTitle")}
                coverings={outdoorCovering}
                onChange={onCoveringChange("outdoorCovering")}
                current={coverings["outdoorCovering"] || []}
              />
              <MaterialsChooser
                title={t("order.doorCoveringTitle")}
                coverings={doorCovering}
                onChange={onCoveringChange("doorCovering")}
                current={coverings["doorCovering"] || []}
              />
            </div>

            <div className="order_group">
              <label htmlFor="order-comment" className="order_group_label">
                {t("order.comment")}
              </label>
              <Input.TextArea
                id="order-comment"
                className="order_input order_textarea ui_input ui_textarea"
                autoSize={{ minRows: 3, maxRows: 5 }}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </div>
          </section>

          {/* STEP 3: invoice recipient */}
          <section className="order_card ui_card">
            <StepTitle step={3} title={t("order.recipientTitle")} />

            <div
              className="order_field ui_field"
              data-error={visibleErrors.clientType ? "true" : undefined}
              style={{ marginBottom: "16px" }}
            >
              {/* The label already carries its own asterisk. */}
              <span className="order_label ui_label">
                {t("order.clientTitle")}
              </span>
              <div
                role="radiogroup"
                aria-label={t("order.clientTitle")}
                className={`order_toggle${visibleErrors.clientType ? " has-error" : ""}`}
              >
                {[
                  { value: PRIVATE_CLIENT, label: t("order.privateClient") },
                  { value: BUSINESS_CLIENT, label: t("order.businessClient") },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={clientType === option.value}
                    className={`order_toggle_btn${clientType === option.value ? " is-active" : ""}`}
                    onClick={() => onClientTypeChange(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <FieldError message={visibleErrors.clientType} />
            </div>

            <div className="order_grid ui_grid">
              <TextField
                label={t("order.name")}
                value={firstName}
                onChange={setFirstName}
                error={visibleErrors.firstName}
              />
              <TextField
                label={t("order.surname")}
                value={lastName}
                onChange={setLastName}
                error={visibleErrors.lastName}
              />
              <SelectField
                label={t("order.recipientLabel")}
                value={type}
                onChange={setType}
                options={[
                  { value: "ms", label: t("order.recipientLabelMs") },
                  { value: "mr", label: t("order.recipientLabelMr") },
                  { value: "diverse", label: t("order.recipientLabelDiverse") },
                  { value: "unknown", label: t("order.recipientLabelUnknown") },
                ]}
              />
              <TextField
                label={t("order.mail")}
                value={email}
                onChange={setEmail}
                error={visibleErrors.email}
              />
              <TextField
                label={t("order.org")}
                value={org}
                onChange={setOrg}
                error={visibleErrors.org}
                disabled={isPrivateClient}
                required={isBusinessClient}
              />
              <TextField
                label={t("order.uid")}
                value={iuid}
                onChange={setIuid}
                error={visibleErrors.iuid}
                disabled={isPrivateClient}
                required={isBusinessClient}
              />
              <TextField
                label={t("order.country")}
                value={country}
                onChange={setCountry}
                error={visibleErrors.country}
              />
              <TextField
                label={t("order.city")}
                value={city}
                onChange={setCity}
                error={visibleErrors.city}
              />
              <TextField
                label={t("order.idx")}
                value={idx}
                onChange={setIdx}
                error={visibleErrors.idx}
              />
              <TextField
                label={t("order.address")}
                value={address}
                onChange={setAddress}
                error={visibleErrors.address}
              />
            </div>
          </section>

          {/* STEP 4: terms */}
          <section className="order_card ui_card">
            <StepTitle step={4} title={t("order.termsTitle")} />

            <div
              className={`order_terms${visibleErrors.isAgreed ? " has-error" : ""}`}
              data-error={visibleErrors.isAgreed ? "true" : undefined}
            >
              <label className="order_check">
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={() => setIsAgreed(!isAgreed)}
                />
                <span
                  className="order_rich"
                  dangerouslySetInnerHTML={{
                    __html: t.raw("order.termsAcceptLabel"),
                  }}
                />
              </label>
              <FieldError message={visibleErrors.isAgreed} />
            </div>

            <div
              className={`order_terms${isBusinessClient ? " is-disabled" : ""}${visibleErrors.termRequest ? " has-error" : ""}`}
              data-error={visibleErrors.termRequest ? "true" : undefined}
            >
              <div
                className="order_rich"
                dangerouslySetInnerHTML={{
                  __html: t.raw("order.termsRequest"),
                }}
              />
              <div className="order_choice">
                <CheckRow
                  content={t("order.agree")}
                  disabled={isBusinessClient}
                  isChecked={termRequest === "agree"}
                  onChange={() => setTermsRequest("agree")}
                />
                <CheckRow
                  content={t("order.disagree")}
                  disabled={isBusinessClient}
                  isChecked={termRequest === "disagree"}
                  onChange={() => setTermsRequest("disagree")}
                />
              </div>
              <FieldError message={visibleErrors.termRequest} />
            </div>
          </section>
        </div>

        {/* SIDEBAR SUMMARY */}
        <aside className="order_side">
          <div className="order_summary">
            <h3 className="order_summary_title">{t("control.order")}</h3>
            {summaryRows.length > 0 ? (
              summaryRows.map((row) => (
                <div key={row} className="order_summary_row">
                  {row}
                </div>
              ))
            ) : (
              <div className="order_summary_row is-empty">—</div>
            )}

            {/* The button stays enabled: a disabled one never explains itself. */}
            <Button
              onClick={onSubmit}
              loading={isLoading}
              className="order_submit ui_btn"
            >
              {submitLabel}
            </Button>
            {showErrors && Object.keys(errors).length > 0 ? (
              <span role="alert" className="order_summary_alert">
                {validationMessages.summary}
              </span>
            ) : null}
            <p className="order_summary_note">{t("order.orderNotification")}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
