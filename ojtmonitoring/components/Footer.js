// components/Footer.js

export default function Footer() {
  return (
    <section id="FooterSection" className="p-4 bg-blue-800 text-white text-center sm:px-6 md:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Follow Us */}
        <div>
          <h3 className="text-lg text-white font-bold">Follow us</h3>
          <div className="flex gap-1 mt-5 justify-center sm:justify-start">
            <img src="/Main_Logo.png" alt="Logo" className="h-12 w-12 rounded-full" />
            <img src="/Crim_Logo.jpg" alt="Logo" className="h-12 w-12 rounded-full" />
          </div>
        </div>

        {/* Empty Divider */}
        <div></div>

        {/* Get Help */}
        <div className="flex flex-col">
          <h3 className="text-lg text-white font-bold">Get help</h3>
          <a href="#" className="hover:underline text-left text-sm mt-2">➤ Monitor</a>
          <a href="#" className="hover:underline text-left text-sm mt-2">➤ Registration</a>
        </div>

        {/* Useful Links */}
        <div className="flex flex-col">
          <h3 className="text-lg text-white font-bold">Useful links</h3>
          <a href="#" className="hover:underline text-left text-sm mt-2">➤ Hero</a>
          <a href="#" className="hover:underline text-left text-sm mt-2">➤ About Us</a>
        </div>

        {/* Remain Updated */}
        <div className="flex flex-col">
          <h3 className="text-lg font-bold mb-2">Remain Updated</h3>
          <input type="email" placeholder="Enter your email" className="w-full p-2 mb-2 text-black rounded-sm bg-white" />
          <button className="bg-blue-900 shadow-md w-full sm:w-40 text-white text-sm rounded-sm">Sign up</button>
        </div>
      </div>

      <p className="mt-10 text-sm">© Copyright @ 2025, OJT Monitoring System, All Rights Reserved.</p>
    </section>
  );
}
