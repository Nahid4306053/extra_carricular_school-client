export default function Blogs() {
  const data = [
    {
      title: "Unlocking Creativity: A Guide to Overcoming Creative Blocks",
      author: "Jane Doe",
      banner: "https://i.ibb.co/XkqVpKX/1682708266984.jpg",
      date: "February 15, 2023",
      description:
        "In this insightful post, Jane Doe explores practical tips and strategies to overcome creative blocks and unleash your full creative potential.",
    },
    {
      title:
        "The Impact of Technology on Education: Navigating the Digital Frontier",
      author: "John Smith",
      banner: "https://i.ibb.co/WVRBfYB/1694618553933.jpg",
      date: "March 8, 2023",
      description:
        "John Smith delves into the transformative role of technology in education, discussing its implications on teaching methods, student engagement, and the future of learning.",
    },
    {
      title:
        "Mindfulness in the Workplace: Fostering Well-being for Increased Productivity",
      author: "Sarah Johnson",
      banner: "https://i.ibb.co/vcGZbVd/mediation-importance-1.png",
      date: "April 20, 2023",
      description:
        "Sarah Johnson shares her insights on incorporating mindfulness practices into the workplace, exploring the benefits for both employees and organizations in achieving a healthier and more productive work environment.",
    },
  ];
  return (
    <div className="container mx-auto mt-16 mb-32">
      <div className=" capitalize container mx-auto text-center  mb-20 space-y-4">
        <h3 className="text-xl text-sky-500">
        Explore the Best in Tech, Today.
        </h3>
        <h1 className="text-5xl mb-5 font-bold">Our Tech Odyssey</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
        {data.map((ele, ind) => {
          return (
            <div key={ind} className="card  rounded-md bg-base-100 shadow-xl">
              <figure>
                <img className=" h-60 w-full object-cover" src={ele.banner} alt="Shoes" />
              </figure>
              <div className="card-body">
                <div className="time mb-4 flex justify-between items-center">
                    <span>{ele.date}</span>
                    <span className="opacity-75 flex gap-2"><i className="fa-solid  text-sm fa-user-tie"></i> <span>{ele.author}</span></span>
                 </div>    
                <h2 className="card-title">{ele.title.slice(0,50)+".."}</h2>
                <p className="text-base">{ele.description.slice(0,100)+".."}</p>
                <div className="card-actions mt-5 justify-end">
                   <button className="btn btn-info text-white rounded-none">Read more </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
