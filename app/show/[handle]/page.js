import { notFound } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import Link from "next/link";

const Page = async ({ params }) => {
  const resolvedParams = await params;
  const { handle } = resolvedParams;

  const client = await clientPromise;
  const db = client.db("Lynkbit");
  const item = await db.collection("tree").findOne({ handle });

  if (!item) return notFound();

  return (
    // Gradient background with better centering
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8">
          {item.pic ? (
            <div className="p-1 rounded-full bg-white/20 backdrop-blur-sm shadow-xl">
              <img
                src={item.pic}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white"
              />
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold text-white border-4 border-white shadow-xl">
              {handle[0].toUpperCase()}
            </div>
          )}
          
          <h1 className="mt-4 font-bold text-2xl text-white drop-shadow-md">
            @{item.handle}
          </h1>
          {item.desc && (
            <p className="mt-2 text-center text-white/90 font-medium max-w-sm leading-relaxed">
              {item.desc}
            </p>
          )}
        </div>

        {/* Links Section */}
        <div className="flex flex-col gap-4 w-full">
          {item.links.map((link, i) => (
            <Link 
              key={i} 
              href={link.link}
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 py-4 px-6 rounded-xl text-center text-white font-semibold shadow-lg transition-all duration-300 hover:bg-white hover:text-purple-600 hover:scale-[1.02] active:scale-[0.98]">
                {link.linktext}
              </div>
            </Link>
          ))}
        </div>

        {/* Branding Footer */}
        <footer className="mt-12">
          <Link href="/" className="text-white/60 hover:text-white transition-colors text-sm font-bold tracking-widest uppercase">
            Lynkbit
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default Page;