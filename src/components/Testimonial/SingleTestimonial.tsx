import Image from "next/image";

const SingleTestimonial = ({ review }:any) => {
  const { name,  content } = review;
  return (
    <div className="NeueMontreal-Regular rounded-lg bg-white p-9 sm:h-56 pt-7 border-2 shadow-solid-9   ">
      <div className=" flex justify-between border-b border-stroke pb-6 ">
        <div>
          <h3 className=" text-xl">
            {name}
          </h3>
        </div>
      </div>

      <p className="mt-5">{content}</p>
    </div>
  );
};

export default SingleTestimonial;
