const Section2 = () => {
  const cards = [
    {
      img: "/assets/images.jpg",
      age: "0-4 Years",
      description:
        "Where imagination meets style! Our collection is crafted with young adventurers in mind.",
    },
    {
      img: "/assets/ce6edf8be3281392142fb538d9b5219e2579c7f3_1024_1024.jpeg",
      age: "5-9 Years",
      description:
        "Where imagination meets style! Our collection is crafted with young adventurers in mind.",
    },
    {
      img: "/assets/images.jpg",
      age: "10-17 Years",
      description:
        "Where imagination meets style! Our collection is crafted with young adventurers in mind.",
    },
  ];

  const Card = ({ img, age, description }) => (
    <div className="flex group gap-2 animated-border shadow-lg p-2 mt-6">
      <img src={img} alt="" className="w-16 md:w-[100px]" />
      <div className="ml-2 md:ml-4 skew-x-12">
        <p className="text-gray-800 font-semibold text-base md:text-2xl">
          {age}
        </p>
        <p className="text-gray-500 text-sm md:text-base">{description}</p>
      </div>
      <div className="skew-x-12 hidden group-hover:flex flex-col justify-center items-center">
        <button className="text-orange-700">Explore</button>
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-orange-700"
        >
          <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
        </svg>
      </div>
    </div>
  );

  return (
    <div className="mt-20 py-6 grid grid-cols-1 md:grid-cols-2 gap-2">
      <div className="w-[200px] h-60 md:w-[300px] lg:w-[450px] md:h-full bg-[#40C2CA] flex justify-end items-center">
        <div className="-skew-x-12 -mr-16 md:-mr-24 lg:-mr-36">
          <img
            src="https://kidverz.myshopify.com/cdn/shop/files/little-fashionista-colored-background-mom-s-shoes_2.jpg?v=1697103126&width=768"
            alt=""
            className="w-[200px] md:w-[350px] lg:w-[500px]"
          />
        </div>
      </div>

      <div className="md:px-6 px-0">
        <div className="px-2 md:px-6">
          <p className="text-3xl text-gray-800 md:text-5xl font-bold">
            Fashion By Age
          </p>
          <p className="mt-4 md:text-lg text-gray-500">
            Welcome to the vibrant world of kidverz, where imagination meets
            style! Our collection is crafted with young adventurers in mind,
            blending comfort with the latest trends to ensure your little ones
            not only look their best but also feel their best.
          </p>
        </div>

        {/* Desktop Cards */}
        <div className="hidden md:block mt-6 space-y-2 md:pr-6 lg:pr-20 -skew-x-12">
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>

        {/* Mobile Cards */}
        <div className="block md:hidden p-4">
          {cards.map((card, index) => (
            <div key={index} className="mt-2 -skew-x-12">
              <Card {...card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section2;
