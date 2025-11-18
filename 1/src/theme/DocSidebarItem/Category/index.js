import React from 'react';
import Category from '@theme-original/DocSidebarItem/Category';

export default function CategoryWrapper(props) {
  const { item } = props;
  const description = item.customProps?.description;
  const newItem = {
    ...item,
    title: description, // This property is consumed by the original component for the tooltip
  };
  return (
    <>
      <Category {...props} item={newItem}/>
    </>
  );
}
