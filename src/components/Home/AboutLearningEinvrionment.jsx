
import aboutImg from "/images/hp-about-right.png";
export default function AboutLearningEinvrionment() {
  return (
    <div className="container mx-auto items-center my-20 flex flex-col lg:flex-row gap-10">
      <div className="flex-1 order-1 lg:order-0 flex flex-col gap-5 lg:pr-10">
        <p className="text-sky-600 font-bold text-xl">
          Learn how you want, where you want
        </p>
        <h1 className="text-4xl font-bold ">
          The world’s largest selection of online or offline courses
        </h1>
        <p className="leading-8 text-gray-500 text-lg">
          Millions of people have used Nahider School to decide which online or offline
          course  to take. We aggregate courses from many universities to help
          you find the best courses on almost any subject, wherever they exist.
          Our goal is to make online education work for everyone.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
          <div className="items-center flex gap-4">
            <i className="text-5xl text-sky-600 fa-light fa-user-graduate"></i>
            <p className="font-bold text-xl">Private Classes</p>
          </div>
          <div className="items-center flex gap-4">
            <i className="text-5xl text-sky-600 fa-light fa-desktop"></i>
            <p className="font-bold text-xl">Small Groups</p>
          </div>
          <div className="items-center flex gap-4">
            <i className="text-5xl text-sky-600 fa-light fa-alarm-clock"></i>
            <p className="font-bold text-xl">Lifetime Access</p>
          </div>
          <div className="items-center flex gap-4">
            <i className="text-5xl text-sky-600 fa-light fa-computer-mouse-scrollwheel"></i>
            <p className="font-bold text-xl">Online Tutoring</p>
          </div>
        </div>
      </div>

      <div className="flex-1 order-0 lg:order-1">
        <img src={aboutImg} alt="" />
      </div>
    </div>
  );
}
