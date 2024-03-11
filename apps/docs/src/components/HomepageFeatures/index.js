import clsx from "clsx";
import Heading from "@theme/Heading";
import PaletteIcon from "@mui/icons-material/Palette";
import SkateboardingRoundedIcon from "@mui/icons-material/SkateboardingRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Configurable",
    Svg: () => (
      <PaletteIcon
        style={{ height: 100, width: 100, color: "var(--ifm-color-primary)" }}
      />
    ),
    description: (
      <>
        OpenVP is agnostic to the way you want your program to work. Create
        whatever blocks you want, and handle the interpretation however you
        want!
      </>
    ),
  },
  {
    title: "Portable",
    Svg: () => (
      <SkateboardingRoundedIcon
        style={{ height: 100, width: 100, color: "var(--ifm-color-primary)" }}
      />
    ),
    description: (
      <>
        OpenVP is built with react, and can be easily included within other
        web-based applications. That includes desktop tools like Electron or
        Tauri too!.
      </>
    ),
  },
  {
    title: "Integrable",
    Svg: () => (
      <SettingsSuggestRoundedIcon
        style={{ height: 100, width: 100, color: "var(--ifm-color-primary)" }}
      />
    ),
    description: (
      <>
        OpenVP is built to function headless, but if you want to dive deeper,
        you can fully customize and drive the experience by tapping into
        interaction events and the program data.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
