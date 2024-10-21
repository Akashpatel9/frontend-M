import heroimg from "../../public/image/heroImg.png";

function HeroSection() {
  return (
    <div className="w-1/2 h-full p-20 bg-[#733CE4] flex flex-col gap-10">
      <img
        className="h-[300px] rounded-2xl w-full object-cover"
        src={heroimg}
      />
      <div className="flex flex-col text-center gap-5 text-white">
        <div className=" text-2xl leading-7 font-medium">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod
        </div>
        <div className=" text-md leading-4  font-medium">
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat.
        </div>
      </div>
    </div>
  );
}

export default HeroSection;