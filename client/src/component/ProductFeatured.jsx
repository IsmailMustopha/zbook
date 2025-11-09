import React from "react";
import { TbArrowBackUp, TbTruckDelivery } from "react-icons/tb";
import { RiSecurePaymentLine } from "react-icons/ri";

const ProductFeatured = () => {
  return (
    <div className="mt-12 bg-primary rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 rounded-xl">
        {/* Easy Return Feature */}
        <div className="flexCenter gap-x-4 p-2 rounded-3xl">
          <div className="text-3xl">
            <TbArrowBackUp className="mb-3 text-yellow-500" />
          </div>
          <div className="">
            <h4 className="h4 capitalize">Easy Return</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem eaque corrupti asperiores animi, praesentium tem
            </p>
          </div>
        </div>

        {/* Fast Delivery Feature */}
        <div className="flexCenter gap-x-4 p-2 rounded-3xl">
          <div className="text-3xl">
            <TbTruckDelivery className="mb-3 text-red-500" />
          </div>
          <div className="">
            <h4 className="h4 capitalize">Fast Delivery</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem eaque corrupti asperiores animi, praesentium tem
            </p>
          </div>
        </div>

        {/* Secure Payment Feature */}
        <div className="flexCenter gap-x-4 p-2 rounded-3xl">
          <div className="text-3xl">
            <RiSecurePaymentLine className="mb-3 text-blue-500" />
          </div>
          <div className="">
            <h4 className="h4 capitalize">Secure Payment</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem eaque corrupti asperiores animi, praesentium tem
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductFeatured;
