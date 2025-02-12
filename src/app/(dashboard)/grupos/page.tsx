"use client";

const Grupos = () => {

  return (
    <div className="pt-10">
      <div className="flex items-center justify-between">
        <h1 className="text-black text-[42px] font-bold">Grupos</h1>
        <button className="text-primary text-[22px] font-bold border-none p-4">
          Criar grupo
        </button>
      </div>
      <div className="flex flex-wrap gap-[32px] mt-10">
        <div className="w-[300px] h-[300px] bg-white p-[12px] shadow-custom rounded-lg flex flex-col justify-between">
          <div className="flex items-center gap-[6px] justify-between">
            <p className="text-[22px] text-black font-bold">
              Meninas na computação
            </p>
            <div className="bg-[#C7F9A7] font-bold text-black rounded-full w-[120px] h-[30px] flex items-center justify-center">
              Pitch
            </div>
          </div>
          <span className="text-grey">3 integrantes</span>
        </div>
        <div className="w-[300px] h-[300px] bg-white p-[12px] shadow-custom rounded-lg flex flex-col justify-between">
          <div className="flex items-center gap-[6px] justify-between">
            <p className="text-[22px] text-black font-bold">GirlsPower</p>
            <div className="bg-[#FF96EC] font-bold text-black rounded-full w-[120px] h-[30px] flex items-center justify-center">
              Ideia
            </div>
          </div>
          <span className="text-grey">5 integrantes</span>
        </div>
      </div>
    </div>
  );
};

export default Grupos;
