import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Link } from "react-router";
import heroImage from "@/assets/image/heroImage2.jpg";

const Hero = () => {
  return (
    <div className="overflow-x-hidden bg-background">
      <section className="pt-12 bg-background sm:pt-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="px-6 text-lg text-foreground font-inter">
              Smart email campaign builder, made for Developers
            </h1>
            <p className="mt-5 text-4xl font-bold leading-tight text-primary sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight font-pj">
              Turn your visitors into profitable{" "}
              <span className="relative inline-flex sm:inline">
                <span className="bg-linear-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
                <span className="relative"> business </span>
              </span>
            </p>

            <div className="px-8 sm:items-center sm:justify-center sm:px-0 sm:space-x-5 flex mt-9 max-sm:flex-col max-sm:gap-2">
              <Link to={""}>
                <Button className="font-bold" size={"xl"}>
                  Get more customers
                </Button>
              </Link>
              <Link to={""}>
                <Button size={"xl"} variant={"outline"}>
                  <Play size={"16px"} />
                  Watch free demo
                </Button>
              </Link>
            </div>

            <p className="mt-8 text-base text-foreground font-inter">
              60 Days free trial · No credit card required
            </p>
          </div>
        </div>

        <div className="pb-12 bg-background pt-10">
          <div className="relative">
            <div className="absolute inset-0 h-2/3 bg-background"></div>
            <div className="relative mx-auto">
              <div className="lg:max-w-6xl lg:mx-auto rounded-xl overflow-hidden sm:outline-4 outline-foreground ">
                <img className="transform scale-110 " src={heroImage} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Hero;
