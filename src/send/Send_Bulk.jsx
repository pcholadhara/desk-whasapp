const Send_Bulk = () =>{
    return(<>
        <div className=" bg-white p-4 h-full w-full flex flex-col gap-2">
            <PhoneNumbers />
            <Template />
            <Send />
        </div>
    </>)
}

const PhoneNumbers = () =>{
      return(<>
        <div className="w-full flex flex-col">
            <div className="p-4 flex flex-col border border-gray-300">
                <h5 className="font-bold">Phone Numbers</h5>    
            </div>
        </div>
      </>)
}

const Template = () =>{
      return(<>
        <div className="w-full flex flex-col grow">
            <div className="p-4 h-full flex flex-col border border-gray-300">
                <h5 className="font-bold">Template</h5>
            </div>
        </div>
      </>)
}

const Send = () =>{
      return(<>
        <div className="w-full flex flex-col">
            <div className="flex flex-row items-center gap-2">
                <input 
                    type="text" value={5}
                    placeholder="Interval"
                    className="p-2 grow ring-0 outline-none focus:outline-none border border-gray-400" />
                <button className="p-2 bg-green-800 text-white grow">SEND</button>
            </div>
        </div>
      </>)
}

export default Send_Bulk;