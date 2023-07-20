import { Breadcrumb as AntdBreadcrumb } from 'antd';
import { BreadcrumbItemType, BreadcrumbSeparatorType } from 'antd/es/breadcrumb/Breadcrumb';
import { Link } from 'react-router-dom';

import { CrumbItem } from './Crumb';
import { useBreadcrumbItems } from '../../..';

export const Breadcrumb = () => {
  const items = useBreadcrumbItems();

  const renderCrumb = (
    item: Partial<BreadcrumbItemType & BreadcrumbSeparatorType & CrumbItem>,
    params: unknown,
    items: Partial<BreadcrumbItemType & BreadcrumbSeparatorType & CrumbItem>[],
    paths: string[],
  ) => {
    const last = items.indexOf(item) === items.length - 1;

    return last || item.customProps?.isLink === false ? (
      <span>{item.title}</span>
    ) : (
      <Link to={paths.join('/') || '/'}>{item.title}</Link>
    );
  }

  return (
    <AntdBreadcrumb
      items={items}
      itemRender={renderCrumb}
      aria-label="breadcrumb"
      className="breadcrumb"
    />
  );
}