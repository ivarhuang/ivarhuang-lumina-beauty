"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/* ======================================================
   LUMINA SVG LETTER PATHS
====================================================== */

const introLetters = [
  {
    name: "L",
    viewBox: "0 -300 220 330",
    path: `
      M 122.203125 0
      L 205.453125 -130
      L 205.453125 0
      Z
      M 112.515625 0
      L 12.546875 0
      L 12.546875 -281.09375
      L 112.515625 -281.09375
      Z
    `,
  },

  {
    name: "U",
    viewBox: "0 -300 245 330",
    path: `
      M 111 3.421875
      C 74.632812 2.910156
        49.132812 -4.878906
        34.5 -19.953125
      C 19.863281 -35.035156
        12.546875 -61.582031
        12.546875 -99.59375
      L 12.546875 -281.09375
      L 111 -281.09375
      Z

      M 132.28125 3.421875
      L 132.28125 -281.09375
      L 230.734375 -281.09375
      L 230.734375 -99.59375
      C 230.734375 -61.582031
        223.414062 -35.035156
        208.78125 -19.953125
      C 194.144531 -4.878906
        168.644531 2.910156
        132.28125 3.421875
      Z
    `,
  },

  {
    name: "M",
    viewBox: "-15 -300 350 330",
    path: `
      M 228.0625 0
      L 170.09375 -226.546875
      L 184.546875 -281.09375
      L 249.15625 -281.09375
      L 320.4375 0
      Z

      M -7.40625 0
      L 39.34375 -180.546875
      L 85.71875 0
      Z

      M 109.859375 0
      L 51.6875 -226.546875
      L 66.140625 -281.09375
      L 130.765625 -281.09375
      L 202.40625 0
      Z
    `,
  },

  {
    name: "I",
    viewBox: "0 -300 125 330",
    path: `
      M 12.546875 0
      L 12.546875 -281.09375
      L 112.515625 -281.09375
      L 112.515625 0
      Z
    `,
  },

  {
    name: "N",
    viewBox: "0 -300 245 330",
    path: `
      M 228.828125 -281.09375
      L 228.828125 -74.6875
      L 137.03125 -281.09375
      Z

      M 228.828125 0
      L 128.859375 0
      L 12.546875 -263.03125
      L 12.546875 -281.09375
      L 117.078125 -281.09375
      L 228.828125 -21.46875
      Z

      M 12.546875 0
      L 12.546875 -206.203125
      L 104.71875 0
      Z
    `,
  },

  {
    name: "A",
    viewBox: "-15 -300 255 330",
    path: `
      M -7.40625 0
      L 55.6875 -230.734375
      L 76.59375 -120.6875
      L 100.734375 -120.6875
      L 69.75 -281.09375
      L 170.09375 -281.09375
      L 224.640625 0
      L 124.484375 0
      L 105.859375 -95.40625
      L 81.71875 -95.40625
      L 100.34375 0
      Z
    `,
  },
];

export default function Home() {
  const introScreenRef = useRef<HTMLDivElement | null>(null);
  const introLettersRef = useRef<HTMLDivElement | null>(null);
  const introFullLogoRef = useRef<HTMLImageElement | null>(null);

  const logoMoveRef = useRef<HTMLDivElement | null>(null);
  const statementRef = useRef<HTMLDivElement | null>(null);

  const phaseRef = useRef(0);
  const animatingRef = useRef(false);
  const introDoneRef = useRef(false);

  useEffect(() => {
    const introScreen = introScreenRef.current;
    const lettersContainer = introLettersRef.current;
    const fullIntroLogo = introFullLogoRef.current;
    const logoMove = logoMoveRef.current;
    const statement = statementRef.current;

    if (
      !introScreen ||
      !lettersContainer ||
      !fullIntroLogo ||
      !logoMove ||
      !statement
    ) {
      return;
    }

    introDoneRef.current = false;
    phaseRef.current = 0;
    animatingRef.current = false;

    document.body.style.overflow = "hidden";

    gsap.set(logoMove, {
      x: 0,
    });

    gsap.set(statement, {
      x: () => -(window.innerWidth * 1.05),
      opacity: 0,
    });

    const letters =
      lettersContainer.querySelectorAll(".introSingleLetter");

    gsap.set(letters, {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      scale: 0.82,
      y: 18,
    });

    gsap.set(fullIntroLogo, {
      xPercent: -50,
      yPercent: -50,
      y: -window.innerHeight,
      opacity: 0,
    });

    const introTl = gsap.timeline();

    letters.forEach((letter) => {
      introTl.to(letter, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.18,
        ease: "power3.out",
      });

      introTl.to(letter, {
        opacity: 0,
        scale: 1.08,
        duration: 0.13,
        delay: 0.04,
        ease: "power2.in",
      });
    });

    introTl.to(fullIntroLogo, {
      y: 0,
      opacity: 1,
      duration: 0.72,
      ease: "power4.out",
    });

    introTl.to({}, {
      duration: 0.3,
    });

    introTl.to(introScreen, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",

      onComplete: () => {
        gsap.set(introScreen, {
          display: "none",
        });

        introDoneRef.current = true;

        document.body.style.overflow = "";
      },
    });

    const handleWheel = (event: WheelEvent) => {
      if (!introDoneRef.current) {
        event.preventDefault();
        return;
      }

      const direction = Math.sign(event.deltaY);

      if (animatingRef.current) {
        event.preventDefault();
        return;
      }

      /* DOWN */

      if (direction > 0) {
        if (phaseRef.current === 0) {
          event.preventDefault();

          animatingRef.current = true;

          const tl = gsap.timeline({
            onComplete: () => {
              phaseRef.current = 1;
              animatingRef.current = false;
            },
          });

          tl.to(logoMove, {
            x: () => -(window.innerWidth * 1.05),
            duration: 0.5,
            ease: "power3.inOut",
          });

          tl.to(
            statement,
            {
              x: 0,
              opacity: 1,
              duration: 0.65,
              ease: "power3.out",
            },
            "-=0.12"
          );

          return;
        }

        return;
      }

      /* UP */

      if (direction < 0) {
        if (window.scrollY > 2) {
          return;
        }

        if (phaseRef.current === 1) {
          event.preventDefault();

          animatingRef.current = true;

          const tl = gsap.timeline({
            onComplete: () => {
              phaseRef.current = 0;
              animatingRef.current = false;
            },
          });

          tl.to(statement, {
            x: () => -(window.innerWidth * 1.05),
            opacity: 0,
            duration: 0.5,
            ease: "power3.inOut",
          });

          tl.to(
            logoMove,
            {
              x: 0,
              duration: 0.55,
              ease: "power3.inOut",
            },
            "-=0.1"
          );
        }
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      introTl.kill();

      window.removeEventListener(
        "wheel",
        handleWheel
      );

      document.body.style.overflow = "";

      gsap.killTweensOf(logoMove);
      gsap.killTweensOf(statement);
    };
  }, []);

  return (
    <>
      {/* ==================================================
          INTRO
      ================================================== */}

      <div
        ref={introScreenRef}
        className="introScreen"
      >
        <div
          ref={introLettersRef}
          className="introLettersStage"
        >
          {introLetters.map((letter) => (
            <div
              className="introSingleLetter"
              key={letter.name}
            >
              <svg
                viewBox={letter.viewBox}
                xmlns="http://www.w3.org/2000/svg"
                aria-label={letter.name}
              >
                <path
                  d={letter.path}
                  fill="#ffffff"
                />
              </svg>
            </div>
          ))}
        </div>

        <img
          ref={introFullLogoRef}
          className="introFullLogo"
          src="/L.svg"
          alt="LUMINA BEAUTY"
        />
      </div>

      {/* ==================================================
          WEBSITE
      ================================================== */}

      <main className="site">
        {/* ==================================================
            HERO
        ================================================== */}

        <section id="home" className="hero">
          <video
            className="heroVideo"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source
              src="/hero.mp4"
              type="video/mp4"
            />
          </video>

          <div className="heroLogoAnchor">
            <div
              ref={logoMoveRef}
              className="heroLogoMove"
            >
              <img
                className="heroLogo"
                src="/L.svg"
                alt="LUMINA BEAUTY"
              />
            </div>
          </div>

          <div
            ref={statementRef}
            className="heroStatement"
          >
            <div>WE CREATE</div>
            <div>BEAUTY PEOPLE</div>
            <div>CAN SEE, FEEL</div>
            <div>AND TRUST.</div>
          </div>

          <nav className="heroNav">
            <a href="#home">HOME</a>
            <a href="#products">PRODUCT</a>
            <a href="#technology">EXPERIENCE</a>
            <a href="#about">ABOUT</a>
            <a href="#shop">SHOP</a>
          </nav>

        </section>

        {/* ==================================================
            PRODUCT PAGE
        ================================================== */}

        <section
          id="products"
          className="productPage"
        >
          {/* TOP */}

          <div className="productHeader">
            <div className="productBrand brandLockup">
              <span className="brandLuminaLogo" aria-label="LUMINA">
                {introLetters.map((letter) => (
                  <svg
                    key={letter.name}
                    viewBox={letter.viewBox}
                    aria-hidden="true"
                  >
                    <path
                      d={letter.path}
                      fill="currentColor"
                    />
                  </svg>
                ))}
              </span>
              <span className="brandBeautyText">BEAUTY</span>
            </div>

            <nav className="sectionNav">
              <a href="#home">HOME</a>
              <a href="#products">PRODUCT</a>
              <a href="#technology">EXPERIENCE</a>
              <a href="#about">ABOUT</a>
              <a href="#shop">SHOP</a>
            </nav>
          </div>

          {/* BIG TITLE */}

          <h2 className="productPageTitle">
            PRODUCT
          </h2>

          {/* MAIN */}

          <div className="productLayout">
            {/* LEFT */}

            <div className="productMediaColumn">
              <div className="productMedia productVisual">
                <div
                  className="productVisualGlow"
                  aria-hidden="true"
                />

                <img
                  className="productDeviceImage"
                  src="/product-tech.png"
                  alt="LUMINA Beauty Device"
                />

                <div
                  className="productVisualWords"
                  aria-hidden="true"
                >
                  <span>BEAUTY</span>
                  <span>ENGINEERED</span>
                </div>
              </div>
            </div>

            {/* RIGHT */}

            <div className="productContent">
              <div className="techMotion">
                <div className="techMotionHead">
                  <span>TECHNOLOGY MATRIX</span>
                  <span>01 — 08</span>
                </div>

                <div className="techMotionRail">
                  <div className="techMotionLabels">
                    <span>RF</span>
                    <span>EP</span>
                    <span>EMS</span>
                    <span>NIR</span>
                    <span>nA</span>
                    <span>LIGHT</span>
                    <span>AI</span>
                    <span>CUSTOM</span>
                  </div>

                  <div className="techMotionScanner" />
                </div>

                <div className="techMotionFoot techMotionFootSingle">
                  <span>ONE SYSTEM</span>
                </div>
              </div>

              <div className="featureGrid">
                {/* 01 */}

                <div className="featureItem">
                  <div className="featureNumber">
                    01
                  </div>

                  <div className="featureBody">
                    <h3>
                      DEEP RF THERAPY
                    </h3>

                    <p>
                      Precision Thermal Stimulation
                    </p>
                  </div>
                </div>

                {/* 02 */}

                <div className="featureItem">
                  <div className="featureNumber">
                    02
                  </div>

                  <div className="featureBody">
                    <h3>
                      EMS TECHNOLOGY
                    </h3>

                    <p>
                      Muscle Stimulation
                    </p>
                  </div>
                </div>

                {/* 03 */}

                <div className="featureItem">
                  <div className="featureNumber">
                    03
                  </div>

                  <div className="featureBody">
                    <h3>
                      SMART CHIP
                    </h3>

                    <p>
                      AI Skin Analysis
                    </p>

                    <p>
                      Personalized Control
                    </p>
                  </div>
                </div>

                {/* 04 */}

                <div className="featureItem">
                  <div className="featureNumber">
                    04
                  </div>

                  <div className="featureBody">
                    <h3>
                      EP INFUSION
                    </h3>

                    <p>
                      Enhanced Product
                      Absorption
                    </p>
                  </div>
                </div>

                {/* 05 */}

                <div className="featureItem">
                  <div className="featureNumber">
                    05
                  </div>

                  <div className="featureBody">
                    <h3>
                      CUSTOM
                    </h3>

                    <p>
                      Personalized Treatment
                    </p>

                    <p>
                      Tailored to Your Skin
                    </p>
                  </div>
                </div>

                {/* 06 */}

                <div className="featureItem">
                  <div className="featureNumber">
                    06
                  </div>

                  <div className="featureBody">
                    <h3>
                      NIR TECHNOLOGY
                    </h3>

                    <p>
                      Near-Infrared Light
                    </p>

                    <p>
                      Skin Revitalization
                    </p>
                  </div>
                </div>

                {/* 07 */}

                <div className="featureItem">
                  <div className="featureNumber">
                    07
                  </div>

                  <div className="featureBody">
                    <h3>
                      SMART CURRENT CONTROL
                    </h3>

                    <p>
                      Personalized Stimulation
                    </p>

                    <p>
                      nA-Level Precision
                    </p>
                  </div>
                </div>

                {/* 08 */}

                <div className="featureItem">
                  <div className="featureNumber">
                    08
                  </div>

                  <div className="featureBody">
                    <h3>
                      LIGHT THERAPY
                    </h3>

                    <p>
                      Radiance Boost
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ==================================================
            TECHNOLOGY
        ================================================== */}

        <section
          id="technology"
          className="section sectionDark contentSection experienceSection"
        >
          <div className="contentSectionHeader">
            <div className="contentSectionBrand brandLockup">
              <span className="brandLuminaLogo" aria-label="LUMINA">
                {introLetters.map((letter) => (
                  <svg
                    key={letter.name}
                    viewBox={letter.viewBox}
                    aria-hidden="true"
                  >
                    <path
                      d={letter.path}
                      fill="currentColor"
                    />
                  </svg>
                ))}
              </span>
              <span className="brandBeautyText">BEAUTY</span>
            </div>

            <nav className="sectionNav">
              <a href="#home">HOME</a>
              <a href="#products">PRODUCT</a>
              <a href="#technology">EXPERIENCE</a>
              <a href="#about">ABOUT</a>
              <a href="#shop">SHOP</a>
            </nav>
          </div>

          <div className="contentSectionPageTitle">
            EXPERIENCE
          </div>

          <div
            className="experienceGlobe"
            aria-hidden="true"
          >
            <div className="experienceGlobeTexture" />
            <div className="experienceGlobeMeridian experienceGlobeMeridianOne" />
            <div className="experienceGlobeMeridian experienceGlobeMeridianTwo" />
            <div className="experienceGlobeLatitude experienceGlobeLatitudeOne" />
            <div className="experienceGlobeLatitude experienceGlobeLatitudeTwo" />
          </div>

          <div className="experienceMain">
            <div className="experienceIntro">
              <h2 className="contentSectionHeroTitle experienceHeroTitle">
                <span className="experienceHeroBeauty">BEAUTY</span>
                <br />
                <span className="experienceHeroExperience">EXPERIENCE</span>
              </h2>

              <p className="experienceLead">
                A simple visual framework for three
                short app-demo videos. Each frame can
                later be replaced with your real phone
                screen recordings.
              </p>
            </div>

            <div className="experienceVisualGrid">
              <div className="experienceVideoCard">
                <div className="experienceCardMeta">
                  <span>01</span>
                  <span>APP EXPERIENCE</span>
                </div>

                <div className="experiencePhoneFrame">
                  <video
                    className="experienceVideo"
                    src="/experience-01.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>

                <div className="experienceCardCaption">
                  Device / Treatment
                </div>
              </div>

              <div className="experienceVideoCard experienceVideoCardOffset">
                <div className="experienceCardMeta">
                  <span>02</span>
                  <span>APP EXPERIENCE</span>
                </div>

                <div className="experiencePhoneFrame">
                  <video
                    className="experienceVideo"
                    src="/experience-02.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>

                <div className="experienceCardCaption">
                  Personal / Results
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            ABOUT
        ================================================== */}

        <section
          id="about"
          className="section contentSection contentSectionAbout aboutFilmSection"
        >
          <div className="contentSectionHeader aboutFilmHeader">
            <div className="contentSectionBrand brandLockup">
              <span className="brandLuminaLogo" aria-label="LUMINA">
                {introLetters.map((letter) => (
                  <svg
                    key={letter.name}
                    viewBox={letter.viewBox}
                    aria-hidden="true"
                  >
                    <path
                      d={letter.path}
                      fill="currentColor"
                    />
                  </svg>
                ))}
              </span>
              <span className="brandBeautyText">BEAUTY</span>
            </div>

            <nav className="sectionNav">
              <a href="#home">HOME</a>
              <a href="#products">PRODUCT</a>
              <a href="#technology">EXPERIENCE</a>
              <a href="#about">ABOUT</a>
              <a href="#shop">SHOP</a>
            </nav>
          </div>

          <div className="contentSectionPageTitle aboutFilmPageTitle">
            ABOUT
          </div>

          <div className="aboutPurpose">
            <div className="aboutPurposeLabel">OUR PURPOSE</div>

            <h3 className="aboutPurposeTitle">
              Beauty powered
              <br />
              by a brighter you.
            </h3>

            <p className="aboutPurposeText">
              At LUMINA BEAUTY, we create intelligent
              beauty technology that helps you look, feel,
              and glow like your most radiant self.
            </p>
          </div>

          <div className="experienceMain aboutFilmMain">
            <div className="experienceIntro aboutFilmCopy">
              <h2
                className="contentSectionHeroTitle experienceHeroTitle aboutFilmHeroTitle"
                aria-label="LUMINA BEAUTY"
              >
                LUMINA
                <br />
                BEAUTY
              </h2>
            </div>

            <div className="aboutFilmVideoStage">
              <video
                className="aboutFilmVideo"
                src="/about.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                disablePictureInPicture
                aria-hidden="true"
                style={{ opacity: 0.8 }}
              />
            </div>
          </div>

          <div className="aboutFilmFooter">
            <span>ADVANCED BEAUTY SYSTEM / ENGINEERED FOR VISIBLE RESULTS</span>
          </div>
        </section>

        {/* ==================================================
            SHOP
        ================================================== */}

        <section id="shop" className="section shopSection">
          <div className="contentSectionHeader shopHeader">
            <div className="contentSectionBrand brandLockup">
              <span className="brandLuminaLogo" aria-label="LUMINA">
                {introLetters.map((letter) => (
                  <svg
                    key={letter.name}
                    viewBox={letter.viewBox}
                    aria-hidden="true"
                  >
                    <path d={letter.path} fill="currentColor" />
                  </svg>
                ))}
              </span>
              <span className="brandBeautyText">BEAUTY</span>
            </div>

            <nav className="sectionNav">
              <a href="#home">HOME</a>
              <a href="#products">PRODUCT</a>
              <a href="#technology">EXPERIENCE</a>
              <a href="#about">ABOUT</a>
              <a href="#shop">SHOP</a>
            </nav>
          </div>

          <div className="shopPageTitle">SHOP</div>

          <div className="shopLayout">
            <div className="shopVisual">
              <div className="shopVisualGlow" aria-hidden="true" />
              <img
                className="shopVisualLogo"
                src="/L.svg"
                alt=""
                aria-hidden="true"
              />
              <img
                className="shopDeviceImage"
                src="/shop-product.PNG"
                alt="LUMINA Beauty Device"
              />
            </div>

            <div className="shopPanel">
              <div className="shopCopy">
                <p className="shopEyebrow">THE LUMINA SYSTEM</p>
                <h2>LUMINA BEAUTY DEVICE</h2>
                <p className="shopDescription">
                  Intelligent beauty technology designed for a more personal
                  daily ritual — combining RF, EMS, EP, NIR, light therapy,
                  smart current control and adaptive treatment in one system.
                </p>
              </div>

              <div className="shopFeatureList">
                <div className="shopFeatureRow">
                  <strong>4 BUILT-IN TREATMENTS</strong>
                  <span>Ready-to-use programs for everyday beauty care.</span>
                </div>

                <div className="shopFeatureRow">
                  <strong>CUSTOM TREATMENTS VIA APP</strong>
                  <span>Create routines tailored to your own preferences.</span>
                </div>

                <div className="shopFeatureRow">
                  <strong>SAVE YOUR FAVORITES</strong>
                  <span>Keep your preferred routines ready for quick access.</span>
                </div>

                <div className="shopFeatureRow">
                  <strong>SHARE WITH THE COMMUNITY</strong>
                  <span>Share routines and discover ideas from other LUMINA users.</span>
                </div>
              </div>

              <div className="shopPurchase">
                <div className="shopPriceBlock">
                  <span>LAUNCH EDITION</span>
                  <strong>PRICE — TBA</strong>
                </div>

                <button className="shopButton" type="button">
                  ADD TO BAG
                </button>
              </div>

              <p className="shopCheckoutNote">
                ONLINE CHECKOUT / COMING SOON
              </p>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .productHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .brandLockup {
          display: inline-flex;
          align-items: flex-end;
          gap: 5px;
          height: 20px;
          line-height: 1;
        }

        .brandLuminaLogo {
          display: inline-flex;
          align-items: flex-end;
          gap: 0;
          height: 19px;
          color: currentColor;
          flex: 0 0 auto;
        }

        .brandLuminaLogo svg {
          display: block;
          height: 19px;
          width: auto;
          overflow: visible;
          flex: 0 0 auto;
        }

        .brandBeautyText {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.03em;
          padding-bottom: 1px;
        }

        /* On the black Technology page, use the same warm off-white
           as the Product page background instead of pure white. */
        .sectionDark .brandLockup {
          color: #f4f4f1;
        }

        .contentSection {
          position: relative;
          padding:
            20px
            22px
            70px;
        }

        .contentSectionAbout {
          background: #f4f4f1;
          color: #090909;
        }

        .contentSectionHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          line-height: 1;
        }

        .sectionNav {
          display: flex;
          align-items: center;
          gap: 30px;
          margin-left: auto;
          font-size: 13px;
          font-weight: 500;
          line-height: 1;
          letter-spacing: normal;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .sectionNav a {
          color: inherit;
          text-decoration: none;
          opacity: 0.9;
          transition: opacity 0.2s ease;
        }

        .sectionNav a:hover {
          opacity: 0.55;
        }

        .contentSectionBrand {
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .contentSectionPageTitle {
          margin:
            22px
            0
            28px;

          font-size: clamp(
            50px,
            4.7vw,
            90px
          );

          line-height: 0.9;
          font-weight: 400;
          letter-spacing: -0.065em;
        }

        .contentSectionHeroTitle {
          margin-top: auto !important;
        }

        .experienceSection {
          position: relative;
          overflow: hidden;
          justify-content: flex-start;
          color: #ffffff;
          background:
            radial-gradient(
              circle at 16% 20%,
              rgba(118, 242, 235, 0.82) 0%,
              rgba(118, 242, 235, 0.18) 20%,
              rgba(118, 242, 235, 0) 42%
            ),
            radial-gradient(
              circle at 50% 18%,
              rgba(215, 173, 255, 0.88) 0%,
              rgba(215, 173, 255, 0.18) 24%,
              rgba(215, 173, 255, 0) 44%
            ),
            radial-gradient(
              circle at 36% 70%,
              rgba(255, 185, 118, 0.86) 0%,
              rgba(255, 185, 118, 0.18) 24%,
              rgba(255, 185, 118, 0) 46%
            ),
            radial-gradient(
              circle at 84% 72%,
              rgba(255, 103, 133, 0.78) 0%,
              rgba(255, 103, 133, 0.22) 22%,
              rgba(255, 103, 133, 0) 44%
            ),
            linear-gradient(
              135deg,
              #9ddff2 0%,
              #b59bff 38%,
              #ff8fb1 68%,
              #ff9a5a 100%
            );
        }


        .experienceGlobe {
          position: absolute;

          /* much bigger and brighter: roughly an extra 1/2 size */
          left: clamp(-220px, -12vw, -110px);
          bottom: clamp(-210px, -15vw, -110px);

          width: clamp(580px, 58vw, 980px);
          aspect-ratio: 1 / 1;

          z-index: 1;

          border-radius: 50%;
          overflow: hidden;

          pointer-events: none;

          opacity: 0.44;

          border:
            1px solid
            rgba(255, 255, 255, 0.24);

          background:
            radial-gradient(
              circle at 35% 30%,
              rgba(255, 255, 255, 0.24),
              rgba(255, 255, 255, 0.08) 42%,
              rgba(255, 255, 255, 0.02) 68%,
              transparent 72%
            );

          box-shadow:
            inset -18px -12px 40px rgba(0, 0, 0, 0.05),
            0 24px 60px rgba(36, 18, 64, 0.05);

          transform:
            rotate(-10deg);
        }

        .experienceGlobeTexture {
          position: absolute;

          inset: -8% -42%;

          background:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.94) 0 1.25px,
              transparent 1.7px
            );

          background-size:
            11px 11px;

          opacity: 0.88;

          animation:
            experienceGlobeSurface 24s
            linear
            infinite;

          mask-image:
            radial-gradient(
              circle at center,
              #000 0%,
              #000 66%,
              transparent 72%
            );

          -webkit-mask-image:
            radial-gradient(
              circle at center,
              #000 0%,
              #000 66%,
              transparent 72%
            );
        }

        .experienceGlobeTexture::before {
          content: "";

          position: absolute;

          inset: 10% 18%;

          border-radius: 48% 52% 46% 54% / 58% 42% 60% 40%;

          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.52),
              rgba(255, 255, 255, 0.10)
            );

          filter: blur(2px);

          opacity: 0.66;

          transform:
            rotate(18deg)
            scaleX(0.82);
        }

        .experienceGlobeMeridian,
        .experienceGlobeLatitude {
          position: absolute;

          left: 50%;
          top: 50%;

          border:
            1px solid
            rgba(255, 255, 255, 0.24);

          border-radius: 50%;

          pointer-events: none;
        }

        .experienceGlobeMeridian {
          width: 64%;
          height: 100%;

          transform:
            translate(-50%, -50%);
        }

        .experienceGlobeMeridianTwo {
          width: 30%;

          opacity: 0.72;
        }

        .experienceGlobeLatitude {
          width: 100%;
          height: 52%;

          transform:
            translate(-50%, -50%);
        }

        .experienceGlobeLatitudeTwo {
          height: 24%;

          opacity: 0.72;
        }

        .experienceGlobe::after {
          content: "";

          position: absolute;

          inset: 0;

          border-radius: 50%;

          background:
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.05),
              transparent 34%,
              transparent 66%,
              rgba(0, 0, 0, 0.06)
            );

          pointer-events: none;
        }

        @keyframes experienceGlobeSurface {
          from {
            transform:
              translateX(0)
              rotate(0.001deg);
          }

          to {
            transform:
              translateX(22%)
              rotate(0.001deg);
          }
        }

        @media (max-width: 900px) {
          .experienceGlobe {
            width: clamp(420px, 82vw, 620px);
            left: -180px;
            bottom: -90px;
            opacity: 0.36;
          }
        }

        .experienceMain {
          flex: 1;
          min-height: 0;
          display: grid;
          grid-template-columns:
            minmax(320px, 0.9fr)
            minmax(0, 1.45fr);
          gap: clamp(40px, 6vw, 110px);
          align-items: end;
        }

        .experienceIntro {
          position: relative;
          z-index: 6;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 100%;
        }

        .experienceHeroTitle {
          position: relative;
          z-index: 8;

          margin: 0;

          color: #ffffff;
          opacity: 0.5;

          pointer-events: none;

          overflow: visible;

          will-change: opacity;
        }

        .experienceLead {
          max-width: 320px;
          margin: 28px 0 0;
          font-size: clamp(14px, 0.95vw, 18px);
          line-height: 1.45;
          letter-spacing: -0.02em;
          opacity: 0.72;
        }

        .experienceVisualGrid {
          position: relative;
          z-index: 2;

          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(24px, 3vw, 46px);
          align-items: end;
          min-height: 0;
          max-width: 760px;
          justify-self: end;
          width: 100%;
        }

        .experienceVideoCard {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .experienceVideoCardOffset {
          transform: none;
        }

        .experienceCardMeta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 10px;
          line-height: 1;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0.62;
        }

        .experiencePhoneFrame {
          position: relative;
          width: 100%;
          aspect-ratio: 9 / 18.5;
          overflow: hidden;
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.34);
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(4px);
          box-shadow:
            0 20px 50px rgba(0, 0, 0, 0.12),
            inset 0 0 0 1px rgba(255, 255, 255, 0.05);
        }

        .experienceVideo {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center;
          background: rgba(255, 255, 255, 0.04);

          opacity: 0.9;

          filter:
            saturate(0.92)
            contrast(0.96);
        }

        .experienceCardCaption {
          font-size: 12px;
          line-height: 1.2;
          letter-spacing: -0.02em;
          opacity: 0.84;
        }


        @media (max-width: 900px) {
          .experienceGlobe {
            width: clamp(220px, 46vw, 340px);
            left: -48px;
            bottom: 18px;
            opacity: 0.28;
          }
        }

        @media (max-width: 1400px) {
          .experienceMain {
            grid-template-columns:
              minmax(280px, 0.85fr)
              minmax(0, 1.4fr);
            gap: 44px;
          }

          .experienceVideoCardOffset {
            transform: none;
          }

          .contentSection {
            padding:
              18px
              18px
              60px;
          }

          .contentSectionPageTitle {
            margin:
              18px
              0
              22px;
          }
        }

        @media (max-width: 900px) {
          .sectionNav {
            gap: 18px;
            font-size: 11px;
          }
        }

        @media (max-width: 700px) {
          .sectionNav {
            gap: 18px;
            font-size: 11px;
            letter-spacing: normal;
          }

          .experienceMain {
            display: block;
          }

          .experienceLead {
            max-width: none;
            margin: 18px 0 28px;
            font-size: 15px;
          }

          .experienceVisualGrid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .experienceVideoCardOffset {
            transform: none;
          }

          .experiencePhoneFrame {
            max-width: 320px;
          }

          .experienceCardMeta,
          .experienceCardCaption {
            max-width: 320px;
          }

          .brandLockup {
            height: 16px;
            gap: 4px;
          }

          .brandLuminaLogo {
            height: 15px;
          }

          .brandLuminaLogo svg {
            height: 15px;
          }

          .brandBeautyText {
            font-size: 9px;
            padding-bottom: 1px;
          }

          .contentSection {
            padding:
              14px
              12px
              40px;
          }

          .contentSectionPageTitle {
            margin:
              28px
              0
              28px;

            font-size: 16vw;
          }
        }

        .techMotion {
          width: min(760px, 100%);
          margin-bottom: 20px;
        }

        .techMotionHead,
        .techMotionFoot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          font-size: 10px;
          line-height: 1;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .techMotionHead {
          margin-bottom: 10px;
        }

        .techMotionFoot {
          margin-top: 9px;
          font-size: 9px;
          opacity: 0.46;
        }

        .techMotionFootSingle {
          justify-content: flex-end;
          opacity: 1;
          color: #ffffff;
        }

        .techMotionFootSingle span {
          color: #ffffff !important;
          opacity: 1 !important;
        }

        .techMotionRail {
          position: relative;
          width: 100%;
          height: 44px;
          overflow: hidden;
          border-top: 1px solid rgba(0, 0, 0, 0.22);
          border-bottom: 1px solid rgba(0, 0, 0, 0.22);
          background:
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.02),
              rgba(0, 0, 0, 0.06),
              rgba(0, 0, 0, 0.02)
            );
        }

        .techMotionRail::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 1px;
          background: rgba(0, 0, 0, 0.28);
          transform: translateY(-50%);
        }

        .techMotionLabels {
          position: absolute;
          inset: 0;
          z-index: 3;
          display: grid;
          grid-template-columns: repeat(8, minmax(0, 1fr));
          align-items: center;
          padding: 0 14px;
          pointer-events: none;
        }

        .techMotionLabels span {
          font-size: 10px;
          line-height: 1;
          font-weight: 600;
          letter-spacing: 0.02em;
          text-align: center;
          white-space: nowrap;
          mix-blend-mode: difference;
          color: #f4f4f1;
        }

        .techMotionLabels span:first-child {
          text-align: left;
        }

        .techMotionLabels span:last-child {
          text-align: right;
        }

        .techMotionScanner {
          position: absolute;
          z-index: 2;
          top: 6px;
          left: -110px;
          width: 110px;
          height: 30px;
          background: #0a0a0a;
          animation:
            techScan 3.2s cubic-bezier(0.65, 0, 0.35, 1)
            infinite alternate;
          will-change: transform;
        }

        .techMotionScanner::after {
          content: "";
          position: absolute;
          top: 0;
          right: -12px;
          width: 12px;
          height: 100%;
          background:
            linear-gradient(
              90deg,
              rgba(10, 10, 10, 0.28),
              rgba(10, 10, 10, 0)
            );
        }

        @keyframes techScan {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(calc(760px + 110px));
          }
        }

        @media (max-width: 900px) {
          .techMotionScanner {
            animation-name: techScanTablet;
          }

          @keyframes techScanTablet {
            0% {
              transform: translateX(0);
            }

            100% {
              transform: translateX(calc(100vw - 10px));
            }
          }
        }

        @media (max-width: 700px) {
          .techMotion {
            margin-bottom: 32px;
          }

          .techMotionHead,
          .techMotionFoot {
            font-size: 8px;
          }

          .techMotionRail {
            height: 42px;
          }

          .techMotionLabels {
            padding: 0 8px;
          }

          .techMotionLabels span {
            font-size: 8px;
          }

          .techMotionScanner {
            top: 7px;
            width: 72px;
            height: 28px;
            left: -72px;
            animation-duration: 2.8s;
          }
        }



        /* ==================================================
           SHOP
           Scoped styles only — Product / Experience / About stay unchanged
        ================================================== */

        .shopSection {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          justify-content: flex-start;
          padding: 20px 22px 28px;
          color: #0b0b0d;
          background:
            radial-gradient(circle at 18% 20%, rgba(121, 235, 239, 0.66) 0%, rgba(121, 235, 239, 0.14) 24%, rgba(121, 235, 239, 0) 46%),
            radial-gradient(circle at 74% 24%, rgba(213, 180, 255, 0.68) 0%, rgba(213, 180, 255, 0.16) 25%, rgba(213, 180, 255, 0) 48%),
            radial-gradient(circle at 76% 82%, rgba(255, 149, 176, 0.52) 0%, rgba(255, 149, 176, 0.12) 26%, rgba(255, 149, 176, 0) 50%),
            linear-gradient(135deg, #e8fbfb 0%, #eee5ff 48%, #ffdce6 100%);
        }

        .shopHeader {
          position: relative;
          z-index: 10;
        }

        .shopPageTitle {
          position: relative;
          z-index: 5;
          margin: 22px 0 20px;
          font-size: clamp(50px, 4.7vw, 90px);
          line-height: 0.9;
          font-weight: 400;
          letter-spacing: -0.065em;
        }

        .shopLayout {
          position: relative;
          z-index: 2;
          flex: 1;
          min-height: 0;
          display: grid;
          grid-template-columns: minmax(0, 1.18fr) minmax(390px, 0.82fr);
          gap: clamp(34px, 5vw, 84px);
          align-items: stretch;
        }

        .shopVisual {
          position: relative;
          min-height: 0;
          overflow: visible;
          border: 0;
          border-radius: 0;
          background: transparent;
          backdrop-filter: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .shopVisualGlow {
          position: absolute;
          left: 50%;
          top: 48%;
          width: 74%;
          aspect-ratio: 1 / 1;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.30) 34%, rgba(255,255,255,0) 72%);
          filter: blur(12px);
          pointer-events: none;
        }

        .shopVisualLogo {
          position: absolute;
          left: 50%;
          top: calc(50% + 25px);
          z-index: 1;
          width: min(86%, 780px);
          height: auto;
          display: block;
          transform: translate(-48%, -50%);
          opacity: 0.22;
          pointer-events: none;
          user-select: none;
        }

        .shopDeviceImage {
          position: relative;
          z-index: 3;
          display: block;
          width: auto;
          height: min(72vh, 700px);
          max-width: 82%;
          object-fit: contain;
          filter: drop-shadow(0 34px 34px rgba(55, 36, 75, 0.18));
        }

        .shopPanel {
          min-height: 0;
          display: flex;
          flex-direction: column;
          padding: 4px 0 2px;
        }

        .shopCopy {
          padding: clamp(14px, 2.4vh, 28px) 0 28px;
        }

        .shopEyebrow {
          margin: 0 0 16px;
          font-size: 10px;
          line-height: 1;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .shopCopy h2 {
          margin: 0;
          max-width: 620px;
          font-size: clamp(38px, 3.8vw, 72px);
          line-height: 0.9;
          font-weight: 500;
          letter-spacing: -0.055em;
        }

        .shopDescription {
          max-width: 520px;
          margin: 28px 0 0;
          font-size: clamp(14px, 0.95vw, 17px);
          line-height: 1.5;
          letter-spacing: -0.015em;
          opacity: 0.7;
        }

        .shopFeatureList {
          margin-top: auto;
          border-top: 1px solid rgba(12, 12, 16, 0.24);
        }

        .shopFeatureList {
          border-top: 1px solid rgba(12, 12, 16, 0.22);
        }

        .shopFeatureRow {
          padding: 14px 0 13px;
          border-bottom: 1px solid rgba(12, 12, 16, 0.18);
          display: grid;
          grid-template-columns: minmax(190px, 0.72fr) minmax(0, 1fr);
          gap: 24px;
          align-items: baseline;
        }

        .shopFeatureRow strong {
          font-size: 11px;
          line-height: 1.15;
          font-weight: 600;
          letter-spacing: 0.03em;
        }

        .shopFeatureRow span {
          font-size: 12.5px;
          line-height: 1.5;
          opacity: 0.72;
          max-width: 380px;
        }

        .shopPurchase {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 18px;
          align-items: end;
          padding-top: 10px;
        }

        .shopPriceBlock {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .shopPriceBlock span {
          font-size: 9px;
          line-height: 1;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          opacity: 0.58;
        }

        .shopPriceBlock strong {
          font-size: clamp(20px, 1.6vw, 30px);
          line-height: 1;
          font-weight: 500;
          letter-spacing: -0.035em;
        }

        .shopButton {
          min-width: 180px;
          height: 52px;
          padding: 0 28px;
          border: 1px solid #0a0a0d;
          border-radius: 999px;
          background: #0a0a0d;
          color: #ffffff;
          font: inherit;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
        }

        .shopButton:hover {
          transform: translateY(-2px);
          background: transparent;
          color: #0a0a0d;
        }

        .shopCheckoutNote {
          margin: 12px 0 0;
          text-align: right;
          font-size: 8px;
          line-height: 1;
          letter-spacing: 0.14em;
          opacity: 0.48;
        }

        @media (max-width: 1100px) {
          .shopSection {
            min-height: auto;
          }

          .shopLayout {
            grid-template-columns: minmax(0, 1fr) minmax(330px, 0.82fr);
            gap: 32px;
          }

          .shopDeviceImage {
            height: min(58vh, 560px);
          }
        }

        @media (max-width: 700px) {
          .shopSection {
            padding: 14px 12px 34px;
          }

          .shopPageTitle {
            margin: 28px 0;
            font-size: 16vw;
          }

          .shopLayout {
            display: block;
          }

          .shopVisual {
            min-height: 58vh;
            border-radius: 0;
          }

          .shopDeviceImage {
            height: 52vh;
            max-width: 90%;
          }

          .shopVisualLogo {
            left: 50%;
            top: calc(50% + 20px);
            width: 102%;
            transform: translate(-48%, -50%);
            opacity: 0.22;
          }

          .shopPanel {
            padding-top: 32px;
          }

          .shopCopy {
            padding: 18px 0 24px;
          }

          .shopCopy h2 {
            font-size: 13vw;
          }

          .shopDescription {
            margin-top: 20px;
            font-size: 15px;
          }

          .shopFeatureRow {
            grid-template-columns: 1fr;
            gap: 6px;
            padding: 16px 0 14px;
          }

          .shopFeatureRow strong {
            font-size: 11px;
          }

          .shopFeatureRow span {
            font-size: 13px;
            line-height: 1.5;
            opacity: 0.72;
            max-width: none;
          }

          .shopPurchase {
            grid-template-columns: 1fr;
            align-items: stretch;
          }

          .shopButton {
            width: 100%;
          }

          .shopCheckoutNote {
            text-align: left;
          }
        }

        /* ==================================================
           ABOUT / BRAND FILM
           Scoped styles only — does not affect Hero/Product/Experience
        ================================================== */

        .aboutFilmSection {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          color: #ffffff;
          background:
            radial-gradient(
              circle at 16% 20%,
              rgba(118, 242, 235, 0.82) 0%,
              rgba(118, 242, 235, 0.18) 20%,
              rgba(118, 242, 235, 0) 42%
            ),
            radial-gradient(
              circle at 50% 18%,
              rgba(215, 173, 255, 0.88) 0%,
              rgba(215, 173, 255, 0.18) 24%,
              rgba(215, 173, 255, 0) 44%
            ),
            radial-gradient(
              circle at 36% 70%,
              rgba(255, 185, 118, 0.86) 0%,
              rgba(255, 185, 118, 0.18) 24%,
              rgba(255, 185, 118, 0) 46%
            ),
            radial-gradient(
              circle at 84% 72%,
              rgba(255, 103, 133, 0.78) 0%,
              rgba(255, 103, 133, 0.22) 22%,
              rgba(255, 103, 133, 0) 44%
            ),
            linear-gradient(
              135deg,
              #9ddff2 0%,
              #b59bff 38%,
              #ff8fb1 68%,
              #ff9a5a 100%
            );
        }

        .aboutFilmSection .brandLockup {
          color: #ffffff;
        }

        .aboutFilmHeader {
          position: relative;
          z-index: 5;
        }

        .aboutFilmPageTitle {
          position: relative;
          z-index: 5;
          color: #ffffff;
        }

        .aboutFilmMain {
          position: relative;
          z-index: 2;
        }

        .aboutPurpose {
          position: absolute;
          left: 22px;
          top: clamp(185px, 22vh, 235px);
          z-index: 8;
          width: min(390px, 32vw);
          color: #ffffff;
        }

        .aboutPurposeLabel {
          margin-bottom: 16px;
          font-size: 10px;
          line-height: 1;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .aboutPurposeTitle {
          margin: 0 0 18px;
          font-size: clamp(26px, 2vw, 38px);
          line-height: 1.05;
          font-weight: 400;
          letter-spacing: -0.035em;
        }

        .aboutPurposeText {
          margin: 0;
          max-width: 360px;
          font-size: clamp(13px, 0.9vw, 16px);
          line-height: 1.45;
          letter-spacing: -0.015em;
          opacity: 0.78;
        }

        .aboutFilmCopy {
          position: relative;
          z-index: 6;
          overflow: visible;
        }

        .aboutFilmHeroTitle {
          position: relative;
          z-index: 7;
          color: #ffffff;
          opacity: 0.5;
          font-size: clamp(160px, 12vw, 232px) !important;
          line-height: 0.78 !important;
          letter-spacing: -0.01em !important;
          pointer-events: none;
          overflow: visible;
          white-space: nowrap;
          width: max-content;
          max-width: none;
        }

        .aboutFilmVideoStage {
          position: relative;
          top: clamp(46px, 5.5vh, 72px);
          z-index: 3;
          width: 100%;
          aspect-ratio: 16 / 9;
          align-self: center;
          overflow: hidden;
          border-radius: 18px;
          background: transparent;
          box-shadow: 0 26px 70px rgba(16, 10, 30, 0.18);
        }

        .aboutFilmVideo {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          background: transparent;
          mix-blend-mode: normal !important;
          pointer-events: none;
          user-select: none;
        }

        .aboutFilmFooter {
          position: relative;
          z-index: 5;
          display: block;
          margin-top: clamp(58px, 8vh, 92px);
          color: #ffffff;
          font-size: 10px;
          line-height: 1.35;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }



        @media (max-width: 900px) {
          .aboutFilmSection {
            min-height: auto;
          }

          .aboutFilmVideoStage {
            width: 100%;
            top: 64px;
            border-radius: 14px;
          }

          .aboutPurpose {
            top: 170px;
            width: min(340px, 42vw);
          }

          .aboutFilmHeroTitle {
            font-size: clamp(104px, 12vw, 150px) !important;
            letter-spacing: -0.008em !important;
          }

        }

        @media (max-width: 700px) {
          .aboutFilmPageTitle {
            font-size: 16vw;
          }

          .aboutPurpose {
            position: relative;
            left: auto;
            top: auto;
            width: 100%;
            margin: 10px 0 28px;
          }

          .aboutPurposeTitle {
            font-size: 28px;
          }

          .aboutPurposeText {
            max-width: 320px;
            font-size: 14px;
          }

          .aboutFilmHeroTitle {
            font-size: 24vw !important;
            line-height: 0.8 !important;
            letter-spacing: 0 !important;
          }

          .aboutFilmFooter {
            font-size: 8px;
            letter-spacing: 0.13em;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .techMotionScanner {
            animation-duration: 8s;
          }
        }

        /* ==================================================
           MOBILE ONLY: COMPACT TOP NAV
           HOME | PRODUCT | TECHNOLOGY | ABOUT | SHOP
           Desktop / tablet remain unchanged.
        ================================================== */
        @media (max-width: 700px) {
          /* HERO: keep the complete navigation at the top-right. */
          .heroNav {
            top: 18px !important;
            right: 12px !important;
            bottom: auto !important;
            left: auto !important;
            width: auto !important;
            max-width: calc(100vw - 24px) !important;
            margin: 0 !important;
            padding: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: flex-end !important;
            gap: 0 !important;
            font-size: 8px !important;
            line-height: 1 !important;
            white-space: nowrap !important;
          }

          .heroNav a {
            flex: 0 0 auto;
            padding: 0 5px !important;
            border-right: 1px solid rgba(255, 255, 255, 0.55);
            line-height: 1 !important;
          }

          .heroNav a:first-child {
            padding-left: 0 !important;
          }

          .heroNav a:last-child {
            padding-right: 0 !important;
            border-right: 0;
          }

          /* PRODUCT / TECHNOLOGY / ABOUT / SHOP: same compact rule. */
          .productHeader,
          .contentSectionHeader {
            gap: 8px !important;
            min-width: 0 !important;
          }

          .sectionNav {
            flex: 1 1 auto !important;
            min-width: 0 !important;
            max-width: 100% !important;
            margin-left: auto !important;
            display: flex !important;
            align-items: center !important;
            justify-content: flex-end !important;
            gap: 0 !important;
            font-size: 8px !important;
            line-height: 1 !important;
            letter-spacing: 0 !important;
            white-space: nowrap !important;
          }

          .sectionNav a {
            flex: 0 0 auto !important;
            padding: 0 4px !important;
            border-right: 1px solid rgba(255, 255, 255, 0.55);
            line-height: 1 !important;
          }

          .sectionNav a:first-child {
            padding-left: 0 !important;
          }

          .sectionNav a:last-child {
            padding-right: 0 !important;
            border-right: 0;
          }
        }

        /* MOBILE ONLY: EXPERIENCE poster title spacing */
        @media (max-width: 700px) {
          .experienceSection .experienceHeroTitle {
            width: 100% !important;
            max-width: 100% !important;
            overflow: visible !important;
            white-space: normal !important;
            line-height: 1 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0 !important;
          }

          .experienceSection .experienceHeroTitle br {
            display: none !important;
          }

          .experienceSection .experienceHeroBeauty,
          .experienceSection .experienceHeroExperience {
            display: block !important;
            width: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            font-size: clamp(36px, 10vw, 44px) !important;
            line-height: 0.88 !important;
            letter-spacing: -0.02em !important;
            white-space: nowrap !important;
          }
        }
      `}</style>


    </>
  );
}