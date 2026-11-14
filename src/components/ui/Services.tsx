import id from "@assets/flags/indonesia.svg";
import malay from "@assets/flags/malaysia.svg";
import sg from "@assets/flags/singapore.svg";
import usa from "@assets/flags/us.svg";
import { Sections } from "@components/atom";
import RevealSection from "@components/atom/RevealSection";
import type { PriceServiceInterface, ServiceInterface } from "@components/types/Interface";
import { useResponsive } from "@responsive/useResponsive";
import { supabase } from "@utils/supabase";
import React, { useEffect, useState } from "react";
interface ServicesProps {
  initialServices: ServiceInterface[];
  initialPrices: PriceServiceInterface[];
  defaultPrefix: string;
}
const Services: React.FC<ServicesProps> = ({
  initialServices,
  initialPrices,
  defaultPrefix
}) => {
  const supportedPrefixes = ["USD", "IDR", "RM", "SGD"];
  const requestedPrefix = defaultPrefix?.trim().toUpperCase();
  const initialPrefix = supportedPrefixes.includes(requestedPrefix)
    ? requestedPrefix
    : "USD";
  const [prefix, setPrefix] = useState(initialPrefix);
  const [flag, setFlag] = useState(() => {
    if (initialPrefix === "IDR") return id;
    if (initialPrefix === "SGD") return sg;
    if (initialPrefix === "RM") return malay;
    return usa;
  });
  const [flagAlt, setFlagAlt] = useState(() => {
    if (initialPrefix === "IDR") return "Indonesia flag";
    if (initialPrefix === "SGD") return "Singapore flag";
    if (initialPrefix === "RM") return "Malaysia flag";
    return "United States flag";
  });
  const { config } = useResponsive();
  const [servicesList] = useState(initialServices);
  const [priceList, setPriceList] = useState(initialPrices);

  const [priceLoading, setPriceLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadPrices = async () => {
      setPriceLoading(true);
      try {
        const { data, error } = await supabase
          .from("pricelist")
          .select("id,prefix,price,state,services_id")
          .eq("prefix", prefix)
          .abortSignal(controller.signal);
        if (error) throw error;
        if (!controller.signal.aborted) setPriceList(data ?? []);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Error fetching service prices:", error);
        }
      } finally {
        if (!controller.signal.aborted) setPriceLoading(false);
      }
    };

    void loadPrices();
    return () => controller.abort();
  }, [prefix]);
  // const capitalize = (str:any) => {
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // };
  const handleChange = (e: any) => {
    const selectedOption = e.target.selectedOptions[0];
    let dataflag = usa;
    let countryFlag = "United States flag";
    if (selectedOption.dataset.flag === "id") {
      dataflag = id;
      countryFlag = "Indonesia flag";
    } else if (selectedOption.dataset.flag === "sg") {
      dataflag = sg;
      countryFlag = "Singapore flag";
    } else if (selectedOption.dataset.flag === "my") {
      dataflag = malay;
      countryFlag = "Malaysia flag";
    } else {
      dataflag = usa;
    }

    setPrefix(selectedOption.value.toUpperCase());
    setFlag(dataflag);
    setFlagAlt(countryFlag);
  };

  return (
    <Sections
      id="services"
      className={`default-section ${config.section.default}`}>
      <div className={`section-tag ${config.section.tag}`}>
        <span className={`section-tag-icon ${config.section.icon}`}>📜</span>
        <span className={`section-tag-text ${config.section.text}`}>
          service menu
        </span>
        <span className="section-tag-line"></span>
      </div>
      <h2 className={config.standard.header}>What I can build for you</h2>
      <p className={config.standard.desc}>
        End-to-end backend engineering — from architecture to deployment.
      </p>
      <div className="services-grid">
        <div className="flag-wrapper">
          <div className="trigger" id="trigger">
            <span className={`flag-icon ${config.services.icon}`} id="flagIcon">
              <img loading="lazy" src={flag} alt={flagAlt} />
            </span>
            <span className={`arrow`}>▼</span>
          </div>
          <label className="sr-only" htmlFor="languageSelect">Currency for service pricing</label>
          <select
            id="languageSelect"
            aria-label="Currency for service pricing"
            value={prefix.trim().toLocaleLowerCase()}
            onChange={handleChange}>
            <option value="idr" data-flag="id">
              IDR
            </option>
            <option value="usd" data-flag="usa">
              US
            </option>
            <option value="rm" data-flag="my">
              RM
            </option>
            <option value="sgd" data-flag="sg">
              SGD
            </option>
          </select>
        </div>
      </div>
      <RevealSection selector=".service-card" threshold={0.2} delay={150}>
        <div className={`services-menu-grid ${config.services.menugrid}`}>
          {servicesList.map((service) => {
            const listItems = service.stacks.split(";");
            const priceData = priceList.find(
              (item) =>
                item.services_id === service.id &&
                item.prefix.toUpperCase() === prefix,
            );
            return (
              <div
                key={service.id}
                className={`service-card group ${config.services.card} visible ${service.highlight ? "active" : ""}`}>
                <div className={`service-header ${config.services.header}`}>
                  <div className={`service-num ${config.services.num}`}>
                    {service.num}
                  </div>
                  <div className={`service-icon ${config.services.numIcon}`}>
                    {service.icon}
                  </div>
                </div>
                <div className={`service-title ${config.services.sTitle}`}>
                  {service.title}
                </div>
                <div className={`service-desc ${config.services.sDesc}`}>
                  {service.description}
                </div>

                <ul className={`service-list ${config.services.sLi}`}>
                  {listItems.map((item, i) => (
                    <li key={i}>{item != "e" ? item : ""}</li>
                  ))}
                </ul>

                <div className={`service-price ${config.services.sPrice}`}>
                  <span
                    className={`price-label ${config.services.sPriceLabel}`}>
                    Starting from
                  </span>
                  <span
                    className={`price-value ${config.services.sPriceValue}`}>
                    {priceData?.price ?? (priceLoading ? "Loading..." : "Unavailable")}{" "}
                    <span>
                      {prefix}
                      {priceData?.state ? ` / ${priceData.state}` : ""}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </RevealSection>
    </Sections>
  );
};

export default Services;
