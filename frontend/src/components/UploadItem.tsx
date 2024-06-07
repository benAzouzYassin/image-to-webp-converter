import { Download, ImageIcon, Trash2 } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

export default function UploadItem() {
  return (
    <div className=" text-white relative w-[1150px] bg-[#1f1f1f] flex items-center h-[80px] px-[30px] border border-white/10 rounded-[4px] ">
      {/* hello this is an upload item */}
      <ImageIcon className="opacity-50 w-[45px] h-[45px]" />{" "}
      <span className="text-white  opacity-90 text-[20px] font-mono ml-2">
        Folder name
      </span>
      <button className=" ml-auto flex gap-2 items-center hover:bg-white hover:scale-105 active:scale-100 transition-all bg-neutral-300  px-4 py-2 text-black  rounded-[4px] font-semibold mr-4">
        {/* <LoadingSpinner className="text-black fill-neutral-200" /> */}
        Download
        <Download className="-mt-[2px]" />
      </button>
      <span className="h-[35px] group rounded-[2px] active:scale-95 hover:cursor-pointer transition-all hover:bg-red-500   w-[35px] flex items-center justify-center">
        <Trash2 className="group-hover:p-[1px] transition-transform" />
      </span>
    </div>
  );
}
