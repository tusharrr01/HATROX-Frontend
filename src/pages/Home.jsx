import { useMemo } from "react";
function Home() {

  const metaDate = useMemo(() => {
    const now = new Date();
    const fmt = new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    return fmt.format(now);
  }, []);
  return (
    <main className="bg-zinc-200 text-zinc-900">
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 sm:pt-24 lg:pt-14">
          <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-zinc-500">
            <p className="text-zinc-900 text-sm pr-1">Site Of The Day</p>
            <a href="/" className="text-zinc-900 text-sm border border-zinc-800 rounded-md px-1 pl-1 transition-all duration-300 font-semibold hover:border-indigo-500 hover:shadow-md hover:shadow-indigo-400/50 ">
              {metaDate}
            </a>
          </div>

          {/* <h1 className=" text-center font-bold leading-none tracking-tight">
            <span className="block  text-[12vw] leading-[1.2] sm:text-[9vw] lg:text-[9vw]">HATROX</span>
          </h1> */}

          <div className="text-center font-bold leading-none tracking-tight">
            <img
              src="../public/images/HATROX_NAME_noBG.png"
              alt="HATROX Logo"
              className="mx-auto w-[80vw] sm:w-[60vw]  h-auto"
            />
          </div>



          <div className="gap-4 flex items-center justify-center mt-6">

            <div className="flex  items-center justify-center gap-1">
              <div className="w-8 h-8 rounded-full bg-zinc-900 text-white grid place-items-center font-extrabold text-xs uppercase select-none">
                HC
              </div>
              <div className="relative group cursor-pointer">
                <span className="font-medium text-zinc-800  transition-colors duration-300 select-none">
                  <a href="#Harsh">Harsh Chauhan</a>
                </span>
                <span className=" absolute left-0 -bottom-0.5 w-full h-[2px] bg-zinc-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 "></span>
              </div>
              <sup className="text-xs font-semibold text-zinc-700 select-none">BEG</sup>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-8 h-8 rounded-full text-white rounded grid place-items-center font-extrabold text-xs uppercase select-none">
                <img className="rounded-full w-full h-full object-cove" src="../public/images/error.jpg" alt="img" />
              </div>
              <div className="relative group cursor-pointer">
                <span className="font-medium text-zinc-800  transition-colors duration-300 select-none">
                  <a href="#Tushar">Tushar Kaklotar</a>
                </span>
                <span className=" absolute left-0 -bottom-0.5 w-full h-[2px] bg-zinc-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 "></span>
              </div>
              <sup className="text-xs font-semibold text-zinc-700 select-none">PRO</sup>
            </div>

            <div className="flex  items-center justify-center gap-1">
              <div className="w-8 h-8 rounded-full bg-zinc-900 text-white grid place-items-center font-extrabold text-xs uppercase select-none">
                RJ
              </div>
              <div className="relative group cursor-pointer">
                <span className="font-medium text-zinc-800  transition-colors duration-300 select-none">
                  <a href="#ronak">Ronak Jikadra</a>
                </span>
                <span className=" absolute left-0 -bottom-0.5 w-full h-[2px] bg-zinc-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 "></span>
              </div>
               <sup className="text-xs font-semibold text-zinc-700 select-none">INT</sup>
            </div>
          </div>



        </div>
      </section>


      {/* <section id="featured" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-20">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Featured Products</h2>
          <a
            href="#"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
          >
            View all →
          </a>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProductCard
            title="HATROX Soft-Touch Tee"
            price="₹1,299"
            tag="Bestseller"
            img="https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop"
          />
          <ProductCard
            title="Everyday Sneakers"
            price="₹4,999"
            tag="New"
            img="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop"
          />
          <ProductCard
            title="Minimal Canvas Tote"
            price="₹899"
            tag="Eco"
            img="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop"
          />
        </div>
      </section> */}

    </main>
  );
}

// function ProductCard({ title, price, img, tag }) {
//   return (
//     <article className="group overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-900/5 shadow-sm hover:shadow-md transition">
//       <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
//         <img
//           src={img}
//           alt={title}
//           className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
//           loading="lazy"
//         />
//         {tag && (
//           <span className="absolute left-3 top-3 rounded-full bg-black/80 px-2.5 py-1 text-xs font-medium text-white">
//             {tag}
//           </span>
//         )}
//         <button
//           className="absolute bottom-3 right-3 rounded-lg bg-amber-300/95 px-3 py-1.5 text-sm font-semibold text-zinc-900 shadow hover:bg-amber-400"
//           type="button"
//         >
//           Quick View
//         </button>
//       </div>
//       <div className="p-4">
//         <h3 className="line-clamp-1 text-base font-semibold text-zinc-900">{title}</h3>
//         <div className="mt-1 flex items-center justify-between">
//           <span className="text-zinc-700">{price}</span>
//           <button
//             type="button"
//             className="rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-800"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// }


export default Home;
