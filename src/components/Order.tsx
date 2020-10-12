import * as React from "react";
import { IOrder } from "../types";

const Order = ({
  Name,
  Status,
  Type,
  StartDate,
  EndDate,
  Color,
  Description,
}: IOrder) => {
  const start = StartDate.split(" ").pop().split(":");
  const end = EndDate.split(" ").pop().split(":");
  const color = Color.toString().toLowerCase();
  return (
    <div className="m-3">
      <div
        className={`grid bg-${color}-600 p-2 grid-cols-2 md:grid-cols-4 grid-rows-1 lg:grid-cols-4 sm:grid-rows-1 justify-items-start border`}
      >
        <div className="justify-self-stretch text-white">
          {start[0]}:{start[1]} - {end[0]}:{end[1]}
        </div>
        <div className="justify-self-stretch text-white">{Name}</div>
        <div className="justify-self-stretch text-white">{Type}</div>
        <div className="justify-self-stretch text-white text-right">
          Status: {Status}
        </div>
      </div>
      <div className="p-2 grid grid-cols-2 md:grid-cols-4 grid-rows-2 lg:grid-cols-4 sm:grid-rows-2 justify-items-start border">
        <div className="row-span-2">
          <h4 className="font-bold">Klant</h4>
          <p>Name</p>
          <p>Address</p>
        </div>
        <div className="p-1">
          <h4 className="font-bold">Installation</h4>
          <p>Example</p>
        </div>
        <div className="p-1 md:col-span-2">
          <h4 className="font-bold">Melding</h4>
          <p>Something stopped working</p>
        </div>
        <div className="p-1">
          <h4 className="font-bold">Contract</h4>
          <p>Silver</p>
        </div>
        <div className="p-1 col-span-2">
          <h4 className="font-bold">Description</h4>
          <p>{Description}</p>
        </div>
      </div>
    </div>
  );
};

export default Order;
