import id from "@assets/flags/indonesia.svg";
import malay from "@assets/flags/malaysia.svg";
import sg from "@assets/flags/singapore.svg";
import usa from "@assets/flags/us.svg";
import { Sections } from "@components/atom";
import RevealSection from "@components/atom/RevealSection";
import { useResponsive } from "@responsive/useResponsive";
import { supabase } from "@utils/supabase";
import React, { useState, useEffect } from "react";
import type { PriceServiceInterface,ServiceInterface } from "@components/types/Interface";
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
  const [prefix, setPrefix] = useState(defaultPrefix);
  const [flag, setFlag] = useState(usa);
  const { config } = useResponsive();
  const [servicesList, setServicesList] = useState(initialServices);
  const [priceList, setPriceList] = useState(initialPrices);

  const getPrice = async (prefix: any) => {
    try {
      const { data, error } = await supabase
        .from("pricelist")
        .select("id,prefix,price,state,services_id")
        .eq("prefix", prefix.toUpperCase());
      if (error) throw error;
      setPriceList(data ?? []);
      setServices(data ?? []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setPriceList([]);
    }
  };
  // const capitalize = (str:any) => {
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // };
  const handleChange = (e: any) => {
    const selectedOption = e.target.selectedOptions[0];
    let dataflag = usa;
    if (selectedOption.dataset.flag === "id") {
      dataflag = id;
    } else if (selectedOption.dataset.flag === "sg") {
      dataflag = sg;
    } else if (selectedOption.dataset.flag === "my") {
      dataflag = malay;
    } else {
      dataflag = usa;
    }

    getPrice(selectedOption.value);
    setPrefix(selectedOption.value);
    setFlag(dataflag);
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
              <img loading="lazy" src={flag} alt={flag} />
            </span>
            <span className={`arrow`}>▼</span>
          </div>
          <select
            id="languageSelect"
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
              (item) => item.services_id === service.id,
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
                    {`${priceData?.price}`}{" "}
                    <span>{`${prefix.toUpperCase()} / ${priceData?.state}`}</span>
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
