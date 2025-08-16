function Footer() {
  return (
    <footer className="w-full  flex items-center justify-center h-10">
      <section className=" w-full border-t border-zinc-200 bg-white">
        <div className=" px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="text-2xl font-black tracking-tight">HATROX</div>
            <p className="text-center text-zinc-600 sm:text-left">
              Designed for modern commerce. Built with React + TailwindCSS.
            </p>
            <div className="flex items-center gap-3 text-sm text-zinc-600">
              <span className="font-medium text-zinc-800">Developers:</span>
              <span>Tushar</span>
              <span className="text-zinc-400">•</span>
              <span>Ronak</span>
              <span className="text-zinc-400">•</span>
              <span>Harsh</span>
            </div>
          </div>
        </div>
      </section>

    </footer>
  );
}
export default Footer;
