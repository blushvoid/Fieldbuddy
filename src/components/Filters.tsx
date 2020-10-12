import * as React from "react";
import { observer } from "mobx-react";
import { Types, Priorities } from "../constants";

import { Button } from "baseui/button";
import { ButtonGroup } from "baseui/button-group";
import { StatefulMenu } from "baseui/menu";
import { Popover } from "baseui/popover";
import { ChevronDown } from "baseui/icon";
import { Checkbox } from "baseui/checkbox";
import { store } from "../store";

const TypeDropdown = observer(({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Popover
      isOpen={isOpen}
      onClick={() => setIsOpen((s) => !s)}
      content={
        <StatefulMenu
          items={Types.map((label) => ({ label, value: label }))}
          onItemSelect={({ item }) => {
            console.log(item, "hello cutie im an item");
            store.toggleFilter("type", item.value);
            setIsOpen(false);
          }}
          // overrides={{
          //   ListItem: Checkbox,
          // }}
        />
      }
    >
      <Button endEnhancer={() => <ChevronDown size={18} />}>{children}</Button>
    </Popover>
  );
});

const PriorityDropdown = observer((props: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Popover
      isOpen={isOpen}
      onClick={() => setIsOpen((s) => !s)}
      content={
        <StatefulMenu
          items={Priorities.map((label) => ({ label }))}
          onItemSelect={() => setIsOpen(false)}
        />
      }
    >
      <Button {...props} endEnhancer={() => <ChevronDown size={18} />}>
        {props.children}
      </Button>
    </Popover>
  );
});

const Filters = observer(() => (
  <ButtonGroup>
    <Button onClick={() => store.toggleFilter("open")}>Open Orders</Button>
    <Button> >15km</Button>
    <TypeDropdown>Type</TypeDropdown>
    <PriorityDropdown>Priority</PriorityDropdown>
  </ButtonGroup>
));

export default Filters;
