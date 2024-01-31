
function Desktop() {
  return (
    <>
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
    </div>
        <div className="flex z-10 border flex-col h-screen text-center items-center py-10">
          <span className="font-semibold ">Not available on Desktop</span>
        <h1 className="font-bold text-5xl mt-4 mb-4 text-zinc-700">Scan this QR</h1>
          <span className="font-semibold ">on Phone</span>

          <div className=" h-96 bg-black/20 w-96 border mt-5 rounded-xl">
            
          </div>

          <div className="flex justify-center flex-col items-center mt-[3vw]">
             <h1 className="font-bold text-zinc-500">NGLdrx.</h1>
             <span className="font-semibold text-zinc-500 text-xs mt-1">Get NGL Pro Features.</span>
          </div>
      </div>
    </>
  )
}

export  {Desktop}