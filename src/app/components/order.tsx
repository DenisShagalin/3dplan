"use client";

import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";
import { Input, Flex, Typography, Button, Modal } from "antd";
import { Select } from "antd";
import Title from "antd/lib/typography/Title";
import { sendEmail } from "../utils/email";
import useMedia from "./common/media-hook";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import Image from "next/image";

export type OrderType =
  | "2dDimension"
  | "2dFurniture"
  | "3dFurniture"
  | "planBasic"
  | "planPlus"
  | "planPro";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

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

const TypeBlock = ({
  content,
  onChange,
  isChecked,
}: {
  content: string;
  onChange: () => void;
  isChecked: boolean;
}) => {
  return (
    <Flex
      style={{
        backgroundColor: "var(--main-white-color)",
        padding: "2px 4px",
        width: "100%",
        margin: "0.25rem 0",
        borderRadius: "4px",
      }}
    >
      <input checked={isChecked} type="checkbox" onChange={onChange} />
      <Typography.Text style={{ paddingLeft: "0.25rem" }}>
        {content}
      </Typography.Text>
    </Flex>
  );
};

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
    <Flex
      vertical
      align="center"
      style={{
        backgroundColor: "var(--main-white-color)",
        padding: "0.5rem",
        width: "50%",
        borderRadius: "4px",
      }}
    >
      <Title
        style={{
          fontFamily: "Arial",
          color: "var(--main-grey-color)",
          textAlign: "center",
          margin: "0.5rem",
        }}
        level={5}
      >
        {title}
      </Title>
      {isOpen ? (
        <UpOutlined
          onClick={() => setIsOpen(false)}
          style={{ marginBottom: "0.5rem" }}
        />
      ) : (
        <DownOutlined onClick={() => setIsOpen(true)} />
      )}

      <Flex wrap="wrap" style={{ display: isOpen ? "" : "none" }}>
        {coverings.map((src) => (
          <Flex key={src} style={{ width: "45%", margin: "0.5rem" }}>
            <input
              type="checkbox"
              checked={current.includes(src)}
              onChange={() => onChange(src)}
            />
            <Image
              src={src}
              alt={src}
              width={0}
              height={0}
              sizes="100wh"
              style={{
                width: "50%",
                height: "auto",
                flex: 1,
                paddingLeft: "0.5rem",
              }}
            />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export function Order({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (b: boolean) => void;
  defaultValue: OrderType;
}) {
  const [type, setType] = useState("");
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

  const [types, setTypes] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [coverings, setCoverings] = useState<Record<any, any>>({});
  const [isExpressDeliviery, setExpressDelivery] = useState(false);
  const [isExteriorAreas, setExteriorAreas] = useState(false);

  const [termRequest, setTermsRequest] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const t = useTranslations();

  const { isSmall } = useMedia();

  const [isLoading, setLoading] = useState(false);
  const [submitLabel, setSubmitLabel] = useState(t("order.orderButton"));

  const isActive = useMemo(
    () =>
      email.trim() &&
      firstName.trim() &&
      lastName.trim() &&
      org.trim() &&
      iuid.trim() &&
      country.trim() &&
      idx.trim() &&
      city.trim() &&
      address.trim() &&
      isAgreed &&
      types.length > 0,
    [
      email,
      firstName,
      lastName,
      org,
      iuid,
      country,
      idx,
      type,
      city,
      address,
      isAgreed,
      types,
    ],
  );

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
    setCoverings({});
    setExpressDelivery(false);
    setExteriorAreas(false);
    setTermsRequest(false);
    setIsAgreed(false);
  }, []);

  const onSubmit = useCallback(async () => {
    const coveringEntries = Object.entries(coverings)
      .filter(([, values]) => (values as string[]).length > 0)
      .map(
        ([key, values]) =>
          `  ${key}: ${(values as string[])
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
      await sendEmail({
        message: `
Order Types: ${types.join(", ")}
Express Delivery: ${isExpressDeliviery ? "Yes" : "No"}
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

--- Terms ---
Agreed to Terms: ${isAgreed ? "Yes" : "No"}
Requested Terms Copy: ${termRequest ? "Yes" : "No"}

--- Comment ---
${message || "—"}
        `,
        subject: `Order from ${email}: ${firstName} ${lastName}`,
      });
      setLoading(false);
      setSubmitLabel(t("control.wasSended"));
      clear();
      setTimeout(() => {
        setSubmitLabel(t("order.orderButton"));
        setLoading(false);
      }, 5000);
    } catch (e) {
      setLoading(false);
      setSubmitLabel(t("control.error"));
      clear();
      setTimeout(() => {
        setSubmitLabel(t("order.orderButton"));
      }, 5000);
    }
  }, [
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
    isExpressDeliviery,
    isExteriorAreas,
    coverings,
    isAgreed,
    termRequest,
    clear,
  ]);

  const onTypeChange = useCallback(
    (type: string) => () => {
      if (types.includes(type)) {
        setTypes(types.filter((t) => t !== type));
      } else {
        setTypes([...types, type]);
      }
    },
    [types],
  );

  const renderTitle = useCallback(
    (title: string) => (
      <Title
        style={{
          fontFamily: "Arial",
          color: "var(--main-grey-color)",
          textAlign: "center",
          margin: "1rem",
        }}
        level={4}
      >
        {title}
      </Title>
    ),
    [],
  );

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const overallSize = files.reduce((acc, file) => acc + file.size, 0);
    if (overallSize < MAX_FILE_SIZE_BYTES) {
      setFiles(files);
    }
  }, []);

  const onCoveringChange = useCallback(
    (field: string) => (type: string) => {
      const current = coverings[field] || [];
      if (current.includes(type)) {
        setCoverings({
          ...coverings,
          [field]: current.filter((t: string) => t !== type),
        });
      } else {
        setCoverings({
          ...coverings,
          [field]: [...current, type],
        });
      }
    },
    [coverings],
  );

  return (
    <Modal
      closable={{ "aria-label": "Custom Close Button" }}
      open={open}
      onCancel={() => setOpen(false)}
      width={isSmall ? "100%" : "60%"}
      style={{
        backgroundColor: "var(--main-biege-color)",
        maxWidth: isSmall ? undefined : "820px",
        padding: 0,
        margin: isSmall ? 0 : undefined,
        top: isSmall ? 0 : undefined,
        height: isSmall ? "100%" : undefined,
      }}
      footer={null}
    >
      <Flex
        gap="small"
        align="center"
        vertical
        style={{
          width: "100%",
          padding: !isSmall ? "1rem" : undefined,
          backgroundColor: "var(--main-biege-color)",
          fontFamily: "Arial",
        }}
      >
        {renderTitle(t("order.title"))}

        <Flex vertical align="flex-start">
          <TypeBlock
            content={t("order.type1")}
            isChecked={types.includes("2D floor plan with dimensions")}
            onChange={onTypeChange("2D floor plan with dimensions")}
          />
          <TypeBlock
            content={t("order.type2")}
            isChecked={types.includes("2D floor plan with furniture")}
            onChange={onTypeChange("2D floor plan with furniture")}
          />
          <TypeBlock
            content={t("order.type3")}
            isChecked={types.includes("3D floor plan with furniture")}
            onChange={onTypeChange("3D floor plan with furniture")}
          />
        </Flex>

        <Flex
          justify="center"
          align="center"
          style={{
            backgroundColor: "var(--main-white-color)",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
          }}
        >
          <label htmlFor="file-upload" className="custom-file-upload">
            {t("order.fileInputButton")}
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            accept="image/*, application/pdf"
            onChange={onFileChange}
          />
          <span id="file-name-display">
            {files.length > 0
              ? files.map((file) => file.name).join(", ")
              : t("order.fileInputLabel")}
          </span>
        </Flex>

        <Flex
          vertical
          justify="center"
          align="center"
          style={{
            width: "100%",
          }}
        >
          <Flex vertical align="flex-start">
            <TypeBlock
              content={t("order.expressDelivery")}
              isChecked={isExpressDeliviery}
              onChange={() => setExpressDelivery(!isExpressDeliviery)}
            />
            <TypeBlock
              content={t("order.exteriorAreas")}
              isChecked={isExteriorAreas}
              onChange={() => setExteriorAreas(!isExteriorAreas)}
            />
          </Flex>
        </Flex>

        {renderTitle(t("order.materialsTitle"))}

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

        <Flex
          vertical
          align="flex-start"
          style={{
            width: "80%",
            backgroundColor: "var(--main-white-color)",
            padding: "0.5rem",
            marginTop: "1rem",
          }}
        >
          <Typography.Text>{t("order.comment")}</Typography.Text>
          <Input.TextArea
            autoSize={{ minRows: 3, maxRows: 5 }}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            style={{
              background: "var(--main-white-color)",
              border: "unset",
            }}
          />
        </Flex>

        {renderTitle(t("order.recipientTitle"))}

        {/* FORM */}
        <Flex
          vertical
          align="flex-start"
          justify="flex-start"
          style={{
            width: "82%",
          }}
        >
          <Flex vertical align="flex-start" style={{ width: "49%" }}>
            <Typography.Text>{t("order.recipientLabel")}</Typography.Text>
            <Select
              style={{
                width: "100%",
              }}
              className="recipient-select"
              onChange={(value) => setType(value)}
              options={[
                {
                  value: "ms",
                  label: t("order.recipientLabelMs"),
                },
                {
                  value: "mr",
                  label: t("order.recipientLabelMr"),
                },
                {
                  value: "diverse",
                  label: t("order.recipientLabelDiverse"),
                },
                {
                  value: "unknown",
                  label: t("order.recipientLabelUnknown"),
                },
              ]}
            />
          </Flex>

          <Flex
            align="flex-start"
            justify="space-between"
            style={{ width: "100%", padding: "0.25rem 0" }}
          >
            <Flex vertical style={{ width: "49%" }}>
              <Typography.Text>{t("order.name")} *</Typography.Text>
              <Input
                size="large"
                placeholder={t("order.name")}
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                style={{
                  background: "#ffffff",
                  border: "unset",
                }}
              />
            </Flex>
            <Flex vertical style={{ width: "49%" }}>
              <Typography.Text>{t("order.surname")} *</Typography.Text>
              <Input
                size="large"
                placeholder={t("order.surname")}
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                style={{
                  background: "#ffffff",
                  border: "unset",
                }}
              />
            </Flex>
          </Flex>

          <Flex
            align="flex-start"
            justify="space-between"
            style={{ width: "100%", padding: "0.25rem 0" }}
          >
            <Flex vertical style={{ width: "100%" }}>
              <Typography.Text>{t("order.org")} *</Typography.Text>
              <Input
                size="large"
                placeholder={t("order.org")}
                onChange={(e) => setOrg(e.target.value)}
                value={org}
                style={{
                  border: "unset",
                }}
              />
            </Flex>
          </Flex>

          <Flex
            align="flex-start"
            justify="space-between"
            style={{ width: "100%", padding: "0.25rem 0" }}
          >
            <Flex vertical style={{ width: "49%" }}>
              <Typography.Text>{t("order.uid")} *</Typography.Text>
              <Input
                size="large"
                placeholder={t("order.uid")}
                onChange={(e) => setIuid(e.target.value)}
                value={iuid}
                style={{
                  border: "unset",
                }}
              />
            </Flex>
            <Flex vertical style={{ width: "49%" }}>
              <Typography.Text>{t("order.country")} *</Typography.Text>
              <Input
                size="large"
                placeholder={t("order.country")}
                onChange={(e) => setCountry(e.target.value)}
                value={country}
                style={{
                  border: "unset",
                }}
              />
            </Flex>
          </Flex>

          <Flex
            align="flex-start"
            justify="space-between"
            style={{ width: "100%", padding: "0.25rem 0" }}
          >
            <Flex vertical style={{ width: "49%" }}>
              <Typography.Text>{t("order.city")} *</Typography.Text>
              <Input
                size="large"
                placeholder={t("order.city")}
                onChange={(e) => setCity(e.target.value)}
                value={city}
                style={{
                  border: "unset",
                }}
              />
            </Flex>
            <Flex vertical style={{ width: "49%" }}>
              <Typography.Text>{t("order.idx")} *</Typography.Text>
              <Input
                size="large"
                placeholder={t("order.idx")}
                onChange={(e) => setIdx(e.target.value)}
                value={idx}
                style={{
                  border: "unset",
                }}
              />
            </Flex>
          </Flex>

          <Flex
            align="flex-start"
            justify="space-between"
            style={{ width: "100%", padding: "0.25rem 0" }}
          >
            <Flex vertical style={{ width: "100%" }}>
              <Typography.Text>{t("order.address")} *</Typography.Text>
              <Input
                size="large"
                placeholder={t("order.address")}
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                style={{
                  border: "unset",
                }}
              />
            </Flex>
          </Flex>

          <Flex
            align="flex-start"
            justify="space-between"
            style={{ width: "100%", padding: "0.25rem 0" }}
          >
            <Flex vertical style={{ width: "100%" }}>
              <Typography.Text>{t("order.mail")} *</Typography.Text>
              <Input
                size="large"
                placeholder={t("order.mail")}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                style={{
                  background: "#ffffff",
                  border: "unset",
                }}
              />
            </Flex>
          </Flex>
        </Flex>

        {renderTitle(t("order.termsTitle"))}

        <Flex
          style={{
            width: "80%",
            backgroundColor: "var(--main-white-color)",
            padding: "0.5rem",
            borderRadius: "4px",
          }}
          justify="space-between"
          align="center"
        >
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={() => setIsAgreed(!isAgreed)}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: t.raw("order.termsAcceptLabel"),
            }}
            style={{ width: "100%", paddingLeft: "1rem" }}
          />
        </Flex>

        <Flex
          style={{
            width: "80%",
            backgroundColor: "var(--main-white-color)",
            padding: "0.5rem",
            borderRadius: "4px",
          }}
          justify="space-between"
          align="center"
        >
          <input
            type="checkbox"
            checked={termRequest}
            onChange={() => setTermsRequest(!termRequest)}
          />
          <Typography.Text style={{ paddingLeft: "1rem" }}>
            {t("order.termsRequest")}
          </Typography.Text>
        </Flex>

        <Flex
          vertical
          justify="center"
          align="center"
          style={{
            width: "100%",
          }}
        >
          <Button
            onClick={onSubmit}
            disabled={!isActive}
            loading={isLoading}
            className="order_button"
            style={{ marginTop: "1rem" }}
          >
            {submitLabel}
          </Button>
          <Typography.Text style={{ fontSize: "0.725rem", marginTop: "1rem" }}>
            {t("order.orderNotification")}
          </Typography.Text>
        </Flex>
      </Flex>
    </Modal>
  );
}
