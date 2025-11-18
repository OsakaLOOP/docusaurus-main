import React, {useMemo, useCallback} from 'react';
import {HtmlClassNameProvider} from '@docusaurus/theme-common';
import {DocProvider,useDoc} from '@docusaurus/plugin-content-docs/client'
import DocItemMetadata from '@theme/DocItem/Metadata';
import DocItemLayout from '@theme/DocItem/Layout';

const imgContext = require.context(
  '../../../static/img/random/',
  false, // Do not look in subdirectories
  /\.(png|jpe?g|svg|gif)$/i
);

const RANDOM_IMAGES = imgContext.keys().map((key) => {
  const mod = imgContext(key);
  // Some bundlers expose the asset as `module.default`, others return the url directly.
  return (mod && (mod.default || mod));
});

function DocItemContent({ children }) {
  // 3. Call useDoc() HERE (inside a component that is a child of <DocProvider>)
  const { frontMatter } = useDoc();

  // 4. Determine the Background Image URL
  const bgImageUrl = useMemo(() => {
    const customBgImg = frontMatter.custom_bg_img;

    if (customBgImg === 'random') {
      if (RANDOM_IMAGES.length === 0) {
        console.warn("Docusaurus: No images found in src/img for random background.");
        return null;
      }

      const randomIndex = Math.floor(Math.random() * RANDOM_IMAGES.length);
      return RANDOM_IMAGES[randomIndex];
    }

    if (customBgImg) {
      return customBgImg;
    }

    return null;
  }, [frontMatter.custom_bg_img]);

  const style = bgImageUrl ? {
    '--custom-bg-image-url': `url(${bgImageUrl})`,
  } : {};
  const rootClassName = bgImageUrl ? 'custom-bg-image-applied' : '';

  return (
    <HtmlClassNameProvider className={rootClassName}>
      <DocItemMetadata />
      <DocItemLayout>
        <div
          className="docPage_docContainer"
          style={style}
        >
          {/* This renders the MDX content */}
          {children}

          {/* The Dedicated Background Element */}
          {bgImageUrl && <div className="full-frame-bg" />}
        </div>
      </DocItemLayout>
    </HtmlClassNameProvider>
  );
}

export default function DocItem(props) {

  const docHtmlClassName = `docs-doc-id-${props.content.metadata.id}`;
  const MDXComponent = props.content;
  // Support both direct component export and `{ default: Component }` shape
  const ResolvedMDXComponent =
    MDXComponent && typeof MDXComponent === 'object' && MDXComponent.default
      ? MDXComponent.default
      : MDXComponent;

  return (
    <DocProvider content={props.content}>
      <HtmlClassNameProvider className={docHtmlClassName}>
        <DocItemContent>
          <ResolvedMDXComponent />
        </DocItemContent>
      </HtmlClassNameProvider>
    </DocProvider>
  );
}
