import { Tabs } from "antd";
import React, { Suspense } from "react";
import { ItemGroupTab } from "../../../constants/Constants";
import LoadingIndicator from "../../common/Loading";
import CategoryComponent from "../Category/components/Category.component";
import SubCategoryComponent from "../SubCategory/components/SubCategory.component";

type Props = {};

const ItemGroup = (props: Props) => {
  return (
    <Tabs
      tabPosition="left"
      type="line"
      // activeKey={selected_tab}
      itemRef="ref"
      // onChange={onChange}
    >
      <Tabs.TabPane
        tab={ItemGroupTab.CATEGORY}
        key={ItemGroupTab.CATEGORY.toLocaleLowerCase().split(" ").join("-")}
      >
        <Suspense fallback={<LoadingIndicator />}>
          <CategoryComponent />
        </Suspense>
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={ItemGroupTab.SUB_CATEGORY}
        key={ItemGroupTab.SUB_CATEGORY.toLocaleLowerCase().split(" ").join("-")}
      >
        <Suspense fallback={<LoadingIndicator />}>
          <SubCategoryComponent />
        </Suspense>
      </Tabs.TabPane>
    </Tabs>
  );
};

export default ItemGroup;
