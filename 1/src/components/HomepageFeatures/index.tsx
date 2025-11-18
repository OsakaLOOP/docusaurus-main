import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: (<><span style={{color:'#00c8fa'}}><s>Blue</s></span> Archive of Ideas, <br />or Everything</>),
    Svg: require('@site/static/img/index_disp2.svg').default,
    description: (
      <>
        Only what I care about, love, and want to save and share. <br />
        Ranging from memes, <s>lolis</s>, anime, railway <br />to programming, physics or even university life-hacks.<br />
        A WEB 2.0 solitude amid the hustle and bustle of nonsense.
      </>
    ),
  },
  {
    title: (<>Compact and Continuious<br />Functional and Furnished</>),
    Svg: require('@site/static/img/index_disp1.svg').default,
    description: (
      <>
        Changing chores into custom,<br />
        grasping bits of daily life, <br />
        all in one corner of one site.<br />
        <code style={{ fontSize: '20px' }}>可愛い＝正義</code><br />
        That's all, nothing more.
      </>
    ),
  },
  {
    title: (<>以及，<br />欢迎<a href="http://monitoring.s3xyseia.xyz" target="_blank" rel="noopener noreferrer">视奸</a>👁</>),
    Svg: require('@site/static/img/index_disp3.svg').default,
    description: (
      <>
        Ranging from: <br />Site analytics, daily 早八, tabi tracing, Last.fm scrobbling, Bangumi.tv logging...<br />-- and <b><i>you are being watched</i></b>.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
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

export default function HomepageFeatures(): JSX.Element {
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
