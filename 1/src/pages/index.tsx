import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import { useEffect, useState } from 'react';


function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [timer, setTimer] = useState({dayCount: 0, hourCount: 0});

  useEffect(() => {
    const startDate = new Date("October 16, 2025 10:47:35").getTime();
    console.log('计时器初始化:',  timer.dayCount,timer.hourCount);
    const updateTimer = () => {
      var now = new Date().getTime();
      var diff = now - startDate;
      
      var days = Math.floor(diff / 86400000);
      var hours = Math.floor((diff % 86400000) / 3600000);
      

      setTimer({dayCount: days,hourCount: hours});
      console.log('计时器更新:', { days, hours, now, diff },timer);
    };

    updateTimer();
    var interval = setInterval(updateTimer, 60000);
    
    return () => clearInterval(interval);
  }, []);
  console.log('组件渲染, runningTime:', timer);
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">今日も環状線は走り続ける <br /><span style={{display: 'inline-block', verticalAlign: 'middle',}}>🚈</span> <span style={{fontSize:'12px'}}>{timer.dayCount}日{timer.hourCount}時間続けて通し運行</span><br /><span style={{display: 'inline-block', verticalAlign: 'middle',}}>🦲-ˋノ𓂃ˏ</span><span style={{fontSize:'12px'}}>×{timer.dayCount*100+timer.hourCount*8}</span><br /></p>
        <div className={styles.buttonsContainer}>
          <div className={styles.rssContainer}>
            <a
              href="https://rss.s3xyseia.xyz/doc/rss.xml"  // 外部RSS源URL
              className={styles.rssButton}
              target="_blank"
              rel="noopener noreferrer"
              title="订阅 RSS">
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                style={{ marginRight: '8px' }}
              >
                <path d="M6.18,15.64A2.18,2.18 0 0,1 8.36,17.82C8.36,19 7.38,20 6.18,20C5,20 4,19 4,17.82A2.18,2.18 0 0,1 6.18,15.64M4,4.44A15.56,15.56 0 0,1 19.56,20H16.73A12.73,12.73 0 0,0 4,7.27V4.44M4,10.1A9.9,9.9 0 0,1 13.9,20H11.07A7.07,7.07 0 0,0 4,12.93V10.1Z"/>
              </svg>
              RSS 订阅
            </a>
          </div>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/talk">
              発車 🟢 Departure
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}と出会う`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
