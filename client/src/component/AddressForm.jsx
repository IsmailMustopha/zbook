import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "./CartTotal";
import toast from "react-hot-toast";

// Reusable input component with floating labels
const FormInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = true,
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      <input
        onChange={onChange}
        value={value}
        type={type}
        name={name}
        placeholder=" "
        required={required}
        className="peer w-full p-3 pt-5 border border-gray-300 rounded-lg bg-white text-gray-800 outline-none 
                   focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 
                   transition duration-200 placeholder-transparent"
      />
      <label
        htmlFor={name}
        className="absolute left-3 top-2.5 text-gray-500 text-sm transition-all duration-200 
                   peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                   peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600"
      >
        {placeholder || label}
      </label>
    </div>
  );
};

const AddressForm = () => {
  const { navigate, axios, user, method, setMethod } = useContext(ShopContext);

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setAddress((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/address/add", { address });
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      toast.error("Please log in to continue");
      navigate("/cart");
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 pt-28">
      <div className="flex flex-col xl:flex-row gap-12 lg:gap-16">
        {/* LEFT SIDE - Delivery Form */}
        <form
          onSubmit={onSubmitHandler}
          className="flex-[2] flex flex-col gap-6 bg-white/90 backdrop-blur-sm p-6 sm:p-8 
                     rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <Title title1="Delivery" title2="Information" titleStyles="pb-2" />
            {user && (
              <span className="text-xs text-gray-500">
                Logged in as <strong>{user.name || "Guest"}</strong>
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 mb-3">
            Please provide accurate details to ensure smooth delivery.
          </p>

          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              onChange={onChangeHandler}
              value={address.firstName}
              name="firstName"
              placeholder="First Name"
            />
            <FormInput
              onChange={onChangeHandler}
              value={address.lastName}
              name="lastName"
              placeholder="Last Name"
            />
            <FormInput
              onChange={onChangeHandler}
              value={address.email}
              name="email"
              placeholder="Email Address"
              type="email"
              className="md:col-span-2"
            />
            <FormInput
              onChange={onChangeHandler}
              value={address.phone}
              name="phone"
              placeholder="Phone Number"
              type="tel"
              className="md:col-span-2"
            />
          </div>

          {/* Address Info */}
          <div className="pt-6 border-t border-gray-100">
            <h5 className="font-semibold text-lg text-gray-800 mb-4">
              Shipping Address
            </h5>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                onChange={onChangeHandler}
                value={address.street}
                name="street"
                placeholder="Street Address / Apt."
                className="md:col-span-2"
              />
              <FormInput
                onChange={onChangeHandler}
                value={address.city}
                name="city"
                placeholder="City"
              />
              <FormInput
                onChange={onChangeHandler}
                value={address.state}
                name="state"
                placeholder="State / Province"
              />
              <FormInput
                onChange={onChangeHandler}
                value={address.zipcode}
                name="zipcode"
                placeholder="Zip / Postal Code"
                type="text"
              />
              <FormInput
                onChange={onChangeHandler}
                value={address.country}
                name="country"
                placeholder="Country"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full md:w-1/2 mt-6 py-3 rounded-xl bg-secondary text-white font-semibold text-lg 
                       hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Save and Continue
          </button>
        </form>

        {/* RIGHT SIDE - Cart Summary */}
        <div className="flex-1">
          <div className="sticky top-28">
            <CartTotal method={method} setMethod={setMethod} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;

// import React, { useContext, useState } from "react";
// import Title from "./Title";
// import { ShopContext } from "../context/ShopContext";
// import CartTotal from "./CartTotal";

// const AddressForm = () => {
//   const { navigate, axios, user, method, setMethod } = useContext(ShopContext);

//   const [address, setAddress] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

//   const onChangeHandler = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;

//     setAddress((data) => ({ ...data, [name]: value }));

//     console.log(address);
//   };

//   const onSubmitHandler = (e) => {
//     e.preventDefault();
//     // Functionality for submitting the form would go here
//   };

//   return (
//     <div className="max-padd-container py-16 pt-28">
//       {/* Container */}
//       <div className="flex flex-col xl:flex-row gap-20 xl:gap-28">
//         {/* LEFT SIDE */}
//         <form
//           onSubmit={onSubmitHandler}
//           className="flex flex-[2] flex-col gap-3 text-[95%]"
//         >
//           <Title
//             title1={"Delivery"}
//             title2={"Information"}
//             titleStyles={"pb-5"}
//           />

//           <div className="flex gap-3">
//             <input
//               onChange={onChangeHandler}
//               value={address.firstName}
//               type="text"
//               name="firstName"
//               placeholder="First Name"
//               className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
//               required
//             />
//             <input
//               onChange={onChangeHandler}
//               value={address.lastName}
//               type="text"
//               name="lastName"
//               placeholder="Last Name"
//               className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
//               required
//             />
//           </div>
//           <input
//             onChange={onChangeHandler}
//             value={address.email}
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
//             required
//           />
//           <input
//             onChange={onChangeHandler}
//             value={address.phone}
//             type="phone"
//             name="phone"
//             placeholder="Phone Number"
//             className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
//             required
//           />
//           <input
//             onChange={onChangeHandler}
//             value={address.street}
//             type="street"
//             name="street"
//             placeholder="Street"
//             className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
//             required
//           />
//           <div className="flex gap-3">
//             <input
//               onChange={onChangeHandler}
//               value={address.city}
//               type="city"
//               name="city"
//               placeholder="City"
//               className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
//               required
//             />
//             <input
//               onChange={onChangeHandler}
//               value={address.state}
//               type="state"
//               name="state"
//               placeholder="State"
//               className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
//               required
//             />
//           </div>
//           <div className="flex gap-3">
//             <input
//               onChange={onChangeHandler}
//               value={address.zipcode}
//               type="zipcode"
//               name="zipcode"
//               placeholder="Zip Code"
//               className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
//               required
//             />
//             <input
//               onChange={onChangeHandler}
//               value={address.country}
//               type="country"
//               name="country"
//               placeholder="Country"
//               className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
//               required
//             />
//           </div>

//           <button type="submit" className="btn-dark rounded-md w-1/2 mt-2">
//             Add Address
//           </button>
//         </form>

//         {/* RIGHT SIDE */}
//         <div className="flex flex-1 flex-col">
//           <div className="max-w-[379px] w-full bg-primary p-5 py-10 max-md:mt-16 rounded-xl">
//             <CartTotal method={method} setMethod={setMethod} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddressForm;
