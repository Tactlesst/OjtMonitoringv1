// pages/index.js
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link'; // import this at the top of your file


export default function Home() {
  return (
    <div>
      <title>OJT MONITORING | Homepage</title>

      <Header />

      {/* HERO AREA */}
      <section
        id="HeroSection"
        className="relative h-screen bg-cover bg-center bg-[url('/Images/Crim_GroupPicture.jpg')]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-transparent">
          <div className="pl-[200px] flex flex-col h-full justify-center">
            <h2 className="text-4xl text-white font-bold">Bachelor of Science in Criminology (BSCrim)</h2>
            <h2 className="text-4xl text-yellow-300 font-bold">OJT Monitoring System</h2>
            <p className="mt-2 text-base w-[600px] text-white">
              An OJT Monitoring System is a tool for tracking and evaluating interns'. progress and performance during on-the-job training.
            </p>
            <Link href="/auth">
  <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full w-[150px] mt-4 shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out">
    Login
  </button>
</Link>
          </div>
        </div>
      </section>

      {/* ABOUT US AREA */}
      <section id="AboutUsSection" className="p-8 w-full h-[700px] flex justify-center items-center gap-40 pl-[150px] pr-[150px]">
        <div>
          <h2 className="text-4xl text-blue-500 font-bold">About Us</h2>
          <p className="text-lg text-black mt-8">
            Welcome to the OJT Monitoring System. Our system helps students and administrators manage internships easily. It tracks progress, keeps records, and improves communication to ensure a smooth and productive experience.
          </p>
        </div>
        <div>
          <img src="Images/Ojt_Meeting_Image.jpg" alt="OJT MEETING" className="w-full" />
        </div>
      </section>
{/* CONTACT US SECTION */}
<section id="ContactUsSection" className="bg-blue-50 min-h-screen pt-28 pb-16 px-6 md:px-40">
  <h1 className="text-4xl font-bold text-blue-800 mb-4 text-center">Contact Us</h1>
  <p className="text-center text-gray-700 mb-12">
    We'd love to hear from you! Whether you have a question or feedback, feel free to reach out.
  </p>

  <div className="flex flex-col md:flex-row gap-10 justify-between">
    {/* Contact Form */}
    <form className="bg-white p-8 shadow-md rounded-lg w-full md:w-1/2">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          placeholder="Your name"
          className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          placeholder="Write your message here..."
          className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="5"
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
      >
        Send Message
      </button>
    </form>

    {/* Contact Info */}
    <div className="bg-white p-8 shadow-md rounded-lg w-full md:w-1/2">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Get in touch</h2>
      <p className="text-gray-700 mb-4">Feel free to reach out to us via the following contact methods:</p>

      <div className="mb-4">
        <p className="font-medium text-gray-800">📧 Email:</p>
        <p className="text-gray-600">ojtmonitoring@gmail.com</p>
      </div>

      <div className="mb-4">
        <p className="font-medium text-gray-800">📞 Phone:</p>
        <p className="text-gray-600">+63 912 345 6789</p>
      </div>

      <div className="mb-4">
        <p className="font-medium text-gray-800">📍 Address:</p>
        <p className="text-gray-600">Criminology Dept., Sample University, Balingasag, Misamis Oriental</p>
      </div>

      <div>
        <p className="font-medium text-gray-800">🌐 Social Media:</p>
        <div className="flex gap-4 mt-2">
          <a href="#" className="text-blue-600 hover:underline">Facebook</a>
          <a href="#" className="text-blue-600 hover:underline">Twitter</a>
          <a href="#" className="text-blue-600 hover:underline">Instagram</a>
        </div>
      </div>
    </div>
  </div>
</section>

      <Footer />
    </div>
  );
}
