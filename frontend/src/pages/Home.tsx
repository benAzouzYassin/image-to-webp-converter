import Nav from "@/components/Nav";
import UploadItem from "@/components/UploadItem";
import { ImageUpIcon } from "lucide-react";
import { useRef } from "react";

export default function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <main className="moving-grid-background bg-[#0A0A0B]  min-h-[150vh]">
      <Nav />
      <section
        onClick={() => inputRef.current?.click()}
        className="h-[550px] flex-col hover:cursor-pointer transition-all group w-[1150px] rounded-[12px] shadow-white/5 bg-neutral-950 items-center justify-center shadow-md  flex mx-auto mt-[50px] hover:bg-[#121212] border-2 border-white/10 "
      >
        <ImageUpIcon className="stroke-neutral-700 group-active:scale-105 group-hover:scale-110 transition-transform w-[280px] h-[280px] mx-auto -mt-[50px] " />
        <p className="w-full text-white text-[32px] mt-4 font-normal opacity-40  text-center ">
          Click Here to upload an image
        </p>
        <input
          className="opacity-0 "
          ref={inputRef}
          multiple
          type="file"
          accept="image/*"
        />
      </section>
      <section className=" gap-4 flex-col w-[1150px]   items-center justify-center shadow-md  flex mx-auto mt-[50px]   ">
        <UploadItem />
        <UploadItem />
        <UploadItem />
        <UploadItem />
      </section>
    </main>
  );
}
