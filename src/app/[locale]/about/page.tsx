"use client";

import { useTranslations } from "next-intl";
import "./about.css";

export default function About() {
  const t = useTranslations();
  return (
    <div className="about_page ui_page">
      <section className="about_hero">
        <div className="about_photo_box">
          <img className="about_img" src="/aboutus.jpg" alt="about us" />
        </div>

        {/* "aboutus.description" is trusted authored HTML (<h2> + <p>). */}
        <div
          className="about_copy"
          dangerouslySetInnerHTML={{ __html: t.raw("aboutus.description") }}
        />
      </section>
    </div>
  );
}
