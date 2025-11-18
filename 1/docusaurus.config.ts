import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const config: Config = {
  title: 'LOOP文庫',
  tagline: `今日も環状線は走り続ける🚈  ${Math.floor((new Date().getTime()-new Date("October 16, 2025 10:47:35").getTime())/ 86400000)}日 ${Math.floor(((new Date().getTime()-new Date("October 16, 2025 10:47:35").getTime())% 86400000) / 3600000)}時間続けて通し運行`,
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://doc.s3xyseia.xyz',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'OsakaLOOP', // Usually your GitHub org/user name.
  projectName: 'Doc_Homepage', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/schale.jpg',
    navbar: {
      title: 'LOOP文庫',
      logo: {
        alt: 'LOOP文庫',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'defaultSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/OsakaLOOP',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '>文庫<',
          items: [
            {
              label: 'Dev Notes',
              to: '/docs/talk/index',
            },
            {
              label: 'ボカロ Works',
              to: '/docs/vocaloid/index',
            },
            {
              label: '専門 Physics',
              to: '/docs/physics/index',
            },
            {
              label: '君日本語本当上手 JLPT',
              to: '/docs/jlpt/index',
            },
            {
              label: '音ゲー Rhythum',
              to: '/docs/chuni/index',
            },
            {
              label: '番組 Bangumi',
              to: '/docs/bangumi/index',
            },
            {
              label: '足跡 Trace',
              to: '/docs/trace/index',
            },
          ],
        },
        {
          title: '>居場所 Seek me<',
          items: [
            {
              label: 'QQ 3337958312',
              href: 'https://qm.qq.com/q/W2jUDQEhS8',
            },
            {
              label: 'マシュマロを投げ合う',
              href: 'https://marshmallow-qa.com/o5drh1g4cn2h1w6?t=3q0dqB&utm_medium=url_text&utm_source=promotion',
            },
          ],
        },
        {
          title: '>もっと見る<',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/OsakaLOOP/Doc_Homepage',
            },
          ],
        },
      ],
  copyright: `Content © ${new Date().getFullYear()} @OsakaLOOP, Built with Docusaurus. ICP备案: <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">苏ICP备2025213499号</a> | <a href="https://icp.gov.moe/?keyword=20250441" target="_blank">萌ICP备20250441号</a>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
};

export default config;
